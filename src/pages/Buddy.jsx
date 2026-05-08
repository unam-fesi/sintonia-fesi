import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';
import SafetyNotice from '../components/SafetyNotice.jsx';

export default function Buddy() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [pair, setPair]       = useState(null);    // pareja activa
  const [inQueue, setInQueue] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(true);
  const endRef = useRef(null);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/buddy' } });
      return;
    }
    refreshState();
    // Polling cada 5s para mensajes nuevos / pareja
    const id = setInterval(refreshState, 5000);
    return () => clearInterval(id);
  // eslint-disable-next-line
  }, [student?.code]);

  // Si lleva 8s en cola sin emparejarse, auto-pair con buddy IA
  useEffect(() => {
    if (!inQueue || !student?.code) return;
    const t = setTimeout(async () => {
      // Verificar de nuevo: ¿ya hay pareja?
      const { data: existingPair } = await supabase.from('buddy_pairs')
        .select('id')
        .or(`code_a.eq.${student.code},code_b.eq.${student.code}`)
        .eq('active', true)
        .maybeSingle();
      if (existingPair) return; // ya se emparejó con humano

      // Crear pareja con AI
      const aiCode = `BUDDY-AI-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      const { data: created, error } = await supabase.from('buddy_pairs').insert({
        code_a: student.code,
        code_b: aiCode,
        active: true,
        is_ai_buddy: true,
      }).select().single();
      if (error) { console.warn(error); return; }

      // Quitar de cola
      await supabase.from('buddy_queue').delete().eq('anonymous_code', student.code);

      // Disparar saludo del AI
      await supabase.functions.invoke('buddy-ai-reply', { body: { pair_id: created.id } }).catch(() => {});

      refreshState();
    }, 8000);
    return () => clearTimeout(t);
  // eslint-disable-next-line
  }, [inQueue, student?.code]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function refreshState() {
    if (!student?.code) return;
    setLoading(true);

    // 1) ¿hay pareja activa?
    const { data: p } = await supabase.from('buddy_pairs')
      .select('*')
      .or(`code_a.eq.${student.code},code_b.eq.${student.code}`)
      .eq('active', true)
      .order('paired_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (p) {
      setPair(p);
      const { data: msgs } = await supabase.from('buddy_messages')
        .select('*').eq('pair_id', p.id).order('created_at');
      setMessages(msgs || []);
      setInQueue(false);
    } else {
      setPair(null);
      setMessages([]);
      const { data: q } = await supabase.from('buddy_queue').select('id').eq('anonymous_code', student.code).maybeSingle();
      setInQueue(!!q);
    }
    setLoading(false);
  }

  async function joinQueue() {
    // Buscar otra persona en cola
    const { data: waiting } = await supabase.from('buddy_queue')
      .select('*')
      .neq('anonymous_code', student.code)
      .order('joined_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (waiting) {
      // Pair them
      const { error: pErr } = await supabase.from('buddy_pairs').insert({
        code_a: waiting.anonymous_code,
        code_b: student.code,
        active: true,
      });
      if (!pErr) {
        await supabase.from('buddy_queue').delete().eq('anonymous_code', waiting.anonymous_code);
      }
    } else {
      // Entrar en cola
      await supabase.from('buddy_queue').upsert({ anonymous_code: student.code });
    }
    refreshState();
  }

  async function leaveQueue() {
    await supabase.from('buddy_queue').delete().eq('anonymous_code', student.code);
    refreshState();
  }

  async function endPair() {
    if (!pair) return;
    if (!confirm('¿Terminar la conversación con tu buddy? Podrás emparejarte de nuevo después.')) return;
    await supabase.from('buddy_pairs').update({ active: false }).eq('id', pair.id);
    refreshState();
  }

  async function send() {
    if (!input.trim() || !pair) return;
    const text = input.trim().slice(0, 1000);
    setInput('');
    await supabase.from('buddy_messages').insert({
      pair_id: pair.id,
      sender_code: student.code,
      message: text,
    });

    // Si es buddy IA, disparar respuesta inmediata
    if (pair.is_ai_buddy) {
      // Pequeño delay para que se sienta natural
      setTimeout(() => {
        supabase.functions.invoke('buddy-ai-reply', { body: { pair_id: pair.id } })
          .then(() => refreshState());
      }, 600 + Math.random() * 1200);
    }
    refreshState();
  }

  if (!student?.code) return null;

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 720}}>
        <header className="text-center" style={{maxWidth: 640, margin: '0 auto'}}>
          <span className="tag lavanda">Buddy anónimo</span>
          <h1 className="mt-2">Conecta con alguien que también está cuidándose</h1>
          <p className="lede">
            Conversa con otro estudiante de la UNAM completamente anónimo. Hablen sin presión.
            A veces saber que no estás solo(a) es la mejor medicina.
          </p>
        </header>

        {loading ? <div className="spinner" style={{margin:'40px auto'}} /> :
         pair ? <ChatBuddy pair={pair} student={student} messages={messages} input={input} setInput={setInput} send={send} endPair={endPair} endRef={endRef} /> :
         inQueue ? <Waiting onLeave={leaveQueue} /> :
         <JoinPanel onJoin={joinQueue} />
        }

        <SafetyNotice variant="warm">
          <strong>Reglas básicas:</strong> respeto siempre. Sin compartir datos personales. Sin lenguaje
          discriminatorio. El equipo del programa puede revisar mensajes en caso de reportes.
          Si te sientes incómodo(a), termina y reporta.
        </SafetyNotice>
      </div>
    </section>
  );
}

function JoinPanel({ onJoin }) {
  return (
    <div className="panel text-center mt-3">
      <h2>¿Listo(a) para conectarte?</h2>
      <p className="lede">
        Te pondremos en cola. En cuanto otra persona se conecte, los enlazamos. Tu código y conversación son anónimos.
      </p>
      <button className="btn btn-primary btn-lg" onClick={onJoin}>🤝 Quiero un buddy</button>
    </div>
  );
}

function Waiting({ onLeave }) {
  return (
    <div className="panel text-center mt-3">
      <div className="spinner" style={{margin:'0 auto 14px'}} />
      <h2>Esperando a alguien…</h2>
      <p className="lede">Estás en cola. Mantente en esta página. Te conectaremos automáticamente.</p>
      <button className="btn btn-ghost" onClick={onLeave}>Salir de la cola</button>
    </div>
  );
}

function ChatBuddy({ pair, student, messages, input, setInput, send, endPair, endRef }) {
  const partner = pair.code_a === student.code ? pair.code_b : pair.code_a;
  return (
    <>
      <div className="buddy-chat mt-3">
        <header>
          <strong>Estás conversando con</strong>
          <code>{partner}</code>
          <button className="btn btn-ghost btn-sm" onClick={endPair}>Terminar</button>
        </header>

        <div className="chat-stream">
          {messages.length === 0 && <p className="note text-center">Salúdense. Cualquier paso es bueno.</p>}
          {messages.map(m => (
            <div key={m.id} className={`bubble ${m.sender_code === student.code ? 'mine' : 'theirs'}`}>
              <p>{m.message}</p>
              <small>{new Date(m.created_at).toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' })}</small>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form className="chat-input" onSubmit={e => { e.preventDefault(); send(); }}>
          <input value={input} onChange={e => setInput(e.target.value)} maxLength={1000}
            placeholder="Escribe a tu buddy…" />
          <button className="btn btn-primary" type="submit" disabled={!input.trim()}>Enviar</button>
        </form>
      </div>
      <style>{`
        .buddy-chat {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          display: flex; flex-direction: column;
          height: 60vh; min-height: 420px; max-height: 680px;
        }
        .buddy-chat header {
          display: flex; gap: 10px; align-items: center;
          padding: 14px 18px;
          border-bottom: 1px solid var(--c-borde-soft);
        }
        .buddy-chat header strong { color: var(--c-azul-800); font-size: 0.92rem; }
        .buddy-chat header code { color: var(--c-oro-700); flex: 1; }
        .chat-stream {
          flex: 1; overflow-y: auto;
          padding: 16px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 14px;
        }
        .bubble.mine {
          align-self: flex-end;
          background: var(--c-azul-800); color: #fff;
          border-bottom-right-radius: 4px;
        }
        .bubble.theirs {
          align-self: flex-start;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-bottom-left-radius: 4px;
        }
        .bubble p { margin: 0; font-size: 0.94rem; }
        .bubble small { display:block; margin-top: 4px; font-size: 0.72rem; opacity: 0.7; }
        .chat-input {
          display: flex; gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid var(--c-borde-soft);
        }
        .chat-input input {
          flex: 1; padding: 10px 14px;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
        }
      `}</style>
    </>
  );
}
