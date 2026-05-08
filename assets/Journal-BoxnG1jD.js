import{u as j,s as l,j as e}from"./index-DGANtfck.js";import{b as v,r as t,L as b}from"./vendor-react-BTW_75ak.js";import"./vendor-supabase-DS4euJVY.js";const N=["Calma","Alegría","Gratitud","Cansancio","Ansiedad","Tristeza","Enojo","Confusión","Esperanza"];function z(){const{student:s}=j(),f=v(),[r,g]=t.useState([]),[n,c]=t.useState(""),[i,d]=t.useState(""),[h,m]=t.useState(!0),[p,u]=t.useState(!1);t.useEffect(()=>{if(!(s!=null&&s.code)){f("/mi-historia",{state:{from:"/diario"}});return}o()},[s==null?void 0:s.code]);async function o(){m(!0);const{data:a}=await l.from("student_journal").select("id, entry, emotion_tag, created_at").eq("anonymous_code",s.code).order("created_at",{ascending:!1}).limit(40);g(a||[]),m(!1)}async function x(){n.trim()&&(u(!0),await l.from("student_journal").insert({anonymous_code:s.code,entry:n.trim(),emotion_tag:i||null}),c(""),d(""),await o(),u(!1))}async function y(a){confirm("¿Eliminar esta entrada?")&&(await l.from("student_journal").delete().eq("id",a).eq("anonymous_code",s.code),o())}return s!=null&&s.code?e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:720},children:[e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag sage",children:"Diario"}),e.jsx("h1",{className:"mt-2",children:"Una línea sobre cómo te sientes hoy"}),e.jsx("p",{className:"lede",children:"Escribir aunque sea una frase ayuda a procesar lo que sientes. No tiene que ser perfecto."}),e.jsx("div",{className:"field",children:e.jsx("input",{value:n,onChange:a=>c(a.target.value),placeholder:"Hoy me sentí…",maxLength:240,onKeyDown:a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),x())}})}),e.jsxs("div",{className:"emo-pills",children:[e.jsx("small",{children:"Emoción dominante (opcional):"}),N.map(a=>e.jsx("button",{className:`emo-pill ${i===a?"on":""}`,onClick:()=>d(i===a?"":a),children:a},a))]}),e.jsx("button",{className:"btn btn-primary mt-2",disabled:p||!n.trim(),onClick:x,children:p?"Guardando…":"Agregar entrada"})]}),e.jsxs("section",{className:"panel mt-3",children:[e.jsxs("h2",{children:["Tus entradas (",r.length,")"]}),h?e.jsx("div",{className:"spinner",style:{margin:"24px auto"}}):r.length===0?e.jsx("p",{className:"note",children:"Aún no has escrito nada. ¡Empieza con una línea!"}):e.jsx("ul",{className:"entry-list",children:r.map(a=>e.jsxs("li",{className:"entry-item",children:[e.jsxs("div",{className:"entry-meta",children:[e.jsx("small",{children:new Date(a.created_at).toLocaleString("es-MX",{weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}),a.emotion_tag&&e.jsx("span",{className:"emo-tag",children:a.emotion_tag}),e.jsx("button",{className:"del-btn",onClick:()=>y(a.id),title:"Eliminar",children:"🗑"})]}),e.jsxs("p",{children:['"',a.entry,'"']})]},a.id))})]}),e.jsx("p",{className:"text-center mt-3",children:e.jsx(b,{to:"/mi-historia",className:"note",children:"← Volver a mi historia"})})]}),e.jsx("style",{children:`
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
      `})]}):null}export{z as default};
