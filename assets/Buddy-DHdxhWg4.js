import{u as N,s as t,j as e,S as q}from"./index-BRrUbThC.js";import{b as S,r as o}from"./vendor-react-BTW_75ak.js";import"./vendor-supabase-DS4euJVY.js";function I(){const{student:a}=N(),u=S(),[r,d]=o.useState(null),[x,m]=o.useState(!1),[p,b]=o.useState([]),[c,n]=o.useState(""),[g,f]=o.useState(!0),h=o.useRef(null);o.useEffect(()=>{if(!(a!=null&&a.code)){u("/mi-historia",{state:{from:"/buddy"}});return}i();const s=setInterval(i,8e3);return()=>clearInterval(s)},[a==null?void 0:a.code]),o.useEffect(()=>{var s;(s=h.current)==null||s.scrollIntoView({behavior:"smooth"})},[p]);async function i(){if(!(a!=null&&a.code))return;f(!0);const{data:s}=await t.from("buddy_pairs").select("*").or(`code_a.eq.${a.code},code_b.eq.${a.code}`).eq("active",!0).order("paired_at",{ascending:!1}).limit(1).maybeSingle();if(s){d(s);const{data:l}=await t.from("buddy_messages").select("*").eq("pair_id",s.id).order("created_at");b(l||[]),m(!1)}else{d(null),b([]);const{data:l}=await t.from("buddy_queue").select("id").eq("anonymous_code",a.code).maybeSingle();m(!!l)}f(!1)}async function y(){const{data:s}=await t.from("buddy_queue").select("*").neq("anonymous_code",a.code).order("joined_at",{ascending:!0}).limit(1).maybeSingle();if(s){const{error:l}=await t.from("buddy_pairs").insert({code_a:s.anonymous_code,code_b:a.code,active:!0});l||await t.from("buddy_queue").delete().eq("anonymous_code",s.anonymous_code)}else await t.from("buddy_queue").upsert({anonymous_code:a.code});i()}async function j(){await t.from("buddy_queue").delete().eq("anonymous_code",a.code),i()}async function v(){r&&confirm("¿Terminar la conversación con tu buddy? Podrás emparejarte de nuevo después.")&&(await t.from("buddy_pairs").update({active:!1}).eq("id",r.id),i())}async function _(){if(!c.trim()||!r)return;const s=c.trim().slice(0,1e3);n(""),await t.from("buddy_messages").insert({pair_id:r.id,sender_code:a.code,message:s}),i()}return a!=null&&a.code?e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",style:{maxWidth:720},children:[e.jsxs("header",{className:"text-center",style:{maxWidth:640,margin:"0 auto"},children:[e.jsx("span",{className:"tag lavanda",children:"Buddy anónimo"}),e.jsx("h1",{className:"mt-2",children:"Conecta con alguien que también está cuidándose"}),e.jsx("p",{className:"lede",children:"Conversa con otro estudiante de la UNAM completamente anónimo. Hablen sin presión. A veces saber que no estás solo(a) es la mejor medicina."})]}),g?e.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):r?e.jsx(C,{pair:r,student:a,messages:p,input:c,setInput:n,send:_,endPair:v,endRef:h}):x?e.jsx(E,{onLeave:j}):e.jsx(w,{onJoin:y}),e.jsxs(q,{variant:"warm",children:[e.jsx("strong",{children:"Reglas básicas:"})," respeto siempre. Sin compartir datos personales. Sin lenguaje discriminatorio. El equipo del programa puede revisar mensajes en caso de reportes. Si te sientes incómodo(a), termina y reporta."]})]})}):null}function w({onJoin:a}){return e.jsxs("div",{className:"panel text-center mt-3",children:[e.jsx("h2",{children:"¿Listo(a) para conectarte?"}),e.jsx("p",{className:"lede",children:"Te pondremos en cola. En cuanto otra persona se conecte, los enlazamos. Tu código y conversación son anónimos."}),e.jsx("button",{className:"btn btn-primary btn-lg",onClick:a,children:"🤝 Quiero un buddy"})]})}function E({onLeave:a}){return e.jsxs("div",{className:"panel text-center mt-3",children:[e.jsx("div",{className:"spinner",style:{margin:"0 auto 14px"}}),e.jsx("h2",{children:"Esperando a alguien…"}),e.jsx("p",{className:"lede",children:"Estás en cola. Mantente en esta página. Te conectaremos automáticamente."}),e.jsx("button",{className:"btn btn-ghost",onClick:a,children:"Salir de la cola"})]})}function C({pair:a,student:u,messages:r,input:d,setInput:x,send:m,endPair:p,endRef:b}){const c=a.code_a===u.code?a.code_b:a.code_a;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"buddy-chat mt-3",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"Estás conversando con"}),e.jsx("code",{children:c}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:p,children:"Terminar"})]}),e.jsxs("div",{className:"chat-stream",children:[r.length===0&&e.jsx("p",{className:"note text-center",children:"Salúdense. Cualquier paso es bueno."}),r.map(n=>e.jsxs("div",{className:`bubble ${n.sender_code===u.code?"mine":"theirs"}`,children:[e.jsx("p",{children:n.message}),e.jsx("small",{children:new Date(n.created_at).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})})]},n.id)),e.jsx("div",{ref:b})]}),e.jsxs("form",{className:"chat-input",onSubmit:n=>{n.preventDefault(),m()},children:[e.jsx("input",{value:d,onChange:n=>x(n.target.value),maxLength:1e3,placeholder:"Escribe a tu buddy…"}),e.jsx("button",{className:"btn btn-primary",type:"submit",disabled:!d.trim(),children:"Enviar"})]})]}),e.jsx("style",{children:`
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
      `})]})}export{I as default};
