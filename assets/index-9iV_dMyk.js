const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Resources-DrTdyt5O.js","assets/vendor-react-BTW_75ak.js","assets/vendor-supabase-DS4euJVY.js","assets/Resources-Da2drgDA.css","assets/Privacy-BVyqSsMa.js","assets/MyHistory-DOK16Gw1.js","assets/CheckIn-Btd3aFfd.js","assets/Journal-KLAVxRgz.js","assets/Support-BfJcJ5jB.js","assets/WellnessRoute-DiAlfhN9.js","assets/Companion-1aQ80TZj.js","assets/Library-D4jlegA-.js","assets/Emotions-Bn0kvGyo.js","assets/MapPage-BDuKFLnO.js","assets/Trees-Ok1_S-oW.js","assets/Buddy-BrRmgJrB.js","assets/Adventure-BGFJw5au.js","assets/Calendar-albFzb6Q.js","assets/Admin-DH0_ebQw.js","assets/authService-DVhRgEX5.js","assets/AdminLogin-CVh-arKB.js"])))=>i.map(i=>d[i]);
import{r as t,a as ee,u as z,L as f,N as u,b as U,R as de,c as v,d as B,e as ue,B as me}from"./vendor-react-BTW_75ak.js";import{c as pe}from"./vendor-supabase-DS4euJVY.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(r){if(r.ep)return;r.ep=!0;const c=i(r);fetch(r.href,c)}})();var ae={exports:{}},R={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xe=t,he=Symbol.for("react.element"),ge=Symbol.for("react.fragment"),ve=Object.prototype.hasOwnProperty,fe=xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,be={key:!0,ref:!0,__self:!0,__source:!0};function se(a,s,i){var n,r={},c=null,l=null;i!==void 0&&(c=""+i),s.key!==void 0&&(c=""+s.key),s.ref!==void 0&&(l=s.ref);for(n in s)ve.call(s,n)&&!be.hasOwnProperty(n)&&(r[n]=s[n]);if(a&&a.defaultProps)for(n in s=a.defaultProps,s)r[n]===void 0&&(r[n]=s[n]);return{$$typeof:he,type:a,key:c,ref:l,props:r,_owner:fe.current}}R.Fragment=ge;R.jsx=se;R.jsxs=se;ae.exports=R;var e=ae.exports,ie,V=ee;ie=V.createRoot,V.hydrateRoot;const je="modulepreload",ye=function(a){return"/sintonia-unam/"+a},H={},j=function(s,i,n){let r=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),m=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));r=Promise.allSettled(i.map(h=>{if(h=ye(h),h in H)return;H[h]=!0;const g=h.endsWith(".css"),p=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${p}`))return;const d=document.createElement("link");if(d.rel=g?"stylesheet":je,g||(d.as="script"),d.crossOrigin="",d.href=h,m&&d.setAttribute("nonce",m),document.head.appendChild(d),g)return new Promise((o,x)=>{d.addEventListener("load",o),d.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${h}`)))})}))}function c(l){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=l,window.dispatchEvent(m),!m.defaultPrevented)throw l}return r.then(l=>{for(const m of l||[])m.status==="rejected"&&c(m.reason);return s().catch(c)})},W="1.0.0",K={bajo:{max:33},moderado:{max:66}},P={bajo:"Bajo nivel de atención",moderado:"Atención moderada",prioritario:"Atención prioritaria"},S={ANSWERS:"sintonia.answers",CONSENT:"sintonia.consent",RESULT:"sintonia.result",ANON_CODE:"sintonia.anon_code"},ne="generate-orientation",q="sintonia.student";function Y(){try{const a=sessionStorage.getItem(q);if(a)return JSON.parse(a);const s=sessionStorage.getItem(S.ANON_CODE);return s?{code:s,password:null}:null}catch{return null}}function _e(a){a?sessionStorage.setItem(q,JSON.stringify(a)):sessionStorage.removeItem(q),window.dispatchEvent(new Event("sintonia:student"))}function Ne(){sessionStorage.removeItem(q),sessionStorage.removeItem(S.ANON_CODE),window.dispatchEvent(new Event("sintonia:student"))}function $(){const[a,s]=t.useState(Y),i=t.useCallback(()=>s(Y()),[]);return t.useEffect(()=>{const n=()=>i();return window.addEventListener("sintonia:student",n),window.addEventListener("storage",n),()=>{window.removeEventListener("sintonia:student",n),window.removeEventListener("storage",n)}},[i]),{student:a,setStudent:n=>{_e(n),i()},clearStudent:()=>{Ne(),i()}}}function we(){const{student:a,clearStudent:s}=$(),i=!!(a!=null&&a.code),n=z(),[r,c]=t.useState(null),[l,m]=t.useState(!1),h=t.useRef(null);t.useEffect(()=>{c(null),m(!1)},[n.pathname]),t.useEffect(()=>{function x(b){var w;(w=h.current)!=null&&w.contains(b.target)||c(null)}return document.addEventListener("click",x),()=>document.removeEventListener("click",x)},[]),t.useEffect(()=>(document.body.style.overflow=l?"hidden":"",document.body.classList.toggle("drawer-open",l),()=>{document.body.style.overflow="",document.body.classList.remove("drawer-open")}),[l]);function g(x){c(b=>b===x?null:x)}function p(){m(!1)}function d(){m(!1),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(s(),window.location.assign("/sintonia-unam/"))}const o=i?a.code.split("-").map(x=>x[0]).join("").slice(0,3):"";return e.jsxs("header",{className:"site-header",children:[e.jsxs("div",{className:"container topbar",children:[e.jsxs(f,{to:"/",className:"brand","aria-label":"Sintonía UNAM, ir al inicio",children:[e.jsx("img",{src:"/sintonia-unam/Sintonia-icon192.png",srcSet:"/sintonia-unam/Sintonia-icon192.png 1x, /sintonia-unam/Sintonia-icon512.png 2x",alt:"Sintonía UNAM",className:"brand-logo",width:"56",height:"56"}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("strong",{children:"Sintonía UNAM"}),e.jsx("span",{children:"Bienestar emocional universitario"})]})]}),e.jsx("button",{type:"button",className:"mobile-toggle",onClick:()=>m(!0),"aria-label":"Abrir menú",children:"☰"}),e.jsxs("nav",{className:"nav","aria-label":"Navegación principal",ref:h,children:[e.jsx(u,{to:"/",end:!0,className:"nav-link",children:"Inicio"}),e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${r==="discover"?"active":""}`,onClick:()=>g("discover"),"aria-haspopup":"true","aria-expanded":r==="discover",children:"Conocer ▾"}),r==="discover"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(u,{to:"/recursos",children:"📌 Recursos"}),e.jsx(u,{to:"/calendario",children:"📅 Calendario"}),e.jsx(u,{to:"/mapa",children:"🗺 Mapa"}),e.jsx(u,{to:"/emociones",children:"📖 Emociones"})]})]}),e.jsx(u,{to:"/apoyo",className:"nav-link",children:"🆘 Apoyo"}),i&&e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${r==="mine"?"active":""}`,onClick:()=>g("mine"),"aria-haspopup":"true","aria-expanded":r==="mine",children:"Mi rincón ▾"}),r==="mine"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(u,{to:"/mi-historia",children:"📊 Mi historia"}),e.jsx(u,{to:"/check-in",children:"📝 Check-in"}),e.jsx(u,{to:"/diario",children:"📔 Diario"}),e.jsx(u,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(u,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(u,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(u,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(u,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(u,{to:"/arboles",children:"🌳 Mis árboles"})]})]}),!i&&e.jsx(u,{to:"/mi-historia",className:"nav-link",children:"Mi historia"}),e.jsx(u,{to:"/privacidad",className:"nav-link nav-tiny",children:"Privacidad"}),i?e.jsxs("div",{className:"dropdown",children:[e.jsxs("button",{type:"button",className:`user-chip ${r==="user"?"active":""}`,onClick:()=>g("user"),"aria-haspopup":"true","aria-expanded":r==="user",title:"Abrir menú",children:[e.jsx("span",{className:"initials",children:o}),e.jsx("small",{children:a.code}),e.jsx("span",{className:"chev","aria-hidden":"true",children:"▾"})]}),r==="user"&&e.jsxs("div",{className:"drop-panel user-drop",children:[e.jsx(u,{to:"/mi-historia",end:!0,children:"📊 Mi panel"}),e.jsx(u,{to:"/check-in",children:"📝 Check-in semanal"}),e.jsx(u,{to:"/diario",children:"📔 Diario emocional"}),e.jsx(u,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(u,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(u,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(u,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(u,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(u,{to:"/arboles",children:"🌳 Mis árboles"}),e.jsx("hr",{style:{margin:"6px 0",border:0,borderTop:"1px solid var(--c-borde-soft)"}}),e.jsx("button",{type:"button",className:"logout-link",onClick:()=>{c(null),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(s(),window.location.assign("/sintonia-unam/"))},children:"↩ Cerrar sesión"})]})]}):e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-sm nav-cta",children:"Iniciar orientación"})]})]}),l&&ee.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mobile-overlay",onClick:p}),e.jsxs("aside",{className:"mobile-drawer",role:"dialog","aria-label":"Menú principal",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"Menú"}),e.jsx("button",{className:"close-x",onClick:p,"aria-label":"Cerrar",children:"✕"})]}),i&&e.jsxs("div",{className:"m-user",children:[e.jsx("span",{className:"m-initials",children:o}),e.jsxs("div",{children:[e.jsx("strong",{children:"Tu código"}),e.jsx("code",{children:a.code})]})]}),e.jsxs("nav",{className:"m-nav",children:[e.jsx(u,{to:"/",end:!0,onClick:p,children:"🏠 Inicio"}),e.jsx("h4",{children:"Conocer"}),e.jsx(u,{to:"/recursos",onClick:p,children:"📌 Recursos"}),e.jsx(u,{to:"/calendario",onClick:p,children:"📅 Calendario"}),e.jsx(u,{to:"/mapa",onClick:p,children:"🗺 Mapa"}),e.jsx(u,{to:"/emociones",onClick:p,children:"📖 Emociones"}),e.jsx("h4",{children:"Apoyo"}),e.jsx(u,{to:"/apoyo",onClick:p,children:"🆘 Apoyo y canalización"}),i&&e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:"Mi rincón"}),e.jsx(u,{to:"/mi-historia",onClick:p,children:"📊 Mi panel"}),e.jsx(u,{to:"/check-in",onClick:p,children:"📝 Check-in semanal"}),e.jsx(u,{to:"/diario",onClick:p,children:"📔 Diario"}),e.jsx(u,{to:"/ruta",onClick:p,children:"🛤 Mi ruta"}),e.jsx(u,{to:"/companion",onClick:p,children:"🤝 Pum-AI"}),e.jsx(u,{to:"/biblioteca",onClick:p,children:"📚 Biblioteca"}),e.jsx(u,{to:"/aventura",onClick:p,children:"🗺 Aventura"}),e.jsx(u,{to:"/buddy",onClick:p,children:"🫂 Buddy"}),e.jsx(u,{to:"/arboles",onClick:p,children:"🌳 Mis árboles"})]}),e.jsx("h4",{children:"Información"}),e.jsx(u,{to:"/privacidad",onClick:p,children:"🔒 Privacidad"}),e.jsx("div",{className:"m-cta",children:i?e.jsx("button",{type:"button",className:"btn btn-coral",onClick:d,children:"↩ Cerrar sesión"}):e.jsx(f,{to:"/consentimiento",onClick:p,className:"btn btn-primary btn-lg",children:"Iniciar orientación"})})]})]})]}),document.body)]})}function Se(){const a=new Date().getFullYear();return e.jsx("footer",{className:"site-footer",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-card",children:[e.jsxs("div",{children:[e.jsx("h4",{children:"Sintonía UNAM"}),e.jsx("p",{children:"Plataforma universitaria de orientación para el bienestar emocional. No constituye diagnóstico ni sustituye atención profesional."})]}),e.jsxs("div",{className:"footer-links",children:[e.jsx(f,{to:"/privacidad",children:"Aviso de privacidad"}),e.jsx(f,{to:"/recursos",children:"Recursos de apoyo"}),e.jsx(f,{to:"/admin",children:"Acceso interno"})]})]}),e.jsxs("p",{className:"footer-credits",children:["© Universidad Nacional Autónoma de México, ",a,"."]})]})})}const L="sintonia.crisis_visible";function ke(){const a=z(),[s,i]=t.useState(!1),[n,r]=t.useState(!1),c=a.pathname.startsWith("/admin")||a.pathname.startsWith("/apoyo");t.useEffect(()=>{try{const m=JSON.parse(sessionStorage.getItem(S.RESULT)||"null");m&&m.general_level==="prioritario"&&localStorage.setItem(L,"1")}catch{}i(localStorage.getItem(L)==="1")},[a.pathname]);function l(){localStorage.setItem(L,"0"),i(!1),r(!1)}return!s||c?null:e.jsxs(e.Fragment,{children:[n&&e.jsxs("div",{className:"crisis-panel",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"🆘 Apoyo inmediato"}),e.jsx("button",{onClick:()=>r(!1),"aria-label":"Cerrar",children:"✕"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Línea de la Vida"})," — orientación gratuita, confidencial, 24/7."]}),e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral",children:"📞 800 290 0024"}),e.jsx(f,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver más opciones"}),e.jsx("button",{className:"dismiss",onClick:l,children:"Ocultar este botón"})]}),e.jsx("button",{className:`crisis-fab ${n?"open":""}`,onClick:()=>r(m=>!m),title:"Apoyo inmediato","aria-label":"Abrir apoyo inmediato",children:"🆘"}),e.jsx("style",{children:`
        .crisis-fab {
          position: fixed;
          bottom: 20px; right: 20px;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--c-coral-500), var(--c-coral-600));
          color: #fff;
          font-size: 1.6rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(214,59,57,0.4);
          z-index: 60;
          transition: transform 0.2s;
          animation: pulse 2.6s ease-in-out infinite;
        }
        .crisis-fab:hover { transform: scale(1.08); }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 12px 30px rgba(214,59,57,0.4), 0 0 0 0 rgba(214,59,57,0.4); }
          50%      { box-shadow: 0 12px 30px rgba(214,59,57,0.4), 0 0 0 18px rgba(214,59,57,0); }
        }
        .crisis-panel {
          position: fixed;
          bottom: 90px; right: 20px;
          width: 280px;
          background: #fff;
          border: 2px solid var(--c-coral-500);
          border-radius: var(--r-md);
          padding: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          z-index: 60;
          display: grid; gap: 10px;
        }
        .crisis-panel header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .crisis-panel header strong { color: #93362A; }
        .crisis-panel header button {
          background: transparent; border: 0; cursor: pointer;
          font-size: 1rem; color: var(--c-gris);
        }
        .crisis-panel p { margin: 0; font-size: 0.92rem; color: var(--c-texto); }
        .crisis-panel .dismiss {
          background: transparent; border: 0; cursor: pointer;
          font-size: 0.78rem; color: var(--c-gris); text-decoration: underline;
          margin-top: 4px;
        }
      `})]})}const Ee="https://knblatuzbgzgnugwkxdp.supabase.co",re="sb_publishable_yBtfhxGitkJdS9jXO4CGxg_qmMkg3RF",k=!!re,_=k?pe(Ee,re,{auth:{persistSession:!0,autoRefreshToken:!0,storageKey:"sintonia.auth"}}):null,J="sintonia.webinar_dismissed_",Ce=24;function Ae(){const{student:a}=$(),s=z(),[i,n]=t.useState(null),[r,c]=t.useState(!1),[l,m]=t.useState(!1),[h,g]=t.useState(!1),d=["/admin","/evaluacion","/consentimiento"].some(N=>s.pathname.startsWith(N));t.useEffect(()=>{k&&(async()=>{const{data:N}=await _.from("view_upcoming_webinars").select("*").order("starts_at").limit(1).maybeSingle();if(N){try{const C=localStorage.getItem(J+N.id);if(C){const T=Number(C);if(Date.now()-T<Ce*3600*1e3)return}}catch{}n(N),setTimeout(()=>c(!0),2500)}})()},[]),t.useEffect(()=>{!i||!(a!=null&&a.code)||_.from("event_rsvp").select("id").eq("event_id",i.id).eq("anonymous_code",a.code).maybeSingle().then(({data:N})=>g(!!N))},[i,a==null?void 0:a.code]);function o(){if(i!=null&&i.id)try{localStorage.setItem(J+i.id,String(Date.now()))}catch{}c(!1)}async function x(){if(!(a!=null&&a.code)){window.location.assign("/sintonia-unam/mi-historia");return}m(!0),await _.from("event_rsvp").upsert({event_id:i.id,anonymous_code:a.code},{onConflict:"event_id,anonymous_code"}),g(!0),m(!1)}if(!i||d)return null;const w=new Date(i.starts_at).toLocaleString("es-MX",{weekday:"long",day:"2-digit",month:"long",hour:"2-digit",minute:"2-digit"});return e.jsxs(e.Fragment,{children:[!r&&e.jsxs("button",{className:"webinar-pill",onClick:()=>c(!0),"aria-label":"Abrir aviso de webinar",children:["📡 ",e.jsx("span",{children:"Webinar próximo"})]}),r&&e.jsxs("div",{className:"webinar-toast",role:"dialog","aria-label":"Próximo webinar",children:[e.jsx("button",{className:"dismiss-btn",onClick:o,"aria-label":"Cerrar",children:"✕"}),i.image_url&&e.jsx("img",{src:i.image_url,alt:"",className:"webinar-img"}),e.jsxs("div",{className:"webinar-body",children:[e.jsx("span",{className:"webinar-tag",children:"📡 Próximo webinar"}),e.jsx("h3",{children:i.title}),i.speaker&&e.jsxs("small",{children:["👤 ",i.speaker]}),e.jsxs("small",{children:["🗓 ",w]}),i.location&&e.jsxs("small",{children:["📍 ",i.location]}),i.description&&e.jsx("p",{className:"webinar-desc",children:i.description}),e.jsxs("div",{className:"webinar-actions",children:[h?e.jsx("span",{className:"rsvped-chip",children:"✓ Apuntado(a)"}):e.jsx("button",{className:"btn btn-primary btn-sm",onClick:x,disabled:l,children:l?"…":a!=null&&a.code?"✋ Me interesa":"✋ Crear código y apuntarme"}),i.url&&e.jsx("a",{href:i.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Más info →"})]})]})]}),e.jsx("style",{children:`
        .webinar-pill {
          position: fixed;
          bottom: 86px;
          right: 20px;
          background: linear-gradient(135deg, var(--c-azul-800), var(--c-azul-700));
          color: #fff;
          border: 0;
          padding: 10px 16px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(16,36,62,0.30);
          z-index: 55;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          animation: gentleBounce 3.8s ease-in-out infinite;
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .webinar-pill:hover { transform: translateY(-2px); }

        .webinar-toast {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 360px;
          max-width: calc(100vw - 40px);
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          box-shadow: 0 24px 60px rgba(0,0,0,0.30);
          overflow: hidden;
          z-index: 55;
          animation: slideIn 0.4s cubic-bezier(.2,.7,.2,1);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translate(20px, 20px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        .dismiss-btn {
          position: absolute; top: 10px; right: 10px;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.85);
          border: 0;
          cursor: pointer;
          font-size: 0.92rem;
          color: var(--c-azul-800);
          z-index: 2;
        }
        .dismiss-btn:hover { background: #fff; }

        .webinar-img {
          width: 100%; height: 130px;
          object-fit: cover;
          display: block;
        }
        .webinar-body { padding: 18px; }
        .webinar-tag {
          display: inline-block;
          background: var(--c-oro-100);
          color: #7B5E14;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .webinar-toast h3 {
          margin: 6px 0 4px;
          color: var(--c-azul-800);
          font-size: 1.08rem;
        }
        .webinar-body small {
          display: block;
          color: var(--c-gris);
          font-size: 0.84rem;
          margin: 2px 0;
        }
        .webinar-desc {
          font-size: 0.92rem;
          color: var(--c-texto-soft);
          margin: 8px 0;
        }
        .webinar-actions {
          display: flex; gap: 6px; flex-wrap: wrap;
          margin-top: 10px;
        }
        .rsvped-chip {
          padding: 5px 12px;
          background: var(--c-salvia-100);
          color: #2F6048;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 700;
        }
      `})]})}const qe=[{x:12,delay:0,duration:24,size:14,color:"var(--c-salvia-400)",shape:"leaf"},{x:28,delay:4,duration:28,size:10,color:"var(--c-oro-400)",shape:"circle"},{x:42,delay:9,duration:22,size:12,color:"var(--c-lavanda-500)",shape:"leaf"},{x:60,delay:2,duration:30,size:8,color:"var(--c-coral-500)",shape:"circle"},{x:76,delay:12,duration:26,size:14,color:"var(--c-salvia-600)",shape:"leaf"},{x:88,delay:6,duration:28,size:10,color:"var(--c-oro-600)",shape:"circle"},{x:18,delay:14,duration:32,size:8,color:"var(--c-lavanda-500)",shape:"circle"},{x:50,delay:18,duration:25,size:12,color:"var(--c-salvia-400)",shape:"leaf"},{x:68,delay:8,duration:30,size:9,color:"var(--c-oro-400)",shape:"circle"},{x:32,delay:16,duration:26,size:11,color:"var(--c-coral-500)",shape:"leaf"}];function ze(){const a=t.useRef(null);return t.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let i=null;function n(){if(!a.current)return;const c=window.scrollY;a.current.style.transform=`translateY(${c*-.15}px)`,i=null}function r(){i==null&&(i=requestAnimationFrame(n))}return n(),window.addEventListener("scroll",r,{passive:!0}),()=>{window.removeEventListener("scroll",r),i&&cancelAnimationFrame(i)}},[]),e.jsxs("div",{ref:a,className:"wellness-bg","aria-hidden":"true",children:[e.jsx("div",{className:"bg-blob bg-blob-1"}),e.jsx("div",{className:"bg-blob bg-blob-2"}),e.jsx("div",{className:"bg-blob bg-blob-3"}),e.jsx("div",{className:"bg-blob bg-blob-4"}),e.jsx("div",{className:"bg-particles",children:qe.map((s,i)=>e.jsx("span",{className:`bg-particle bg-particle-${s.shape}`,style:{left:`${s.x}%`,width:`${s.size}px`,height:`${s.size}px`,background:s.shape==="circle"?s.color:void 0,color:s.shape==="leaf"?s.color:void 0,animationDelay:`-${s.delay}s`,animationDuration:`${s.duration}s`},children:s.shape==="leaf"&&e.jsx("svg",{viewBox:"0 0 16 16",width:"100%",height:"100%",children:e.jsx("path",{d:"M8 1 C 14 1, 15 9, 8 15 C 1 9, 2 1, 8 1 Z M 8 4 L 8 13",fill:"currentColor",stroke:"currentColor",strokeWidth:"0.6",opacity:"0.6"})})},i))}),e.jsx("style",{children:`
        .wellness-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          will-change: transform;
        }

        /* ===== Blobs ===== */
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.32;
          will-change: transform;
        }
        .bg-blob-1 {
          width: 460px; height: 460px;
          top: -120px; left: -120px;
          background: radial-gradient(circle, var(--c-salvia-400), transparent 65%);
          animation: drift1 22s ease-in-out infinite;
        }
        .bg-blob-2 {
          width: 380px; height: 380px;
          top: 25%; right: -120px;
          background: radial-gradient(circle, var(--c-oro-400), transparent 65%);
          animation: drift2 26s ease-in-out infinite;
        }
        .bg-blob-3 {
          width: 500px; height: 500px;
          bottom: -150px; left: 25%;
          background: radial-gradient(circle, var(--c-lavanda-500), transparent 60%);
          animation: drift3 28s ease-in-out infinite;
        }
        .bg-blob-4 {
          width: 360px; height: 360px;
          bottom: 15%; right: 8%;
          background: radial-gradient(circle, var(--c-coral-500), transparent 65%);
          opacity: 0.18;
          animation: drift4 24s ease-in-out infinite;
        }

        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0)        scale(1); }
          33%      { transform: translate(50px, 30px)  scale(1.08); }
          66%      { transform: translate(-30px, 60px) scale(0.92); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0)        scale(1); }
          33%      { transform: translate(-40px, -30px) scale(1.05); }
          66%      { transform: translate(20px, 40px)  scale(0.95); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0)        scale(1); }
          50%      { transform: translate(60px, -40px) scale(1.10); }
        }
        @keyframes drift4 {
          0%, 100% { transform: translate(0, 0)         scale(1); }
          33%      { transform: translate(-50px, 20px)  scale(0.95); }
          66%      { transform: translate(30px, -30px)  scale(1.08); }
        }

        /* ===== Partículas ===== */
        .bg-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .bg-particle {
          position: absolute;
          bottom: -5%;
          opacity: 0;
          animation-name: rise;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          will-change: transform, opacity;
        }
        .bg-particle-circle { border-radius: 50%; }
        .bg-particle-leaf {
          display: inline-flex;
        }

        @keyframes rise {
          0%   { transform: translate(0,    0)        rotate(0deg);    opacity: 0; }
          10%  {                                       opacity: 0.5; }
          50%  { transform: translate(30px, -55vh)    rotate(180deg);  opacity: 0.45; }
          90%  {                                       opacity: 0.4; }
          100% { transform: translate(-40px, -110vh)  rotate(360deg);  opacity: 0; }
        }

        /* ===== Reduced motion ===== */
        @media (prefers-reduced-motion: reduce) {
          .bg-blob { animation: none; }
          .bg-particle { animation: none; opacity: 0; }
        }

        /* En móvil bajamos un poco la intensidad para no consumir bateria */
        @media (max-width: 720px) {
          .bg-blob { opacity: 0.22; filter: blur(50px); }
          .bg-blob-4 { display: none; }
          .bg-particle { opacity: 0.3 !important; }
        }
      `})]})}function Re(){return e.jsx("section",{className:"hero",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"hero-grid",children:[e.jsxs("div",{className:"hero-card card fade-in",children:[e.jsx("span",{className:"tag",children:"Programa universitario · UNAM"}),e.jsxs("h1",{className:"mt-2",children:["Sintonízate contigo, con tu ",e.jsx("span",{style:{color:"var(--c-oro-700)"},children:"comunidad"})," ","y con tu bienestar."]}),e.jsx("p",{className:"lede",children:"Una autoevaluación breve, anónima y con recomendaciones personalizadas para reflexionar sobre tu bienestar emocional y conocer recursos de apoyo dentro de la UNAM."}),e.jsxs("ul",{className:"hero-checks",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"20 preguntas"})," en 7 a 10 minutos"]}),e.jsxs("li",{children:["Resultado ",e.jsx("strong",{children:"informativo, anónimo y confidencial"})]}),e.jsxs("li",{children:["Recomendaciones y vinculación con ",e.jsx("strong",{children:"recursos universitarios"})]})]}),e.jsxs("div",{className:"hero-actions",children:[e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(f,{to:"/privacidad",className:"btn btn-ghost",children:"Aviso de privacidad"})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"20"}),e.jsx("span",{children:"preguntas"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"7-10"}),e.jsx("span",{children:"minutos"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"0"}),e.jsx("span",{children:"datos personales"})]})]})]}),e.jsx("aside",{className:"hero-visual fade-in","aria-hidden":"true",children:e.jsxs("div",{className:"orb-grid",children:[e.jsx("div",{className:"orb azul",children:e.jsxs("div",{children:[e.jsx("span",{children:"🧠"}),"Psicología"]})}),e.jsx("div",{className:"orb oro",children:e.jsxs("div",{children:[e.jsx("span",{children:"⚖️"}),"Equilibrio"]})}),e.jsx("div",{className:"orb salvia",children:e.jsxs("div",{children:[e.jsx("span",{children:"🌿"}),"Calma"]})}),e.jsx("div",{className:"orb coral",children:e.jsxs("div",{children:[e.jsx("span",{children:"🤝"}),"Comunidad"]})}),e.jsx("div",{className:"orb marfil",children:e.jsxs("div",{children:[e.jsx("span",{children:"✨"}),"Sintonía"]})}),e.jsx("div",{className:"orb lavanda",children:e.jsxs("div",{children:[e.jsx("span",{children:"🎨"}),"Arte"]})}),e.jsx("div",{className:"orb salvia",children:e.jsxs("div",{children:[e.jsx("span",{children:"🏃"}),"Deporte"]})}),e.jsx("div",{className:"orb azul",children:e.jsxs("div",{children:[e.jsx("span",{children:"📚"}),"Estudio"]})}),e.jsx("div",{className:"orb oro",children:e.jsxs("div",{children:[e.jsx("span",{children:"💛"}),"Bienestar"]})})]})})]})})})}function Ie({icon:a="✦",title:s,children:i,accent:n="azul"}){return e.jsxs("article",{className:`info-card accent-${n}`,children:[e.jsx("div",{className:"info-icon","aria-hidden":"true",children:a}),e.jsx("h3",{children:s}),e.jsx("p",{children:i})]})}function I({variant:a="default",children:s}){return e.jsxs("aside",{className:`safety-notice safety-${a}`,role:"note",children:[e.jsx("span",{className:"safety-icon","aria-hidden":"true",children:"ⓘ"}),e.jsx("div",{children:s||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," No constituye un diagnóstico médico ni psicológico, ni reemplaza la atención profesional. Si necesitas apoyo, acércate a los servicios de orientación y salud de la UNAM."]})})]})}function M(){const a=new Date;return a.getFullYear()*1e3+a.getMonth()*32+a.getDate()}function te(a){return!a||a.length===0?null:a[M()%a.length]}function Te({compact:a=!1}){const[s,i]=t.useState(null);return t.useEffect(()=>{_.from("student_library").select("id, title, body, meta").eq("category","quote").eq("active",!0).then(({data:n})=>i(te(n)))},[]),s?e.jsxs("div",{className:`daily-quote ${a?"compact":""}`,children:[e.jsx("small",{children:"💭 Frase del día"}),e.jsxs("blockquote",{children:['"',s.title,'"']}),s.body&&e.jsxs("cite",{children:["— ",s.body]}),e.jsx("style",{children:`
        .daily-quote {
          background: linear-gradient(135deg, var(--c-azul-100), var(--c-lavanda-100));
          border-radius: var(--r-md);
          padding: 18px 22px;
          margin: 12px 0;
        }
        .daily-quote.compact { padding: 12px 16px; }
        .daily-quote small { color: var(--c-gris); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        .daily-quote blockquote {
          font-family: var(--ff-serif);
          font-size: 1.15rem;
          color: var(--c-azul-800);
          font-style: italic;
          margin: 8px 0 4px;
        }
        .daily-quote cite { color: var(--c-texto-soft); font-size: 0.86rem; font-style: normal; }
      `})]}):null}function Le(){const{student:a}=$(),[s,i]=t.useState(null),[n,r]=t.useState(!1);t.useEffect(()=>{_.from("student_library").select("id, title, body").eq("category","challenge").eq("active",!0).then(({data:l})=>i(te(l)))},[]),t.useEffect(()=>{if(!s||!(a!=null&&a.code))return;const l=`challenge_${M()}_${s.id}`;_.from("student_achievements").select("id").eq("anonymous_code",a.code).eq("achievement_key",l).maybeSingle().then(({data:m})=>r(!!m))},[s,a==null?void 0:a.code]);async function c(){if(!(a!=null&&a.code)||!s)return;const l=`challenge_${M()}_${s.id}`;await _.from("student_achievements").upsert({anonymous_code:a.code,achievement_key:l}),r(!0)}return s?e.jsxs("div",{className:"daily-challenge",children:[e.jsx("small",{children:"🎯 Reto del día"}),e.jsx("h3",{children:s.title}),s.body&&e.jsx("p",{children:s.body}),(a==null?void 0:a.code)&&e.jsx("button",{className:`btn ${n?"btn-ghost":"btn-coral"} btn-sm`,onClick:c,disabled:n,children:n?"✓ ¡Lo hiciste!":"Marcar como hecho"}),e.jsx("style",{children:`
        .daily-challenge {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border: 1px solid rgba(232,130,107,0.3);
          border-radius: var(--r-md);
          padding: 18px 22px;
          margin: 12px 0;
        }
        .daily-challenge small { color: #93362A; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        .daily-challenge h3 { color: var(--c-azul-800); margin: 6px 0 4px; }
        .daily-challenge p { color: var(--c-texto-soft); margin: 0 0 10px; font-size: 0.94rem; }
      `})]}):null}const Oe=[{icon:"📝",accent:"azul",title:"Evaluación breve",text:"Veinte preguntas en aproximadamente siete a diez minutos."},{icon:"📊",accent:"oro",title:"Resultado informativo",text:"Un panorama de tus dimensiones de bienestar, sin etiquetas clínicas."},{icon:"🌿",accent:"salvia",title:"Recomendaciones personalizadas",text:"Acciones de autocuidado y vinculación con actividades universitarias."},{icon:"🏛",accent:"coral",title:"Recursos universitarios",text:"Orientación psicológica, deporte, cultura, comunidad y bienestar verde."},{icon:"🤝",accent:"lavanda",title:"IA con responsabilidad",text:"Te acompaña con redacción amable; nunca diagnostica ni sustituye atención profesional."}];function Pe(){return e.jsxs(e.Fragment,{children:[e.jsx(Re,{}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",style:{maxWidth:980},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[e.jsx(Te,{}),e.jsx(Le,{})]}),e.jsx("style",{children:`
            @media (max-width: 720px) {
              .section-sm > .container > div { grid-template-columns: 1fr !important; }
            }
          `})]})}),e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag",children:"Cómo te acompaña Sintonía UNAM"}),e.jsx("h2",{className:"mt-2",children:"Una orientación clara, anónima y con sentido comunitario"}),e.jsx("p",{className:"lede",children:"Sintonía UNAM es una plataforma para reflexionar sobre tu bienestar emocional, identificar áreas de autocuidado y conocer recursos de apoyo dentro de la UNAM."})]}),e.jsx("div",{className:"pillars",children:Oe.map(a=>e.jsx(Ie,{icon:a.icon,title:a.title,accent:a.accent,children:a.text},a.title))}),e.jsxs("div",{className:"continuity-card",children:[e.jsx("div",{className:"continuity-icon","aria-hidden":"true",children:"🔁"}),e.jsxs("div",{children:[e.jsx("span",{className:"tag sage",children:"¿Quieres seguir cuidándote?"}),e.jsx("h3",{className:"mt-2",children:"Tu código anónimo te abre un rincón propio"}),e.jsxs("p",{children:["Si guardas tu código (ej. ",e.jsx("code",{children:"SIN-XXX-####"}),") puedes regresar cuando quieras y obtener acceso a:"]}),e.jsxs("ul",{className:"continuity-list",children:[e.jsxs("li",{children:["📝 ",e.jsx("strong",{children:"Check-in semanal"})," de 30 segundos"]}),e.jsxs("li",{children:["📔 ",e.jsx("strong",{children:"Diario emocional"})," rápido (1 línea/día)"]}),e.jsxs("li",{children:["🛤 ",e.jsx("strong",{children:"Ruta de bienestar"})," de 7 o 14 días personalizada"]}),e.jsxs("li",{children:["🤝 ",e.jsx("strong",{children:"Pum-AI acompañante"})," para conversar cuando lo necesites"]}),e.jsxs("li",{children:["📚 ",e.jsx("strong",{children:"Biblioteca"})," de respiraciones, sonidos y videos"]}),e.jsxs("li",{children:["🗺 ",e.jsx("strong",{children:"Aventura"})," con pistas en el campus"]}),e.jsxs("li",{children:["🌳 ",e.jsx("strong",{children:"Adopta un árbol"})," y cuídalo"]}),e.jsxs("li",{children:["🫂 ",e.jsx("strong",{children:"Buddy anónimo"})," para conectar con otra persona"]}),e.jsxs("li",{children:["📅 ",e.jsx("strong",{children:"Calendario"})," de eventos universitarios"]}),e.jsxs("li",{children:["📊 ",e.jsx("strong",{children:"Tu evolución"})," a lo largo del tiempo"]})]}),e.jsxs("p",{className:"note",children:["Sigue siendo ",e.jsx("strong",{children:"100% anónimo"}),": solo tu código y, si quieres, una contraseña. Nada de nombre, correo ni datos personales."]}),e.jsxs("div",{className:"continuity-actions",children:[e.jsx(f,{to:"/mi-historia",className:"btn btn-gold",children:"Crear mi código anónimo"}),e.jsx(f,{to:"/consentimiento",className:"btn btn-ghost",children:"Solo hacer el test"})]})]})]})]}),e.jsx("style",{children:`
          .continuity-card {
            background: linear-gradient(135deg, var(--c-azul-100), var(--c-salvia-100));
            border: 1px solid rgba(143,184,160,0.4);
            border-radius: var(--r-xl);
            padding: 32px;
            margin-top: 28px;
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            align-items: start;
          }
          .continuity-icon {
            width: 72px; height: 72px;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
            display: grid; place-items: center;
            font-size: 2rem;
          }
          .continuity-card h3 {
            font-size: 1.4rem;
            color: var(--c-azul-800);
          }
          .continuity-list {
            list-style: none;
            padding: 0;
            margin: 14px 0 16px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 6px 16px;
          }
          .continuity-list li {
            font-size: 0.94rem;
            color: var(--c-texto);
          }
          .continuity-actions {
            display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;
          }
          @media (max-width: 720px) {
            .continuity-card { grid-template-columns: 1fr; padding: 22px; }
            .continuity-icon { width: 60px; height: 60px; font-size: 1.6rem; }
          }
        `})]}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"cta-band",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"¿Listo para iniciar?"}),e.jsx("p",{children:"La orientación es anónima. No solicitamos nombre, correo, teléfono ni número de cuenta. Tus respuestas se procesan para devolverte un panorama útil y recomendaciones."})]}),e.jsxs("div",{className:"cta-actions",children:[e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(f,{to:"/recursos",className:"btn btn-ghost",children:"Ver recursos de apoyo"})]})]}),e.jsx("div",{className:"mt-4",children:e.jsx(I,{})})]})}),e.jsx("style",{children:`
        .pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 28px;
        }
        .cta-band {
          background: linear-gradient(135deg, var(--c-azul-100), var(--c-oro-100));
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          padding: 36px;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: center;
        }
        .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
        @media (max-width: 740px) {
          .cta-band { grid-template-columns: 1fr; padding: 24px; }
          .cta-actions { justify-content: flex-start; }
        }
      `})]})}function Me(){const a=U(),[s,i]=t.useState(!1);function n(){s&&(sessionStorage.setItem(S.CONSENT,JSON.stringify({accepted:!0,timestamp:new Date().toISOString()})),a("/evaluacion"))}return e.jsxs("section",{className:"section",children:[e.jsx("div",{className:"container",style:{maxWidth:820},children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag",children:"Antes de iniciar"}),e.jsx("h1",{className:"mt-2",children:"Consentimiento informado"}),e.jsx("p",{className:"lede",children:"Antes de comenzar, te invitamos a leer las siguientes consideraciones. Tu participación es libre y puedes detenerla en cualquier momento."}),e.jsx("h2",{className:"mt-4",children:"¿Qué es Sintonía UNAM?"}),e.jsxs("p",{children:["Sintonía UNAM es una herramienta ",e.jsx("strong",{children:"informativa"})," de orientación para el bienestar emocional.",e.jsx("strong",{children:" No es un servicio médico, terapéutico ni de atención clínica."}),"Su propósito es ayudarte a reflexionar sobre cómo te has sentido y conocer recursos de apoyo dentro de la universidad."]}),e.jsx("h2",{className:"mt-4",children:"¿Qué pasará con tus respuestas?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"No te pediremos datos personales"}),": ni nombre, ni correo, ni teléfono, ni número de cuenta, ni cualquier información que te identifique directamente."]}),e.jsxs("li",{children:["Generamos un ",e.jsx("strong",{children:"código anónimo"})," (por ejemplo: SIN-KQT-2856) que tú decides guardar si quieres consultar tu resultado más tarde."]}),e.jsxs("li",{children:["Tus respuestas se almacenan de forma ",e.jsx("strong",{children:"anónima y agregada"})," con fines de mejora del programa y análisis estadístico."]}),e.jsxs("li",{children:["Para generar tu orientación amigable, enviamos a un modelo de inteligencia artificial",e.jsx("strong",{children:" únicamente datos agregados"})," (puntajes y dimensiones), nunca información personal."]})]}),e.jsx("h2",{className:"mt-4",children:"Limitaciones"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["El resultado es ",e.jsx("strong",{children:"informativo, no diagnóstico"}),"."]}),e.jsx("li",{children:"No reemplaza la atención psicológica o médica profesional."}),e.jsx("li",{children:"Si necesitas apoyo, te invitamos a acercarte a los servicios universitarios de orientación."})]}),e.jsxs(I,{variant:"gold",children:["Si en este momento estás atravesando una crisis o piensas en hacerte daño, comunícate de inmediato a la ",e.jsx("strong",{children:"Línea de la Vida: 800 290 0024"})," (24 horas, gratuito)."]}),e.jsx("div",{className:"consent-box mt-4",children:e.jsxs("label",{className:"consent-label",children:[e.jsx("input",{type:"checkbox",checked:s,onChange:r=>i(r.target.checked)}),e.jsx("span",{children:"He leído y acepto continuar con esta orientación informativa."})]})}),e.jsxs("div",{className:"actions mt-4",children:[e.jsx("button",{type:"button",className:"btn btn-primary btn-lg",onClick:n,disabled:!s,children:"Continuar →"}),e.jsx(f,{to:"/",className:"btn btn-ghost",children:"Volver al inicio"})]})]})}),e.jsx("style",{children:`
        .consent-box {
          background: var(--c-azul-100);
          border-radius: 14px;
          padding: 16px 18px;
        }
        .consent-label {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-weight: 500;
          color: var(--c-texto);
          cursor: pointer;
        }
        .consent-label input { margin-top: 4px; transform: scale(1.2); accent-color: var(--c-azul-800); }
        .actions { display: flex; gap: 12px; flex-wrap: wrap; }
      `})]})}function De({current:a,total:s}){const i=s?Math.round(a/s*100):0;return e.jsxs("div",{className:"progress-wrap","aria-label":`Progreso ${i}%`,children:[e.jsxs("div",{className:"progress-meta",children:[e.jsxs("span",{children:["Pregunta ",e.jsx("strong",{children:a})," de ",e.jsx("strong",{children:s})]}),e.jsxs("span",{children:[i,"%"]})]}),e.jsx("div",{className:"progress-bar",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":i,children:e.jsx("span",{style:{width:`${i}%`}})})]})}const Q=[{id:"estado_emocional",label:"Estado emocional"},{id:"estres_academico",label:"Estrés académico"},{id:"sueno_descanso",label:"Sueño y descanso"},{id:"apoyo_social",label:"Convivencia y apoyo social"},{id:"motivacion_pertenencia",label:"Motivación y pertenencia"}],G=[{id:"q01",sort_order:1,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"En los últimos días, ¿con qué frecuencia te has sentido triste o desanimado(a)?"},{id:"q02",sort_order:2,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"¿Has sentido nervios o preocupación que te cuesta calmar?"},{id:"q03",sort_order:3,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has logrado disfrutar momentos pequeños de tu día a día?"},{id:"q04",sort_order:4,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has podido reconocer cómo te sientes y darle nombre a tus emociones?"},{id:"q05",sort_order:5,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Has sentido que tus actividades académicas o personales te rebasan?"},{id:"q06",sort_order:6,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Te ha costado concentrarte al estudiar o atender tus clases?"},{id:"q07",sort_order:7,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has logrado organizar tu tiempo entre estudio, descanso y vida personal?"},{id:"q08",sort_order:8,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has podido afrontar exámenes o entregas con relativa calma?"},{id:"q09",sort_order:9,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has logrado descansar lo suficiente para realizar tus actividades cotidianas?"},{id:"q10",sort_order:10,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has mantenido un horario de sueño relativamente constante?"},{id:"q11",sort_order:11,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Te has despertado cansado(a) o con poca energía?"},{id:"q12",sort_order:12,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Has tenido dificultad para conciliar el sueño o has dormido inquieto(a)?"},{id:"q13",sort_order:13,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has contado con alguien con quien hablar cuando lo necesitas?"},{id:"q14",sort_order:14,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has compartido tiempo con familiares o amistades que te hacen bien?"},{id:"q15",sort_order:15,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Te has sentido solo(a) o con poca conexión con quienes te rodean?"},{id:"q16",sort_order:16,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Has evitado actividades sociales que antes disfrutabas?"},{id:"q17",sort_order:17,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has sentido motivación para participar en tus actividades universitarias?"},{id:"q18",sort_order:18,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has tenido momentos para realizar actividades que te ayuden a sentirte mejor?"},{id:"q19",sort_order:19,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Te has sentido parte de tu comunidad universitaria?"},{id:"q20",sort_order:20,dimension:"motivacion_pertenencia",is_reverse_scored:!1,question_text:"¿Has perdido interés o entusiasmo por metas que antes te importaban?"}],Ue=[{value:0,label:"Nunca"},{value:1,label:"Casi nunca"},{value:2,label:"Algunas veces"},{value:3,label:"Frecuentemente"},{value:4,label:"Casi siempre"}];function $e({question:a,value:s,onChange:i,index:n}){return e.jsxs("article",{className:"question-card",children:[e.jsxs("span",{className:"question-number",children:["PREGUNTA ",n+1]}),e.jsx("h2",{className:"question-text",children:a.question_text}),e.jsx("div",{className:"options",role:"radiogroup","aria-label":"Opciones de respuesta",children:Ue.map(r=>e.jsxs("button",{type:"button",role:"radio","aria-checked":s===r.value,className:`option ${s===r.value?"selected":""}`,onClick:()=>i(r.value),children:[e.jsx("span",{className:"opt-mark","aria-hidden":"true"}),e.jsx("span",{children:r.label})]},r.value))})]},a.id)}const ka=[{id:"orientacion_psicologica",label:"Orientación psicológica",icon:"🧠"},{id:"tutoria_academica",label:"Tutoría académica",icon:"📚"},{id:"deporte",label:"Actividades deportivas",icon:"🏃"},{id:"cultura",label:"Actividades culturales",icon:"🎭"},{id:"comunidad",label:"Integración comunitaria",icon:"🤝"},{id:"medico",label:"Servicios médicos",icon:"🩺"},{id:"emergencia",label:"Atención de emergencia",icon:"☎️"},{id:"sustentabilidad",label:"Bienestar verde",icon:"🌿"}],X=[{id:"r-uepi",name:"Unidad de Evaluación Psicológica Iztacala (UEPI)",type:"orientacion_psicologica",description:"Acompañamiento psicológico para la comunidad universitaria. Atención individual y grupal.",audience:"Estudiantes UNAM",modality:"Presencial / a distancia",location:"FES Iztacala",schedule:"Lunes a viernes, 9:00 a 17:00",contact:"uepi@iztacala.unam.mx",tags:["psicología","atención","orientación"]},{id:"r-tutorias",name:"Programa Institucional de Tutorías",type:"tutoria_academica",description:"Tutorías académicas y de trayectoria escolar. Acompañamiento para mejorar tu desempeño.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu facultad o escuela",schedule:"Según agenda del tutor",contact:"Coordinación de tutorías de tu plantel",tags:["académico","tutoría","desempeño"]},{id:"r-deporte",name:"Activación física comunitaria",type:"deporte",description:"Sesiones abiertas de yoga, baile y movimiento físico en explanadas universitarias.",audience:"Comunidad UNAM",modality:"Presencial",location:"Explanadas en distintos planteles",schedule:"Martes y jueves, 8:00",contact:"Difusión cultural y deportiva",tags:["deporte","movimiento","comunidad"]},{id:"r-cultura",name:"Talleres culturales",type:"cultura",description:"Talleres de música, escritura, pintura, teatro y otros oficios artísticos abiertos a estudiantes.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Casa del Tiempo y centros culturales",schedule:"Calendario semestral",contact:"Difusión cultural UNAM",tags:["arte","cultura","comunidad"]},{id:"r-comunidad",name:"Círculos de bienestar Sintonía",type:"comunidad",description:"Encuentros guiados para compartir experiencias y construir comunidad.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu plantel",schedule:"Miércoles 17:00",contact:"sintonia@unam.mx",tags:["comunidad","apoyo","pertenencia"]},{id:"r-medico",name:"Servicios médicos universitarios",type:"medico",description:"Consulta médica general gratuita para personal y estudiantes.",audience:"Comunidad UNAM",modality:"Presencial",location:"Centros médicos por plantel",schedule:"Lunes a viernes",contact:"Servicios médicos de tu plantel",tags:["salud","medicina","consulta"]},{id:"r-emergencia",name:"Línea de la Vida (24/7)",type:"emergencia",description:"Servicio de orientación emocional gratuito y confidencial, disponible las 24 horas.",audience:"Cualquier persona",modality:"Telefónica",location:"Nacional",schedule:"24 horas, todos los días",contact:"800 290 0024",tags:["emergencia","crisis","apoyo inmediato"]},{id:"r-sustenta",name:"Bienestar verde — caminatas y jardines",type:"sustentabilidad",description:"Actividades en espacios verdes de Ciudad Universitaria: caminatas, jardines polinizadores, talleres de plantas medicinales.",audience:"Comunidad UNAM",modality:"Presencial",location:"Ciudad Universitaria",schedule:"Sábados 10:00",contact:"sustentabilidad@unam.mx",tags:["sustentabilidad","naturaleza","autocuidado"]}],D=[{dimension:"estado_emocional",level:"bajo",title:"Sigue cultivando tus rutinas de bienestar",description:"Tus respuestas sugieren un buen equilibrio emocional. Mantener pequeñas pausas, gratitud diaria o momentos de movimiento te ayudará a sostenerlo."},{dimension:"estado_emocional",level:"moderado",title:"Espacio para reconocer tus emociones",description:"Considera dedicar 10 minutos al día a registrar lo que sientes. Conversar con alguien de confianza puede aportar perspectiva."},{dimension:"estado_emocional",level:"prioritario",title:"Acércate a un servicio universitario de orientación",description:"Sentir tristeza o nervios sostenidos amerita acompañamiento. Te recomendamos contactar los servicios de orientación psicológica de tu plantel."},{dimension:"estres_academico",level:"bajo",title:"Tu carga académica parece manejable",description:"Conserva tus rutinas de organización. Una agenda y bloques de estudio cortos pueden sostener este ritmo."},{dimension:"estres_academico",level:"moderado",title:"Pequeños ajustes para liberar presión",description:"Prioriza tareas con la técnica de los 3 más importantes del día y agrega pausas activas de 5 minutos cada hora de estudio."},{dimension:"estres_academico",level:"prioritario",title:"Considera apoyo académico y orientación",description:"Sentirte rebasado(a) puede afectar tu desempeño y tu salud. Las tutorías académicas y la orientación universitaria pueden ser un buen primer paso."},{dimension:"sueno_descanso",level:"bajo",title:"Tu descanso es un recurso valioso",description:"Continúa cuidando tus horarios de sueño y exposición a pantallas. Tu energía agradecerá la consistencia."},{dimension:"sueno_descanso",level:"moderado",title:"Refuerza tu higiene del sueño",description:"Apaga pantallas 30 minutos antes de dormir, mantén tu habitación fresca y evita cafeína después del mediodía."},{dimension:"sueno_descanso",level:"prioritario",title:"El descanso necesita atención",description:"Dormir mal de forma sostenida impacta tu ánimo y concentración. Considera consultar con servicios médicos universitarios para descartar causas atendibles."},{dimension:"apoyo_social",level:"bajo",title:"Tu red de apoyo te acompaña",description:"Mantener vínculos cercanos es protector. Procura escuchar a quienes te rodean tanto como ellos te escuchan a ti."},{dimension:"apoyo_social",level:"moderado",title:"Reconecta con personas de confianza",description:"Una llamada o un café con alguien cercano puede reforzar tu bienestar. Las actividades comunitarias universitarias también ayudan."},{dimension:"apoyo_social",level:"prioritario",title:"Buscar compañía es un acto de cuidado",description:"Sentirte aislado(a) merece atención. Considera unirte a actividades culturales o deportivas universitarias y, si lo prefieres, a grupos de orientación."},{dimension:"motivacion_pertenencia",level:"bajo",title:"Tu motivación es un buen aliado",description:"Conserva los proyectos y actividades que te dan propósito. Compartir lo que disfrutas con otros lo amplifica."},{dimension:"motivacion_pertenencia",level:"moderado",title:"Reactiva pequeños propósitos",description:"Establece una meta sencilla esta semana: una clase opcional, una actividad cultural o una salida nueva por tu campus."},{dimension:"motivacion_pertenencia",level:"prioritario",title:"Espacios universitarios para reencontrarte",description:"Talleres, deporte, voluntariado y actividades culturales pueden reabrir el sentido de pertenencia. Acércate a las actividades comunitarias de tu facultad."}];function Fe(a){return D.filter(s=>{var i;return((i=a[s.dimension])==null?void 0:i.level)===s.level})}async function Be(){if(!k)return G;const{data:a,error:s}=await _.from("questions").select("id, dimension, question_text, is_reverse_scored, sort_order").eq("active",!0).order("sort_order");return s||!a||a.length===0?(s&&console.warn("[supabase] questions →",s.message),G):a}async function Ea(){if(!k)return X;const{data:a,error:s}=await _.from("resources").select("*").eq("active",!0).order("name");return s||!a||a.length===0?(s&&console.warn("[supabase] resources →",s.message),X):a}async function Ve(){if(!k)return D;const{data:a,error:s}=await _.from("recommendations").select("dimension, level, title, description").eq("active",!0);return s||!a||a.length===0?(s&&console.warn("[supabase] recommendations →",s.message),D):a}async function He(a){if(!k)return{saved:!1,id:null};const s=window.crypto&&crypto.randomUUID?crypto.randomUUID():"sin-"+Date.now()+"-"+Math.random().toString(36).slice(2,10),{error:i}=await _.from("assessment_sessions").insert({id:s,...a});return i?(console.warn("[supabase] saveSession →",i.message),{saved:!1,error:i.message,id:s}):{saved:!0,id:s}}async function We(a,s){if(!k||!a)return{saved:!1};const i=s.map(r=>({session_id:a,...r})),{error:n}=await _.from("assessment_answers").insert(i);return n?(console.warn("[supabase] saveAnswers →",n.message),{saved:!1,error:n.message}):{saved:!0}}async function Ca(){if(!k)return{ok:!1,reason:"not_configured"};try{const{error:a}=await _.from("questions").select("id",{head:!0,count:"exact"});return a?{ok:!1,reason:a.message}:{ok:!0}}catch(a){return{ok:!1,reason:a.message}}}const A=4;function Ke(a,s){const i=Math.max(0,Math.min(A,Number(s)));return a.is_reverse_scored?(A-i)/A:i/A}function O(a){return a<=K.bajo.max?"bajo":a<=K.moderado.max?"moderado":"prioritario"}function Ye(a,s){var p;const i=Object.create(null);for(const d of Q)i[d.id]={sum:0,n:0};let n=0,r=0;const c={};for(const d of a){const o=s[d.id];if(o==null)continue;const x=Ke(d,o);c[d.id]=x,i[d.dimension]||(i[d.dimension]={sum:0,n:0}),i[d.dimension].sum+=x,i[d.dimension].n+=1,n+=x,r+=1}const l={};for(const[d,o]of Object.entries(i)){const x=o.n?Math.round(o.sum/o.n*100):0;l[d]={score:x,level:O(x),level_label:P[O(x)],label:((p=Q.find(b=>b.id===d))==null?void 0:p.label)||d}}const m=r?Math.round(n/r*100):0,h=O(m),g=Object.entries(l).filter(([,d])=>d.level!=="bajo").sort((d,o)=>o[1].score-d[1].score).map(([d,o])=>({id:d,label:o.label,score:o.score,level:o.level}));return{total_score:m,general_level:h,general_level_label:P[h],dimensions:l,top_attention_areas:g,normalized_by_question:c}}const Je="ABCDEFGHJKLMNPQRSTUVWXYZ",Qe="23456789";function Z(a,s){let i="";const n=new Uint32Array(s);crypto.getRandomValues(n);for(let r=0;r<s;r++)i+=a[n[r]%a.length];return i}function oe(){return`SIN-${Z(Je,3)}-${Z(Qe,4)}`}async function Ge(a){if(!k)return null;try{const{data:s,error:i}=await _.functions.invoke(ne,{body:a});return i?(console.warn("[gemini] error →",i.message),null):!s||typeof s!="object"||s.error?null:s}catch(s){return console.warn("[gemini] excepción →",s.message),null}}async function Aa(){if(!k)return{ok:!1,reason:"not_configured"};try{const{error:a}=await _.functions.invoke(ne,{body:{ping:!0}});return{ok:!a,reason:a==null?void 0:a.message}}catch(a){return{ok:!1,reason:a.message}}}async function Xe({questions:a,answers:s,anonymousCode:i}){const n=Ye(a,s),r=i||oe(),c={anonymous_code:r,test_version:W,total_score:n.total_score,general_level:n.general_level,dimension_scores:n.dimensions,top_attention_areas:n.top_attention_areas},{id:l}=await He(c);if(l){const g=Object.entries(s).map(([p,d])=>({question_id:p,answer_value:Number(d),normalized_value:n.normalized_by_question[p]??null}));await We(l,g)}const m=await Ve(),h=await Ge({session_id:l,test_version:W,general_level:n.general_level,dimensions:n.dimensions,top_attention_areas:n.top_attention_areas,recommendation_catalog:m.slice(0,30)});return{session_id:l||null,anonymous_code:r,created_at:new Date().toISOString(),...n,ai:h||null,base_recommendations:m}}function Ze(){const a=U(),[s,i]=t.useState([]),[n,r]=t.useState({}),[c,l]=t.useState(0),[m,h]=t.useState(!0),[g,p]=t.useState(!1),[d,o]=t.useState(null);t.useEffect(()=>{if(!sessionStorage.getItem(S.CONSENT)){a("/consentimiento",{replace:!0});return}let E=!0;return Be().then(le=>{if(E){i(le);try{const F=sessionStorage.getItem(S.ANSWERS);F&&r(JSON.parse(F))}catch{}h(!1)}}),()=>{E=!1}},[]),t.useEffect(()=>{if(!m)try{sessionStorage.setItem(S.ANSWERS,JSON.stringify(n))}catch{}},[n,m]);const x=s.length,b=s[c],w=t.useMemo(()=>s.every(y=>n[y.id]!==void 0),[s,n]);function N(y){b&&r(E=>({...E,[b.id]:y}))}function C(){c<x-1&&l(y=>y+1)}function T(){c>0&&l(y=>y-1)}async function ce(){if(!w){const y=s.findIndex(E=>n[E.id]===void 0);y!==-1&&l(y);return}p(!0),o(null);try{const y=oe(),E=await Xe({questions:s,answers:n,anonymousCode:y});sessionStorage.setItem(S.RESULT,JSON.stringify(E)),sessionStorage.setItem(S.ANON_CODE,y),sessionStorage.removeItem(S.ANSWERS),a("/resultado")}catch(y){console.error(y),o("No pudimos generar tu resultado en este momento. Intenta nuevamente en unos segundos.")}finally{p(!1)}}return m?e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",style:{maxWidth:720,textAlign:"center"},children:[e.jsx("div",{className:"spinner",style:{margin:"40px auto 18px"}}),e.jsx("p",{className:"lede",children:"Preparando preguntas…"})]})}):e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:820},children:[e.jsx(De,{current:c+1,total:x}),b&&e.jsx($e,{index:c,question:b,value:n[b.id],onChange:N}),e.jsxs("div",{className:"assess-actions mt-3",children:[e.jsx("button",{className:"btn btn-ghost",onClick:T,disabled:c===0,children:"← Anterior"}),c<x-1?e.jsx("button",{className:"btn btn-primary",onClick:C,disabled:n[b==null?void 0:b.id]===void 0,children:"Siguiente →"}):e.jsx("button",{className:"btn btn-coral btn-lg",onClick:ce,disabled:g||!w,children:g?"Generando orientación…":"Finalizar y ver resultado"})]}),!w&&c===x-1&&e.jsx("p",{className:"note text-center mt-3",children:'Te faltan algunas preguntas por contestar. Usa "Anterior" para revisarlas.'}),d&&e.jsx("div",{className:"mt-4",children:e.jsx(I,{variant:"warm",children:d})}),e.jsx("p",{className:"text-center mt-4",children:e.jsx(f,{to:"/",className:"note",children:"Salir y descartar respuestas"})})]}),e.jsx("style",{children:`
        .assess-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
      `})]})}function ea({result:a}){if(!a)return null;const{total_score:s,general_level_label:i,anonymous_code:n,ai:r}=a;return e.jsx("section",{className:"result-card",children:e.jsxs("div",{className:"result-hero",children:[e.jsxs("div",{className:"result-score",children:[e.jsx("span",{className:"result-score-num",children:s}),e.jsx("span",{className:"result-score-label",children:"/ 100"})]}),e.jsxs("div",{className:"result-meta",children:[e.jsx("span",{className:"tag",children:"Tu orientación"}),e.jsx("h1",{className:"mt-2",children:i}),e.jsx("p",{className:"result-summary",children:(r==null?void 0:r.friendly_summary)||"Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas. Recuerda que esto es una orientación, no un diagnóstico."}),n&&e.jsxs("p",{className:"anon-code",children:["Tu código anónimo: ",e.jsx("strong",{children:n}),e.jsx("small",{children:"Puedes copiarlo si quieres consultar tu resultado nuevamente más tarde."})]})]})]})})}function aa({dimensions:a}){const s=Object.entries(a);return e.jsx("div",{className:"dim-chart",role:"list",children:s.map(([i,n])=>e.jsxs("div",{className:"dim-row",role:"listitem",children:[e.jsx("div",{className:"dim-label",children:n.label}),e.jsx("div",{className:"dim-track","aria-label":`Puntaje ${n.score} de 100`,children:e.jsx("span",{className:`dim-fill lvl-bg-${n.level}`,style:{width:`${n.score}%`}})}),e.jsxs("div",{className:`dim-value lvl-${n.level}`,children:[n.score,e.jsx("small",{children:P[n.level]})]})]},i))})}function sa({sessionId:a}){const[s,i]=t.useState(0),[n,r]=t.useState(0),[c,l]=t.useState(""),[m,h]=t.useState(!1),[g,p]=t.useState(!1);async function d(){if(s!==0){if(p(!0),k)try{await _.from("assessment_feedback").insert({session_id:a||null,rating:s,comment:c.trim()||null})}catch(o){console.warn(o)}h(!0),p(!1)}}return m?e.jsx("div",{className:"feedback-thanks",children:e.jsxs("p",{children:["✨ ",e.jsx("strong",{children:"Gracias por tu retroalimentación."})," Nos ayuda a mejorar el programa."]})}):e.jsxs("div",{className:"feedback-box",children:[e.jsx("h3",{children:"¿Cómo te pareció esta orientación?"}),e.jsx("div",{className:"stars",role:"radiogroup","aria-label":"Calificación",children:[1,2,3,4,5].map(o=>e.jsx("button",{type:"button",role:"radio","aria-checked":s===o,className:`star ${(n||s)>=o?"active":""}`,onMouseEnter:()=>r(o),onMouseLeave:()=>r(0),onClick:()=>i(o),children:"★"},o))}),e.jsx("textarea",{placeholder:"Comentario opcional…",value:c,onChange:o=>l(o.target.value),rows:2}),e.jsx("button",{className:"btn btn-primary btn-sm",disabled:s===0||g,onClick:d,children:g?"Enviando…":"Enviar"}),e.jsx("style",{children:`
        .feedback-box {
          background: var(--c-marfil);
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          margin-top: 16px;
          text-align: center;
        }
        .feedback-box h3 { margin: 0 0 10px; color: var(--c-azul-800); font-size: 1.05rem; }
        .stars { display: inline-flex; gap: 4px; margin-bottom: 10px; }
        .star {
          background: transparent;
          border: 0;
          cursor: pointer;
          font-size: 2rem;
          color: var(--c-borde);
          transition: color var(--t), transform var(--t);
        }
        .star:hover { transform: scale(1.15); }
        .star.active { color: var(--c-oro-600); }
        .feedback-box textarea {
          width: 100%;
          margin: 8px 0;
          padding: 8px 12px;
          border: 1px solid var(--c-borde);
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.92rem;
          resize: vertical;
        }
        .feedback-thanks {
          background: var(--c-salvia-100);
          color: #2F6048;
          padding: 14px 18px;
          border-radius: var(--r-md);
          margin-top: 16px;
          text-align: center;
        }
      `})]})}function ia(){var h,g,p,d;const a=U(),[s,i]=t.useState(null);if(t.useEffect(()=>{try{const o=sessionStorage.getItem(S.RESULT);if(!o)return a("/",{replace:!0});i(JSON.parse(o))}catch{a("/",{replace:!0})}},[a]),!s)return null;const n=((h=s.ai)==null?void 0:h.suggested_actions)||[],r=((g=s.ai)==null?void 0:g.recommended_resources)||[],c=(p=s.ai)==null?void 0:p.safety_note,l=s.base_recommendations?Fe(s.dimensions).map(o=>({title:o.title,description:o.description})):[];function m(){var x,b,w;const o=["Sintonía UNAM — Tu orientación",`Código anónimo: ${s.anonymous_code}`,`Nivel general: ${s.general_level_label} (${s.total_score}/100)`,"","Dimensiones:",...Object.entries(s.dimensions).map(([,N])=>`  • ${N.label}: ${N.score} (${N.level_label})`),"",((x=s.ai)==null?void 0:x.friendly_summary)||"",((b=s.ai)==null?void 0:b.safety_note)||"Esta orientación es informativa y no sustituye atención profesional."].join(`
`);(w=navigator.clipboard)==null||w.writeText(o).catch(()=>{})}return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:1e3},children:[e.jsx(ea,{result:s}),s.general_level==="prioritario"&&e.jsxs("div",{className:"crisis-banner",children:[e.jsx("strong",{children:"📞 Tus respuestas sugieren acercarte a apoyo profesional."}),e.jsxs("p",{children:["Hay servicios universitarios y la ",e.jsx("strong",{children:"Línea de la Vida 800 290 0024"})," disponibles 24/7."]}),e.jsx(f,{to:"/apoyo",className:"btn btn-coral btn-sm",children:"Ver opciones de apoyo →"})]}),e.jsxs("div",{className:"route-cta mt-3",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"✨ Crea tu ruta de bienestar"}),e.jsx("small",{children:"Pum-AI te puede generar un plan diario de 7 o 14 días personalizado a tu resultado."})]}),e.jsx(f,{to:"/ruta",className:"btn btn-gold",children:"Comenzar mi ruta →"})]}),e.jsx(I,{children:c||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado, pero no constituyen un diagnóstico clínico. Si lo necesitas, acércate a un servicio de orientación universitario."]})}),e.jsxs("div",{className:"results-grid mt-4",children:[e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag azul",children:"Tus dimensiones"}),e.jsx("h2",{className:"mt-2",children:"Cómo se ve tu bienestar por área"}),e.jsx("p",{className:"lede",children:"Cada barra representa el nivel de atención que sugieren tus respuestas en esa área. Mayor puntaje = mayor invitación al autocuidado."}),e.jsx(aa,{dimensions:s.dimensions})]}),e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag coral",children:"Acciones sugeridas"}),e.jsx("h2",{className:"mt-2",children:"Pasos pequeños y útiles"}),n.length>0?e.jsx("ul",{className:"rec-list",children:n.map((o,x)=>e.jsxs("li",{children:["✦ ",o]},x))}):e.jsxs("ul",{className:"rec-list",children:[l.length===0&&e.jsx("li",{children:"Sigue cultivando tus rutinas de bienestar. Tus respuestas no muestran áreas urgentes hoy."}),l.map((o,x)=>e.jsxs("li",{children:[e.jsxs("strong",{children:[o.title,"."]})," ",o.description]},x))]})]})]}),e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag sage",children:"Recursos sugeridos"}),e.jsx("h2",{className:"mt-2",children:"Recursos universitarios para ti"}),r.length>0?e.jsx("ul",{className:"rec-list",children:r.map((o,x)=>e.jsxs("li",{children:["📌 ",o]},x))}):e.jsxs("p",{children:["Visita la sección de ",e.jsx(f,{to:"/recursos",children:"Recursos de apoyo"})," para ver el catálogo completo."]})]}),((d=s.top_attention_areas)==null?void 0:d.length)>0&&e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag",children:"Áreas con mayor atención sugerida"}),e.jsx("h2",{className:"mt-2",children:"Dónde poner foco"}),e.jsx("ul",{className:"rec-list",children:s.top_attention_areas.map(o=>e.jsxs("li",{children:[e.jsx("strong",{children:o.label})," — Puntaje: ",o.score,", nivel: ",o.level==="prioritario"?"prioritario":"moderado","."]},o.id))})]}),e.jsx(sa,{sessionId:s.session_id}),e.jsxs("div",{className:"results-actions mt-4",children:[e.jsx("button",{className:"btn btn-gold",onClick:m,children:"📋 Copiar resultado"}),e.jsx(f,{to:"/recursos",className:"btn btn-secondary btn-primary",children:"Ver recursos universitarios"}),e.jsx(f,{to:"/evaluacion",className:"btn btn-ghost",children:"Volver a evaluar"}),e.jsx(f,{to:"/",className:"btn btn-ghost",children:"Ir al inicio"})]})]}),e.jsx("style",{children:`
        .crisis-banner {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border: 2px solid var(--c-coral-500);
          border-radius: var(--r-md);
          padding: 18px 22px;
          margin-top: 16px;
          display: grid; grid-template-columns: 1fr auto;
          gap: 14px; align-items: center;
        }
        .crisis-banner strong { color: #93362A; display: block; font-size: 1.05rem; }
        .crisis-banner p { color: #5C2018; margin: 4px 0 0; font-size: 0.92rem; }
        .route-cta {
          background: linear-gradient(135deg, var(--c-oro-100), var(--c-salvia-100));
          border: 1px solid var(--c-oro-600);
          border-radius: var(--r-md);
          padding: 16px 20px;
          display: grid; grid-template-columns: 1fr auto;
          gap: 14px; align-items: center;
        }
        .route-cta strong { color: var(--c-azul-800); }
        .route-cta small { display: block; color: var(--c-texto-soft); font-size: 0.88rem; margin-top: 2px; }
        @media (max-width: 640px) {
          .crisis-banner, .route-cta { grid-template-columns: 1fr; }
        }
        .results-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }
        .rec-list {
          list-style: none;
          padding: 0;
          margin: 12px 0 0;
          display: grid;
          gap: 12px;
        }
        .rec-list li {
          padding: 12px 14px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-radius: 12px;
        }
        .results-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 880px) {
          .results-grid { grid-template-columns: 1fr; }
        }
      `})]})}const na=t.lazy(()=>j(()=>import("./Resources-DrTdyt5O.js"),__vite__mapDeps([0,1,2,3]))),ra=t.lazy(()=>j(()=>import("./Privacy-BVyqSsMa.js"),__vite__mapDeps([4,1,2]))),ta=t.lazy(()=>j(()=>import("./MyHistory-DOK16Gw1.js"),__vite__mapDeps([5,1,2]))),oa=t.lazy(()=>j(()=>import("./CheckIn-Btd3aFfd.js"),__vite__mapDeps([6,1,2]))),ca=t.lazy(()=>j(()=>import("./Journal-KLAVxRgz.js"),__vite__mapDeps([7,1,2]))),la=t.lazy(()=>j(()=>import("./Support-BfJcJ5jB.js"),__vite__mapDeps([8,1,2]))),da=t.lazy(()=>j(()=>import("./WellnessRoute-DiAlfhN9.js"),__vite__mapDeps([9,1,2]))),ua=t.lazy(()=>j(()=>import("./Companion-1aQ80TZj.js"),__vite__mapDeps([10,1,2]))),ma=t.lazy(()=>j(()=>import("./Library-D4jlegA-.js"),__vite__mapDeps([11,1,2]))),pa=t.lazy(()=>j(()=>import("./Emotions-Bn0kvGyo.js"),__vite__mapDeps([12,1,2]))),xa=t.lazy(()=>j(()=>import("./MapPage-BDuKFLnO.js"),__vite__mapDeps([13,1,2]))),ha=t.lazy(()=>j(()=>import("./Trees-Ok1_S-oW.js"),__vite__mapDeps([14,1,2]))),ga=t.lazy(()=>j(()=>import("./Buddy-BrRmgJrB.js"),__vite__mapDeps([15,1,2]))),va=t.lazy(()=>j(()=>import("./Adventure-BGFJw5au.js"),__vite__mapDeps([16,1,2]))),fa=t.lazy(()=>j(()=>import("./Calendar-albFzb6Q.js"),__vite__mapDeps([17,1,2]))),ba=t.lazy(()=>j(()=>import("./Admin-DH0_ebQw.js"),__vite__mapDeps([18,1,19,2]))),ja=t.lazy(()=>j(()=>import("./AdminLogin-CVh-arKB.js"),__vite__mapDeps([20,1,19,2])));function ya(){return e.jsx("div",{style:{display:"grid",placeItems:"center",minHeight:"40vh"},children:e.jsx("div",{className:"spinner"})})}function _a(){const a=z(),s=a.pathname.startsWith("/admin"),i=!s&&a.pathname!=="/evaluacion";return e.jsxs(e.Fragment,{children:[i&&e.jsx(ze,{}),!s&&e.jsx(we,{}),e.jsx("main",{children:e.jsx(t.Suspense,{fallback:e.jsx(ya,{}),children:e.jsxs(de,{children:[e.jsx(v,{path:"/",element:e.jsx(Pe,{})}),e.jsx(v,{path:"/consentimiento",element:e.jsx(Me,{})}),e.jsx(v,{path:"/evaluacion",element:e.jsx(Ze,{})}),e.jsx(v,{path:"/resultado",element:e.jsx(ia,{})}),e.jsx(v,{path:"/recursos",element:e.jsx(na,{})}),e.jsx(v,{path:"/privacidad",element:e.jsx(ra,{})}),e.jsx(v,{path:"/mi-historia",element:e.jsx(ta,{})}),e.jsx(v,{path:"/check-in",element:e.jsx(oa,{})}),e.jsx(v,{path:"/diario",element:e.jsx(ca,{})}),e.jsx(v,{path:"/apoyo",element:e.jsx(la,{})}),e.jsx(v,{path:"/ruta",element:e.jsx(da,{})}),e.jsx(v,{path:"/companion",element:e.jsx(ua,{})}),e.jsx(v,{path:"/biblioteca",element:e.jsx(ma,{})}),e.jsx(v,{path:"/emociones",element:e.jsx(pa,{})}),e.jsx(v,{path:"/mapa",element:e.jsx(xa,{})}),e.jsx(v,{path:"/arboles",element:e.jsx(ha,{})}),e.jsx(v,{path:"/buddy",element:e.jsx(ga,{})}),e.jsx(v,{path:"/aventura",element:e.jsx(va,{})}),e.jsx(v,{path:"/calendario",element:e.jsx(fa,{})}),e.jsx(v,{path:"/docentes",element:e.jsx(B,{to:"/admin/login",replace:!0})}),e.jsx(v,{path:"/admin/login",element:e.jsx(ja,{})}),e.jsx(v,{path:"/admin/*",element:e.jsx(ba,{})}),e.jsx(v,{path:"*",element:e.jsx(B,{to:"/",replace:!0})})]})})}),!s&&e.jsx(Se,{}),!s&&e.jsx(ke,{}),!s&&e.jsx(Ae,{})]})}(function(){const s=new URLSearchParams(window.location.search),i=s.get("p");if(i!==null){const n=s.get("q"),r=window.location.pathname.replace(/\/$/,"")+i+(n?"?"+n.replace(/~and~/g,"&"):"")+window.location.hash;window.history.replaceState(null,"",r)}})();const Na="/sintonia-unam/".replace(/\/$/,"");ie(document.getElementById("root")).render(e.jsx(ue.StrictMode,{children:e.jsx(me,{basename:Na,children:e.jsx(_a,{})})}));export{Q as D,ka as R,I as S,_e as a,S as b,Ne as c,Ca as d,Aa as e,Ea as f,Y as g,k as i,e as j,_ as s,$ as u};
