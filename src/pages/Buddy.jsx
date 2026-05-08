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
  const [loading, setLoading] = useState(true);   // SOLO se usa en el primer mount
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const lastTypedAt = useRef(0);
  const inputValueRef = useRef('');               // mirror de input para no recrear interval
  const aiTypingTimeoutRef = useRef(null);
  const [aiTyping, setAiTyping] = useState(false); // muestra "escribiendo..." cuando es buddy IA

  // Mantener el ref sincronizado con el state (sin recrear el interval)
  useEffect(() => { inputValueRef.current = input; }, [input]);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/buddy' } });
      return;
    }
    refreshState({ silent: false });

    // Polling MUY espaciado y SILENCIOSO solo para detectar cambios de pair
    // (mensajes vienen por realtime). Se SALTA si el usuario está escribiendo.
    const id = setInterval(() => {
      // Pausa si el input está enfocado, tiene texto, o se tecleó hace <5s
      if (document.activeElement === inputRef.current) return;
      if (inputValueRef.current.length > 0) return;
      if (Date.now() - lastTypedAt.current < 5000) return;
      pollPairOnly();
    }, 15000);
    return () => clearInterval(id);
  // eslint-disable-next-line
  }, [student?.code]);

  // Realtime: suscripción a mensajes nuevos del par activo
  // (reemplaza al polling de mensajes — cero refresco visible)
  useEffect(() => {
    if (!pair?.id) return;
    const channel = supabase
      .channel(`buddy-msgs-${pair.id}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'buddy_messages', filter: `pair_id=eq.${pair.id}` },
        (payload) => {
          const m = payload.new;
          setMessages(prev => {
            // Dedupe por id real
            if (prev.some(x => x.id === m.id)) return prev;
            // Reemplazar burbujita optimista con mismo contenido + sender
            const idx = prev.findIndex(x =>
              x._optimistic &&
              x.sender_code === m.sender_code &&
              x.message === m.message
            );
            if (idx >= 0) {
              const next = prev.slice();
              next[idx] = m;
              return next;
            }
            return [...prev, m];
          });
          // Si llega mensaje del partner, apagamos el "escribiendo..."
          if (m.sender_code !== student?.code) {
            setAiTyping(false);
            if (aiTypingTimeoutRef.current) clearTimeout(aiTypingTimeoutRef.current);
          }
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [pair?.id, student?.code]);

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

  // Refresh COMPLETO — sólo en mount inicial y al unirse/salir de la cola
  async function refreshState({ silent = false } = {}) {
    if (!student?.code) return;
    if (!silent) setLoading(true);

    // 1) ¿hay pareja activa?
    const { data: p } = await supabase.from('buddy_pairs')
      .select('*')
      .or(`code_a.eq.${student.code},code_b.eq.${student.code}`)
      .eq('active', true)
      .order('paired_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (p) {
      // Solo actualiza pair si cambió (evita rerenders innecesarios)
      setPair(prev => (prev?.id === p.id ? prev : p));
      const { data: msgs } = await supabase.from('buddy_messages')
        .select('*').eq('pair_id', p.id).order('created_at');
      // Solo setea mensajes si hay diff real (evita re-render del chat con cada poll)
      setMessages(prev => {
        const next = msgs || [];
        if (prev.length === next.length && prev[prev.length - 1]?.id === next[next.length - 1]?.id) {
          return prev;
        }
        return next;
      });
      setInQueue(false);
    } else {
      setPair(null);
      setMessages([]);
      const { data: q } = await supabase.from('buddy_queue').select('id').eq('anonymous_code', student.code).maybeSingle();
      setInQueue(!!q);
    }
    if (!silent) setLoading(false);
  }

  // Poll BARATO — sólo verifica si pair cambió (no toca mensajes, los lleva realtime)
  async function pollPairOnly() {
    if (!student?.code) return;
    const { data: p } = await supabase.from('buddy_pairs')
      .select('id, active, code_a, code_b, is_ai_buddy, paired_at')
      .or(`code_a.eq.${student.code},code_b.eq.${student.code}`)
      .eq('active', true)
      .order('paired_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (p) {
      setPair(prev => (prev?.id === p.id ? prev : p));
    } else if (pair) {
      // Mi pair se desactivó — refrescamos completo
      refreshState({ silent: true });
    }
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
    refreshState({ silent: false });
  }

  async function leaveQueue() {
    await supabase.from('buddy_queue').delete().eq('anonymous_code', student.code);
    refreshState({ silent: false });
  }

  async function endPair() {
    if (!pair) return;
    if (!confirm('¿Terminar la conversación con tu buddy? Podrás emparejarte de nuevo después.')) return;
    await supabase.from('buddy_pairs').update({ active: false }).eq('id', pair.id);
    refreshState({ silent: false });
  }

  async function send() {
    if (!input.trim() || !pair) return;
    const text = input.trim().slice(0, 1000);
    setInput('');
    // Insert optimista local: aparece de inmediato sin esperar al server
    const optimistic = {
      id: `tmp-${Date.now()}`,
      pair_id: pair.id,
      sender_code: student.code,
      message: text,
      created_at: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages(m => [...m, optimistic]);

    // No hacemos await — la realtime sub trae el mensaje real y reemplaza el optimista
    supabase.from('buddy_messages').insert({
      pair_id: pair.id,
      sender_code: student.code,
      message: text,
    }).then(({ error }) => {
      if (error) console.warn('insert msg', error);
    });

    // Si es buddy IA, disparar respuesta — la respuesta llegará por realtime
    if (pair.is_ai_buddy) {
      // Mostrar "escribiendo…" tras un pequeño delay
      if (aiTypingTimeoutRef.current) clearTimeout(aiTypingTimeoutRef.current);
      const showAt = 600 + Math.random() * 800;
      aiTypingTimeoutRef.current = setTimeout(() => setAiTyping(true), showAt);

      // Delay natural antes de invocar la respuesta
      setTimeout(() => {
        supabase.functions.invoke('buddy-ai-reply', { body: { pair_id: pair.id } })
          .catch(() => {})
          .finally(() => {
            // Si por alguna razón no llegó por realtime, apagar typing tras 12s
            setTimeout(() => setAiTyping(false), 12000);
          });
      }, 900 + Math.random() * 1400);
    }
    // No llamamos refreshState — realtime hace el trabajo
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
         pair ? <ChatBuddy pair={pair} student={student} messages={messages}
                  input={input} setInput={setInput} send={send} endPair={endPair}
                  endRef={endRef} inputRef={inputRef} aiTyping={aiTyping}
                  onTyping={() => { lastTypedAt.current = Date.now(); }} /> :
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

function ChatBuddy({ pair, student, messages, input, setInput, send, endPair, endRef, inputRef, onTyping, aiTyping }) {
  const partner = pair.code_a === student.code ? pair.code_b : pair.code_a;
  // Mostrar el código del partner pero recortado para no romper layout en mobile
  const partnerLabel = partner?.length > 12 ? partner.slice(0, 8) + '…' : partner;
  return (
    <>
      <div className="buddy-chat mt-3">
        <header>
          <strong>Conversando con</strong>
          <code>{partnerLabel}</code>
          <button className="btn btn-ghost btn-sm" onClick={endPair}>Terminar</button>
        </header>

        <div className="chat-stream">
          {messages.length === 0 && <p className="note text-center">Salúdense. Cualquier paso es bueno.</p>}
          {messages.map(m => (
            <div key={m.id} className={`bubble ${m.sender_code === student.code ? 'mine' : 'theirs'} ${m._optimistic ? 'pending' : ''}`}>
              <p>{m.message}</p>
              <small>{new Date(m.created_at).toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' })}</small>
            </div>
          ))}
          {aiTyping && (
            <div className="bubble theirs typing" aria-label="está escribiendo">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form className="chat-input" onSubmit={e => { e.preventDefault(); send(); }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value); onTyping?.(); }}
            onKeyDown={() => onTyping?.()}
            maxLength={1000}
            placeholder="Escribe a tu buddy…"
            autoComplete="off"
            autoCorrect="on"
            inputMode="text"
          />
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
        .bubble.pending { opacity: 0.6; }
        .bubble.typing { display: inline-flex; gap: 4px; padding: 12px 14px; }
        .bubble.typing .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c-azul-700);
          opacity: 0.5;
          animation: typingDot 1.2s infinite ease-in-out;
        }
        .bubble.typing .dot:nth-child(2) { animation-delay: 0.15s; }
        .bubble.typing .dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30%           { opacity: 1;   transform: translateY(-3px); }
        }
        .bubble p { margin: 0; font-size: 0.94rem; white-space: pre-wrap; }
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
          font-size: 16px; /* evita zoom de iOS */
        }
        @media (max-width: 540px) {
          .buddy-chat header code { font-size: 0.78rem; }
          .buddy-chat header .btn { padding: 6px 10px; font-size: 0.78rem; }
          .chat-input { padding: 10px; }
          .chat-input .btn { padding: 10px 14px; font-size: 0.88rem; }
        }
      `}</style>
    </>
  );
}
