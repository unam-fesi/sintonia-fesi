const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Resources-Dxb-L97m.js","assets/vendor-react-BTW_75ak.js","assets/vendor-supabase-DS4euJVY.js","assets/Resources-Da2drgDA.css","assets/Privacy-CY2KygVz.js","assets/MyHistory-DMGHMPlt.js","assets/CheckIn-CYayGUlW.js","assets/Journal-Cq-U0s1z.js","assets/Support-CzWBvxwx.js","assets/WellnessRoute-Bj4H1RYg.js","assets/Companion-Dq9qb5zr.js","assets/Library-rBuAZ3Pe.js","assets/Emotions-D5F_ed0K.js","assets/MapPage-CHluiJGI.js","assets/Trees-BzUHA8_u.js","assets/Buddy-B4hNuE5O.js","assets/Adventure-DbsNfISr.js","assets/Calendar-D1niU3Jz.js","assets/Admin-CgEHKGAe.js","assets/authService-BSxV27o7.js","assets/AdminLogin-rRD7SMre.js"])))=>i.map(i=>d[i]);
import{r,a as ae,u as q,L as f,N as m,b as T,R as ue,c as b,d as V,e as me,B as pe}from"./vendor-react-BTW_75ak.js";import{c as xe}from"./vendor-supabase-DS4euJVY.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerPolicy&&(c.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?c.credentials="include":t.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(t){if(t.ep)return;t.ep=!0;const c=n(t);fetch(t.href,c)}})();var se={exports:{}},L={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var he=r,ge=Symbol.for("react.element"),be=Symbol.for("react.fragment"),fe=Object.prototype.hasOwnProperty,ve=he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,je={key:!0,ref:!0,__self:!0,__source:!0};function ne(a,s,n){var i,t={},c=null,l=null;n!==void 0&&(c=""+n),s.key!==void 0&&(c=""+s.key),s.ref!==void 0&&(l=s.ref);for(i in s)fe.call(s,i)&&!je.hasOwnProperty(i)&&(t[i]=s[i]);if(a&&a.defaultProps)for(i in s=a.defaultProps,s)t[i]===void 0&&(t[i]=s[i]);return{$$typeof:ge,type:a,key:c,ref:l,props:t,_owner:ve.current}}L.Fragment=be;L.jsx=ne;L.jsxs=ne;se.exports=L;var e=se.exports,ie,H=ae;ie=H.createRoot,H.hydrateRoot;const ye="modulepreload",_e=function(a){return"/sintonia-fesi/"+a},W={},N=function(s,n,i){let t=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));t=Promise.allSettled(n.map(g=>{if(g=_e(g),g in W)return;W[g]=!0;const h=g.endsWith(".css"),p=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${p}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":ye,h||(d.as="script"),d.crossOrigin="",d.href=g,u&&d.setAttribute("nonce",u),document.head.appendChild(d),h)return new Promise((o,x)=>{d.addEventListener("load",o),d.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${g}`)))})}))}function c(l){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=l,window.dispatchEvent(u),!u.defaultPrevented)throw l}return t.then(l=>{for(const u of l||[])u.status==="rejected"&&c(u.reason);return s().catch(c)})},K="1.0.0",Y={bajo:{max:33},moderado:{max:66}},F={bajo:"Bajo nivel de atención",moderado:"Atención moderada",prioritario:"Atención prioritaria"},k={ANSWERS:"sintonia.answers",CONSENT:"sintonia.consent",RESULT:"sintonia.result",ANON_CODE:"sintonia.anon_code"},te="generate-orientation",R="sintonia.student";function J(){try{const a=sessionStorage.getItem(R);if(a)return JSON.parse(a);const s=sessionStorage.getItem(k.ANON_CODE);return s?{code:s,password:null}:null}catch{return null}}function Ne(a){a?sessionStorage.setItem(R,JSON.stringify(a)):sessionStorage.removeItem(R),window.dispatchEvent(new Event("sintonia:student"))}function we(){sessionStorage.removeItem(R),sessionStorage.removeItem(k.ANON_CODE),window.dispatchEvent(new Event("sintonia:student"))}function O(){const[a,s]=r.useState(J),n=r.useCallback(()=>s(J()),[]);return r.useEffect(()=>{const i=()=>n();return window.addEventListener("sintonia:student",i),window.addEventListener("storage",i),()=>{window.removeEventListener("sintonia:student",i),window.removeEventListener("storage",i)}},[n]),{student:a,setStudent:i=>{Ne(i),n()},clearStudent:()=>{we(),n()}}}function Se(){const{student:a,clearStudent:s}=O(),n=!!(a!=null&&a.code),i=q(),[t,c]=r.useState(null),[l,u]=r.useState(!1),g=r.useRef(null);r.useEffect(()=>{c(null),u(!1)},[i.pathname]),r.useEffect(()=>{function x(v){var w;(w=g.current)!=null&&w.contains(v.target)||c(null)}return document.addEventListener("click",x),()=>document.removeEventListener("click",x)},[]),r.useEffect(()=>(document.body.style.overflow=l?"hidden":"",document.body.classList.toggle("drawer-open",l),()=>{document.body.style.overflow="",document.body.classList.remove("drawer-open")}),[l]);function h(x){c(v=>v===x?null:x)}function p(){u(!1)}function d(){u(!1),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(s(),window.location.assign("/sintonia-fesi/"))}const o=n?a.code.split("-").map(x=>x[0]).join("").slice(0,3):"";return e.jsxs("header",{className:"site-header",children:[e.jsxs("div",{className:"container topbar",children:[e.jsxs(f,{to:"/",className:"brand","aria-label":"Sintonía FES Iztacala, ir al inicio",children:[e.jsx("img",{src:"/sintonia-fesi/Sintonia-icon192.png",srcSet:"/sintonia-fesi/Sintonia-icon192.png 1x, /sintonia-fesi/Sintonia-icon512.png 2x",alt:"Sintonía FES Iztacala",className:"brand-logo",width:"56",height:"56"}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("strong",{children:"Sintonía FES Iztacala"}),e.jsx("span",{children:"Bienestar emocional universitario"})]})]}),e.jsx("button",{type:"button",className:"mobile-toggle",onClick:()=>u(!0),"aria-label":"Abrir menú",children:"☰"}),e.jsxs("nav",{className:"nav","aria-label":"Navegación principal",ref:g,children:[e.jsx(m,{to:"/",end:!0,className:"nav-link",children:"Inicio"}),e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${t==="discover"?"active":""}`,onClick:()=>h("discover"),"aria-haspopup":"true","aria-expanded":t==="discover",children:"Conocer ▾"}),t==="discover"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(m,{to:"/recursos",children:"📌 Recursos"}),e.jsx(m,{to:"/calendario",children:"📅 Calendario"}),e.jsx(m,{to:"/mapa",children:"🗺 Mapa"}),e.jsx(m,{to:"/emociones",children:"📖 Emociones"})]})]}),e.jsx(m,{to:"/apoyo",className:"nav-link",children:"🆘 Apoyo"}),n&&e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${t==="mine"?"active":""}`,onClick:()=>h("mine"),"aria-haspopup":"true","aria-expanded":t==="mine",children:"Mi rincón ▾"}),t==="mine"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(m,{to:"/mi-historia",children:"📊 Mi historia"}),e.jsx(m,{to:"/check-in",children:"📝 Check-in"}),e.jsx(m,{to:"/diario",children:"📔 Diario"}),e.jsx(m,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(m,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(m,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(m,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(m,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(m,{to:"/arboles",children:"🌳 Mis árboles"})]})]}),!n&&e.jsx(m,{to:"/mi-historia",className:"nav-link",children:"Mi historia"}),e.jsx(m,{to:"/privacidad",className:"nav-link nav-tiny",children:"Privacidad"}),n?e.jsxs("div",{className:"dropdown",children:[e.jsxs("button",{type:"button",className:`user-chip ${t==="user"?"active":""}`,onClick:()=>h("user"),"aria-haspopup":"true","aria-expanded":t==="user",title:"Abrir menú",children:[e.jsx("span",{className:"initials",children:o}),e.jsx("small",{children:a.code}),e.jsx("span",{className:"chev","aria-hidden":"true",children:"▾"})]}),t==="user"&&e.jsxs("div",{className:"drop-panel user-drop",children:[e.jsx(m,{to:"/mi-historia",end:!0,children:"📊 Mi panel"}),e.jsx(m,{to:"/check-in",children:"📝 Check-in semanal"}),e.jsx(m,{to:"/diario",children:"📔 Diario emocional"}),e.jsx(m,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(m,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(m,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(m,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(m,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(m,{to:"/arboles",children:"🌳 Mis árboles"}),e.jsx("hr",{style:{margin:"6px 0",border:0,borderTop:"1px solid var(--c-borde-soft)"}}),e.jsx("button",{type:"button",className:"logout-link",onClick:()=>{c(null),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en el sistema. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(s(),window.location.assign("/sintonia-fesi/"))},children:"↩ Cerrar sesión"})]})]}):e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-sm nav-cta",children:"Iniciar orientación"})]})]}),l&&ae.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mobile-overlay",onClick:p}),e.jsxs("aside",{className:"mobile-drawer",role:"dialog","aria-label":"Menú principal",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"Menú"}),e.jsx("button",{className:"close-x",onClick:p,"aria-label":"Cerrar",children:"✕"})]}),n&&e.jsxs("div",{className:"m-user",children:[e.jsx("span",{className:"m-initials",children:o}),e.jsxs("div",{children:[e.jsx("strong",{children:"Tu código"}),e.jsx("code",{children:a.code})]})]}),e.jsxs("nav",{className:"m-nav",children:[e.jsx(m,{to:"/",end:!0,onClick:p,children:"🏠 Inicio"}),e.jsx("h4",{children:"Conocer"}),e.jsx(m,{to:"/recursos",onClick:p,children:"📌 Recursos"}),e.jsx(m,{to:"/calendario",onClick:p,children:"📅 Calendario"}),e.jsx(m,{to:"/mapa",onClick:p,children:"🗺 Mapa"}),e.jsx(m,{to:"/emociones",onClick:p,children:"📖 Emociones"}),e.jsx("h4",{children:"Apoyo"}),e.jsx(m,{to:"/apoyo",onClick:p,children:"🆘 Apoyo y canalización"}),n&&e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:"Mi rincón"}),e.jsx(m,{to:"/mi-historia",onClick:p,children:"📊 Mi panel"}),e.jsx(m,{to:"/check-in",onClick:p,children:"📝 Check-in semanal"}),e.jsx(m,{to:"/diario",onClick:p,children:"📔 Diario"}),e.jsx(m,{to:"/ruta",onClick:p,children:"🛤 Mi ruta"}),e.jsx(m,{to:"/companion",onClick:p,children:"🤝 Pum-AI"}),e.jsx(m,{to:"/biblioteca",onClick:p,children:"📚 Biblioteca"}),e.jsx(m,{to:"/aventura",onClick:p,children:"🗺 Aventura"}),e.jsx(m,{to:"/buddy",onClick:p,children:"🫂 Buddy"}),e.jsx(m,{to:"/arboles",onClick:p,children:"🌳 Mis árboles"})]}),e.jsx("h4",{children:"Información"}),e.jsx(m,{to:"/privacidad",onClick:p,children:"🔒 Privacidad"}),e.jsx("div",{className:"m-cta",children:n?e.jsx("button",{type:"button",className:"btn btn-coral",onClick:d,children:"↩ Cerrar sesión"}):e.jsx(f,{to:"/consentimiento",onClick:p,className:"btn btn-primary btn-lg",children:"Iniciar orientación"})})]})]})]}),document.body)]})}function ke(){const a=new Date().getFullYear();return e.jsx("footer",{className:"site-footer",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-card",children:[e.jsxs("div",{children:[e.jsx("h4",{children:"Sintonía FES Iztacala"}),e.jsx("p",{children:"Plataforma universitaria de orientación para el bienestar emocional. No constituye diagnóstico ni sustituye atención profesional."})]}),e.jsxs("div",{className:"footer-links",children:[e.jsx(f,{to:"/privacidad",children:"Aviso de privacidad"}),e.jsx(f,{to:"/recursos",children:"Recursos de apoyo"}),e.jsx(f,{to:"/admin",children:"Acceso interno"})]})]}),e.jsxs("p",{className:"footer-credits",children:["© Universidad Nacional Autónoma de México, ",a,"."]})]})})}const D="sintonia.crisis_visible";function Ee(){const a=q(),[s,n]=r.useState(!1),[i,t]=r.useState(!1),c=a.pathname.startsWith("/admin")||a.pathname.startsWith("/apoyo");r.useEffect(()=>{try{const u=JSON.parse(sessionStorage.getItem(k.RESULT)||"null");u&&u.general_level==="prioritario"&&localStorage.setItem(D,"1")}catch{}n(localStorage.getItem(D)==="1")},[a.pathname]);function l(){localStorage.setItem(D,"0"),n(!1),t(!1)}return!s||c?null:e.jsxs(e.Fragment,{children:[i&&e.jsxs("div",{className:"crisis-panel",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"🆘 Apoyo inmediato"}),e.jsx("button",{onClick:()=>t(!1),"aria-label":"Cerrar",children:"✕"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Línea de la Vida"})," — orientación gratuita, confidencial, 24/7."]}),e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral",children:"📞 800 290 0024"}),e.jsx(f,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver más opciones"}),e.jsx("button",{className:"dismiss",onClick:l,children:"Ocultar este botón"})]}),e.jsx("button",{className:`crisis-fab ${i?"open":""}`,onClick:()=>t(u=>!u),title:"Apoyo inmediato","aria-label":"Abrir apoyo inmediato",children:"🆘"}),e.jsx("style",{children:`
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
      `})]})}const Ce="https://knblatuzbgzgnugwkxdp.supabase.co",re="sb_publishable_yBtfhxGitkJdS9jXO4CGxg_qmMkg3RF",E=!!re,j=E?xe(Ce,re,{auth:{persistSession:!0,autoRefreshToken:!0,storageKey:"sintonia.auth"}}):null,Q="sintonia.webinar_dismissed_",ze=24;function Ae(){const{student:a}=O(),s=q(),[n,i]=r.useState(null),[t,c]=r.useState(!1),[l,u]=r.useState(!1),[g,h]=r.useState(!1),d=["/admin","/evaluacion","/consentimiento"].some(_=>s.pathname.startsWith(_));r.useEffect(()=>{E&&(async()=>{const{data:_}=await j.from("view_upcoming_webinars").select("*").order("starts_at").limit(1).maybeSingle();if(_){try{const A=localStorage.getItem(Q+_.id);if(A){const C=Number(A);if(Date.now()-C<ze*3600*1e3)return}}catch{}i(_),setTimeout(()=>c(!0),2500)}})()},[]),r.useEffect(()=>{!n||!(a!=null&&a.code)||j.from("event_rsvp").select("id").eq("event_id",n.id).eq("anonymous_code",a.code).maybeSingle().then(({data:_})=>h(!!_))},[n,a==null?void 0:a.code]);function o(){if(n!=null&&n.id)try{localStorage.setItem(Q+n.id,String(Date.now()))}catch{}c(!1)}async function x(){if(!(a!=null&&a.code)){window.location.assign("/sintonia-fesi/mi-historia");return}u(!0),await j.from("event_rsvp").upsert({event_id:n.id,anonymous_code:a.code},{onConflict:"event_id,anonymous_code"}),h(!0),u(!1)}if(!n||d)return null;const w=new Date(n.starts_at).toLocaleString("es-MX",{weekday:"long",day:"2-digit",month:"long",hour:"2-digit",minute:"2-digit"});return e.jsxs(e.Fragment,{children:[!t&&e.jsxs("button",{className:"webinar-pill",onClick:()=>c(!0),"aria-label":"Abrir aviso de webinar",children:["📡 ",e.jsx("span",{children:"Webinar próximo"})]}),t&&e.jsxs("div",{className:"webinar-toast",role:"dialog","aria-label":"Próximo webinar",children:[e.jsx("button",{className:"dismiss-btn",onClick:o,"aria-label":"Cerrar",children:"✕"}),n.image_url&&e.jsx("img",{src:n.image_url,alt:"",className:"webinar-img"}),e.jsxs("div",{className:"webinar-body",children:[e.jsx("span",{className:"webinar-tag",children:"📡 Próximo webinar"}),e.jsx("h3",{children:n.title}),n.speaker&&e.jsxs("small",{children:["👤 ",n.speaker]}),e.jsxs("small",{children:["🗓 ",w]}),n.location&&e.jsxs("small",{children:["📍 ",n.location]}),n.description&&e.jsx("p",{className:"webinar-desc",children:n.description}),e.jsxs("div",{className:"webinar-actions",children:[g?e.jsx("span",{className:"rsvped-chip",children:"✓ Apuntado(a)"}):e.jsx("button",{className:"btn btn-primary btn-sm",onClick:x,disabled:l,children:l?"…":a!=null&&a.code?"✋ Me interesa":"✋ Crear código y apuntarme"}),n.url&&e.jsx("a",{href:n.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Más info →"})]})]})]}),e.jsx("style",{children:`
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
          color: #2F8770;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 700;
        }
      `})]})}function qe(){const a=r.useRef(null);return r.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=null;function i(){if(!a.current)return;const c=window.scrollY;a.current.style.transform=`translate3d(0, ${c*-.1}px, 0)`,n=null}function t(){n==null&&(n=requestAnimationFrame(i))}return i(),window.addEventListener("scroll",t,{passive:!0}),()=>{window.removeEventListener("scroll",t),n&&cancelAnimationFrame(n)}},[]),e.jsxs("div",{ref:a,className:"wellness-bg","aria-hidden":"true",children:[e.jsx("div",{className:"bg-wash"}),e.jsx("div",{className:"bg-blob bg-blob-lavender"}),e.jsx("div",{className:"bg-blob bg-blob-peach"}),e.jsx("div",{className:"bg-blob bg-blob-durazno"}),e.jsx("div",{className:"bg-blob bg-blob-rosa"}),e.jsx("div",{className:"bg-blob bg-blob-coral"}),e.jsx("style",{children:`
        .wellness-bg {
          position: fixed;
          inset: -10vh -10vw;     /* Sobre-cubre los bordes para que el parallax no muestre vacío */
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          will-change: transform;
        }

        /* ===== Wash base — Atardecer abrazo:
                lavanda → peach → rosa pastel → durazno ===== */
        .bg-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg,
              rgba(183, 168, 217, 0.55) 0%,    /* lavanda */
              rgba(255, 184, 156, 0.50) 35%,   /* peach */
              rgba(255, 199, 216, 0.45) 65%,   /* rosa pastel */
              rgba(255, 216, 158, 0.42) 100%   /* durazno */
            );
          background-size: 250% 250%;
          animation: washShift 32s ease-in-out infinite;
          opacity: 0.88;
        }
        @keyframes washShift {
          0%   { background-position:   0%   0%; }
          25%  { background-position: 100%  30%; }
          50%  { background-position: 100% 100%; }
          75%  { background-position:   0%  70%; }
          100% { background-position:   0%   0%; }
        }

        /* ===== Blobs de color que se mezclan ===== */
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          mix-blend-mode: multiply;
          will-change: transform;
        }

        /* Lavanda — dominante (calma, introspección) */
        .bg-blob-lavender {
          width: 90vmax; height: 90vmax;
          top: -25vmax; left: -25vmax;
          background: radial-gradient(circle, var(--c-lavanda-500) 0%, transparent 55%);
          opacity: 0.75;
          animation: drift-1 38s ease-in-out infinite;
        }
        /* Peach — calidez, abrazo (reemplaza la salvia) */
        .bg-blob-peach {
          width: 80vmax; height: 80vmax;
          bottom: -20vmax; right: -15vmax;
          background: radial-gradient(circle, var(--c-peach-500) 0%, transparent 58%);
          opacity: 0.72;
          animation: drift-2 42s ease-in-out infinite;
        }
        /* Durazno — alegría dorada (sustituye al oro como blob) */
        .bg-blob-durazno {
          width: 70vmax; height: 70vmax;
          top: 20vh; right: -15vmax;
          background: radial-gradient(circle, var(--c-durazno-500) 0%, transparent 60%);
          opacity: 0.6;
          animation: drift-3 36s ease-in-out infinite;
        }
        /* Rosa pastel — ternura, juventud (reemplaza al azul) */
        .bg-blob-rosa {
          width: 65vmax; height: 65vmax;
          top: 50vh; left: 30vw;
          background: radial-gradient(circle, var(--c-rosa-500) 0%, transparent 60%);
          opacity: 0.55;
          animation: drift-5 50s ease-in-out infinite;
        }
        /* Coral — chispa cálida (mantenido, más sutil) */
        .bg-blob-coral {
          width: 60vmax; height: 60vmax;
          bottom: 10vh; left: -10vmax;
          background: radial-gradient(circle, var(--c-coral-500) 0%, transparent 62%);
          opacity: 0.42;
          animation: drift-4 44s ease-in-out infinite;
        }

        @keyframes drift-1 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          25%      { transform: translate(20vw, 25vh)        scale(1.10); }
          50%      { transform: translate(40vw, -10vh)       scale(0.95); }
          75%      { transform: translate(-10vw, 30vh)       scale(1.05); }
        }
        @keyframes drift-2 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          33%      { transform: translate(-25vw, -20vh)      scale(1.08); }
          66%      { transform: translate(15vw, -10vh)       scale(0.92); }
        }
        @keyframes drift-3 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          50%      { transform: translate(-30vw, 25vh)       scale(1.15); }
        }
        @keyframes drift-4 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          33%      { transform: translate(35vw, -15vh)       scale(0.90); }
          66%      { transform: translate(20vw, 20vh)        scale(1.10); }
        }
        @keyframes drift-5 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          50%      { transform: translate(-20vw, -25vh)      scale(1.20); }
        }

        /* ===== Reduced motion: sin animación pero mantenemos colores ===== */
        @media (prefers-reduced-motion: reduce) {
          .bg-wash, .bg-blob { animation: none; }
        }

        /* ===== Mobile: bajamos blur para mejor performance ===== */
        @media (max-width: 720px) {
          .bg-blob { filter: blur(60px); }
          .bg-blob-rosa  { display: none; }
          .bg-blob-coral { display: none; }
        }
      `})]})}const oe="sintonia.buddyToast.dismissed",Ie=30*60*1e3;function Re(){try{const a=Number(sessionStorage.getItem(oe)||0);return a&&Date.now()-a<Ie}catch{return!1}}function Te(){const{student:a}=O(),s=T(),n=q(),[i,t]=r.useState(!1),[c,l]=r.useState(0),u=r.useRef(null),g=r.useRef(0),h=(a==null?void 0:a.code)||null,p=n.pathname.startsWith("/admin"),d=n.pathname==="/buddy",o=n.pathname==="/evaluacion";r.useEffect(()=>{if(!h||p||d||o){t(!1);return}let w=!0;async function _(){const{count:C}=await j.from("buddy_queue").select("*",{count:"exact",head:!0}).neq("anonymous_code",h);if(!w)return;const z=C??0;l(z);const{data:y}=await j.from("buddy_pairs").select("id").or(`code_a.eq.${h},code_b.eq.${h}`).eq("active",!0).limit(1).maybeSingle();if(!w)return;const S=z>0&&!y&&!Re();S&&Date.now()-g.current>6e4?(t(!0),g.current=Date.now(),u.current&&clearTimeout(u.current),u.current=setTimeout(()=>t(!1),25e3)):S||t(!1)}_();const A=j.channel("buddy-queue-watch").on("postgres_changes",{event:"INSERT",schema:"public",table:"buddy_queue"},C=>{var z;((z=C.new)==null?void 0:z.anonymous_code)!==h&&_()}).on("postgres_changes",{event:"DELETE",schema:"public",table:"buddy_queue"},()=>_()).subscribe();return()=>{w=!1,u.current&&clearTimeout(u.current),j.removeChannel(A)}},[h,p,d,o]);function x(){t(!1);try{sessionStorage.setItem(oe,String(Date.now()))}catch{}}function v(){t(!1),s("/buddy")}return i?e.jsxs("div",{className:"bud-toast",role:"status","aria-live":"polite",children:[e.jsx("div",{className:"bud-toast-icon",children:"🤝"}),e.jsxs("div",{className:"bud-toast-body",children:[e.jsx("strong",{children:"Alguien busca un buddy ahora"}),e.jsxs("p",{children:[c===1?"Otro estudiante anónimo está esperando en la cola.":`Hay ${c} estudiantes anónimos esperando.`," ¿Conectamos?"]}),e.jsxs("div",{className:"bud-toast-actions",children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:v,children:"Sí, conectar"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:x,children:"Ahora no"})]})]}),e.jsx("button",{className:"bud-toast-close",onClick:x,"aria-label":"Cerrar",children:"×"}),e.jsx("style",{children:`
        .bud-toast {
          position: fixed;
          right: 18px;
          bottom: 100px;
          z-index: 9000;
          width: min(360px, calc(100vw - 36px));
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(10px) saturate(1.2);
          -webkit-backdrop-filter: blur(10px) saturate(1.2);
          border: 1px solid rgba(232,200,104,0.55);
          border-radius: 16px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.7) inset,
            0 18px 38px rgba(16,36,62,0.20),
            0 6px 14px rgba(16,36,62,0.10);
          padding: 14px 16px 14px 14px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          animation: budToastIn 0.32s ease both;
        }
        .bud-toast-icon {
          flex-shrink: 0;
          width: 42px; height: 42px;
          background: var(--c-oro-100);
          border-radius: 50%;
          display: grid; place-items: center;
          font-size: 1.2rem;
        }
        .bud-toast-body { flex: 1; min-width: 0; }
        .bud-toast-body strong {
          display: block;
          color: var(--c-azul-800);
          font-size: 0.95rem;
          margin-bottom: 2px;
        }
        .bud-toast-body p {
          margin: 0 0 10px;
          font-size: 0.86rem;
          color: var(--c-texto-soft, var(--c-texto));
          line-height: 1.4;
        }
        .bud-toast-actions {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .bud-toast-actions .btn {
          padding: 7px 14px;
          font-size: 0.84rem;
        }
        .bud-toast-close {
          background: transparent; border: 0;
          font-size: 1.4rem; line-height: 1;
          color: var(--c-gris);
          cursor: pointer;
          padding: 0 4px;
          align-self: flex-start;
        }
        .bud-toast-close:hover { color: var(--c-azul-800); }

        @keyframes budToastIn {
          from { opacity: 0; transform: translate3d(0, 14px, 0) scale(0.97); }
          to   { opacity: 1; transform: translate3d(0, 0, 0)    scale(1); }
        }

        @media (max-width: 540px) {
          .bud-toast {
            right: 12px; left: 12px; bottom: 92px;
            width: auto;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bud-toast { animation: none; }
        }
      `})]}):null}function Le(){return e.jsx("section",{className:"hero",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"hero-grid",children:[e.jsxs("div",{className:"hero-card card fade-in",children:[e.jsx("span",{className:"tag",children:"Programa universitario · FES Iztacala"}),e.jsxs("h1",{className:"mt-2",children:["Sintonízate contigo, con tu ",e.jsx("span",{style:{color:"var(--c-oro-700)"},children:"comunidad"})," ","y con tu bienestar."]}),e.jsx("p",{className:"lede",children:"Una autoevaluación breve, anónima y con recomendaciones personalizadas para reflexionar sobre tu bienestar emocional y conocer recursos de apoyo en FES Iztacala y la UNAM."}),e.jsxs("ul",{className:"hero-checks",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"20 preguntas"})," en 7 a 10 minutos"]}),e.jsxs("li",{children:["Resultado ",e.jsx("strong",{children:"informativo, anónimo y confidencial"})]}),e.jsxs("li",{children:["Recomendaciones y vinculación con ",e.jsx("strong",{children:"recursos universitarios"})]})]}),e.jsxs("div",{className:"hero-actions",children:[e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(f,{to:"/privacidad",className:"btn btn-ghost",children:"Aviso de privacidad"})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"20"}),e.jsx("span",{children:"preguntas"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"7-10"}),e.jsx("span",{children:"minutos"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"0"}),e.jsx("span",{children:"datos personales"})]})]})]}),e.jsx("aside",{className:"hero-visual fade-in","aria-hidden":"true",children:e.jsx("div",{className:"hero-logo-wrap",children:e.jsx("img",{className:"hero-logo",src:"/sintonia-fesi/Sintonia.png",alt:"Sintonía FES Iztacala",loading:"eager",decoding:"async"})})})]})})})}function Oe({icon:a="✦",title:s,children:n,accent:i="azul"}){return e.jsxs("article",{className:`info-card accent-${i}`,children:[e.jsx("div",{className:"info-icon","aria-hidden":"true",children:a}),e.jsx("h3",{children:s}),e.jsx("p",{children:n})]})}function P({variant:a="default",children:s}){return e.jsxs("aside",{className:`safety-notice safety-${a}`,role:"note",children:[e.jsx("span",{className:"safety-icon","aria-hidden":"true",children:"ⓘ"}),e.jsx("div",{children:s||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," No constituye un diagnóstico médico ni psicológico, ni reemplaza la atención profesional. Si necesitas apoyo, acércate a los servicios de orientación y salud de la UNAM."]})})]})}function $(){const a=new Date;return a.getFullYear()*1e3+a.getMonth()*32+a.getDate()}function ce(a){return!a||a.length===0?null:a[$()%a.length]}function Pe({compact:a=!1}){const[s,n]=r.useState(null);return r.useEffect(()=>{j.from("student_library").select("id, title, body, meta").eq("category","quote").eq("active",!0).then(({data:i})=>n(ce(i)))},[]),s?e.jsxs("div",{className:`daily-quote ${a?"compact":""}`,children:[e.jsx("small",{children:"💭 Frase del día"}),e.jsxs("blockquote",{children:['"',s.title,'"']}),s.body&&e.jsxs("cite",{children:["— ",s.body]}),e.jsx("style",{children:`
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
      `})]}):null}function De(){const{student:a}=O(),[s,n]=r.useState(null),[i,t]=r.useState(!1);r.useEffect(()=>{j.from("student_library").select("id, title, body").eq("category","challenge").eq("active",!0).then(({data:l})=>n(ce(l)))},[]),r.useEffect(()=>{if(!s||!(a!=null&&a.code))return;const l=`challenge_${$()}_${s.id}`;j.from("student_achievements").select("id").eq("anonymous_code",a.code).eq("achievement_key",l).maybeSingle().then(({data:u})=>t(!!u))},[s,a==null?void 0:a.code]);async function c(){if(!(a!=null&&a.code)||!s)return;const l=`challenge_${$()}_${s.id}`;await j.from("student_achievements").upsert({anonymous_code:a.code,achievement_key:l}),t(!0)}return s?e.jsxs("div",{className:"daily-challenge",children:[e.jsx("small",{children:"🎯 Reto del día"}),e.jsx("h3",{children:s.title}),s.body&&e.jsx("p",{children:s.body}),(a==null?void 0:a.code)&&e.jsx("button",{className:`btn ${i?"btn-ghost":"btn-coral"} btn-sm`,onClick:c,disabled:i,children:i?"✓ ¡Lo hiciste!":"Marcar como hecho"}),e.jsx("style",{children:`
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
      `})]}):null}const Me=[{icon:"📝",accent:"azul",title:"Evaluación breve",text:"Veinte preguntas en aproximadamente siete a diez minutos."},{icon:"📊",accent:"oro",title:"Resultado informativo",text:"Un panorama de tus dimensiones de bienestar, sin etiquetas clínicas."},{icon:"🌿",accent:"mint",title:"Recomendaciones personalizadas",text:"Acciones de autocuidado y vinculación con actividades universitarias."},{icon:"🏛",accent:"coral",title:"Recursos universitarios",text:"Orientación psicológica, deporte, cultura, comunidad y bienestar verde."},{icon:"🤝",accent:"lavanda",title:"IA con responsabilidad",text:"Te acompaña con redacción amable; nunca diagnostica ni sustituye atención profesional."}],Fe=[{icon:"🧠",tone:"azul",label:"Psicología"},{icon:"⚖️",tone:"oro",label:"Equilibrio"},{icon:"🌿",tone:"mint",label:"Calma"},{icon:"🤝",tone:"coral",label:"Comunidad"},{icon:"✨",tone:"lavanda",label:"Sintonía"},{icon:"🎨",tone:"rosa",label:"Arte"},{icon:"🏃",tone:"durazno",label:"Deporte"},{icon:"📚",tone:"azul",label:"Estudio"},{icon:"💛",tone:"peach",label:"Bienestar"}];function $e(){return e.jsxs(e.Fragment,{children:[e.jsx(Le,{}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center",style:{maxWidth:640,margin:"0 auto"},children:[e.jsx("span",{className:"tag lavanda",children:"Áreas que acompañamos"}),e.jsx("h2",{className:"mt-2",style:{fontSize:"clamp(1.3rem, 2vw, 1.8rem)"},children:"Lo que cuida Sintonía FES Iztacala"})]}),e.jsx("div",{className:"areas-grid",children:Fe.map(a=>e.jsxs("div",{className:`area-chip area-${a.tone}`,children:[e.jsx("span",{className:"area-icon","aria-hidden":"true",children:a.icon}),e.jsx("span",{className:"area-label",children:a.label})]},a.label))}),e.jsx("style",{children:`
            .areas-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
              gap: 12px;
              margin-top: 22px;
              max-width: 980px;
              margin-left: auto;
              margin-right: auto;
            }
            .area-chip {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 14px 18px;
              border-radius: 16px;
              background: rgba(255,255,255,0.85);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid rgba(255,255,255,0.6);
              box-shadow: 0 4px 14px rgba(108,80,124,0.06);
              font-weight: 600;
              transition: transform 0.25s ease, box-shadow 0.25s ease;
            }
            .area-chip:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(108,80,124,0.12); }
            .area-icon { font-size: 1.4rem; }
            .area-label { font-family: var(--ff-serif); font-size: 1rem; }

            .area-azul    { color: var(--c-azul-800);     border-color: rgba(16,36,62,0.18); }
            .area-oro     { color: var(--c-oro-700);      border-color: rgba(201,162,39,0.30); }
            .area-mint    { color: var(--c-mint-700);     border-color: rgba(125,196,174,0.45); }
            .area-coral   { color: var(--c-coral-700);    border-color: rgba(232,130,107,0.40); }
            .area-lavanda { color: var(--c-lavanda-700);  border-color: rgba(157,123,217,0.35); }
            .area-rosa    { color: var(--c-rosa-700);     border-color: rgba(232,130,159,0.40); }
            .area-durazno { color: var(--c-durazno-700);  border-color: rgba(224,172,74,0.40); }
            .area-peach   { color: var(--c-peach-700);    border-color: rgba(255,154,123,0.40); }

            @media (max-width: 540px) {
              .areas-grid { grid-template-columns: repeat(2, 1fr); }
              .area-chip { padding: 11px 14px; }
              .area-label { font-size: 0.92rem; }
              .area-icon { font-size: 1.2rem; }
            }
          `})]})}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",style:{maxWidth:980},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[e.jsx(Pe,{}),e.jsx(De,{})]}),e.jsx("style",{children:`
            @media (max-width: 720px) {
              .section-sm > .container > div { grid-template-columns: 1fr !important; }
            }
          `})]})}),e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag",children:"Cómo te acompaña Sintonía FES Iztacala"}),e.jsx("h2",{className:"mt-2",children:"Una orientación clara, anónima y con sentido comunitario"}),e.jsx("p",{className:"lede",children:"Sintonía FES Iztacala es una plataforma para reflexionar sobre tu bienestar emocional, identificar áreas de autocuidado y conocer recursos de apoyo dentro de la UNAM."})]}),e.jsx("div",{className:"pillars",children:Me.map(a=>e.jsx(Oe,{icon:a.icon,title:a.title,accent:a.accent,children:a.text},a.title))}),e.jsxs("div",{className:"continuity-card",children:[e.jsx("div",{className:"continuity-icon","aria-hidden":"true",children:"🔁"}),e.jsxs("div",{children:[e.jsx("span",{className:"tag sage",children:"¿Quieres seguir cuidándote?"}),e.jsx("h3",{className:"mt-2",children:"Tu código anónimo te abre un rincón propio"}),e.jsxs("p",{children:["Si guardas tu código (ej. ",e.jsx("code",{children:"SIN-XXX-####"}),") puedes regresar cuando quieras y obtener acceso a:"]}),e.jsxs("ul",{className:"continuity-list",children:[e.jsxs("li",{children:["📝 ",e.jsx("strong",{children:"Check-in semanal"})," de 30 segundos"]}),e.jsxs("li",{children:["📔 ",e.jsx("strong",{children:"Diario emocional"})," rápido (1 línea/día)"]}),e.jsxs("li",{children:["🛤 ",e.jsx("strong",{children:"Ruta de bienestar"})," de 7 o 14 días personalizada"]}),e.jsxs("li",{children:["🤝 ",e.jsx("strong",{children:"Pum-AI acompañante"})," para conversar cuando lo necesites"]}),e.jsxs("li",{children:["📚 ",e.jsx("strong",{children:"Biblioteca"})," de respiraciones, sonidos y videos"]}),e.jsxs("li",{children:["🗺 ",e.jsx("strong",{children:"Aventura"})," con pistas en el campus"]}),e.jsxs("li",{children:["🌳 ",e.jsx("strong",{children:"Adopta un árbol"})," y cuídalo"]}),e.jsxs("li",{children:["🫂 ",e.jsx("strong",{children:"Buddy anónimo"})," para conectar con otra persona"]}),e.jsxs("li",{children:["📅 ",e.jsx("strong",{children:"Calendario"})," de eventos universitarios"]}),e.jsxs("li",{children:["📊 ",e.jsx("strong",{children:"Tu evolución"})," a lo largo del tiempo"]})]}),e.jsxs("p",{className:"note",children:["Sigue siendo ",e.jsx("strong",{children:"100% anónimo"}),": solo tu código y, si quieres, una contraseña. Nada de nombre, correo ni datos personales."]}),e.jsxs("div",{className:"continuity-actions",children:[e.jsx(f,{to:"/mi-historia",className:"btn btn-gold",children:"Crear mi código anónimo"}),e.jsx(f,{to:"/consentimiento",className:"btn btn-ghost",children:"Solo hacer el test"})]})]})]})]}),e.jsx("style",{children:`
          .continuity-card {
            background: linear-gradient(135deg, var(--c-azul-100), var(--c-salvia-100));
            border: 1px solid rgba(255,184,156,0.4);
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
        `})]}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"cta-band",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"¿Listo para iniciar?"}),e.jsx("p",{children:"La orientación es anónima. No solicitamos nombre, correo, teléfono ni número de cuenta. Tus respuestas se procesan para devolverte un panorama útil y recomendaciones."})]}),e.jsxs("div",{className:"cta-actions",children:[e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(f,{to:"/recursos",className:"btn btn-ghost",children:"Ver recursos de apoyo"})]})]}),e.jsx("div",{className:"mt-4",children:e.jsx(P,{})})]})}),e.jsx("style",{children:`
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
      `})]})}function Ue(){const a=T(),[s,n]=r.useState(!1);function i(){s&&(sessionStorage.setItem(k.CONSENT,JSON.stringify({accepted:!0,timestamp:new Date().toISOString()})),a("/evaluacion"))}return e.jsxs("section",{className:"section",children:[e.jsx("div",{className:"container",style:{maxWidth:820},children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag",children:"Antes de iniciar"}),e.jsx("h1",{className:"mt-2",children:"Consentimiento informado"}),e.jsx("p",{className:"lede",children:"Antes de comenzar, te invitamos a leer las siguientes consideraciones. Tu participación es libre y puedes detenerla en cualquier momento."}),e.jsx("h2",{className:"mt-4",children:"¿Qué es Sintonía FES Iztacala?"}),e.jsxs("p",{children:["Sintonía FES Iztacala es una herramienta ",e.jsx("strong",{children:"informativa"})," de orientación para el bienestar emocional.",e.jsx("strong",{children:" No es un servicio médico, terapéutico ni de atención clínica."}),"Su propósito es ayudarte a reflexionar sobre cómo te has sentido y conocer recursos de apoyo dentro de la universidad."]}),e.jsx("h2",{className:"mt-4",children:"¿Qué pasará con tus respuestas?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"No te pediremos datos personales"}),": ni nombre, ni correo, ni teléfono, ni número de cuenta, ni cualquier información que te identifique directamente."]}),e.jsxs("li",{children:["Generamos un ",e.jsx("strong",{children:"código anónimo"})," (por ejemplo: SIN-KQT-2856) que tú decides guardar si quieres consultar tu resultado más tarde."]}),e.jsxs("li",{children:["Tus respuestas se almacenan de forma ",e.jsx("strong",{children:"anónima y agregada"})," con fines de mejora del programa y análisis estadístico."]}),e.jsxs("li",{children:["Para generar tu orientación amigable, enviamos a un modelo de inteligencia artificial",e.jsx("strong",{children:" únicamente datos agregados"})," (puntajes y dimensiones), nunca información personal."]})]}),e.jsx("h2",{className:"mt-4",children:"Limitaciones"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["El resultado es ",e.jsx("strong",{children:"informativo, no diagnóstico"}),"."]}),e.jsx("li",{children:"No reemplaza la atención psicológica o médica profesional."}),e.jsx("li",{children:"Si necesitas apoyo, te invitamos a acercarte a los servicios universitarios de orientación."})]}),e.jsxs(P,{variant:"gold",children:["Si en este momento estás atravesando una crisis o piensas en hacerte daño, comunícate de inmediato a la ",e.jsx("strong",{children:"Línea de la Vida: 800 290 0024"})," (24 horas, gratuito)."]}),e.jsx("div",{className:"consent-box mt-4",children:e.jsxs("label",{className:"consent-label",children:[e.jsx("input",{type:"checkbox",checked:s,onChange:t=>n(t.target.checked)}),e.jsx("span",{children:"He leído y acepto continuar con esta orientación informativa."})]})}),e.jsxs("div",{className:"actions mt-4",children:[e.jsx("button",{type:"button",className:"btn btn-primary btn-lg",onClick:i,disabled:!s,children:"Continuar →"}),e.jsx(f,{to:"/",className:"btn btn-ghost",children:"Volver al inicio"})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Be({current:a,total:s}){const n=s?Math.round(a/s*100):0;return e.jsxs("div",{className:"progress-wrap","aria-label":`Progreso ${n}%`,children:[e.jsxs("div",{className:"progress-meta",children:[e.jsxs("span",{children:["Pregunta ",e.jsx("strong",{children:a})," de ",e.jsx("strong",{children:s})]}),e.jsxs("span",{children:[n,"%"]})]}),e.jsx("div",{className:"progress-bar",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":n,children:e.jsx("span",{style:{width:`${n}%`}})})]})}const G=[{id:"estado_emocional",label:"Estado emocional"},{id:"estres_academico",label:"Estrés académico"},{id:"sueno_descanso",label:"Sueño y descanso"},{id:"apoyo_social",label:"Convivencia y apoyo social"},{id:"motivacion_pertenencia",label:"Motivación y pertenencia"}],X=[{id:"q01",sort_order:1,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"En los últimos días, ¿con qué frecuencia te has sentido triste o desanimado(a)?"},{id:"q02",sort_order:2,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"¿Has sentido nervios o preocupación que te cuesta calmar?"},{id:"q03",sort_order:3,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has logrado disfrutar momentos pequeños de tu día a día?"},{id:"q04",sort_order:4,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has podido reconocer cómo te sientes y darle nombre a tus emociones?"},{id:"q05",sort_order:5,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Has sentido que tus actividades académicas o personales te rebasan?"},{id:"q06",sort_order:6,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Te ha costado concentrarte al estudiar o atender tus clases?"},{id:"q07",sort_order:7,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has logrado organizar tu tiempo entre estudio, descanso y vida personal?"},{id:"q08",sort_order:8,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has podido afrontar exámenes o entregas con relativa calma?"},{id:"q09",sort_order:9,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has logrado descansar lo suficiente para realizar tus actividades cotidianas?"},{id:"q10",sort_order:10,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has mantenido un horario de sueño relativamente constante?"},{id:"q11",sort_order:11,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Te has despertado cansado(a) o con poca energía?"},{id:"q12",sort_order:12,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Has tenido dificultad para conciliar el sueño o has dormido inquieto(a)?"},{id:"q13",sort_order:13,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has contado con alguien con quien hablar cuando lo necesitas?"},{id:"q14",sort_order:14,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has compartido tiempo con familiares o amistades que te hacen bien?"},{id:"q15",sort_order:15,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Te has sentido solo(a) o con poca conexión con quienes te rodean?"},{id:"q16",sort_order:16,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Has evitado actividades sociales que antes disfrutabas?"},{id:"q17",sort_order:17,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has sentido motivación para participar en tus actividades universitarias?"},{id:"q18",sort_order:18,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has tenido momentos para realizar actividades que te ayuden a sentirte mejor?"},{id:"q19",sort_order:19,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Te has sentido parte de tu comunidad universitaria?"},{id:"q20",sort_order:20,dimension:"motivacion_pertenencia",is_reverse_scored:!1,question_text:"¿Has perdido interés o entusiasmo por metas que antes te importaban?"}],Ve=[{value:0,label:"Nunca"},{value:1,label:"Casi nunca"},{value:2,label:"Algunas veces"},{value:3,label:"Frecuentemente"},{value:4,label:"Casi siempre"}];function He({question:a,value:s,onChange:n,index:i}){return e.jsxs("article",{className:"question-card",children:[e.jsxs("span",{className:"question-number",children:["PREGUNTA ",i+1]}),e.jsx("h2",{className:"question-text",children:a.question_text}),e.jsx("div",{className:"options",role:"radiogroup","aria-label":"Opciones de respuesta",children:Ve.map(t=>e.jsxs("button",{type:"button",role:"radio","aria-checked":s===t.value,className:`option ${s===t.value?"selected":""}`,onClick:()=>n(t.value),children:[e.jsx("span",{className:"opt-mark","aria-hidden":"true"}),e.jsx("span",{children:t.label})]},t.value))})]},a.id)}const Aa=[{id:"orientacion_psicologica",label:"Orientación psicológica",icon:"🧠"},{id:"tutoria_academica",label:"Tutoría académica",icon:"📚"},{id:"deporte",label:"Actividades deportivas",icon:"🏃"},{id:"cultura",label:"Actividades culturales",icon:"🎭"},{id:"comunidad",label:"Integración comunitaria",icon:"🤝"},{id:"medico",label:"Servicios médicos",icon:"🩺"},{id:"emergencia",label:"Atención de emergencia",icon:"☎️"},{id:"sustentabilidad",label:"Bienestar verde",icon:"🌿"}],Z=[{id:"r-uepi",name:"Unidad de Evaluación Psicológica Iztacala (UEPI)",type:"orientacion_psicologica",description:"Acompañamiento psicológico para la comunidad universitaria. Atención individual y grupal.",audience:"Estudiantes UNAM",modality:"Presencial / a distancia",location:"FES Iztacala",schedule:"Lunes a viernes, 9:00 a 17:00",contact:"uepi@iztacala.unam.mx",tags:["psicología","atención","orientación"]},{id:"r-tutorias",name:"Programa Institucional de Tutorías",type:"tutoria_academica",description:"Tutorías académicas y de trayectoria escolar. Acompañamiento para mejorar tu desempeño.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu facultad o escuela",schedule:"Según agenda del tutor",contact:"Coordinación de tutorías de tu plantel",tags:["académico","tutoría","desempeño"]},{id:"r-deporte",name:"Activación física comunitaria",type:"deporte",description:"Sesiones abiertas de yoga, baile y movimiento físico en explanadas universitarias.",audience:"Comunidad UNAM",modality:"Presencial",location:"Explanadas en distintos planteles",schedule:"Martes y jueves, 8:00",contact:"Difusión cultural y deportiva",tags:["deporte","movimiento","comunidad"]},{id:"r-cultura",name:"Talleres culturales",type:"cultura",description:"Talleres de música, escritura, pintura, teatro y otros oficios artísticos abiertos a estudiantes.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Casa del Tiempo y centros culturales",schedule:"Calendario semestral",contact:"Difusión cultural UNAM",tags:["arte","cultura","comunidad"]},{id:"r-comunidad",name:"Círculos de bienestar Sintonía",type:"comunidad",description:"Encuentros guiados para compartir experiencias y construir comunidad.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu plantel",schedule:"Miércoles 17:00",contact:"sintonia@unam.mx",tags:["comunidad","apoyo","pertenencia"]},{id:"r-medico",name:"Servicios médicos universitarios",type:"medico",description:"Consulta médica general gratuita para personal y estudiantes.",audience:"Comunidad UNAM",modality:"Presencial",location:"Centros médicos por plantel",schedule:"Lunes a viernes",contact:"Servicios médicos de tu plantel",tags:["salud","medicina","consulta"]},{id:"r-emergencia",name:"Línea de la Vida (24/7)",type:"emergencia",description:"Servicio de orientación emocional gratuito y confidencial, disponible las 24 horas.",audience:"Cualquier persona",modality:"Telefónica",location:"Nacional",schedule:"24 horas, todos los días",contact:"800 290 0024",tags:["emergencia","crisis","apoyo inmediato"]},{id:"r-sustenta",name:"Bienestar verde — caminatas y jardines",type:"sustentabilidad",description:"Actividades en espacios verdes de Ciudad Universitaria: caminatas, jardines polinizadores, talleres de plantas medicinales.",audience:"Comunidad UNAM",modality:"Presencial",location:"Ciudad Universitaria",schedule:"Sábados 10:00",contact:"sustentabilidad@unam.mx",tags:["sustentabilidad","naturaleza","autocuidado"]}],U=[{dimension:"estado_emocional",level:"bajo",title:"Sigue cultivando tus rutinas de bienestar",description:"Tus respuestas sugieren un buen equilibrio emocional. Mantener pequeñas pausas, gratitud diaria o momentos de movimiento te ayudará a sostenerlo."},{dimension:"estado_emocional",level:"moderado",title:"Espacio para reconocer tus emociones",description:"Considera dedicar 10 minutos al día a registrar lo que sientes. Conversar con alguien de confianza puede aportar perspectiva."},{dimension:"estado_emocional",level:"prioritario",title:"Acércate a un servicio universitario de orientación",description:"Sentir tristeza o nervios sostenidos amerita acompañamiento. Te recomendamos contactar los servicios de orientación psicológica de tu plantel."},{dimension:"estres_academico",level:"bajo",title:"Tu carga académica parece manejable",description:"Conserva tus rutinas de organización. Una agenda y bloques de estudio cortos pueden sostener este ritmo."},{dimension:"estres_academico",level:"moderado",title:"Pequeños ajustes para liberar presión",description:"Prioriza tareas con la técnica de los 3 más importantes del día y agrega pausas activas de 5 minutos cada hora de estudio."},{dimension:"estres_academico",level:"prioritario",title:"Considera apoyo académico y orientación",description:"Sentirte rebasado(a) puede afectar tu desempeño y tu salud. Las tutorías académicas y la orientación universitaria pueden ser un buen primer paso."},{dimension:"sueno_descanso",level:"bajo",title:"Tu descanso es un recurso valioso",description:"Continúa cuidando tus horarios de sueño y exposición a pantallas. Tu energía agradecerá la consistencia."},{dimension:"sueno_descanso",level:"moderado",title:"Refuerza tu higiene del sueño",description:"Apaga pantallas 30 minutos antes de dormir, mantén tu habitación fresca y evita cafeína después del mediodía."},{dimension:"sueno_descanso",level:"prioritario",title:"El descanso necesita atención",description:"Dormir mal de forma sostenida impacta tu ánimo y concentración. Considera consultar con servicios médicos universitarios para descartar causas atendibles."},{dimension:"apoyo_social",level:"bajo",title:"Tu red de apoyo te acompaña",description:"Mantener vínculos cercanos es protector. Procura escuchar a quienes te rodean tanto como ellos te escuchan a ti."},{dimension:"apoyo_social",level:"moderado",title:"Reconecta con personas de confianza",description:"Una llamada o un café con alguien cercano puede reforzar tu bienestar. Las actividades comunitarias universitarias también ayudan."},{dimension:"apoyo_social",level:"prioritario",title:"Buscar compañía es un acto de cuidado",description:"Sentirte aislado(a) merece atención. Considera unirte a actividades culturales o deportivas universitarias y, si lo prefieres, a grupos de orientación."},{dimension:"motivacion_pertenencia",level:"bajo",title:"Tu motivación es un buen aliado",description:"Conserva los proyectos y actividades que te dan propósito. Compartir lo que disfrutas con otros lo amplifica."},{dimension:"motivacion_pertenencia",level:"moderado",title:"Reactiva pequeños propósitos",description:"Establece una meta sencilla esta semana: una clase opcional, una actividad cultural o una salida nueva por tu campus."},{dimension:"motivacion_pertenencia",level:"prioritario",title:"Espacios universitarios para reencontrarte",description:"Talleres, deporte, voluntariado y actividades culturales pueden reabrir el sentido de pertenencia. Acércate a las actividades comunitarias de tu facultad."}];function We(a){return U.filter(s=>{var n;return((n=a[s.dimension])==null?void 0:n.level)===s.level})}async function Ke(){if(!E)return X;const{data:a,error:s}=await j.from("questions").select("id, dimension, question_text, is_reverse_scored, sort_order").eq("active",!0).order("sort_order");return s||!a||a.length===0?(s&&console.warn("[supabase] questions →",s.message),X):a}async function qa(){if(!E)return Z;const{data:a,error:s}=await j.from("resources").select("*").eq("active",!0).order("name");return s||!a||a.length===0?(s&&console.warn("[supabase] resources →",s.message),Z):a}async function Ye(){if(!E)return U;const{data:a,error:s}=await j.from("recommendations").select("dimension, level, title, description").eq("active",!0);return s||!a||a.length===0?(s&&console.warn("[supabase] recommendations →",s.message),U):a}async function Je(a){if(!E)return{saved:!1,id:null};const s=window.crypto&&crypto.randomUUID?crypto.randomUUID():"sin-"+Date.now()+"-"+Math.random().toString(36).slice(2,10),{error:n}=await j.from("assessment_sessions").insert({id:s,...a});return n?(console.warn("[supabase] saveSession →",n.message),{saved:!1,error:n.message,id:s}):{saved:!0,id:s}}async function Qe(a,s){if(!E||!a)return{saved:!1};const n=s.map(t=>({session_id:a,...t})),{error:i}=await j.from("assessment_answers").insert(n);return i?(console.warn("[supabase] saveAnswers →",i.message),{saved:!1,error:i.message}):{saved:!0}}async function Ia(){if(!E)return{ok:!1,reason:"not_configured"};try{const{error:a}=await j.from("questions").select("id",{head:!0,count:"exact"});return a?{ok:!1,reason:a.message}:{ok:!0}}catch(a){return{ok:!1,reason:a.message}}}const I=4;function Ge(a,s){const n=Math.max(0,Math.min(I,Number(s)));return a.is_reverse_scored?(I-n)/I:n/I}function M(a){return a<=Y.bajo.max?"bajo":a<=Y.moderado.max?"moderado":"prioritario"}function Xe(a,s){var p;const n=Object.create(null);for(const d of G)n[d.id]={sum:0,n:0};let i=0,t=0;const c={};for(const d of a){const o=s[d.id];if(o==null)continue;const x=Ge(d,o);c[d.id]=x,n[d.dimension]||(n[d.dimension]={sum:0,n:0}),n[d.dimension].sum+=x,n[d.dimension].n+=1,i+=x,t+=1}const l={};for(const[d,o]of Object.entries(n)){const x=o.n?Math.round(o.sum/o.n*100):0;l[d]={score:x,level:M(x),level_label:F[M(x)],label:((p=G.find(v=>v.id===d))==null?void 0:p.label)||d}}const u=t?Math.round(i/t*100):0,g=M(u),h=Object.entries(l).filter(([,d])=>d.level!=="bajo").sort((d,o)=>o[1].score-d[1].score).map(([d,o])=>({id:d,label:o.label,score:o.score,level:o.level}));return{total_score:u,general_level:g,general_level_label:F[g],dimensions:l,top_attention_areas:h,normalized_by_question:c}}const Ze="ABCDEFGHJKLMNPQRSTUVWXYZ",ea="23456789";function ee(a,s){let n="";const i=new Uint32Array(s);crypto.getRandomValues(i);for(let t=0;t<s;t++)n+=a[i[t]%a.length];return n}function le(){return`SIN-${ee(Ze,3)}-${ee(ea,4)}`}async function aa(a){if(!E)return null;try{const{data:s,error:n}=await j.functions.invoke(te,{body:a});return n?(console.warn("[gemini] error →",n.message),null):!s||typeof s!="object"||s.error?null:s}catch(s){return console.warn("[gemini] excepción →",s.message),null}}async function Ra(){if(!E)return{ok:!1,reason:"not_configured"};try{const{error:a}=await j.functions.invoke(te,{body:{ping:!0}});return{ok:!a,reason:a==null?void 0:a.message}}catch(a){return{ok:!1,reason:a.message}}}async function sa({questions:a,answers:s,anonymousCode:n}){const i=Xe(a,s),t=n||le(),c={anonymous_code:t,test_version:K,total_score:i.total_score,general_level:i.general_level,dimension_scores:i.dimensions,top_attention_areas:i.top_attention_areas},{id:l}=await Je(c);if(l){const h=Object.entries(s).map(([p,d])=>({question_id:p,answer_value:Number(d),normalized_value:i.normalized_by_question[p]??null}));await Qe(l,h)}const u=await Ye(),g=await aa({session_id:l,test_version:K,general_level:i.general_level,dimensions:i.dimensions,top_attention_areas:i.top_attention_areas,recommendation_catalog:u.slice(0,30)});return{session_id:l||null,anonymous_code:t,created_at:new Date().toISOString(),...i,ai:g||null,base_recommendations:u}}function na(){const a=T(),[s,n]=r.useState([]),[i,t]=r.useState({}),[c,l]=r.useState(0),[u,g]=r.useState(!0),[h,p]=r.useState(!1),[d,o]=r.useState(null);r.useEffect(()=>{if(!sessionStorage.getItem(k.CONSENT)){a("/consentimiento",{replace:!0});return}let S=!0;return Ke().then(de=>{if(S){n(de);try{const B=sessionStorage.getItem(k.ANSWERS);B&&t(JSON.parse(B))}catch{}g(!1)}}),()=>{S=!1}},[]),r.useEffect(()=>{if(!u)try{sessionStorage.setItem(k.ANSWERS,JSON.stringify(i))}catch{}},[i,u]);const x=s.length,v=s[c],w=r.useMemo(()=>s.every(y=>i[y.id]!==void 0),[s,i]);function _(y){v&&t(S=>({...S,[v.id]:y}))}function A(){c<x-1&&l(y=>y+1)}function C(){c>0&&l(y=>y-1)}async function z(){if(!w){const y=s.findIndex(S=>i[S.id]===void 0);y!==-1&&l(y);return}p(!0),o(null);try{const y=le(),S=await sa({questions:s,answers:i,anonymousCode:y});sessionStorage.setItem(k.RESULT,JSON.stringify(S)),sessionStorage.setItem(k.ANON_CODE,y),sessionStorage.removeItem(k.ANSWERS),a("/resultado")}catch(y){console.error(y),o("No pudimos generar tu resultado en este momento. Intenta nuevamente en unos segundos.")}finally{p(!1)}}return u?e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",style:{maxWidth:720,textAlign:"center"},children:[e.jsx("div",{className:"spinner",style:{margin:"40px auto 18px"}}),e.jsx("p",{className:"lede",children:"Preparando preguntas…"})]})}):e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:820},children:[e.jsx(Be,{current:c+1,total:x}),v&&e.jsx(He,{index:c,question:v,value:i[v.id],onChange:_}),e.jsxs("div",{className:"assess-actions mt-3",children:[e.jsx("button",{className:"btn btn-ghost",onClick:C,disabled:c===0,children:"← Anterior"}),c<x-1?e.jsx("button",{className:"btn btn-primary",onClick:A,disabled:i[v==null?void 0:v.id]===void 0,children:"Siguiente →"}):e.jsx("button",{className:"btn btn-coral btn-lg",onClick:z,disabled:h||!w,children:h?"Generando orientación…":"Finalizar y ver resultado"})]}),!w&&c===x-1&&e.jsx("p",{className:"note text-center mt-3",children:'Te faltan algunas preguntas por contestar. Usa "Anterior" para revisarlas.'}),d&&e.jsx("div",{className:"mt-4",children:e.jsx(P,{variant:"warm",children:d})}),e.jsx("p",{className:"text-center mt-4",children:e.jsx(f,{to:"/",className:"note",children:"Salir y descartar respuestas"})})]}),e.jsx("style",{children:`
        .assess-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
      `})]})}function ia({result:a}){if(!a)return null;const{total_score:s,general_level_label:n,anonymous_code:i,ai:t}=a;return e.jsx("section",{className:"result-card",children:e.jsxs("div",{className:"result-hero",children:[e.jsxs("div",{className:"result-score",children:[e.jsx("span",{className:"result-score-num",children:s}),e.jsx("span",{className:"result-score-label",children:"/ 100"})]}),e.jsxs("div",{className:"result-meta",children:[e.jsx("span",{className:"tag",children:"Tu orientación"}),e.jsx("h1",{className:"mt-2",children:n}),e.jsx("p",{className:"result-summary",children:(t==null?void 0:t.friendly_summary)||"Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas. Recuerda que esto es una orientación, no un diagnóstico."}),i&&e.jsxs("p",{className:"anon-code",children:["Tu código anónimo: ",e.jsx("strong",{children:i}),e.jsx("small",{children:"Puedes copiarlo si quieres consultar tu resultado nuevamente más tarde."})]})]})]})})}function ta({dimensions:a}){const s=Object.entries(a);return e.jsx("div",{className:"dim-chart",role:"list",children:s.map(([n,i])=>e.jsxs("div",{className:"dim-row",role:"listitem",children:[e.jsx("div",{className:"dim-label",children:i.label}),e.jsx("div",{className:"dim-track","aria-label":`Puntaje ${i.score} de 100`,children:e.jsx("span",{className:`dim-fill lvl-bg-${i.level}`,style:{width:`${i.score}%`}})}),e.jsxs("div",{className:`dim-value lvl-${i.level}`,children:[i.score,e.jsx("small",{children:F[i.level]})]})]},n))})}function ra({sessionId:a}){const[s,n]=r.useState(0),[i,t]=r.useState(0),[c,l]=r.useState(""),[u,g]=r.useState(!1),[h,p]=r.useState(!1);async function d(){if(s!==0){if(p(!0),E)try{await j.from("assessment_feedback").insert({session_id:a||null,rating:s,comment:c.trim()||null})}catch(o){console.warn(o)}g(!0),p(!1)}}return u?e.jsx("div",{className:"feedback-thanks",children:e.jsxs("p",{children:["✨ ",e.jsx("strong",{children:"Gracias por tu retroalimentación."})," Nos ayuda a mejorar el programa."]})}):e.jsxs("div",{className:"feedback-box",children:[e.jsx("h3",{children:"¿Cómo te pareció esta orientación?"}),e.jsx("div",{className:"stars",role:"radiogroup","aria-label":"Calificación",children:[1,2,3,4,5].map(o=>e.jsx("button",{type:"button",role:"radio","aria-checked":s===o,className:`star ${(i||s)>=o?"active":""}`,onMouseEnter:()=>t(o),onMouseLeave:()=>t(0),onClick:()=>n(o),children:"★"},o))}),e.jsx("textarea",{placeholder:"Comentario opcional…",value:c,onChange:o=>l(o.target.value),rows:2}),e.jsx("button",{className:"btn btn-primary btn-sm",disabled:s===0||h,onClick:d,children:h?"Enviando…":"Enviar"}),e.jsx("style",{children:`
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
          color: #2F8770;
          padding: 14px 18px;
          border-radius: var(--r-md);
          margin-top: 16px;
          text-align: center;
        }
      `})]})}function oa(){var g,h,p,d;const a=T(),[s,n]=r.useState(null);if(r.useEffect(()=>{try{const o=sessionStorage.getItem(k.RESULT);if(!o)return a("/",{replace:!0});n(JSON.parse(o))}catch{a("/",{replace:!0})}},[a]),!s)return null;const i=((g=s.ai)==null?void 0:g.suggested_actions)||[],t=((h=s.ai)==null?void 0:h.recommended_resources)||[],c=(p=s.ai)==null?void 0:p.safety_note,l=s.base_recommendations?We(s.dimensions).map(o=>({title:o.title,description:o.description})):[];function u(){var x,v,w;const o=["Sintonía FES Iztacala — Tu orientación",`Código anónimo: ${s.anonymous_code}`,`Nivel general: ${s.general_level_label} (${s.total_score}/100)`,"","Dimensiones:",...Object.entries(s.dimensions).map(([,_])=>`  • ${_.label}: ${_.score} (${_.level_label})`),"",((x=s.ai)==null?void 0:x.friendly_summary)||"",((v=s.ai)==null?void 0:v.safety_note)||"Esta orientación es informativa y no sustituye atención profesional."].join(`
