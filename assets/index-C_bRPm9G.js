const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Resources-oSJHk6Du.js","assets/vendor-react-BTW_75ak.js","assets/vendor-supabase-DS4euJVY.js","assets/Resources-Da2drgDA.css","assets/Privacy-CyvKjX0S.js","assets/MyHistory-Bk6-Bpsh.js","assets/CheckIn-CdScaWrq.js","assets/Journal-Bpzpgv32.js","assets/Support-DrXaZ4no.js","assets/WellnessRoute-Dx08CLm6.js","assets/Companion-DcC3nmTR.js","assets/Library-C0UtBdG4.js","assets/Emotions-CabyVIPv.js","assets/MapPage-Ct_Jk13S.js","assets/Trees-DhO6TavG.js","assets/Buddy-DcSe6gW2.js","assets/Adventure-DnlfK-pn.js","assets/Calendar-oLHSTK_t.js","assets/Admin-DDEj9rTU.js","assets/authService-SE2uMeoX.js","assets/AdminLogin-K5F7zKBv.js"])))=>i.map(i=>d[i]);
import{r as t,a as ee,u as z,L as f,N as u,b as U,R as de,c as v,d as V,e as ue,B as me}from"./vendor-react-BTW_75ak.js";import{c as pe}from"./vendor-supabase-DS4euJVY.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();var se={exports:{}},R={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xe=t,he=Symbol.for("react.element"),ge=Symbol.for("react.fragment"),ve=Object.prototype.hasOwnProperty,fe=xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,je={key:!0,ref:!0,__self:!0,__source:!0};function ae(s,a,n){var i,r={},l=null,c=null;n!==void 0&&(l=""+n),a.key!==void 0&&(l=""+a.key),a.ref!==void 0&&(c=a.ref);for(i in a)ve.call(a,i)&&!je.hasOwnProperty(i)&&(r[i]=a[i]);if(s&&s.defaultProps)for(i in a=s.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:he,type:s,key:l,ref:c,props:r,_owner:fe.current}}R.Fragment=ge;R.jsx=ae;R.jsxs=ae;se.exports=R;var e=se.exports,ne,B=ee;ne=B.createRoot,B.hydrateRoot;const be="modulepreload",ye=function(s){return"/sintonia-unam/"+s},H={},b=function(a,n,i){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),m=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));r=Promise.allSettled(n.map(h=>{if(h=ye(h),h in H)return;H[h]=!0;const g=h.endsWith(".css"),p=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${p}`))return;const d=document.createElement("link");if(d.rel=g?"stylesheet":be,g||(d.as="script"),d.crossOrigin="",d.href=h,m&&d.setAttribute("nonce",m),document.head.appendChild(d),g)return new Promise((o,x)=>{d.addEventListener("load",o),d.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${h}`)))})}))}function l(c){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=c,window.dispatchEvent(m),!m.defaultPrevented)throw c}return r.then(c=>{for(const m of c||[])m.status==="rejected"&&l(m.reason);return a().catch(l)})},W="1.0.0",K={bajo:{max:33},moderado:{max:66}},P={bajo:"Bajo nivel de atención",moderado:"Atención moderada",prioritario:"Atención prioritaria"},w={ANSWERS:"sintonia.answers",CONSENT:"sintonia.consent",RESULT:"sintonia.result",ANON_CODE:"sintonia.anon_code"},ie="generate-orientation",q="sintonia.student";function J(){try{const s=sessionStorage.getItem(q);if(s)return JSON.parse(s);const a=sessionStorage.getItem(w.ANON_CODE);return a?{code:a,password:null}:null}catch{return null}}function _e(s){s?sessionStorage.setItem(q,JSON.stringify(s)):sessionStorage.removeItem(q),window.dispatchEvent(new Event("sintonia:student"))}function Ne(){sessionStorage.removeItem(q),sessionStorage.removeItem(w.ANON_CODE),window.dispatchEvent(new Event("sintonia:student"))}function F(){const[s,a]=t.useState(J),n=t.useCallback(()=>a(J()),[]);return t.useEffect(()=>{const i=()=>n();return window.addEventListener("sintonia:student",i),window.addEventListener("storage",i),()=>{window.removeEventListener("sintonia:student",i),window.removeEventListener("storage",i)}},[n]),{student:s,setStudent:i=>{_e(i),n()},clearStudent:()=>{Ne(),n()}}}function Se(){const{student:s,clearStudent:a}=F(),n=!!(s!=null&&s.code),i=z(),[r,l]=t.useState(null),[c,m]=t.useState(!1),h=t.useRef(null);t.useEffect(()=>{l(null),m(!1)},[i.pathname]),t.useEffect(()=>{function x(j){var S;(S=h.current)!=null&&S.contains(j.target)||l(null)}return document.addEventListener("click",x),()=>document.removeEventListener("click",x)},[]),t.useEffect(()=>(document.body.style.overflow=c?"hidden":"",document.body.classList.toggle("drawer-open",c),()=>{document.body.style.overflow="",document.body.classList.remove("drawer-open")}),[c]);function g(x){l(j=>j===x?null:x)}function p(){m(!1)}function d(){m(!1),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(a(),window.location.assign("/sintonia-unam/"))}const o=n?s.code.split("-").map(x=>x[0]).join("").slice(0,3):"";return e.jsxs("header",{className:"site-header",children:[e.jsxs("div",{className:"container topbar",children:[e.jsxs(f,{to:"/",className:"brand","aria-label":"Sintonía UNAM, ir al inicio",children:[e.jsx("img",{src:"/sintonia-unam/Sintonia-icon192.png",srcSet:"/sintonia-unam/Sintonia-icon192.png 1x, /sintonia-unam/Sintonia-icon512.png 2x",alt:"Sintonía UNAM",className:"brand-logo",width:"56",height:"56"}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("strong",{children:"Sintonía UNAM"}),e.jsx("span",{children:"Bienestar emocional universitario"})]})]}),e.jsx("button",{type:"button",className:"mobile-toggle",onClick:()=>m(!0),"aria-label":"Abrir menú",children:"☰"}),e.jsxs("nav",{className:"nav","aria-label":"Navegación principal",ref:h,children:[e.jsx(u,{to:"/",end:!0,className:"nav-link",children:"Inicio"}),e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${r==="discover"?"active":""}`,onClick:()=>g("discover"),"aria-haspopup":"true","aria-expanded":r==="discover",children:"Conocer ▾"}),r==="discover"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(u,{to:"/recursos",children:"📌 Recursos"}),e.jsx(u,{to:"/calendario",children:"📅 Calendario"}),e.jsx(u,{to:"/mapa",children:"🗺 Mapa"}),e.jsx(u,{to:"/emociones",children:"📖 Emociones"})]})]}),e.jsx(u,{to:"/apoyo",className:"nav-link",children:"🆘 Apoyo"}),n&&e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${r==="mine"?"active":""}`,onClick:()=>g("mine"),"aria-haspopup":"true","aria-expanded":r==="mine",children:"Mi rincón ▾"}),r==="mine"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(u,{to:"/mi-historia",children:"📊 Mi historia"}),e.jsx(u,{to:"/check-in",children:"📝 Check-in"}),e.jsx(u,{to:"/diario",children:"📔 Diario"}),e.jsx(u,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(u,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(u,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(u,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(u,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(u,{to:"/arboles",children:"🌳 Mis árboles"})]})]}),!n&&e.jsx(u,{to:"/mi-historia",className:"nav-link",children:"Mi historia"}),e.jsx(u,{to:"/privacidad",className:"nav-link nav-tiny",children:"Privacidad"}),n?e.jsxs("div",{className:"dropdown",children:[e.jsxs("button",{type:"button",className:`user-chip ${r==="user"?"active":""}`,onClick:()=>g("user"),"aria-haspopup":"true","aria-expanded":r==="user",title:"Abrir menú",children:[e.jsx("span",{className:"initials",children:o}),e.jsx("small",{children:s.code}),e.jsx("span",{className:"chev","aria-hidden":"true",children:"▾"})]}),r==="user"&&e.jsxs("div",{className:"drop-panel user-drop",children:[e.jsx(u,{to:"/mi-historia",end:!0,children:"📊 Mi panel"}),e.jsx(u,{to:"/check-in",children:"📝 Check-in semanal"}),e.jsx(u,{to:"/diario",children:"📔 Diario emocional"}),e.jsx(u,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(u,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(u,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(u,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(u,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(u,{to:"/arboles",children:"🌳 Mis árboles"}),e.jsx("hr",{style:{margin:"6px 0",border:0,borderTop:"1px solid var(--c-borde-soft)"}}),e.jsx("button",{type:"button",className:"logout-link",onClick:()=>{l(null),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(a(),window.location.assign("/sintonia-unam/"))},children:"↩ Cerrar sesión"})]})]}):e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-sm nav-cta",children:"Iniciar orientación"})]})]}),c&&ee.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mobile-overlay",onClick:p}),e.jsxs("aside",{className:"mobile-drawer",role:"dialog","aria-label":"Menú principal",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"Menú"}),e.jsx("button",{className:"close-x",onClick:p,"aria-label":"Cerrar",children:"✕"})]}),n&&e.jsxs("div",{className:"m-user",children:[e.jsx("span",{className:"m-initials",children:o}),e.jsxs("div",{children:[e.jsx("strong",{children:"Tu código"}),e.jsx("code",{children:s.code})]})]}),e.jsxs("nav",{className:"m-nav",children:[e.jsx(u,{to:"/",end:!0,onClick:p,children:"🏠 Inicio"}),e.jsx("h4",{children:"Conocer"}),e.jsx(u,{to:"/recursos",onClick:p,children:"📌 Recursos"}),e.jsx(u,{to:"/calendario",onClick:p,children:"📅 Calendario"}),e.jsx(u,{to:"/mapa",onClick:p,children:"🗺 Mapa"}),e.jsx(u,{to:"/emociones",onClick:p,children:"📖 Emociones"}),e.jsx("h4",{children:"Apoyo"}),e.jsx(u,{to:"/apoyo",onClick:p,children:"🆘 Apoyo y canalización"}),n&&e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:"Mi rincón"}),e.jsx(u,{to:"/mi-historia",onClick:p,children:"📊 Mi panel"}),e.jsx(u,{to:"/check-in",onClick:p,children:"📝 Check-in semanal"}),e.jsx(u,{to:"/diario",onClick:p,children:"📔 Diario"}),e.jsx(u,{to:"/ruta",onClick:p,children:"🛤 Mi ruta"}),e.jsx(u,{to:"/companion",onClick:p,children:"🤝 Pum-AI"}),e.jsx(u,{to:"/biblioteca",onClick:p,children:"📚 Biblioteca"}),e.jsx(u,{to:"/aventura",onClick:p,children:"🗺 Aventura"}),e.jsx(u,{to:"/buddy",onClick:p,children:"🫂 Buddy"}),e.jsx(u,{to:"/arboles",onClick:p,children:"🌳 Mis árboles"})]}),e.jsx("h4",{children:"Información"}),e.jsx(u,{to:"/privacidad",onClick:p,children:"🔒 Privacidad"}),e.jsx("div",{className:"m-cta",children:n?e.jsx("button",{type:"button",className:"btn btn-coral",onClick:d,children:"↩ Cerrar sesión"}):e.jsx(f,{to:"/consentimiento",onClick:p,className:"btn btn-primary btn-lg",children:"Iniciar orientación"})})]})]})]}),document.body)]})}function we(){const s=new Date().getFullYear();return e.jsx("footer",{className:"site-footer",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-card",children:[e.jsxs("div",{children:[e.jsx("h4",{children:"Sintonía UNAM"}),e.jsx("p",{children:"Plataforma universitaria de orientación para el bienestar emocional. No constituye diagnóstico ni sustituye atención profesional."})]}),e.jsxs("div",{className:"footer-links",children:[e.jsx(f,{to:"/privacidad",children:"Aviso de privacidad"}),e.jsx(f,{to:"/recursos",children:"Recursos de apoyo"}),e.jsx(f,{to:"/admin",children:"Acceso interno"})]})]}),e.jsxs("p",{className:"footer-credits",children:["© Universidad Nacional Autónoma de México, ",s,"."]})]})})}const O="sintonia.crisis_visible";function Ee(){const s=z(),[a,n]=t.useState(!1),[i,r]=t.useState(!1),l=s.pathname.startsWith("/admin")||s.pathname.startsWith("/apoyo");t.useEffect(()=>{try{const m=JSON.parse(sessionStorage.getItem(w.RESULT)||"null");m&&m.general_level==="prioritario"&&localStorage.setItem(O,"1")}catch{}n(localStorage.getItem(O)==="1")},[s.pathname]);function c(){localStorage.setItem(O,"0"),n(!1),r(!1)}return!a||l?null:e.jsxs(e.Fragment,{children:[i&&e.jsxs("div",{className:"crisis-panel",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"🆘 Apoyo inmediato"}),e.jsx("button",{onClick:()=>r(!1),"aria-label":"Cerrar",children:"✕"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Línea de la Vida"})," — orientación gratuita, confidencial, 24/7."]}),e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral",children:"📞 800 290 0024"}),e.jsx(f,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver más opciones"}),e.jsx("button",{className:"dismiss",onClick:c,children:"Ocultar este botón"})]}),e.jsx("button",{className:`crisis-fab ${i?"open":""}`,onClick:()=>r(m=>!m),title:"Apoyo inmediato","aria-label":"Abrir apoyo inmediato",children:"🆘"}),e.jsx("style",{children:`
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
      `})]})}const ke="https://knblatuzbgzgnugwkxdp.supabase.co",re="sb_publishable_yBtfhxGitkJdS9jXO4CGxg_qmMkg3RF",E=!!re,_=E?pe(ke,re,{auth:{persistSession:!0,autoRefreshToken:!0,storageKey:"sintonia.auth"}}):null,Q="sintonia.webinar_dismissed_",Ce=24;function Ae(){const{student:s}=F(),a=z(),[n,i]=t.useState(null),[r,l]=t.useState(!1),[c,m]=t.useState(!1),[h,g]=t.useState(!1),d=["/admin","/evaluacion","/consentimiento"].some(N=>a.pathname.startsWith(N));t.useEffect(()=>{E&&(async()=>{const{data:N}=await _.from("view_upcoming_webinars").select("*").order("starts_at").limit(1).maybeSingle();if(N){try{const C=localStorage.getItem(Q+N.id);if(C){const T=Number(C);if(Date.now()-T<Ce*3600*1e3)return}}catch{}i(N),setTimeout(()=>l(!0),2500)}})()},[]),t.useEffect(()=>{!n||!(s!=null&&s.code)||_.from("event_rsvp").select("id").eq("event_id",n.id).eq("anonymous_code",s.code).maybeSingle().then(({data:N})=>g(!!N))},[n,s==null?void 0:s.code]);function o(){if(n!=null&&n.id)try{localStorage.setItem(Q+n.id,String(Date.now()))}catch{}l(!1)}async function x(){if(!(s!=null&&s.code)){window.location.assign("/sintonia-unam/mi-historia");return}m(!0),await _.from("event_rsvp").upsert({event_id:n.id,anonymous_code:s.code},{onConflict:"event_id,anonymous_code"}),g(!0),m(!1)}if(!n||d)return null;const S=new Date(n.starts_at).toLocaleString("es-MX",{weekday:"long",day:"2-digit",month:"long",hour:"2-digit",minute:"2-digit"});return e.jsxs(e.Fragment,{children:[!r&&e.jsxs("button",{className:"webinar-pill",onClick:()=>l(!0),"aria-label":"Abrir aviso de webinar",children:["📡 ",e.jsx("span",{children:"Webinar próximo"})]}),r&&e.jsxs("div",{className:"webinar-toast",role:"dialog","aria-label":"Próximo webinar",children:[e.jsx("button",{className:"dismiss-btn",onClick:o,"aria-label":"Cerrar",children:"✕"}),n.image_url&&e.jsx("img",{src:n.image_url,alt:"",className:"webinar-img"}),e.jsxs("div",{className:"webinar-body",children:[e.jsx("span",{className:"webinar-tag",children:"📡 Próximo webinar"}),e.jsx("h3",{children:n.title}),n.speaker&&e.jsxs("small",{children:["👤 ",n.speaker]}),e.jsxs("small",{children:["🗓 ",S]}),n.location&&e.jsxs("small",{children:["📍 ",n.location]}),n.description&&e.jsx("p",{className:"webinar-desc",children:n.description}),e.jsxs("div",{className:"webinar-actions",children:[h?e.jsx("span",{className:"rsvped-chip",children:"✓ Apuntado(a)"}):e.jsx("button",{className:"btn btn-primary btn-sm",onClick:x,disabled:c,children:c?"…":s!=null&&s.code?"✋ Me interesa":"✋ Crear código y apuntarme"}),n.url&&e.jsx("a",{href:n.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Más info →"})]})]})]}),e.jsx("style",{children:`
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
      `})]})}function qe(){return e.jsx("section",{className:"hero",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"hero-grid",children:[e.jsxs("div",{className:"hero-card card fade-in",children:[e.jsx("span",{className:"tag",children:"Programa universitario · UNAM"}),e.jsxs("h1",{className:"mt-2",children:["Sintonízate contigo, con tu ",e.jsx("span",{style:{color:"var(--c-oro-700)"},children:"comunidad"})," ","y con tu bienestar."]}),e.jsx("p",{className:"lede",children:"Una autoevaluación breve, anónima y con recomendaciones personalizadas para reflexionar sobre tu bienestar emocional y conocer recursos de apoyo dentro de la UNAM."}),e.jsxs("ul",{className:"hero-checks",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"20 preguntas"})," en 7 a 10 minutos"]}),e.jsxs("li",{children:["Resultado ",e.jsx("strong",{children:"informativo, anónimo y confidencial"})]}),e.jsxs("li",{children:["Recomendaciones y vinculación con ",e.jsx("strong",{children:"recursos universitarios"})]})]}),e.jsxs("div",{className:"hero-actions",children:[e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(f,{to:"/privacidad",className:"btn btn-ghost",children:"Aviso de privacidad"})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"20"}),e.jsx("span",{children:"preguntas"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"7-10"}),e.jsx("span",{children:"minutos"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"0"}),e.jsx("span",{children:"datos personales"})]})]})]}),e.jsx("aside",{className:"hero-visual fade-in","aria-hidden":"true",children:e.jsxs("div",{className:"orb-grid",children:[e.jsx("div",{className:"orb azul",children:e.jsxs("div",{children:[e.jsx("span",{children:"🧠"}),"Psicología"]})}),e.jsx("div",{className:"orb oro",children:e.jsxs("div",{children:[e.jsx("span",{children:"⚖️"}),"Equilibrio"]})}),e.jsx("div",{className:"orb salvia",children:e.jsxs("div",{children:[e.jsx("span",{children:"🌿"}),"Calma"]})}),e.jsx("div",{className:"orb coral",children:e.jsxs("div",{children:[e.jsx("span",{children:"🤝"}),"Comunidad"]})}),e.jsx("div",{className:"orb marfil",children:e.jsxs("div",{children:[e.jsx("span",{children:"✨"}),"Sintonía"]})}),e.jsx("div",{className:"orb lavanda",children:e.jsxs("div",{children:[e.jsx("span",{children:"🎨"}),"Arte"]})}),e.jsx("div",{className:"orb salvia",children:e.jsxs("div",{children:[e.jsx("span",{children:"🏃"}),"Deporte"]})}),e.jsx("div",{className:"orb azul",children:e.jsxs("div",{children:[e.jsx("span",{children:"📚"}),"Estudio"]})}),e.jsx("div",{className:"orb oro",children:e.jsxs("div",{children:[e.jsx("span",{children:"💛"}),"Bienestar"]})})]})})]})})})}function ze({icon:s="✦",title:a,children:n,accent:i="azul"}){return e.jsxs("article",{className:`info-card accent-${i}`,children:[e.jsx("div",{className:"info-icon","aria-hidden":"true",children:s}),e.jsx("h3",{children:a}),e.jsx("p",{children:n})]})}function I({variant:s="default",children:a}){return e.jsxs("aside",{className:`safety-notice safety-${s}`,role:"note",children:[e.jsx("span",{className:"safety-icon","aria-hidden":"true",children:"ⓘ"}),e.jsx("div",{children:a||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," No constituye un diagnóstico médico ni psicológico, ni reemplaza la atención profesional. Si necesitas apoyo, acércate a los servicios de orientación y salud de la UNAM."]})})]})}function M(){const s=new Date;return s.getFullYear()*1e3+s.getMonth()*32+s.getDate()}function te(s){return!s||s.length===0?null:s[M()%s.length]}function Re({compact:s=!1}){const[a,n]=t.useState(null);return t.useEffect(()=>{_.from("student_library").select("id, title, body, meta").eq("category","quote").eq("active",!0).then(({data:i})=>n(te(i)))},[]),a?e.jsxs("div",{className:`daily-quote ${s?"compact":""}`,children:[e.jsx("small",{children:"💭 Frase del día"}),e.jsxs("blockquote",{children:['"',a.title,'"']}),a.body&&e.jsxs("cite",{children:["— ",a.body]}),e.jsx("style",{children:`
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
      `})]}):null}function Ie(){const{student:s}=F(),[a,n]=t.useState(null),[i,r]=t.useState(!1);t.useEffect(()=>{_.from("student_library").select("id, title, body").eq("category","challenge").eq("active",!0).then(({data:c})=>n(te(c)))},[]),t.useEffect(()=>{if(!a||!(s!=null&&s.code))return;const c=`challenge_${M()}_${a.id}`;_.from("student_achievements").select("id").eq("anonymous_code",s.code).eq("achievement_key",c).maybeSingle().then(({data:m})=>r(!!m))},[a,s==null?void 0:s.code]);async function l(){if(!(s!=null&&s.code)||!a)return;const c=`challenge_${M()}_${a.id}`;await _.from("student_achievements").upsert({anonymous_code:s.code,achievement_key:c}),r(!0)}return a?e.jsxs("div",{className:"daily-challenge",children:[e.jsx("small",{children:"🎯 Reto del día"}),e.jsx("h3",{children:a.title}),a.body&&e.jsx("p",{children:a.body}),(s==null?void 0:s.code)&&e.jsx("button",{className:`btn ${i?"btn-ghost":"btn-coral"} btn-sm`,onClick:l,disabled:i,children:i?"✓ ¡Lo hiciste!":"Marcar como hecho"}),e.jsx("style",{children:`
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
      `})]}):null}const Te=[{icon:"📝",accent:"azul",title:"Evaluación breve",text:"Veinte preguntas en aproximadamente siete a diez minutos."},{icon:"📊",accent:"oro",title:"Resultado informativo",text:"Un panorama de tus dimensiones de bienestar, sin etiquetas clínicas."},{icon:"🌿",accent:"salvia",title:"Recomendaciones personalizadas",text:"Acciones de autocuidado y vinculación con actividades universitarias."},{icon:"🏛",accent:"coral",title:"Recursos universitarios",text:"Orientación psicológica, deporte, cultura, comunidad y bienestar verde."},{icon:"🤝",accent:"lavanda",title:"IA con responsabilidad",text:"Te acompaña con redacción amable; nunca diagnostica ni sustituye atención profesional."}];function Oe(){return e.jsxs(e.Fragment,{children:[e.jsx(qe,{}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",style:{maxWidth:980},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[e.jsx(Re,{}),e.jsx(Ie,{})]}),e.jsx("style",{children:`
            @media (max-width: 720px) {
              .section-sm > .container > div { grid-template-columns: 1fr !important; }
            }
          `})]})}),e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag",children:"Cómo te acompaña Sintonía UNAM"}),e.jsx("h2",{className:"mt-2",children:"Una orientación clara, anónima y con sentido comunitario"}),e.jsx("p",{className:"lede",children:"Sintonía UNAM es una plataforma para reflexionar sobre tu bienestar emocional, identificar áreas de autocuidado y conocer recursos de apoyo dentro de la UNAM."})]}),e.jsx("div",{className:"pillars",children:Te.map(s=>e.jsx(ze,{icon:s.icon,title:s.title,accent:s.accent,children:s.text},s.title))}),e.jsxs("div",{className:"continuity-card",children:[e.jsx("div",{className:"continuity-icon","aria-hidden":"true",children:"🔁"}),e.jsxs("div",{children:[e.jsx("span",{className:"tag sage",children:"¿Quieres seguir cuidándote?"}),e.jsx("h3",{className:"mt-2",children:"Tu código anónimo te abre un rincón propio"}),e.jsxs("p",{children:["Si guardas tu código (ej. ",e.jsx("code",{children:"SIN-XXX-####"}),") puedes regresar cuando quieras y obtener acceso a:"]}),e.jsxs("ul",{className:"continuity-list",children:[e.jsxs("li",{children:["📝 ",e.jsx("strong",{children:"Check-in semanal"})," de 30 segundos"]}),e.jsxs("li",{children:["📔 ",e.jsx("strong",{children:"Diario emocional"})," rápido (1 línea/día)"]}),e.jsxs("li",{children:["🛤 ",e.jsx("strong",{children:"Ruta de bienestar"})," de 7 o 14 días personalizada"]}),e.jsxs("li",{children:["🤝 ",e.jsx("strong",{children:"Pum-AI acompañante"})," para conversar cuando lo necesites"]}),e.jsxs("li",{children:["📚 ",e.jsx("strong",{children:"Biblioteca"})," de respiraciones, sonidos y videos"]}),e.jsxs("li",{children:["🗺 ",e.jsx("strong",{children:"Aventura"})," con pistas en el campus"]}),e.jsxs("li",{children:["🌳 ",e.jsx("strong",{children:"Adopta un árbol"})," y cuídalo"]}),e.jsxs("li",{children:["🫂 ",e.jsx("strong",{children:"Buddy anónimo"})," para conectar con otra persona"]}),e.jsxs("li",{children:["📅 ",e.jsx("strong",{children:"Calendario"})," de eventos universitarios"]}),e.jsxs("li",{children:["📊 ",e.jsx("strong",{children:"Tu evolución"})," a lo largo del tiempo"]})]}),e.jsxs("p",{className:"note",children:["Sigue siendo ",e.jsx("strong",{children:"100% anónimo"}),": solo tu código y, si quieres, una contraseña. Nada de nombre, correo ni datos personales."]}),e.jsxs("div",{className:"continuity-actions",children:[e.jsx(f,{to:"/mi-historia",className:"btn btn-gold",children:"Crear mi código anónimo"}),e.jsx(f,{to:"/consentimiento",className:"btn btn-ghost",children:"Solo hacer el test"})]})]})]})]}),e.jsx("style",{children:`
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
      `})]})}function Le(){const s=U(),[a,n]=t.useState(!1);function i(){a&&(sessionStorage.setItem(w.CONSENT,JSON.stringify({accepted:!0,timestamp:new Date().toISOString()})),s("/evaluacion"))}return e.jsxs("section",{className:"section",children:[e.jsx("div",{className:"container",style:{maxWidth:820},children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag",children:"Antes de iniciar"}),e.jsx("h1",{className:"mt-2",children:"Consentimiento informado"}),e.jsx("p",{className:"lede",children:"Antes de comenzar, te invitamos a leer las siguientes consideraciones. Tu participación es libre y puedes detenerla en cualquier momento."}),e.jsx("h2",{className:"mt-4",children:"¿Qué es Sintonía UNAM?"}),e.jsxs("p",{children:["Sintonía UNAM es una herramienta ",e.jsx("strong",{children:"informativa"})," de orientación para el bienestar emocional.",e.jsx("strong",{children:" No es un servicio médico, terapéutico ni de atención clínica."}),"Su propósito es ayudarte a reflexionar sobre cómo te has sentido y conocer recursos de apoyo dentro de la universidad."]}),e.jsx("h2",{className:"mt-4",children:"¿Qué pasará con tus respuestas?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"No te pediremos datos personales"}),": ni nombre, ni correo, ni teléfono, ni número de cuenta, ni cualquier información que te identifique directamente."]}),e.jsxs("li",{children:["Generamos un ",e.jsx("strong",{children:"código anónimo"})," (por ejemplo: SIN-KQT-2856) que tú decides guardar si quieres consultar tu resultado más tarde."]}),e.jsxs("li",{children:["Tus respuestas se almacenan de forma ",e.jsx("strong",{children:"anónima y agregada"})," con fines de mejora del programa y análisis estadístico."]}),e.jsxs("li",{children:["Para generar tu orientación amigable, enviamos a un modelo de inteligencia artificial",e.jsx("strong",{children:" únicamente datos agregados"})," (puntajes y dimensiones), nunca información personal."]})]}),e.jsx("h2",{className:"mt-4",children:"Limitaciones"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["El resultado es ",e.jsx("strong",{children:"informativo, no diagnóstico"}),"."]}),e.jsx("li",{children:"No reemplaza la atención psicológica o médica profesional."}),e.jsx("li",{children:"Si necesitas apoyo, te invitamos a acercarte a los servicios universitarios de orientación."})]}),e.jsxs(I,{variant:"gold",children:["Si en este momento estás atravesando una crisis o piensas en hacerte daño, comunícate de inmediato a la ",e.jsx("strong",{children:"Línea de la Vida: 800 290 0024"})," (24 horas, gratuito)."]}),e.jsx("div",{className:"consent-box mt-4",children:e.jsxs("label",{className:"consent-label",children:[e.jsx("input",{type:"checkbox",checked:a,onChange:r=>n(r.target.checked)}),e.jsx("span",{children:"He leído y acepto continuar con esta orientación informativa."})]})}),e.jsxs("div",{className:"actions mt-4",children:[e.jsx("button",{type:"button",className:"btn btn-primary btn-lg",onClick:i,disabled:!a,children:"Continuar →"}),e.jsx(f,{to:"/",className:"btn btn-ghost",children:"Volver al inicio"})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Pe({current:s,total:a}){const n=a?Math.round(s/a*100):0;return e.jsxs("div",{className:"progress-wrap","aria-label":`Progreso ${n}%`,children:[e.jsxs("div",{className:"progress-meta",children:[e.jsxs("span",{children:["Pregunta ",e.jsx("strong",{children:s})," de ",e.jsx("strong",{children:a})]}),e.jsxs("span",{children:[n,"%"]})]}),e.jsx("div",{className:"progress-bar",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":n,children:e.jsx("span",{style:{width:`${n}%`}})})]})}const Y=[{id:"estado_emocional",label:"Estado emocional"},{id:"estres_academico",label:"Estrés académico"},{id:"sueno_descanso",label:"Sueño y descanso"},{id:"apoyo_social",label:"Convivencia y apoyo social"},{id:"motivacion_pertenencia",label:"Motivación y pertenencia"}],G=[{id:"q01",sort_order:1,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"En los últimos días, ¿con qué frecuencia te has sentido triste o desanimado(a)?"},{id:"q02",sort_order:2,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"¿Has sentido nervios o preocupación que te cuesta calmar?"},{id:"q03",sort_order:3,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has logrado disfrutar momentos pequeños de tu día a día?"},{id:"q04",sort_order:4,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has podido reconocer cómo te sientes y darle nombre a tus emociones?"},{id:"q05",sort_order:5,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Has sentido que tus actividades académicas o personales te rebasan?"},{id:"q06",sort_order:6,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Te ha costado concentrarte al estudiar o atender tus clases?"},{id:"q07",sort_order:7,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has logrado organizar tu tiempo entre estudio, descanso y vida personal?"},{id:"q08",sort_order:8,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has podido afrontar exámenes o entregas con relativa calma?"},{id:"q09",sort_order:9,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has logrado descansar lo suficiente para realizar tus actividades cotidianas?"},{id:"q10",sort_order:10,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has mantenido un horario de sueño relativamente constante?"},{id:"q11",sort_order:11,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Te has despertado cansado(a) o con poca energía?"},{id:"q12",sort_order:12,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Has tenido dificultad para conciliar el sueño o has dormido inquieto(a)?"},{id:"q13",sort_order:13,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has contado con alguien con quien hablar cuando lo necesitas?"},{id:"q14",sort_order:14,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has compartido tiempo con familiares o amistades que te hacen bien?"},{id:"q15",sort_order:15,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Te has sentido solo(a) o con poca conexión con quienes te rodean?"},{id:"q16",sort_order:16,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Has evitado actividades sociales que antes disfrutabas?"},{id:"q17",sort_order:17,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has sentido motivación para participar en tus actividades universitarias?"},{id:"q18",sort_order:18,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has tenido momentos para realizar actividades que te ayuden a sentirte mejor?"},{id:"q19",sort_order:19,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Te has sentido parte de tu comunidad universitaria?"},{id:"q20",sort_order:20,dimension:"motivacion_pertenencia",is_reverse_scored:!1,question_text:"¿Has perdido interés o entusiasmo por metas que antes te importaban?"}],Me=[{value:0,label:"Nunca"},{value:1,label:"Casi nunca"},{value:2,label:"Algunas veces"},{value:3,label:"Frecuentemente"},{value:4,label:"Casi siempre"}];function De({question:s,value:a,onChange:n,index:i}){return e.jsxs("article",{className:"question-card",children:[e.jsxs("span",{className:"question-number",children:["PREGUNTA ",i+1]}),e.jsx("h2",{className:"question-text",children:s.question_text}),e.jsx("div",{className:"options",role:"radiogroup","aria-label":"Opciones de respuesta",children:Me.map(r=>e.jsxs("button",{type:"button",role:"radio","aria-checked":a===r.value,className:`option ${a===r.value?"selected":""}`,onClick:()=>n(r.value),children:[e.jsx("span",{className:"opt-mark","aria-hidden":"true"}),e.jsx("span",{children:r.label})]},r.value))})]},s.id)}const Ss=[{id:"orientacion_psicologica",label:"Orientación psicológica",icon:"🧠"},{id:"tutoria_academica",label:"Tutoría académica",icon:"📚"},{id:"deporte",label:"Actividades deportivas",icon:"🏃"},{id:"cultura",label:"Actividades culturales",icon:"🎭"},{id:"comunidad",label:"Integración comunitaria",icon:"🤝"},{id:"medico",label:"Servicios médicos",icon:"🩺"},{id:"emergencia",label:"Atención de emergencia",icon:"☎️"},{id:"sustentabilidad",label:"Bienestar verde",icon:"🌿"}],X=[{id:"r-uepi",name:"Unidad de Evaluación Psicológica Iztacala (UEPI)",type:"orientacion_psicologica",description:"Acompañamiento psicológico para la comunidad universitaria. Atención individual y grupal.",audience:"Estudiantes UNAM",modality:"Presencial / a distancia",location:"FES Iztacala",schedule:"Lunes a viernes, 9:00 a 17:00",contact:"uepi@iztacala.unam.mx",tags:["psicología","atención","orientación"]},{id:"r-tutorias",name:"Programa Institucional de Tutorías",type:"tutoria_academica",description:"Tutorías académicas y de trayectoria escolar. Acompañamiento para mejorar tu desempeño.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu facultad o escuela",schedule:"Según agenda del tutor",contact:"Coordinación de tutorías de tu plantel",tags:["académico","tutoría","desempeño"]},{id:"r-deporte",name:"Activación física comunitaria",type:"deporte",description:"Sesiones abiertas de yoga, baile y movimiento físico en explanadas universitarias.",audience:"Comunidad UNAM",modality:"Presencial",location:"Explanadas en distintos planteles",schedule:"Martes y jueves, 8:00",contact:"Difusión cultural y deportiva",tags:["deporte","movimiento","comunidad"]},{id:"r-cultura",name:"Talleres culturales",type:"cultura",description:"Talleres de música, escritura, pintura, teatro y otros oficios artísticos abiertos a estudiantes.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Casa del Tiempo y centros culturales",schedule:"Calendario semestral",contact:"Difusión cultural UNAM",tags:["arte","cultura","comunidad"]},{id:"r-comunidad",name:"Círculos de bienestar Sintonía",type:"comunidad",description:"Encuentros guiados para compartir experiencias y construir comunidad.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu plantel",schedule:"Miércoles 17:00",contact:"sintonia@unam.mx",tags:["comunidad","apoyo","pertenencia"]},{id:"r-medico",name:"Servicios médicos universitarios",type:"medico",description:"Consulta médica general gratuita para personal y estudiantes.",audience:"Comunidad UNAM",modality:"Presencial",location:"Centros médicos por plantel",schedule:"Lunes a viernes",contact:"Servicios médicos de tu plantel",tags:["salud","medicina","consulta"]},{id:"r-emergencia",name:"Línea de la Vida (24/7)",type:"emergencia",description:"Servicio de orientación emocional gratuito y confidencial, disponible las 24 horas.",audience:"Cualquier persona",modality:"Telefónica",location:"Nacional",schedule:"24 horas, todos los días",contact:"800 290 0024",tags:["emergencia","crisis","apoyo inmediato"]},{id:"r-sustenta",name:"Bienestar verde — caminatas y jardines",type:"sustentabilidad",description:"Actividades en espacios verdes de Ciudad Universitaria: caminatas, jardines polinizadores, talleres de plantas medicinales.",audience:"Comunidad UNAM",modality:"Presencial",location:"Ciudad Universitaria",schedule:"Sábados 10:00",contact:"sustentabilidad@unam.mx",tags:["sustentabilidad","naturaleza","autocuidado"]}],D=[{dimension:"estado_emocional",level:"bajo",title:"Sigue cultivando tus rutinas de bienestar",description:"Tus respuestas sugieren un buen equilibrio emocional. Mantener pequeñas pausas, gratitud diaria o momentos de movimiento te ayudará a sostenerlo."},{dimension:"estado_emocional",level:"moderado",title:"Espacio para reconocer tus emociones",description:"Considera dedicar 10 minutos al día a registrar lo que sientes. Conversar con alguien de confianza puede aportar perspectiva."},{dimension:"estado_emocional",level:"prioritario",title:"Acércate a un servicio universitario de orientación",description:"Sentir tristeza o nervios sostenidos amerita acompañamiento. Te recomendamos contactar los servicios de orientación psicológica de tu plantel."},{dimension:"estres_academico",level:"bajo",title:"Tu carga académica parece manejable",description:"Conserva tus rutinas de organización. Una agenda y bloques de estudio cortos pueden sostener este ritmo."},{dimension:"estres_academico",level:"moderado",title:"Pequeños ajustes para liberar presión",description:"Prioriza tareas con la técnica de los 3 más importantes del día y agrega pausas activas de 5 minutos cada hora de estudio."},{dimension:"estres_academico",level:"prioritario",title:"Considera apoyo académico y orientación",description:"Sentirte rebasado(a) puede afectar tu desempeño y tu salud. Las tutorías académicas y la orientación universitaria pueden ser un buen primer paso."},{dimension:"sueno_descanso",level:"bajo",title:"Tu descanso es un recurso valioso",description:"Continúa cuidando tus horarios de sueño y exposición a pantallas. Tu energía agradecerá la consistencia."},{dimension:"sueno_descanso",level:"moderado",title:"Refuerza tu higiene del sueño",description:"Apaga pantallas 30 minutos antes de dormir, mantén tu habitación fresca y evita cafeína después del mediodía."},{dimension:"sueno_descanso",level:"prioritario",title:"El descanso necesita atención",description:"Dormir mal de forma sostenida impacta tu ánimo y concentración. Considera consultar con servicios médicos universitarios para descartar causas atendibles."},{dimension:"apoyo_social",level:"bajo",title:"Tu red de apoyo te acompaña",description:"Mantener vínculos cercanos es protector. Procura escuchar a quienes te rodean tanto como ellos te escuchan a ti."},{dimension:"apoyo_social",level:"moderado",title:"Reconecta con personas de confianza",description:"Una llamada o un café con alguien cercano puede reforzar tu bienestar. Las actividades comunitarias universitarias también ayudan."},{dimension:"apoyo_social",level:"prioritario",title:"Buscar compañía es un acto de cuidado",description:"Sentirte aislado(a) merece atención. Considera unirte a actividades culturales o deportivas universitarias y, si lo prefieres, a grupos de orientación."},{dimension:"motivacion_pertenencia",level:"bajo",title:"Tu motivación es un buen aliado",description:"Conserva los proyectos y actividades que te dan propósito. Compartir lo que disfrutas con otros lo amplifica."},{dimension:"motivacion_pertenencia",level:"moderado",title:"Reactiva pequeños propósitos",description:"Establece una meta sencilla esta semana: una clase opcional, una actividad cultural o una salida nueva por tu campus."},{dimension:"motivacion_pertenencia",level:"prioritario",title:"Espacios universitarios para reencontrarte",description:"Talleres, deporte, voluntariado y actividades culturales pueden reabrir el sentido de pertenencia. Acércate a las actividades comunitarias de tu facultad."}];function Ue(s){return D.filter(a=>{var n;return((n=s[a.dimension])==null?void 0:n.level)===a.level})}async function Fe(){if(!E)return G;const{data:s,error:a}=await _.from("questions").select("id, dimension, question_text, is_reverse_scored, sort_order").eq("active",!0).order("sort_order");return a||!s||s.length===0?(a&&console.warn("[supabase] questions →",a.message),G):s}async function ws(){if(!E)return X;const{data:s,error:a}=await _.from("resources").select("*").eq("active",!0).order("name");return a||!s||s.length===0?(a&&console.warn("[supabase] resources →",a.message),X):s}async function $e(){if(!E)return D;const{data:s,error:a}=await _.from("recommendations").select("dimension, level, title, description").eq("active",!0);return a||!s||s.length===0?(a&&console.warn("[supabase] recommendations →",a.message),D):s}async function Ve(s){if(!E)return{saved:!1,id:null};const a=window.crypto&&crypto.randomUUID?crypto.randomUUID():"sin-"+Date.now()+"-"+Math.random().toString(36).slice(2,10),{error:n}=await _.from("assessment_sessions").insert({id:a,...s});return n?(console.warn("[supabase] saveSession →",n.message),{saved:!1,error:n.message,id:a}):{saved:!0,id:a}}async function Be(s,a){if(!E||!s)return{saved:!1};const n=a.map(r=>({session_id:s,...r})),{error:i}=await _.from("assessment_answers").insert(n);return i?(console.warn("[supabase] saveAnswers →",i.message),{saved:!1,error:i.message}):{saved:!0}}async function Es(){if(!E)return{ok:!1,reason:"not_configured"};try{const{error:s}=await _.from("questions").select("id",{head:!0,count:"exact"});return s?{ok:!1,reason:s.message}:{ok:!0}}catch(s){return{ok:!1,reason:s.message}}}const A=4;function He(s,a){const n=Math.max(0,Math.min(A,Number(a)));return s.is_reverse_scored?(A-n)/A:n/A}function L(s){return s<=K.bajo.max?"bajo":s<=K.moderado.max?"moderado":"prioritario"}function We(s,a){var p;const n=Object.create(null);for(const d of Y)n[d.id]={sum:0,n:0};let i=0,r=0;const l={};for(const d of s){const o=a[d.id];if(o==null)continue;const x=He(d,o);l[d.id]=x,n[d.dimension]||(n[d.dimension]={sum:0,n:0}),n[d.dimension].sum+=x,n[d.dimension].n+=1,i+=x,r+=1}const c={};for(const[d,o]of Object.entries(n)){const x=o.n?Math.round(o.sum/o.n*100):0;c[d]={score:x,level:L(x),level_label:P[L(x)],label:((p=Y.find(j=>j.id===d))==null?void 0:p.label)||d}}const m=r?Math.round(i/r*100):0,h=L(m),g=Object.entries(c).filter(([,d])=>d.level!=="bajo").sort((d,o)=>o[1].score-d[1].score).map(([d,o])=>({id:d,label:o.label,score:o.score,level:o.level}));return{total_score:m,general_level:h,general_level_label:P[h],dimensions:c,top_attention_areas:g,normalized_by_question:l}}const Ke="ABCDEFGHJKLMNPQRSTUVWXYZ",Je="23456789";function Z(s,a){let n="";const i=new Uint32Array(a);crypto.getRandomValues(i);for(let r=0;r<a;r++)n+=s[i[r]%s.length];return n}function oe(){return`SIN-${Z(Ke,3)}-${Z(Je,4)}`}async function Qe(s){if(!E)return null;try{const{data:a,error:n}=await _.functions.invoke(ie,{body:s});return n?(console.warn("[gemini] error →",n.message),null):!a||typeof a!="object"||a.error?null:a}catch(a){return console.warn("[gemini] excepción →",a.message),null}}async function ks(){if(!E)return{ok:!1,reason:"not_configured"};try{const{error:s}=await _.functions.invoke(ie,{body:{ping:!0}});return{ok:!s,reason:s==null?void 0:s.message}}catch(s){return{ok:!1,reason:s.message}}}async function Ye({questions:s,answers:a,anonymousCode:n}){const i=We(s,a),r=n||oe(),l={anonymous_code:r,test_version:W,total_score:i.total_score,general_level:i.general_level,dimension_scores:i.dimensions,top_attention_areas:i.top_attention_areas},{id:c}=await Ve(l);if(c){const g=Object.entries(a).map(([p,d])=>({question_id:p,answer_value:Number(d),normalized_value:i.normalized_by_question[p]??null}));await Be(c,g)}const m=await $e(),h=await Qe({session_id:c,test_version:W,general_level:i.general_level,dimensions:i.dimensions,top_attention_areas:i.top_attention_areas,recommendation_catalog:m.slice(0,30)});return{session_id:c||null,anonymous_code:r,created_at:new Date().toISOString(),...i,ai:h||null,base_recommendations:m}}function Ge(){const s=U(),[a,n]=t.useState([]),[i,r]=t.useState({}),[l,c]=t.useState(0),[m,h]=t.useState(!0),[g,p]=t.useState(!1),[d,o]=t.useState(null);t.useEffect(()=>{if(!sessionStorage.getItem(w.CONSENT)){s("/consentimiento",{replace:!0});return}let k=!0;return Fe().then(le=>{if(k){n(le);try{const $=sessionStorage.getItem(w.ANSWERS);$&&r(JSON.parse($))}catch{}h(!1)}}),()=>{k=!1}},[]),t.useEffect(()=>{if(!m)try{sessionStorage.setItem(w.ANSWERS,JSON.stringify(i))}catch{}},[i,m]);const x=a.length,j=a[l],S=t.useMemo(()=>a.every(y=>i[y.id]!==void 0),[a,i]);function N(y){j&&r(k=>({...k,[j.id]:y}))}function C(){l<x-1&&c(y=>y+1)}function T(){l>0&&c(y=>y-1)}async function ce(){if(!S){const y=a.findIndex(k=>i[k.id]===void 0);y!==-1&&c(y);return}p(!0),o(null);try{const y=oe(),k=await Ye({questions:a,answers:i,anonymousCode:y});sessionStorage.setItem(w.RESULT,JSON.stringify(k)),sessionStorage.setItem(w.ANON_CODE,y),sessionStorage.removeItem(w.ANSWERS),s("/resultado")}catch(y){console.error(y),o("No pudimos generar tu resultado en este momento. Intenta nuevamente en unos segundos.")}finally{p(!1)}}return m?e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",style:{maxWidth:720,textAlign:"center"},children:[e.jsx("div",{className:"spinner",style:{margin:"40px auto 18px"}}),e.jsx("p",{className:"lede",children:"Preparando preguntas…"})]})}):e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:820},children:[e.jsx(Pe,{current:l+1,total:x}),j&&e.jsx(De,{index:l,question:j,value:i[j.id],onChange:N}),e.jsxs("div",{className:"assess-actions mt-3",children:[e.jsx("button",{className:"btn btn-ghost",onClick:T,disabled:l===0,children:"← Anterior"}),l<x-1?e.jsx("button",{className:"btn btn-primary",onClick:C,disabled:i[j==null?void 0:j.id]===void 0,children:"Siguiente →"}):e.jsx("button",{className:"btn btn-coral btn-lg",onClick:ce,disabled:g||!S,children:g?"Generando orientación…":"Finalizar y ver resultado"})]}),!S&&l===x-1&&e.jsx("p",{className:"note text-center mt-3",children:'Te faltan algunas preguntas por contestar. Usa "Anterior" para revisarlas.'}),d&&e.jsx("div",{className:"mt-4",children:e.jsx(I,{variant:"warm",children:d})}),e.jsx("p",{className:"text-center mt-4",children:e.jsx(f,{to:"/",className:"note",children:"Salir y descartar respuestas"})})]}),e.jsx("style",{children:`
        .assess-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
      `})]})}function Xe({result:s}){if(!s)return null;const{total_score:a,general_level_label:n,anonymous_code:i,ai:r}=s;return e.jsx("section",{className:"result-card",children:e.jsxs("div",{className:"result-hero",children:[e.jsxs("div",{className:"result-score",children:[e.jsx("span",{className:"result-score-num",children:a}),e.jsx("span",{className:"result-score-label",children:"/ 100"})]}),e.jsxs("div",{className:"result-meta",children:[e.jsx("span",{className:"tag",children:"Tu orientación"}),e.jsx("h1",{className:"mt-2",children:n}),e.jsx("p",{className:"result-summary",children:(r==null?void 0:r.friendly_summary)||"Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas. Recuerda que esto es una orientación, no un diagnóstico."}),i&&e.jsxs("p",{className:"anon-code",children:["Tu código anónimo: ",e.jsx("strong",{children:i}),e.jsx("small",{children:"Puedes copiarlo si quieres consultar tu resultado nuevamente más tarde."})]})]})]})})}function Ze({dimensions:s}){const a=Object.entries(s);return e.jsx("div",{className:"dim-chart",role:"list",children:a.map(([n,i])=>e.jsxs("div",{className:"dim-row",role:"listitem",children:[e.jsx("div",{className:"dim-label",children:i.label}),e.jsx("div",{className:"dim-track","aria-label":`Puntaje ${i.score} de 100`,children:e.jsx("span",{className:`dim-fill lvl-bg-${i.level}`,style:{width:`${i.score}%`}})}),e.jsxs("div",{className:`dim-value lvl-${i.level}`,children:[i.score,e.jsx("small",{children:P[i.level]})]})]},n))})}function es({sessionId:s}){const[a,n]=t.useState(0),[i,r]=t.useState(0),[l,c]=t.useState(""),[m,h]=t.useState(!1),[g,p]=t.useState(!1);async function d(){if(a!==0){if(p(!0),E)try{await _.from("assessment_feedback").insert({session_id:s||null,rating:a,comment:l.trim()||null})}catch(o){console.warn(o)}h(!0),p(!1)}}return m?e.jsx("div",{className:"feedback-thanks",children:e.jsxs("p",{children:["✨ ",e.jsx("strong",{children:"Gracias por tu retroalimentación."})," Nos ayuda a mejorar el programa."]})}):e.jsxs("div",{className:"feedback-box",children:[e.jsx("h3",{children:"¿Cómo te pareció esta orientación?"}),e.jsx("div",{className:"stars",role:"radiogroup","aria-label":"Calificación",children:[1,2,3,4,5].map(o=>e.jsx("button",{type:"button",role:"radio","aria-checked":a===o,className:`star ${(i||a)>=o?"active":""}`,onMouseEnter:()=>r(o),onMouseLeave:()=>r(0),onClick:()=>n(o),children:"★"},o))}),e.jsx("textarea",{placeholder:"Comentario opcional…",value:l,onChange:o=>c(o.target.value),rows:2}),e.jsx("button",{className:"btn btn-primary btn-sm",disabled:a===0||g,onClick:d,children:g?"Enviando…":"Enviar"}),e.jsx("style",{children:`
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
      `})]})}function ss(){var h,g,p,d;const s=U(),[a,n]=t.useState(null);if(t.useEffect(()=>{try{const o=sessionStorage.getItem(w.RESULT);if(!o)return s("/",{replace:!0});n(JSON.parse(o))}catch{s("/",{replace:!0})}},[s]),!a)return null;const i=((h=a.ai)==null?void 0:h.suggested_actions)||[],r=((g=a.ai)==null?void 0:g.recommended_resources)||[],l=(p=a.ai)==null?void 0:p.safety_note,c=a.base_recommendations?Ue(a.dimensions).map(o=>({title:o.title,description:o.description})):[];function m(){var x,j,S;const o=["Sintonía UNAM — Tu orientación",`Código anónimo: ${a.anonymous_code}`,`Nivel general: ${a.general_level_label} (${a.total_score}/100)`,"","Dimensiones:",...Object.entries(a.dimensions).map(([,N])=>`  • ${N.label}: ${N.score} (${N.level_label})`),"",((x=a.ai)==null?void 0:x.friendly_summary)||"",((j=a.ai)==null?void 0:j.safety_note)||"Esta orientación es informativa y no sustituye atención profesional."].join(`
`);(S=navigator.clipboard)==null||S.writeText(o).catch(()=>{})}return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:1e3},children:[e.jsx(Xe,{result:a}),a.general_level==="prioritario"&&e.jsxs("div",{className:"crisis-banner",children:[e.jsx("strong",{children:"📞 Tus respuestas sugieren acercarte a apoyo profesional."}),e.jsxs("p",{children:["Hay servicios universitarios y la ",e.jsx("strong",{children:"Línea de la Vida 800 290 0024"})," disponibles 24/7."]}),e.jsx(f,{to:"/apoyo",className:"btn btn-coral btn-sm",children:"Ver opciones de apoyo →"})]}),e.jsxs("div",{className:"route-cta mt-3",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"✨ Crea tu ruta de bienestar"}),e.jsx("small",{children:"Pum-AI te puede generar un plan diario de 7 o 14 días personalizado a tu resultado."})]}),e.jsx(f,{to:"/ruta",className:"btn btn-gold",children:"Comenzar mi ruta →"})]}),e.jsx(I,{children:l||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado, pero no constituyen un diagnóstico clínico. Si lo necesitas, acércate a un servicio de orientación universitario."]})}),e.jsxs("div",{className:"results-grid mt-4",children:[e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag azul",children:"Tus dimensiones"}),e.jsx("h2",{className:"mt-2",children:"Cómo se ve tu bienestar por área"}),e.jsx("p",{className:"lede",children:"Cada barra representa el nivel de atención que sugieren tus respuestas en esa área. Mayor puntaje = mayor invitación al autocuidado."}),e.jsx(Ze,{dimensions:a.dimensions})]}),e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag coral",children:"Acciones sugeridas"}),e.jsx("h2",{className:"mt-2",children:"Pasos pequeños y útiles"}),i.length>0?e.jsx("ul",{className:"rec-list",children:i.map((o,x)=>e.jsxs("li",{children:["✦ ",o]},x))}):e.jsxs("ul",{className:"rec-list",children:[c.length===0&&e.jsx("li",{children:"Sigue cultivando tus rutinas de bienestar. Tus respuestas no muestran áreas urgentes hoy."}),c.map((o,x)=>e.jsxs("li",{children:[e.jsxs("strong",{children:[o.title,"."]})," ",o.description]},x))]})]})]}),e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag sage",children:"Recursos sugeridos"}),e.jsx("h2",{className:"mt-2",children:"Recursos universitarios para ti"}),r.length>0?e.jsx("ul",{className:"rec-list",children:r.map((o,x)=>e.jsxs("li",{children:["📌 ",o]},x))}):e.jsxs("p",{children:["Visita la sección de ",e.jsx(f,{to:"/recursos",children:"Recursos de apoyo"})," para ver el catálogo completo."]})]}),((d=a.top_attention_areas)==null?void 0:d.length)>0&&e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag",children:"Áreas con mayor atención sugerida"}),e.jsx("h2",{className:"mt-2",children:"Dónde poner foco"}),e.jsx("ul",{className:"rec-list",children:a.top_attention_areas.map(o=>e.jsxs("li",{children:[e.jsx("strong",{children:o.label})," — Puntaje: ",o.score,", nivel: ",o.level==="prioritario"?"prioritario":"moderado","."]},o.id))})]}),e.jsx(es,{sessionId:a.session_id}),e.jsxs("div",{className:"results-actions mt-4",children:[e.jsx("button",{className:"btn btn-gold",onClick:m,children:"📋 Copiar resultado"}),e.jsx(f,{to:"/recursos",className:"btn btn-secondary btn-primary",children:"Ver recursos universitarios"}),e.jsx(f,{to:"/evaluacion",className:"btn btn-ghost",children:"Volver a evaluar"}),e.jsx(f,{to:"/",className:"btn btn-ghost",children:"Ir al inicio"})]})]}),e.jsx("style",{children:`
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
      `})]})}const as=t.lazy(()=>b(()=>import("./Resources-oSJHk6Du.js"),__vite__mapDeps([0,1,2,3]))),ns=t.lazy(()=>b(()=>import("./Privacy-CyvKjX0S.js"),__vite__mapDeps([4,1,2]))),is=t.lazy(()=>b(()=>import("./MyHistory-Bk6-Bpsh.js"),__vite__mapDeps([5,1,2]))),rs=t.lazy(()=>b(()=>import("./CheckIn-CdScaWrq.js"),__vite__mapDeps([6,1,2]))),ts=t.lazy(()=>b(()=>import("./Journal-Bpzpgv32.js"),__vite__mapDeps([7,1,2]))),os=t.lazy(()=>b(()=>import("./Support-DrXaZ4no.js"),__vite__mapDeps([8,1,2]))),cs=t.lazy(()=>b(()=>import("./WellnessRoute-Dx08CLm6.js"),__vite__mapDeps([9,1,2]))),ls=t.lazy(()=>b(()=>import("./Companion-DcC3nmTR.js"),__vite__mapDeps([10,1,2]))),ds=t.lazy(()=>b(()=>import("./Library-C0UtBdG4.js"),__vite__mapDeps([11,1,2]))),us=t.lazy(()=>b(()=>import("./Emotions-CabyVIPv.js"),__vite__mapDeps([12,1,2]))),ms=t.lazy(()=>b(()=>import("./MapPage-Ct_Jk13S.js"),__vite__mapDeps([13,1,2]))),ps=t.lazy(()=>b(()=>import("./Trees-DhO6TavG.js"),__vite__mapDeps([14,1,2]))),xs=t.lazy(()=>b(()=>import("./Buddy-DcSe6gW2.js"),__vite__mapDeps([15,1,2]))),hs=t.lazy(()=>b(()=>import("./Adventure-DnlfK-pn.js"),__vite__mapDeps([16,1,2]))),gs=t.lazy(()=>b(()=>import("./Calendar-oLHSTK_t.js"),__vite__mapDeps([17,1,2]))),vs=t.lazy(()=>b(()=>import("./Admin-DDEj9rTU.js"),__vite__mapDeps([18,1,19,2]))),fs=t.lazy(()=>b(()=>import("./AdminLogin-K5F7zKBv.js"),__vite__mapDeps([20,1,19,2])));function js(){return e.jsx("div",{style:{display:"grid",placeItems:"center",minHeight:"40vh"},children:e.jsx("div",{className:"spinner"})})}function bs(){const a=z().pathname.startsWith("/admin");return e.jsxs(e.Fragment,{children:[!a&&e.jsx(Se,{}),e.jsx("main",{children:e.jsx(t.Suspense,{fallback:e.jsx(js,{}),children:e.jsxs(de,{children:[e.jsx(v,{path:"/",element:e.jsx(Oe,{})}),e.jsx(v,{path:"/consentimiento",element:e.jsx(Le,{})}),e.jsx(v,{path:"/evaluacion",element:e.jsx(Ge,{})}),e.jsx(v,{path:"/resultado",element:e.jsx(ss,{})}),e.jsx(v,{path:"/recursos",element:e.jsx(as,{})}),e.jsx(v,{path:"/privacidad",element:e.jsx(ns,{})}),e.jsx(v,{path:"/mi-historia",element:e.jsx(is,{})}),e.jsx(v,{path:"/check-in",element:e.jsx(rs,{})}),e.jsx(v,{path:"/diario",element:e.jsx(ts,{})}),e.jsx(v,{path:"/apoyo",element:e.jsx(os,{})}),e.jsx(v,{path:"/ruta",element:e.jsx(cs,{})}),e.jsx(v,{path:"/companion",element:e.jsx(ls,{})}),e.jsx(v,{path:"/biblioteca",element:e.jsx(ds,{})}),e.jsx(v,{path:"/emociones",element:e.jsx(us,{})}),e.jsx(v,{path:"/mapa",element:e.jsx(ms,{})}),e.jsx(v,{path:"/arboles",element:e.jsx(ps,{})}),e.jsx(v,{path:"/buddy",element:e.jsx(xs,{})}),e.jsx(v,{path:"/aventura",element:e.jsx(hs,{})}),e.jsx(v,{path:"/calendario",element:e.jsx(gs,{})}),e.jsx(v,{path:"/docentes",element:e.jsx(V,{to:"/admin/login",replace:!0})}),e.jsx(v,{path:"/admin/login",element:e.jsx(fs,{})}),e.jsx(v,{path:"/admin/*",element:e.jsx(vs,{})}),e.jsx(v,{path:"*",element:e.jsx(V,{to:"/",replace:!0})})]})})}),!a&&e.jsx(we,{}),!a&&e.jsx(Ee,{}),!a&&e.jsx(Ae,{})]})}(function(){const a=new URLSearchParams(window.location.search),n=a.get("p");if(n!==null){const i=a.get("q"),r=window.location.pathname.replace(/\/$/,"")+n+(i?"?"+i.replace(/~and~/g,"&"):"")+window.location.hash;window.history.replaceState(null,"",r)}})();const ys="/sintonia-unam/".replace(/\/$/,"");ne(document.getElementById("root")).render(e.jsx(ue.StrictMode,{children:e.jsx(me,{basename:ys,children:e.jsx(bs,{})})}));export{Y as D,Ss as R,I as S,_e as a,w as b,Ne as c,Es as d,ks as e,ws as f,J as g,E as i,e as j,_ as s,F as u};
