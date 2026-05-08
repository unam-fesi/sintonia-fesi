import{u as S,s as t,j as a,S as E}from"./index-C4fU9YO8.js";import{b as C,r as o}from"./vendor-react-BTW_75ak.js";import"./vendor-supabase-DS4euJVY.js";function L(){const{student:e}=S(),m=C(),[n,c]=o.useState(null),[l,p]=o.useState(!1),[b,x]=o.useState([]),[u,r]=o.useState(""),[g,f]=o.useState(!0),h=o.useRef(null);o.useEffect(()=>{if(!(e!=null&&e.code)){m("/mi-historia",{state:{from:"/buddy"}});return}i();const s=setInterval(i,5e3);return()=>clearInterval(s)},[e==null?void 0:e.code]),o.useEffect(()=>{if(!l||!(e!=null&&e.code))return;const s=setTimeout(async()=>{const{data:d}=await t.from("buddy_pairs").select("id").or(`code_a.eq.${e.code},code_b.eq.${e.code}`).eq("active",!0).maybeSingle();if(d)return;const N=`BUDDY-AI-${Math.random().toString(36).slice(2,6).toUpperCase()}`,{data:w,error:y}=await t.from("buddy_pairs").insert({code_a:e.code,code_b:N,active:!0,is_ai_buddy:!0}).select().single();if(y){console.warn(y);return}await t.from("buddy_queue").delete().eq("anonymous_code",e.code),await t.functions.invoke("buddy-ai-reply",{body:{pair_id:w.id}}).catch(()=>{}),i()},8e3);return()=>clearTimeout(s)},[l,e==null?void 0:e.code]),o.useEffect(()=>{var s;(s=h.current)==null||s.scrollIntoView({behavior:"smooth"})},[b]);async function i(){if(!(e!=null&&e.code))return;f(!0);const{data:s}=await t.from("buddy_pairs").select("*").or(`code_a.eq.${e.code},code_b.eq.${e.code}`).eq("active",!0).order("paired_at",{ascending:!1}).limit(1).maybeSingle();if(s){c(s);const{data:d}=await t.from("buddy_messages").select("*").eq("pair_id",s.id).order("created_at");x(d||[]),p(!1)}else{c(null),x([]);const{data:d}=await t.from("buddy_queue").select("id").eq("anonymous_code",e.code).maybeSingle();p(!!d)}f(!1)}async function v(){const{data:s}=await t.from("buddy_queue").select("*").neq("anonymous_code",e.code).order("joined_at",{ascending:!0}).limit(1).maybeSingle();if(s){const{error:d}=await t.from("buddy_pairs").insert({code_a:s.anonymous_code,code_b:e.code,active:!0});d||await t.from("buddy_queue").delete().eq("anonymous_code",s.anonymous_code)}else await t.from("buddy_queue").upsert({anonymous_code:e.code});i()}async function _(){await t.from("buddy_queue").delete().eq("anonymous_code",e.code),i()}async function j(){n&&confirm("¿Terminar la conversación con tu buddy? Podrás emparejarte de nuevo después.")&&(await t.from("buddy_pairs").update({active:!1}).eq("id",n.id),i())}async function q(){if(!u.trim()||!n)return;const s=u.trim().slice(0,1e3);r(""),await t.from("buddy_messages").insert({pair_id:n.id,sender_code:e.code,message:s}),n.is_ai_buddy&&setTimeout(()=>{t.functions.invoke("buddy-ai-reply",{body:{pair_id:n.id}}).then(()=>i())},600+Math.random()*1200),i()}return e!=null&&e.code?a.jsx("section",{className:"section",children:a.jsxs("div",{className:"container",style:{maxWidth:720},children:[a.jsxs("header",{className:"text-center",style:{maxWidth:640,margin:"0 auto"},children:[a.jsx("span",{className:"tag lavanda",children:"Buddy anónimo"}),a.jsx("h1",{className:"mt-2",children:"Conecta con alguien que también está cuidándose"}),a.jsx("p",{className:"lede",children:"Conversa con otro estudiante de la UNAM completamente anónimo. Hablen sin presión. A veces saber que no estás solo(a) es la mejor medicina."})]}),g?a.jsx("div",{className:"spinner",style:{margin:"40px auto"}}):n?a.jsx(z,{pair:n,student:e,messages:b,input:u,setInput:r,send:q,endPair:j,endRef:h}):l?a.jsx(T,{onLeave:_}):a.jsx(k,{onJoin:v}),a.jsxs(E,{variant:"warm",children:[a.jsx("strong",{children:"Reglas básicas:"})," respeto siempre. Sin compartir datos personales. Sin lenguaje discriminatorio. El equipo del programa puede revisar mensajes en caso de reportes. Si te sientes incómodo(a), termina y reporta."]})]})}):null}function k({onJoin:e}){return a.jsxs("div",{className:"panel text-center mt-3",children:[a.jsx("h2",{children:"¿Listo(a) para conectarte?"}),a.jsx("p",{className:"lede",children:"Te pondremos en cola. En cuanto otra persona se conecte, los enlazamos. Tu código y conversación son anónimos."}),a.jsx("button",{className:"btn btn-primary btn-lg",onClick:e,children:"🤝 Quiero un buddy"})]})}function T({onLeave:e}){return a.jsxs("div",{className:"panel text-center mt-3",children:[a.jsx("div",{className:"spinner",style:{margin:"0 auto 14px"}}),a.jsx("h2",{children:"Esperando a alguien…"}),a.jsx("p",{className:"lede",children:"Estás en cola. Mantente en esta página. Te conectaremos automáticamente."}),a.jsx("button",{className:"btn btn-ghost",onClick:e,children:"Salir de la cola"})]})}function z({pair:e,student:m,messages:n,input:c,setInput:l,send:p,endPair:b,endRef:x}){const u=e.code_a===m.code?e.code_b:e.code_a;return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"buddy-chat mt-3",children:[a.jsxs("header",{children:[a.jsx("strong",{children:"Estás conversando con"}),a.jsx("code",{children:u}),a.jsx("button",{className:"btn btn-ghost btn-sm",onClick:b,children:"Terminar"})]}),a.jsxs("div",{className:"chat-stream",children:[n.length===0&&a.jsx("p",{className:"note text-center",children:"Salúdense. Cualquier paso es bueno."}),n.map(r=>a.jsxs("div",{className:`bubble ${r.sender_code===m.code?"mine":"theirs"}`,children:[a.jsx("p",{children:r.message}),a.jsx("small",{children:new Date(r.created_at).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})})]},r.id)),a.jsx("div",{ref:x})]}),a.jsxs("form",{className:"chat-input",onSubmit:r=>{r.preventDefault(),p()},children:[a.jsx("input",{value:c,onChange:r=>l(r.target.value),maxLength:1e3,placeholder:"Escribe a tu buddy…"}),a.jsx("button",{className:"btn btn-primary",type:"submit",disabled:!c.trim(),children:"Enviar"})]})]}),a.jsx("style",{children:`
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
      `})]})}export{L as default};