`);(w=navigator.clipboard)==null||w.writeText(o).catch(()=>{})}return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:1e3},children:[e.jsx(ia,{result:s}),s.general_level==="prioritario"&&e.jsxs("div",{className:"crisis-banner",children:[e.jsx("strong",{children:"📞 Tus respuestas sugieren acercarte a apoyo profesional."}),e.jsxs("p",{children:["Hay servicios universitarios y la ",e.jsx("strong",{children:"Línea de la Vida 800 290 0024"})," disponibles 24/7."]}),e.jsx(f,{to:"/apoyo",className:"btn btn-coral btn-sm",children:"Ver opciones de apoyo →"})]}),e.jsxs("div",{className:"route-cta mt-3",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"✨ Crea tu ruta de bienestar"}),e.jsx("small",{children:"Pum-AI te puede generar un plan diario de 7 o 14 días personalizado a tu resultado."})]}),e.jsx(f,{to:"/ruta",className:"btn btn-gold",children:"Comenzar mi ruta →"})]}),e.jsx(P,{children:c||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado, pero no constituyen un diagnóstico clínico. Si lo necesitas, acércate a un servicio de orientación universitario."]})}),e.jsxs("div",{className:"results-grid mt-4",children:[e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag azul",children:"Tus dimensiones"}),e.jsx("h2",{className:"mt-2",children:"Cómo se ve tu bienestar por área"}),e.jsx("p",{className:"lede",children:"Cada barra representa el nivel de atención que sugieren tus respuestas en esa área. Mayor puntaje = mayor invitación al autocuidado."}),e.jsx(ta,{dimensions:s.dimensions})]}),e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag coral",children:"Acciones sugeridas"}),e.jsx("h2",{className:"mt-2",children:"Pasos pequeños y útiles"}),i.length>0?e.jsx("ul",{className:"rec-list",children:i.map((o,x)=>e.jsxs("li",{children:["✦ ",o]},x))}):e.jsxs("ul",{className:"rec-list",children:[l.length===0&&e.jsx("li",{children:"Sigue cultivando tus rutinas de bienestar. Tus respuestas no muestran áreas urgentes hoy."}),l.map((o,x)=>e.jsxs("li",{children:[e.jsxs("strong",{children:[o.title,"."]})," ",o.description]},x))]})]})]}),e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag sage",children:"Recursos sugeridos"}),e.jsx("h2",{className:"mt-2",children:"Recursos universitarios para ti"}),t.length>0?e.jsx("ul",{className:"rec-list",children:t.map((o,x)=>e.jsxs("li",{children:["📌 ",o]},x))}):e.jsxs("p",{children:["Visita la sección de ",e.jsx(f,{to:"/recursos",children:"Recursos de apoyo"})," para ver el catálogo completo."]})]}),((d=s.top_attention_areas)==null?void 0:d.length)>0&&e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag",children:"Áreas con mayor atención sugerida"}),e.jsx("h2",{className:"mt-2",children:"Dónde poner foco"}),e.jsx("ul",{className:"rec-list",children:s.top_attention_areas.map(o=>e.jsxs("li",{children:[e.jsx("strong",{children:o.label})," — Puntaje: ",o.score,", nivel: ",o.level==="prioritario"?"prioritario":"moderado","."]},o.id))})]}),e.jsx(ra,{sessionId:s.session_id}),e.jsxs("div",{className:"results-actions mt-4",children:[e.jsx("button",{className:"btn btn-gold",onClick:u,children:"📋 Copiar resultado"}),e.jsx(f,{to:"/recursos",className:"btn btn-secondary btn-primary",children:"Ver recursos universitarios"}),e.jsx(f,{to:"/evaluacion",className:"btn btn-ghost",children:"Volver a evaluar"}),e.jsx(f,{to:"/",className:"btn btn-ghost",children:"Ir al inicio"})]})]}),e.jsx("style",{children:`
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
      `})]})}const ca=r.lazy(()=>N(()=>import("./Resources-Dxb-L97m.js"),__vite__mapDeps([0,1,2,3]))),la=r.lazy(()=>N(()=>import("./Privacy-CY2KygVz.js"),__vite__mapDeps([4,1,2]))),da=r.lazy(()=>N(()=>import("./MyHistory-DMGHMPlt.js"),__vite__mapDeps([5,1,2]))),ua=r.lazy(()=>N(()=>import("./CheckIn-CYayGUlW.js"),__vite__mapDeps([6,1,2]))),ma=r.lazy(()=>N(()=>import("./Journal-Cq-U0s1z.js"),__vite__mapDeps([7,1,2]))),pa=r.lazy(()=>N(()=>import("./Support-CzWBvxwx.js"),__vite__mapDeps([8,1,2]))),xa=r.lazy(()=>N(()=>import("./WellnessRoute-Bj4H1RYg.js"),__vite__mapDeps([9,1,2]))),ha=r.lazy(()=>N(()=>import("./Companion-Dq9qb5zr.js"),__vite__mapDeps([10,1,2]))),ga=r.lazy(()=>N(()=>import("./Library-rBuAZ3Pe.js"),__vite__mapDeps([11,1,2]))),ba=r.lazy(()=>N(()=>import("./Emotions-D5F_ed0K.js"),__vite__mapDeps([12,1,2]))),fa=r.lazy(()=>N(()=>import("./MapPage-CHluiJGI.js"),__vite__mapDeps([13,1,2]))),va=r.lazy(()=>N(()=>import("./Trees-BzUHA8_u.js"),__vite__mapDeps([14,1,2]))),ja=r.lazy(()=>N(()=>import("./Buddy-B4hNuE5O.js"),__vite__mapDeps([15,1,2]))),ya=r.lazy(()=>N(()=>import("./Adventure-DbsNfISr.js"),__vite__mapDeps([16,1,2]))),_a=r.lazy(()=>N(()=>import("./Calendar-D1niU3Jz.js"),__vite__mapDeps([17,1,2]))),Na=r.lazy(()=>N(()=>import("./Admin-CgEHKGAe.js"),__vite__mapDeps([18,1,19,2]))),wa=r.lazy(()=>N(()=>import("./AdminLogin-rRD7SMre.js"),__vite__mapDeps([20,1,19,2])));function Sa(){return e.jsx("div",{style:{display:"grid",placeItems:"center",minHeight:"40vh"},children:e.jsx("div",{className:"spinner"})})}function ka(){const a=q(),s=a.pathname.startsWith("/admin"),n=!s&&a.pathname!=="/evaluacion";return e.jsxs(e.Fragment,{children:[n&&e.jsx(qe,{}),!s&&e.jsx(Se,{}),e.jsx("main",{children:e.jsx(r.Suspense,{fallback:e.jsx(Sa,{}),children:e.jsxs(ue,{children:[e.jsx(b,{path:"/",element:e.jsx($e,{})}),e.jsx(b,{path:"/consentimiento",element:e.jsx(Ue,{})}),e.jsx(b,{path:"/evaluacion",element:e.jsx(na,{})}),e.jsx(b,{path:"/resultado",element:e.jsx(oa,{})}),e.jsx(b,{path:"/recursos",element:e.jsx(ca,{})}),e.jsx(b,{path:"/privacidad",element:e.jsx(la,{})}),e.jsx(b,{path:"/mi-historia",element:e.jsx(da,{})}),e.jsx(b,{path:"/check-in",element:e.jsx(ua,{})}),e.jsx(b,{path:"/diario",element:e.jsx(ma,{})}),e.jsx(b,{path:"/apoyo",element:e.jsx(pa,{})}),e.jsx(b,{path:"/ruta",element:e.jsx(xa,{})}),e.jsx(b,{path:"/companion",element:e.jsx(ha,{})}),e.jsx(b,{path:"/biblioteca",element:e.jsx(ga,{})}),e.jsx(b,{path:"/emociones",element:e.jsx(ba,{})}),e.jsx(b,{path:"/mapa",element:e.jsx(fa,{})}),e.jsx(b,{path:"/arboles",element:e.jsx(va,{})}),e.jsx(b,{path:"/buddy",element:e.jsx(ja,{})}),e.jsx(b,{path:"/aventura",element:e.jsx(ya,{})}),e.jsx(b,{path:"/calendario",element:e.jsx(_a,{})}),e.jsx(b,{path:"/docentes",element:e.jsx(V,{to:"/admin/login",replace:!0})}),e.jsx(b,{path:"/admin/login",element:e.jsx(wa,{})}),e.jsx(b,{path:"/admin/*",element:e.jsx(Na,{})}),e.jsx(b,{path:"*",element:e.jsx(V,{to:"/",replace:!0})})]})})}),!s&&e.jsx(ke,{}),!s&&e.jsx(Ee,{}),!s&&e.jsx(Ae,{}),!s&&e.jsx(Te,{})]})}(function(){const s=new URLSearchParams(window.location.search),n=s.get("p");if(n!==null){const i=s.get("q"),t=window.location.pathname.replace(/\/$/,"")+n+(i?"?"+i.replace(/~and~/g,"&"):"")+window.location.hash;window.history.replaceState(null,"",t)}})();const Ea="/sintonia-fesi/".replace(/\/$/,"");ie(document.getElementById("root")).render(e.jsx(me.StrictMode,{children:e.jsx(pe,{basename:Ea,children:e.jsx(ka,{})})}));export{G as D,Aa as R,P as S,Ne as a,k as b,we as c,Ia as d,Ra as e,qa as f,J as g,E as i,e as j,j as s,O as u};
