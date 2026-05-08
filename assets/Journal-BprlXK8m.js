import{u as S,s as u,j as e}from"./index-ZpW_GQkA.js";import{b as C,r as t,L as h}from"./vendor-react-BTW_75ak.js";import"./vendor-supabase-DS4euJVY.js";const L=["Calma","Alegría","Gratitud","Cansancio","Ansiedad","Tristeza","Enojo","Confusión","Esperanza"];function T(a){return a?/^(https?:|data:|blob:)/.test(a)?a:"/sintonia-unam/"+a.replace(/^\/+/,""):""}function R(){const{student:a}=S(),i=C(),[l,c]=t.useState([]),[o,d]=t.useState(""),[x,b]=t.useState(""),[z,y]=t.useState(!0),[v,j]=t.useState(!1),[r,m]=t.useState(null),[N,g]=t.useState(!1);t.useEffect(()=>{if(!(a!=null&&a.code)){i("/mi-historia",{state:{from:"/diario"}});return}f()},[a==null?void 0:a.code]);async function f(){y(!0);const{data:s}=await u.from("student_journal").select("id, entry, emotion_tag, created_at").eq("anonymous_code",a.code).order("created_at",{ascending:!1}).limit(40);c(s||[]),y(!1)}async function k(){if(!o.trim())return;j(!0);const s=o.trim(),p=x||null;await u.from("student_journal").insert({anonymous_code:a.code,entry:s,emotion_tag:p}),d(""),b(""),await f(),j(!1),w(s,p)}async function w(s,p){g(!0),m(null);try{const{data:n,error:E}=await u.functions.invoke("journal-suggest",{body:{anonymous_code:a.code,entry:s,emotion_tag:p}});if(E||!n){g(!1);return}if(n.error){g(!1);return}n.crisis?m({kind:"crisis",message:n.message}):n.suggestion&&m({kind:"resource",item:n.suggestion,reason:n.reason,fallback:!!n.fallback})}catch(n){console.warn(n)}finally{g(!1)}}async function _(s){confirm("¿Eliminar esta entrada?")&&(await u.from("student_journal").delete().eq("id",s).eq("anonymous_code",a.code),f())}return a!=null&&a.code?e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:720},children:[e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag sage",children:"Diario"}),e.jsx("h1",{className:"mt-2",children:"Una línea sobre cómo te sientes hoy"}),e.jsx("p",{className:"lede",children:"Escribir aunque sea una frase ayuda a procesar lo que sientes. No tiene que ser perfecto."}),e.jsx("div",{className:"field",children:e.jsx("input",{value:o,onChange:s=>d(s.target.value),placeholder:"Hoy me sentí…",maxLength:240,onKeyDown:s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),k())}})}),e.jsxs("div",{className:"emo-pills",children:[e.jsx("small",{children:"Emoción dominante (opcional):"}),L.map(s=>e.jsx("button",{className:`emo-pill ${x===s?"on":""}`,onClick:()=>b(x===s?"":s),children:s},s))]}),e.jsx("button",{className:"btn btn-primary mt-2",disabled:v||!o.trim(),onClick:k,children:v?"Guardando…":"Agregar entrada"}),(N||r)&&e.jsxs("div",{className:"suggest-area mt-3",children:[N&&e.jsxs("div",{className:"suggest-loading",children:[e.jsx("div",{className:"spinner small"}),e.jsx("span",{children:"Pum-AI está eligiendo algo para ti…"})]}),(r==null?void 0:r.kind)==="crisis"&&e.jsxs("div",{className:"suggest-card crisis",children:[e.jsx("strong",{children:r.message}),e.jsxs("p",{children:["Te invitamos a llamar a la ",e.jsx("strong",{children:"Línea de la Vida 800 290 0024"})," y revisar las opciones en /apoyo."]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:8},children:[e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral btn-sm",children:"📞 Llamar"}),e.jsx(h,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver apoyos"})]})]}),(r==null?void 0:r.kind)==="resource"&&e.jsx(q,{item:r.item,reason:r.reason,onDismiss:()=>m(null)})]})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsxs("h2",{children:["Tus entradas (",l.length,")"]}),z?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):l.length===0?e.jsx("p",{className:"note",children:"Aún no has escrito nada. ¡Empieza con una línea!"}):e.jsx("ul",{className:"entry-list",children:l.map(s=>e.jsxs("li",{className:"entry-item",children:[e.jsxs("div",{className:"entry-meta",children:[e.jsx("small",{children:new Date(s.created_at).toLocaleString("es-MX",{weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}),s.emotion_tag&&e.jsx("span",{className:"emo-tag",children:s.emotion_tag}),e.jsx("button",{className:"del-btn",onClick:()=>_(s.id),title:"Eliminar",children:"🗑"})]}),e.jsxs("p",{children:['"',s.entry,'"']})]},s.id))})]}),e.jsx("p",{className:"text-center mt-3",children:e.jsx(h,{to:"/mi-historia",className:"note",children:"← Volver a mi historia"})})]}),e.jsx("style",{children:`
        .suggest-area { animation: fadeInUp 0.3s ease; }
        .suggest-loading {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: var(--c-azul-100);
          border-radius: 12px;
          color: var(--c-azul-800);
          font-size: 0.92rem;
        }
        .spinner.small { width: 18px; height: 18px; border-width: 2px; margin: 0; }
        .suggest-card {
          background: linear-gradient(135deg, var(--c-oro-100), var(--c-salvia-100));
          border: 1px solid var(--c-oro-600);
          border-radius: var(--r-md);
          padding: 16px 18px;
          position: relative;
        }
        .suggest-card.crisis {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border-color: var(--c-coral-500);
          color: #5C2018;
        }
        .suggest-card.crisis strong { color: #93362A; display: block; margin-bottom: 4px; }
        .suggest-card .badge {
          display: inline-block;
          background: var(--c-azul-800); color: var(--c-oro-400);
          padding: 3px 10px; border-radius: 999px;
          font-size: 0.74rem; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .suggest-card h4 { color: var(--c-azul-800); margin: 8px 0 4px; font-size: 1.05rem; }
        .suggest-card p { margin: 4px 0; font-size: 0.92rem; color: var(--c-texto-soft); }
        .suggest-card .reason {
          font-style: italic;
          background: rgba(255,255,255,0.7);
          padding: 10px 12px;
          border-radius: 10px;
          margin: 8px 0;
          color: var(--c-azul-800);
        }
        .suggest-card .dismiss {
          position: absolute; top: 8px; right: 8px;
          background: transparent; border: 0; cursor: pointer;
          font-size: 0.92rem; color: var(--c-gris);
        }
        .emo-pills { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin: 8px 0 4px; }
        .emo-pills small { color: var(--c-gris); font-size: 0.84rem; margin-right: 6px; }
        .emo-pill {
          padding: 5px 10px;
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.82rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .emo-pill.on { background: var(--c-salvia-400); color: #1F3829; border-color: var(--c-salvia-600); }

        .entry-list { list-style: none; padding: 0; display: grid; gap: 10px; }
        .entry-item {
          padding: 14px 16px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-radius: 12px;
        }
        .entry-meta { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
        .entry-meta small { color: var(--c-gris); font-size: 0.78rem; flex: 1; }
        .emo-tag {
          background: var(--c-salvia-100);
          color: #2F6048;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 700;
        }
        .del-btn {
          background: transparent; border: none; cursor: pointer;
          font-size: 0.86rem; opacity: 0.5;
        }
        .del-btn:hover { opacity: 1; }
        .entry-item p { margin: 0; font-family: var(--ff-serif); font-size: 1.02rem; color: var(--c-azul-800); font-style: italic; }
      `})]}):null}function q({item:a,reason:i,onDismiss:l}){var d;const c=T(a.media_url),o={sound:"🎧 Sonido",video:"🎬 Video",breathing:"🌬 Respiración",challenge:"🎯 Reto",quote:"💭 Frase",dictionary:"📖 Emoción"}[a.category]||"✨ Recurso";return e.jsxs("div",{className:"suggest-card",children:[e.jsx("button",{className:"dismiss",onClick:l,"aria-label":"Cerrar",children:"✕"}),e.jsxs("span",{className:"badge",children:["✨ Pum-AI te sugiere · ",o]}),e.jsx("h4",{children:a.title}),a.body&&e.jsx("p",{children:a.body}),i&&e.jsxs("p",{className:"reason",children:['"',i,'"']}),a.media_url&&a.category==="sound"&&e.jsx("audio",{controls:!0,preload:"metadata",src:c,style:{width:"100%",marginTop:6}}),a.media_url&&a.category==="video"&&e.jsx("video",{controls:!0,preload:"metadata",src:c,style:{width:"100%",borderRadius:8,marginTop:6}}),a.media_url&&!["sound","video"].includes(a.category)&&e.jsx("a",{href:c,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",style:{marginTop:6},children:"Abrir recurso →"}),((d=a.meta)==null?void 0:d.tempo)&&e.jsxs("small",{style:{display:"block",marginTop:8,color:"var(--c-gris)"},children:["🎵 ",a.meta.tempo," · ",a.meta.energy?`Energía ${a.meta.energy.toLowerCase()}`:""]}),e.jsx("div",{style:{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"},children:e.jsx(h,{to:"/biblioteca",className:"btn btn-ghost btn-sm",children:"Ver más en biblioteca →"})})]})}export{R as default};
