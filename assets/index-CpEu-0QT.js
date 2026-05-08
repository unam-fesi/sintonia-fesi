const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Resources-yUHna9I6.js","assets/vendor-react-BTW_75ak.js","assets/vendor-supabase-DS4euJVY.js","assets/Resources-Da2drgDA.css","assets/Privacy-Do91-uVm.js","assets/MyHistory-uLBlukXO.js","assets/CheckIn-DZbja3n5.js","assets/Journal-AKCrvKgb.js","assets/Support-BkmIAncg.js","assets/WellnessRoute-Dav_RZ_7.js","assets/Companion-2cxYoCu_.js","assets/Library-C5m9AJb5.js","assets/Emotions-BYrF0jkc.js","assets/MapPage-Di5ZQR-8.js","assets/Trees-C0N862iq.js","assets/Buddy-hbpLLrWR.js","assets/Adventure-CnDqNsWc.js","assets/Calendar-DTHBr6Dw.js","assets/Admin-DH93SOiW.js","assets/authService-CLkSq4Lb.js","assets/AdminLogin-CgHqAW7t.js"])))=>i.map(i=>d[i]);
import{r,a as le,u as z,L as f,N as p,b as U,R as de,c as g,d as V,e as ue,B as me}from"./vendor-react-BTW_75ak.js";import{c as pe}from"./vendor-supabase-DS4euJVY.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();var ee={exports:{}},R={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xe=r,he=Symbol.for("react.element"),ge=Symbol.for("react.fragment"),ve=Object.prototype.hasOwnProperty,fe=xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,be={key:!0,ref:!0,__self:!0,__source:!0};function ae(a,s,n){var i,t={},o=null,c=null;n!==void 0&&(o=""+n),s.key!==void 0&&(o=""+s.key),s.ref!==void 0&&(c=s.ref);for(i in s)ve.call(s,i)&&!be.hasOwnProperty(i)&&(t[i]=s[i]);if(a&&a.defaultProps)for(i in s=a.defaultProps,s)t[i]===void 0&&(t[i]=s[i]);return{$$typeof:he,type:a,key:o,ref:c,props:t,_owner:fe.current}}R.Fragment=ge;R.jsx=ae;R.jsxs=ae;ee.exports=R;var e=ee.exports,se,B=le;se=B.createRoot,B.hydrateRoot;const je="modulepreload",ye=function(a){return"/sintonia-unam/"+a},H={},b=function(s,n,i){let t=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));t=Promise.allSettled(n.map(h=>{if(h=ye(h),h in H)return;H[h]=!0;const m=h.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${v}`))return;const d=document.createElement("link");if(d.rel=m?"stylesheet":je,m||(d.as="script"),d.crossOrigin="",d.href=h,u&&d.setAttribute("nonce",u),document.head.appendChild(d),m)return new Promise((l,x)=>{d.addEventListener("load",l),d.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(c){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=c,window.dispatchEvent(u),!u.defaultPrevented)throw c}return t.then(c=>{for(const u of c||[])u.status==="rejected"&&o(u.reason);return s().catch(o)})},W="1.0.0",K={bajo:{max:33},moderado:{max:66}},P={bajo:"Bajo nivel de atención",moderado:"Atención moderada",prioritario:"Atención prioritaria"},S={ANSWERS:"sintonia.answers",CONSENT:"sintonia.consent",RESULT:"sintonia.result",ANON_CODE:"sintonia.anon_code"},ne="generate-orientation",C="sintonia.student";function J(){try{const a=sessionStorage.getItem(C);if(a)return JSON.parse(a);const s=sessionStorage.getItem(S.ANON_CODE);return s?{code:s,password:null}:null}catch{return null}}function _e(a){a?sessionStorage.setItem(C,JSON.stringify(a)):sessionStorage.removeItem(C),window.dispatchEvent(new Event("sintonia:student"))}function Ne(){sessionStorage.removeItem(C),sessionStorage.removeItem(S.ANON_CODE),window.dispatchEvent(new Event("sintonia:student"))}function $(){const[a,s]=r.useState(J),n=r.useCallback(()=>s(J()),[]);return r.useEffect(()=>{const i=()=>n();return window.addEventListener("sintonia:student",i),window.addEventListener("storage",i),()=>{window.removeEventListener("sintonia:student",i),window.removeEventListener("storage",i)}},[n]),{student:a,setStudent:i=>{_e(i),n()},clearStudent:()=>{Ne(),n()}}}function Se(){const{student:a,clearStudent:s}=$(),n=!!(a!=null&&a.code),i=z(),[t,o]=r.useState(null),c=r.useRef(null);r.useEffect(()=>{o(null)},[i.pathname]),r.useEffect(()=>{function m(v){var d;(d=c.current)!=null&&d.contains(v.target)||o(null)}return document.addEventListener("click",m),()=>document.removeEventListener("click",m)},[]);function u(m){o(v=>v===m?null:m)}const h=n?a.code.split("-").map(m=>m[0]).join("").slice(0,3):"";return e.jsx("header",{className:"site-header",children:e.jsxs("div",{className:"container topbar",children:[e.jsxs(f,{to:"/",className:"brand","aria-label":"Sintonía UNAM, ir al inicio",children:[e.jsx("img",{src:"/sintonia-unam/Sintonia-icon192.png",srcSet:"/sintonia-unam/Sintonia-icon192.png 1x, /sintonia-unam/Sintonia-icon512.png 2x",alt:"Sintonía UNAM",className:"brand-logo",width:"56",height:"56"}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("strong",{children:"Sintonía UNAM"}),e.jsx("span",{children:"Bienestar emocional universitario"})]})]}),e.jsxs("nav",{className:"nav","aria-label":"Navegación principal",ref:c,children:[e.jsx(p,{to:"/",end:!0,className:"nav-link",children:"Inicio"}),e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${t==="discover"?"active":""}`,onClick:()=>u("discover"),"aria-haspopup":"true","aria-expanded":t==="discover",children:"Conocer ▾"}),t==="discover"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(p,{to:"/recursos",children:"📌 Recursos"}),e.jsx(p,{to:"/calendario",children:"📅 Calendario"}),e.jsx(p,{to:"/mapa",children:"🗺 Mapa"}),e.jsx(p,{to:"/emociones",children:"📖 Emociones"})]})]}),e.jsx(p,{to:"/apoyo",className:"nav-link",children:"🆘 Apoyo"}),n&&e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{type:"button",className:`nav-link drop-trigger ${t==="mine"?"active":""}`,onClick:()=>u("mine"),"aria-haspopup":"true","aria-expanded":t==="mine",children:"Mi rincón ▾"}),t==="mine"&&e.jsxs("div",{className:"drop-panel",children:[e.jsx(p,{to:"/mi-historia",children:"📊 Mi historia"}),e.jsx(p,{to:"/check-in",children:"📝 Check-in"}),e.jsx(p,{to:"/diario",children:"📔 Diario"}),e.jsx(p,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(p,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(p,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(p,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(p,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(p,{to:"/arboles",children:"🌳 Mis árboles"})]})]}),!n&&e.jsx(p,{to:"/mi-historia",className:"nav-link",children:"Mi historia"}),e.jsx(p,{to:"/privacidad",className:"nav-link nav-tiny",children:"Privacidad"}),n?e.jsxs("div",{className:"dropdown",children:[e.jsxs("button",{type:"button",className:`user-chip ${t==="user"?"active":""}`,onClick:()=>u("user"),"aria-haspopup":"true","aria-expanded":t==="user",title:"Abrir menú",children:[e.jsx("span",{className:"initials",children:h}),e.jsx("small",{children:a.code}),e.jsx("span",{className:"chev","aria-hidden":"true",children:"▾"})]}),t==="user"&&e.jsxs("div",{className:"drop-panel user-drop",children:[e.jsx(p,{to:"/mi-historia",end:!0,children:"📊 Mi panel"}),e.jsx(p,{to:"/check-in",children:"📝 Check-in semanal"}),e.jsx(p,{to:"/diario",children:"📔 Diario emocional"}),e.jsx(p,{to:"/ruta",children:"🛤 Mi ruta"}),e.jsx(p,{to:"/companion",children:"🤝 Pum-AI"}),e.jsx(p,{to:"/biblioteca",children:"📚 Biblioteca"}),e.jsx(p,{to:"/aventura",children:"🗺 Aventura"}),e.jsx(p,{to:"/buddy",children:"🫂 Buddy"}),e.jsx(p,{to:"/arboles",children:"🌳 Mis árboles"}),e.jsx("hr",{style:{margin:"6px 0",border:0,borderTop:"1px solid var(--c-borde-soft)"}}),e.jsx("button",{type:"button",className:"logout-link",onClick:()=>{o(null),confirm(`¿Cerrar sesión?

Tu código y datos se conservan en Supabase. Solo se borrará tu acceso local — puedes volver con tu código.`)&&(s(),window.location.assign("/sintonia-unam/"))},children:"↩ Cerrar sesión"})]})]}):e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-sm nav-cta",children:"Iniciar orientación"})]})]})})}function we(){const a=new Date().getFullYear();return e.jsx("footer",{className:"site-footer",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-card",children:[e.jsxs("div",{children:[e.jsx("h4",{children:"Sintonía UNAM"}),e.jsx("p",{children:"Plataforma universitaria de orientación para el bienestar emocional. No constituye diagnóstico ni sustituye atención profesional."})]}),e.jsxs("div",{className:"footer-links",children:[e.jsx(f,{to:"/privacidad",children:"Aviso de privacidad"}),e.jsx(f,{to:"/recursos",children:"Recursos de apoyo"}),e.jsx(f,{to:"/admin",children:"Acceso interno"})]})]}),e.jsxs("p",{className:"footer-credits",children:["© Universidad Nacional Autónoma de México, ",a,"."]})]})})}const O="sintonia.crisis_visible";function Ee(){const a=z(),[s,n]=r.useState(!1),[i,t]=r.useState(!1),o=a.pathname.startsWith("/admin")||a.pathname.startsWith("/apoyo");r.useEffect(()=>{try{const u=JSON.parse(sessionStorage.getItem(S.RESULT)||"null");u&&u.general_level==="prioritario"&&localStorage.setItem(O,"1")}catch{}n(localStorage.getItem(O)==="1")},[a.pathname]);function c(){localStorage.setItem(O,"0"),n(!1),t(!1)}return!s||o?null:e.jsxs(e.Fragment,{children:[i&&e.jsxs("div",{className:"crisis-panel",children:[e.jsxs("header",{children:[e.jsx("strong",{children:"🆘 Apoyo inmediato"}),e.jsx("button",{onClick:()=>t(!1),"aria-label":"Cerrar",children:"✕"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Línea de la Vida"})," — orientación gratuita, confidencial, 24/7."]}),e.jsx("a",{href:"tel:8002900024",className:"btn btn-coral",children:"📞 800 290 0024"}),e.jsx(f,{to:"/apoyo",className:"btn btn-ghost btn-sm",children:"Ver más opciones"}),e.jsx("button",{className:"dismiss",onClick:c,children:"Ocultar este botón"})]}),e.jsx("button",{className:`crisis-fab ${i?"open":""}`,onClick:()=>t(u=>!u),title:"Apoyo inmediato","aria-label":"Abrir apoyo inmediato",children:"🆘"}),e.jsx("style",{children:`
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
      `})]})}const Ae="https://knblatuzbgzgnugwkxdp.supabase.co",ie="sb_publishable_yBtfhxGitkJdS9jXO4CGxg_qmMkg3RF",w=!!ie,y=w?pe(Ae,ie,{auth:{persistSession:!0,autoRefreshToken:!0,storageKey:"sintonia.auth"}}):null,Q="sintonia.webinar_dismissed_",ke=24;function qe(){const{student:a}=$(),s=z(),[n,i]=r.useState(null),[t,o]=r.useState(!1),[c,u]=r.useState(!1),[h,m]=r.useState(!1),d=["/admin","/evaluacion","/consentimiento"].some(N=>s.pathname.startsWith(N));r.useEffect(()=>{w&&(async()=>{const{data:N}=await y.from("view_upcoming_webinars").select("*").order("starts_at").limit(1).maybeSingle();if(N){try{const k=localStorage.getItem(Q+N.id);if(k){const T=Number(k);if(Date.now()-T<ke*3600*1e3)return}}catch{}i(N),setTimeout(()=>o(!0),2500)}})()},[]),r.useEffect(()=>{!n||!(a!=null&&a.code)||y.from("event_rsvp").select("id").eq("event_id",n.id).eq("anonymous_code",a.code).maybeSingle().then(({data:N})=>m(!!N))},[n,a==null?void 0:a.code]);function l(){if(n!=null&&n.id)try{localStorage.setItem(Q+n.id,String(Date.now()))}catch{}o(!1)}async function x(){if(!(a!=null&&a.code)){window.location.assign("/sintonia-unam/mi-historia");return}u(!0),await y.from("event_rsvp").upsert({event_id:n.id,anonymous_code:a.code},{onConflict:"event_id,anonymous_code"}),m(!0),u(!1)}if(!n||d)return null;const E=new Date(n.starts_at).toLocaleString("es-MX",{weekday:"long",day:"2-digit",month:"long",hour:"2-digit",minute:"2-digit"});return e.jsxs(e.Fragment,{children:[!t&&e.jsxs("button",{className:"webinar-pill",onClick:()=>o(!0),"aria-label":"Abrir aviso de webinar",children:["📡 ",e.jsx("span",{children:"Webinar próximo"})]}),t&&e.jsxs("div",{className:"webinar-toast",role:"dialog","aria-label":"Próximo webinar",children:[e.jsx("button",{className:"dismiss-btn",onClick:l,"aria-label":"Cerrar",children:"✕"}),n.image_url&&e.jsx("img",{src:n.image_url,alt:"",className:"webinar-img"}),e.jsxs("div",{className:"webinar-body",children:[e.jsx("span",{className:"webinar-tag",children:"📡 Próximo webinar"}),e.jsx("h3",{children:n.title}),n.speaker&&e.jsxs("small",{children:["👤 ",n.speaker]}),e.jsxs("small",{children:["🗓 ",E]}),n.location&&e.jsxs("small",{children:["📍 ",n.location]}),n.description&&e.jsx("p",{className:"webinar-desc",children:n.description}),e.jsxs("div",{className:"webinar-actions",children:[h?e.jsx("span",{className:"rsvped-chip",children:"✓ Apuntado(a)"}):e.jsx("button",{className:"btn btn-primary btn-sm",onClick:x,disabled:c,children:c?"…":a!=null&&a.code?"✋ Me interesa":"✋ Crear código y apuntarme"}),n.url&&e.jsx("a",{href:n.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-ghost btn-sm",children:"Más info →"})]})]})]}),e.jsx("style",{children:`
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
      `})]})}function Ce(){return e.jsx("section",{className:"hero",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"hero-grid",children:[e.jsxs("div",{className:"hero-card card fade-in",children:[e.jsx("span",{className:"tag",children:"Programa universitario · UNAM"}),e.jsxs("h1",{className:"mt-2",children:["Sintonízate contigo, con tu ",e.jsx("span",{style:{color:"var(--c-oro-700)"},children:"comunidad"})," ","y con tu bienestar."]}),e.jsx("p",{className:"lede",children:"Una autoevaluación breve, anónima y con recomendaciones personalizadas para reflexionar sobre tu bienestar emocional y conocer recursos de apoyo dentro de la UNAM."}),e.jsxs("ul",{className:"hero-checks",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"20 preguntas"})," en 7 a 10 minutos"]}),e.jsxs("li",{children:["Resultado ",e.jsx("strong",{children:"informativo, anónimo y confidencial"})]}),e.jsxs("li",{children:["Recomendaciones y vinculación con ",e.jsx("strong",{children:"recursos universitarios"})]})]}),e.jsxs("div",{className:"hero-actions",children:[e.jsx(f,{to:"/consentimiento",className:"btn btn-primary btn-lg",children:"Iniciar orientación"}),e.jsx(f,{to:"/privacidad",className:"btn btn-ghost",children:"Aviso de privacidad"})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"20"}),e.jsx("span",{children:"preguntas"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"7-10"}),e.jsx("span",{children:"minutos"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("strong",{children:"0"}),e.jsx("span",{children:"datos personales"})]})]})]}),e.jsx("aside",{className:"hero-visual fade-in","aria-hidden":"true",children:e.jsxs("div",{className:"orb-grid",children:[e.jsx("div",{className:"orb azul",children:e.jsxs("div",{children:[e.jsx("span",{children:"🧠"}),"Psicología"]})}),e.jsx("div",{className:"orb oro",children:e.jsxs("div",{children:[e.jsx("span",{children:"⚖️"}),"Equilibrio"]})}),e.jsx("div",{className:"orb salvia",children:e.jsxs("div",{children:[e.jsx("span",{children:"🌿"}),"Calma"]})}),e.jsx("div",{className:"orb coral",children:e.jsxs("div",{children:[e.jsx("span",{children:"🤝"}),"Comunidad"]})}),e.jsx("div",{className:"orb marfil",children:e.jsxs("div",{children:[e.jsx("span",{children:"✨"}),"Sintonía"]})}),e.jsx("div",{className:"orb lavanda",children:e.jsxs("div",{children:[e.jsx("span",{children:"🎨"}),"Arte"]})}),e.jsx("div",{className:"orb salvia",children:e.jsxs("div",{children:[e.jsx("span",{children:"🏃"}),"Deporte"]})}),e.jsx("div",{className:"orb azul",children:e.jsxs("div",{children:[e.jsx("span",{children:"📚"}),"Estudio"]})}),e.jsx("div",{className:"orb oro",children:e.jsxs("div",{children:[e.jsx("span",{children:"💛"}),"Bienestar"]})})]})})]})})})}function ze({icon:a="✦",title:s,children:n,accent:i="azul"}){return e.jsxs("article",{className:`info-card accent-${i}`,children:[e.jsx("div",{className:"info-icon","aria-hidden":"true",children:a}),e.jsx("h3",{children:s}),e.jsx("p",{children:n})]})}function I({variant:a="default",children:s}){return e.jsxs("aside",{className:`safety-notice safety-${a}`,role:"note",children:[e.jsx("span",{className:"safety-icon","aria-hidden":"true",children:"ⓘ"}),e.jsx("div",{children:s||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," No constituye un diagnóstico médico ni psicológico, ni reemplaza la atención profesional. Si necesitas apoyo, acércate a los servicios de orientación y salud de la UNAM."]})})]})}function M(){const a=new Date;return a.getFullYear()*1e3+a.getMonth()*32+a.getDate()}function te(a){return!a||a.length===0?null:a[M()%a.length]}function Re({compact:a=!1}){const[s,n]=r.useState(null);return r.useEffect(()=>{y.from("student_library").select("id, title, body, meta").eq("category","quote").eq("active",!0).then(({data:i})=>n(te(i)))},[]),s?e.jsxs("div",{className:`daily-quote ${a?"compact":""}`,children:[e.jsx("small",{children:"💭 Frase del día"}),e.jsxs("blockquote",{children:['"',s.title,'"']}),s.body&&e.jsxs("cite",{children:["— ",s.body]}),e.jsx("style",{children:`
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
      `})]}):null}function Ie(){const{student:a}=$(),[s,n]=r.useState(null),[i,t]=r.useState(!1);r.useEffect(()=>{y.from("student_library").select("id, title, body").eq("category","challenge").eq("active",!0).then(({data:c})=>n(te(c)))},[]),r.useEffect(()=>{if(!s||!(a!=null&&a.code))return;const c=`challenge_${M()}_${s.id}`;y.from("student_achievements").select("id").eq("anonymous_code",a.code).eq("achievement_key",c).maybeSingle().then(({data:u})=>t(!!u))},[s,a==null?void 0:a.code]);async function o(){if(!(a!=null&&a.code)||!s)return;const c=`challenge_${M()}_${s.id}`;await y.from("student_achievements").upsert({anonymous_code:a.code,achievement_key:c}),t(!0)}return s?e.jsxs("div",{className:"daily-challenge",children:[e.jsx("small",{children:"🎯 Reto del día"}),e.jsx("h3",{children:s.title}),s.body&&e.jsx("p",{children:s.body}),(a==null?void 0:a.code)&&e.jsx("button",{className:`btn ${i?"btn-ghost":"btn-coral"} btn-sm`,onClick:o,disabled:i,children:i?"✓ ¡Lo hiciste!":"Marcar como hecho"}),e.jsx("style",{children:`
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
      `})]}):null}const Te=[{icon:"📝",accent:"azul",title:"Evaluación breve",text:"Veinte preguntas en aproximadamente siete a diez minutos."},{icon:"📊",accent:"oro",title:"Resultado informativo",text:"Un panorama de tus dimensiones de bienestar, sin etiquetas clínicas."},{icon:"🌿",accent:"salvia",title:"Recomendaciones personalizadas",text:"Acciones de autocuidado y vinculación con actividades universitarias."},{icon:"🏛",accent:"coral",title:"Recursos universitarios",text:"Orientación psicológica, deporte, cultura, comunidad y bienestar verde."},{icon:"🤝",accent:"lavanda",title:"IA con responsabilidad",text:"Te acompaña con redacción amable; nunca diagnostica ni sustituye atención profesional."}];function Oe(){return e.jsxs(e.Fragment,{children:[e.jsx(Ce,{}),e.jsx("section",{className:"section-sm",children:e.jsxs("div",{className:"container",style:{maxWidth:980},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[e.jsx(Re,{}),e.jsx(Ie,{})]}),e.jsx("style",{children:`
            @media (max-width: 720px) {
              .section-sm > .container > div { grid-template-columns: 1fr !important; }
            }
          `})]})}),e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[e.jsx("span",{className:"tag",children:"Cómo te acompaña Sintonía UNAM"}),e.jsx("h2",{className:"mt-2",children:"Una orientación clara, anónima y con sentido comunitario"}),e.jsx("p",{className:"lede",children:"Sintonía UNAM es una plataforma para reflexionar sobre tu bienestar emocional, identificar áreas de autocuidado y conocer recursos de apoyo dentro de la UNAM."})]}),e.jsx("div",{className:"pillars",children:Te.map(a=>e.jsx(ze,{icon:a.icon,title:a.title,accent:a.accent,children:a.text},a.title))}),e.jsxs("div",{className:"continuity-card",children:[e.jsx("div",{className:"continuity-icon","aria-hidden":"true",children:"🔁"}),e.jsxs("div",{children:[e.jsx("span",{className:"tag sage",children:"¿Quieres seguir cuidándote?"}),e.jsx("h3",{className:"mt-2",children:"Tu código anónimo te abre un rincón propio"}),e.jsxs("p",{children:["Si guardas tu código (ej. ",e.jsx("code",{children:"SIN-XXX-####"}),") puedes regresar cuando quieras y obtener acceso a:"]}),e.jsxs("ul",{className:"continuity-list",children:[e.jsxs("li",{children:["📝 ",e.jsx("strong",{children:"Check-in semanal"})," de 30 segundos"]}),e.jsxs("li",{children:["📔 ",e.jsx("strong",{children:"Diario emocional"})," rápido (1 línea/día)"]}),e.jsxs("li",{children:["🛤 ",e.jsx("strong",{children:"Ruta de bienestar"})," de 7 o 14 días personalizada"]}),e.jsxs("li",{children:["🤝 ",e.jsx("strong",{children:"Pum-AI acompañante"})," para conversar cuando lo necesites"]}),e.jsxs("li",{children:["📚 ",e.jsx("strong",{children:"Biblioteca"})," de respiraciones, sonidos y videos"]}),e.jsxs("li",{children:["🗺 ",e.jsx("strong",{children:"Aventura"})," con pistas en el campus"]}),e.jsxs("li",{children:["🌳 ",e.jsx("strong",{children:"Adopta un árbol"})," y cuídalo"]}),e.jsxs("li",{children:["🫂 ",e.jsx("strong",{children:"Buddy anónimo"})," para conectar con otra persona"]}),e.jsxs("li",{children:["📅 ",e.jsx("strong",{children:"Calendario"})," de eventos universitarios"]}),e.jsxs("li",{children:["📊 ",e.jsx("strong",{children:"Tu evolución"})," a lo largo del tiempo"]})]}),e.jsxs("p",{className:"note",children:["Sigue siendo ",e.jsx("strong",{children:"100% anónimo"}),": solo tu código y, si quieres, una contraseña. Nada de nombre, correo ni datos personales."]}),e.jsxs("div",{className:"continuity-actions",children:[e.jsx(f,{to:"/mi-historia",className:"btn btn-gold",children:"Crear mi código anónimo"}),e.jsx(f,{to:"/consentimiento",className:"btn btn-ghost",children:"Solo hacer el test"})]})]})]})]}),e.jsx("style",{children:`
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
      `})]})}function Le(){const a=U(),[s,n]=r.useState(!1);function i(){s&&(sessionStorage.setItem(S.CONSENT,JSON.stringify({accepted:!0,timestamp:new Date().toISOString()})),a("/evaluacion"))}return e.jsxs("section",{className:"section",children:[e.jsx("div",{className:"container",style:{maxWidth:820},children:e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag",children:"Antes de iniciar"}),e.jsx("h1",{className:"mt-2",children:"Consentimiento informado"}),e.jsx("p",{className:"lede",children:"Antes de comenzar, te invitamos a leer las siguientes consideraciones. Tu participación es libre y puedes detenerla en cualquier momento."}),e.jsx("h2",{className:"mt-4",children:"¿Qué es Sintonía UNAM?"}),e.jsxs("p",{children:["Sintonía UNAM es una herramienta ",e.jsx("strong",{children:"informativa"})," de orientación para el bienestar emocional.",e.jsx("strong",{children:" No es un servicio médico, terapéutico ni de atención clínica."}),"Su propósito es ayudarte a reflexionar sobre cómo te has sentido y conocer recursos de apoyo dentro de la universidad."]}),e.jsx("h2",{className:"mt-4",children:"¿Qué pasará con tus respuestas?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"No te pediremos datos personales"}),": ni nombre, ni correo, ni teléfono, ni número de cuenta, ni cualquier información que te identifique directamente."]}),e.jsxs("li",{children:["Generamos un ",e.jsx("strong",{children:"código anónimo"})," (por ejemplo: SIN-KQT-2856) que tú decides guardar si quieres consultar tu resultado más tarde."]}),e.jsxs("li",{children:["Tus respuestas se almacenan de forma ",e.jsx("strong",{children:"anónima y agregada"})," con fines de mejora del programa y análisis estadístico."]}),e.jsxs("li",{children:["Para generar tu orientación amigable, enviamos a un modelo de inteligencia artificial",e.jsx("strong",{children:" únicamente datos agregados"})," (puntajes y dimensiones), nunca información personal."]})]}),e.jsx("h2",{className:"mt-4",children:"Limitaciones"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["El resultado es ",e.jsx("strong",{children:"informativo, no diagnóstico"}),"."]}),e.jsx("li",{children:"No reemplaza la atención psicológica o médica profesional."}),e.jsx("li",{children:"Si necesitas apoyo, te invitamos a acercarte a los servicios universitarios de orientación."})]}),e.jsxs(I,{variant:"gold",children:["Si en este momento estás atravesando una crisis o piensas en hacerte daño, comunícate de inmediato a la ",e.jsx("strong",{children:"Línea de la Vida: 800 290 0024"})," (24 horas, gratuito)."]}),e.jsx("div",{className:"consent-box mt-4",children:e.jsxs("label",{className:"consent-label",children:[e.jsx("input",{type:"checkbox",checked:s,onChange:t=>n(t.target.checked)}),e.jsx("span",{children:"He leído y acepto continuar con esta orientación informativa."})]})}),e.jsxs("div",{className:"actions mt-4",children:[e.jsx("button",{type:"button",className:"btn btn-primary btn-lg",onClick:i,disabled:!s,children:"Continuar →"}),e.jsx(f,{to:"/",className:"btn btn-ghost",children:"Volver al inicio"})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Pe({current:a,total:s}){const n=s?Math.round(a/s*100):0;return e.jsxs("div",{className:"progress-wrap","aria-label":`Progreso ${n}%`,children:[e.jsxs("div",{className:"progress-meta",children:[e.jsxs("span",{children:["Pregunta ",e.jsx("strong",{children:a})," de ",e.jsx("strong",{children:s})]}),e.jsxs("span",{children:[n,"%"]})]}),e.jsx("div",{className:"progress-bar",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":n,children:e.jsx("span",{style:{width:`${n}%`}})})]})}const Y=[{id:"estado_emocional",label:"Estado emocional"},{id:"estres_academico",label:"Estrés académico"},{id:"sueno_descanso",label:"Sueño y descanso"},{id:"apoyo_social",label:"Convivencia y apoyo social"},{id:"motivacion_pertenencia",label:"Motivación y pertenencia"}],G=[{id:"q01",sort_order:1,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"En los últimos días, ¿con qué frecuencia te has sentido triste o desanimado(a)?"},{id:"q02",sort_order:2,dimension:"estado_emocional",is_reverse_scored:!1,question_text:"¿Has sentido nervios o preocupación que te cuesta calmar?"},{id:"q03",sort_order:3,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has logrado disfrutar momentos pequeños de tu día a día?"},{id:"q04",sort_order:4,dimension:"estado_emocional",is_reverse_scored:!0,question_text:"¿Has podido reconocer cómo te sientes y darle nombre a tus emociones?"},{id:"q05",sort_order:5,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Has sentido que tus actividades académicas o personales te rebasan?"},{id:"q06",sort_order:6,dimension:"estres_academico",is_reverse_scored:!1,question_text:"¿Te ha costado concentrarte al estudiar o atender tus clases?"},{id:"q07",sort_order:7,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has logrado organizar tu tiempo entre estudio, descanso y vida personal?"},{id:"q08",sort_order:8,dimension:"estres_academico",is_reverse_scored:!0,question_text:"¿Has podido afrontar exámenes o entregas con relativa calma?"},{id:"q09",sort_order:9,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has logrado descansar lo suficiente para realizar tus actividades cotidianas?"},{id:"q10",sort_order:10,dimension:"sueno_descanso",is_reverse_scored:!0,question_text:"¿Has mantenido un horario de sueño relativamente constante?"},{id:"q11",sort_order:11,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Te has despertado cansado(a) o con poca energía?"},{id:"q12",sort_order:12,dimension:"sueno_descanso",is_reverse_scored:!1,question_text:"¿Has tenido dificultad para conciliar el sueño o has dormido inquieto(a)?"},{id:"q13",sort_order:13,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has contado con alguien con quien hablar cuando lo necesitas?"},{id:"q14",sort_order:14,dimension:"apoyo_social",is_reverse_scored:!0,question_text:"¿Has compartido tiempo con familiares o amistades que te hacen bien?"},{id:"q15",sort_order:15,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Te has sentido solo(a) o con poca conexión con quienes te rodean?"},{id:"q16",sort_order:16,dimension:"apoyo_social",is_reverse_scored:!1,question_text:"¿Has evitado actividades sociales que antes disfrutabas?"},{id:"q17",sort_order:17,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has sentido motivación para participar en tus actividades universitarias?"},{id:"q18",sort_order:18,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Has tenido momentos para realizar actividades que te ayuden a sentirte mejor?"},{id:"q19",sort_order:19,dimension:"motivacion_pertenencia",is_reverse_scored:!0,question_text:"¿Te has sentido parte de tu comunidad universitaria?"},{id:"q20",sort_order:20,dimension:"motivacion_pertenencia",is_reverse_scored:!1,question_text:"¿Has perdido interés o entusiasmo por metas que antes te importaban?"}],Me=[{value:0,label:"Nunca"},{value:1,label:"Casi nunca"},{value:2,label:"Algunas veces"},{value:3,label:"Frecuentemente"},{value:4,label:"Casi siempre"}];function De({question:a,value:s,onChange:n,index:i}){return e.jsxs("article",{className:"question-card",children:[e.jsxs("span",{className:"question-number",children:["PREGUNTA ",i+1]}),e.jsx("h2",{className:"question-text",children:a.question_text}),e.jsx("div",{className:"options",role:"radiogroup","aria-label":"Opciones de respuesta",children:Me.map(t=>e.jsxs("button",{type:"button",role:"radio","aria-checked":s===t.value,className:`option ${s===t.value?"selected":""}`,onClick:()=>n(t.value),children:[e.jsx("span",{className:"opt-mark","aria-hidden":"true"}),e.jsx("span",{children:t.label})]},t.value))})]},a.id)}const Sa=[{id:"orientacion_psicologica",label:"Orientación psicológica",icon:"🧠"},{id:"tutoria_academica",label:"Tutoría académica",icon:"📚"},{id:"deporte",label:"Actividades deportivas",icon:"🏃"},{id:"cultura",label:"Actividades culturales",icon:"🎭"},{id:"comunidad",label:"Integración comunitaria",icon:"🤝"},{id:"medico",label:"Servicios médicos",icon:"🩺"},{id:"emergencia",label:"Atención de emergencia",icon:"☎️"},{id:"sustentabilidad",label:"Bienestar verde",icon:"🌿"}],X=[{id:"r-uepi",name:"Unidad de Evaluación Psicológica Iztacala (UEPI)",type:"orientacion_psicologica",description:"Acompañamiento psicológico para la comunidad universitaria. Atención individual y grupal.",audience:"Estudiantes UNAM",modality:"Presencial / a distancia",location:"FES Iztacala",schedule:"Lunes a viernes, 9:00 a 17:00",contact:"uepi@iztacala.unam.mx",tags:["psicología","atención","orientación"]},{id:"r-tutorias",name:"Programa Institucional de Tutorías",type:"tutoria_academica",description:"Tutorías académicas y de trayectoria escolar. Acompañamiento para mejorar tu desempeño.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu facultad o escuela",schedule:"Según agenda del tutor",contact:"Coordinación de tutorías de tu plantel",tags:["académico","tutoría","desempeño"]},{id:"r-deporte",name:"Activación física comunitaria",type:"deporte",description:"Sesiones abiertas de yoga, baile y movimiento físico en explanadas universitarias.",audience:"Comunidad UNAM",modality:"Presencial",location:"Explanadas en distintos planteles",schedule:"Martes y jueves, 8:00",contact:"Difusión cultural y deportiva",tags:["deporte","movimiento","comunidad"]},{id:"r-cultura",name:"Talleres culturales",type:"cultura",description:"Talleres de música, escritura, pintura, teatro y otros oficios artísticos abiertos a estudiantes.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Casa del Tiempo y centros culturales",schedule:"Calendario semestral",contact:"Difusión cultural UNAM",tags:["arte","cultura","comunidad"]},{id:"r-comunidad",name:"Círculos de bienestar Sintonía",type:"comunidad",description:"Encuentros guiados para compartir experiencias y construir comunidad.",audience:"Estudiantes UNAM",modality:"Presencial",location:"Tu plantel",schedule:"Miércoles 17:00",contact:"sintonia@unam.mx",tags:["comunidad","apoyo","pertenencia"]},{id:"r-medico",name:"Servicios médicos universitarios",type:"medico",description:"Consulta médica general gratuita para personal y estudiantes.",audience:"Comunidad UNAM",modality:"Presencial",location:"Centros médicos por plantel",schedule:"Lunes a viernes",contact:"Servicios médicos de tu plantel",tags:["salud","medicina","consulta"]},{id:"r-emergencia",name:"Línea de la Vida (24/7)",type:"emergencia",description:"Servicio de orientación emocional gratuito y confidencial, disponible las 24 horas.",audience:"Cualquier persona",modality:"Telefónica",location:"Nacional",schedule:"24 horas, todos los días",contact:"800 290 0024",tags:["emergencia","crisis","apoyo inmediato"]},{id:"r-sustenta",name:"Bienestar verde — caminatas y jardines",type:"sustentabilidad",description:"Actividades en espacios verdes de Ciudad Universitaria: caminatas, jardines polinizadores, talleres de plantas medicinales.",audience:"Comunidad UNAM",modality:"Presencial",location:"Ciudad Universitaria",schedule:"Sábados 10:00",contact:"sustentabilidad@unam.mx",tags:["sustentabilidad","naturaleza","autocuidado"]}],D=[{dimension:"estado_emocional",level:"bajo",title:"Sigue cultivando tus rutinas de bienestar",description:"Tus respuestas sugieren un buen equilibrio emocional. Mantener pequeñas pausas, gratitud diaria o momentos de movimiento te ayudará a sostenerlo."},{dimension:"estado_emocional",level:"moderado",title:"Espacio para reconocer tus emociones",description:"Considera dedicar 10 minutos al día a registrar lo que sientes. Conversar con alguien de confianza puede aportar perspectiva."},{dimension:"estado_emocional",level:"prioritario",title:"Acércate a un servicio universitario de orientación",description:"Sentir tristeza o nervios sostenidos amerita acompañamiento. Te recomendamos contactar los servicios de orientación psicológica de tu plantel."},{dimension:"estres_academico",level:"bajo",title:"Tu carga académica parece manejable",description:"Conserva tus rutinas de organización. Una agenda y bloques de estudio cortos pueden sostener este ritmo."},{dimension:"estres_academico",level:"moderado",title:"Pequeños ajustes para liberar presión",description:"Prioriza tareas con la técnica de los 3 más importantes del día y agrega pausas activas de 5 minutos cada hora de estudio."},{dimension:"estres_academico",level:"prioritario",title:"Considera apoyo académico y orientación",description:"Sentirte rebasado(a) puede afectar tu desempeño y tu salud. Las tutorías académicas y la orientación universitaria pueden ser un buen primer paso."},{dimension:"sueno_descanso",level:"bajo",title:"Tu descanso es un recurso valioso",description:"Continúa cuidando tus horarios de sueño y exposición a pantallas. Tu energía agradecerá la consistencia."},{dimension:"sueno_descanso",level:"moderado",title:"Refuerza tu higiene del sueño",description:"Apaga pantallas 30 minutos antes de dormir, mantén tu habitación fresca y evita cafeína después del mediodía."},{dimension:"sueno_descanso",level:"prioritario",title:"El descanso necesita atención",description:"Dormir mal de forma sostenida impacta tu ánimo y concentración. Considera consultar con servicios médicos universitarios para descartar causas atendibles."},{dimension:"apoyo_social",level:"bajo",title:"Tu red de apoyo te acompaña",description:"Mantener vínculos cercanos es protector. Procura escuchar a quienes te rodean tanto como ellos te escuchan a ti."},{dimension:"apoyo_social",level:"moderado",title:"Reconecta con personas de confianza",description:"Una llamada o un café con alguien cercano puede reforzar tu bienestar. Las actividades comunitarias universitarias también ayudan."},{dimension:"apoyo_social",level:"prioritario",title:"Buscar compañía es un acto de cuidado",description:"Sentirte aislado(a) merece atención. Considera unirte a actividades culturales o deportivas universitarias y, si lo prefieres, a grupos de orientación."},{dimension:"motivacion_pertenencia",level:"bajo",title:"Tu motivación es un buen aliado",description:"Conserva los proyectos y actividades que te dan propósito. Compartir lo que disfrutas con otros lo amplifica."},{dimension:"motivacion_pertenencia",level:"moderado",title:"Reactiva pequeños propósitos",description:"Establece una meta sencilla esta semana: una clase opcional, una actividad cultural o una salida nueva por tu campus."},{dimension:"motivacion_pertenencia",level:"prioritario",title:"Espacios universitarios para reencontrarte",description:"Talleres, deporte, voluntariado y actividades culturales pueden reabrir el sentido de pertenencia. Acércate a las actividades comunitarias de tu facultad."}];function Ue(a){return D.filter(s=>{var n;return((n=a[s.dimension])==null?void 0:n.level)===s.level})}async function $e(){if(!w)return G;const{data:a,error:s}=await y.from("questions").select("id, dimension, question_text, is_reverse_scored, sort_order").eq("active",!0).order("sort_order");return s||!a||a.length===0?(s&&console.warn("[supabase] questions →",s.message),G):a}async function wa(){if(!w)return X;const{data:a,error:s}=await y.from("resources").select("*").eq("active",!0).order("name");return s||!a||a.length===0?(s&&console.warn("[supabase] resources →",s.message),X):a}async function Fe(){if(!w)return D;const{data:a,error:s}=await y.from("recommendations").select("dimension, level, title, description").eq("active",!0);return s||!a||a.length===0?(s&&console.warn("[supabase] recommendations →",s.message),D):a}async function Ve(a){if(!w)return{saved:!1,id:null};const s=window.crypto&&crypto.randomUUID?crypto.randomUUID():"sin-"+Date.now()+"-"+Math.random().toString(36).slice(2,10),{error:n}=await y.from("assessment_sessions").insert({id:s,...a});return n?(console.warn("[supabase] saveSession →",n.message),{saved:!1,error:n.message,id:s}):{saved:!0,id:s}}async function Be(a,s){if(!w||!a)return{saved:!1};const n=s.map(t=>({session_id:a,...t})),{error:i}=await y.from("assessment_answers").insert(n);return i?(console.warn("[supabase] saveAnswers →",i.message),{saved:!1,error:i.message}):{saved:!0}}async function Ea(){if(!w)return{ok:!1,reason:"not_configured"};try{const{error:a}=await y.from("questions").select("id",{head:!0,count:"exact"});return a?{ok:!1,reason:a.message}:{ok:!0}}catch(a){return{ok:!1,reason:a.message}}}const q=4;function He(a,s){const n=Math.max(0,Math.min(q,Number(s)));return a.is_reverse_scored?(q-n)/q:n/q}function L(a){return a<=K.bajo.max?"bajo":a<=K.moderado.max?"moderado":"prioritario"}function We(a,s){var v;const n=Object.create(null);for(const d of Y)n[d.id]={sum:0,n:0};let i=0,t=0;const o={};for(const d of a){const l=s[d.id];if(l==null)continue;const x=He(d,l);o[d.id]=x,n[d.dimension]||(n[d.dimension]={sum:0,n:0}),n[d.dimension].sum+=x,n[d.dimension].n+=1,i+=x,t+=1}const c={};for(const[d,l]of Object.entries(n)){const x=l.n?Math.round(l.sum/l.n*100):0;c[d]={score:x,level:L(x),level_label:P[L(x)],label:((v=Y.find(_=>_.id===d))==null?void 0:v.label)||d}}const u=t?Math.round(i/t*100):0,h=L(u),m=Object.entries(c).filter(([,d])=>d.level!=="bajo").sort((d,l)=>l[1].score-d[1].score).map(([d,l])=>({id:d,label:l.label,score:l.score,level:l.level}));return{total_score:u,general_level:h,general_level_label:P[h],dimensions:c,top_attention_areas:m,normalized_by_question:o}}const Ke="ABCDEFGHJKLMNPQRSTUVWXYZ",Je="23456789";function Z(a,s){let n="";const i=new Uint32Array(s);crypto.getRandomValues(i);for(let t=0;t<s;t++)n+=a[i[t]%a.length];return n}function re(){return`SIN-${Z(Ke,3)}-${Z(Je,4)}`}async function Qe(a){if(!w)return null;try{const{data:s,error:n}=await y.functions.invoke(ne,{body:a});return n?(console.warn("[gemini] error →",n.message),null):!s||typeof s!="object"||s.error?null:s}catch(s){return console.warn("[gemini] excepción →",s.message),null}}async function Aa(){if(!w)return{ok:!1,reason:"not_configured"};try{const{error:a}=await y.functions.invoke(ne,{body:{ping:!0}});return{ok:!a,reason:a==null?void 0:a.message}}catch(a){return{ok:!1,reason:a.message}}}async function Ye({questions:a,answers:s,anonymousCode:n}){const i=We(a,s),t=n||re(),o={anonymous_code:t,test_version:W,total_score:i.total_score,general_level:i.general_level,dimension_scores:i.dimensions,top_attention_areas:i.top_attention_areas},{id:c}=await Ve(o);if(c){const m=Object.entries(s).map(([v,d])=>({question_id:v,answer_value:Number(d),normalized_value:i.normalized_by_question[v]??null}));await Be(c,m)}const u=await Fe(),h=await Qe({session_id:c,test_version:W,general_level:i.general_level,dimensions:i.dimensions,top_attention_areas:i.top_attention_areas,recommendation_catalog:u.slice(0,30)});return{session_id:c||null,anonymous_code:t,created_at:new Date().toISOString(),...i,ai:h||null,base_recommendations:u}}function Ge(){const a=U(),[s,n]=r.useState([]),[i,t]=r.useState({}),[o,c]=r.useState(0),[u,h]=r.useState(!0),[m,v]=r.useState(!1),[d,l]=r.useState(null);r.useEffect(()=>{if(!sessionStorage.getItem(S.CONSENT)){a("/consentimiento",{replace:!0});return}let A=!0;return $e().then(ce=>{if(A){n(ce);try{const F=sessionStorage.getItem(S.ANSWERS);F&&t(JSON.parse(F))}catch{}h(!1)}}),()=>{A=!1}},[]),r.useEffect(()=>{if(!u)try{sessionStorage.setItem(S.ANSWERS,JSON.stringify(i))}catch{}},[i,u]);const x=s.length,_=s[o],E=r.useMemo(()=>s.every(j=>i[j.id]!==void 0),[s,i]);function N(j){_&&t(A=>({...A,[_.id]:j}))}function k(){o<x-1&&c(j=>j+1)}function T(){o>0&&c(j=>j-1)}async function oe(){if(!E){const j=s.findIndex(A=>i[A.id]===void 0);j!==-1&&c(j);return}v(!0),l(null);try{const j=re(),A=await Ye({questions:s,answers:i,anonymousCode:j});sessionStorage.setItem(S.RESULT,JSON.stringify(A)),sessionStorage.setItem(S.ANON_CODE,j),sessionStorage.removeItem(S.ANSWERS),a("/resultado")}catch(j){console.error(j),l("No pudimos generar tu resultado en este momento. Intenta nuevamente en unos segundos.")}finally{v(!1)}}return u?e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",style:{maxWidth:720,textAlign:"center"},children:[e.jsx("div",{className:"spinner",style:{margin:"40px auto 18px"}}),e.jsx("p",{className:"lede",children:"Preparando preguntas…"})]})}):e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:820},children:[e.jsx(Pe,{current:o+1,total:x}),_&&e.jsx(De,{index:o,question:_,value:i[_.id],onChange:N}),e.jsxs("div",{className:"assess-actions mt-3",children:[e.jsx("button",{className:"btn btn-ghost",onClick:T,disabled:o===0,children:"← Anterior"}),o<x-1?e.jsx("button",{className:"btn btn-primary",onClick:k,disabled:i[_==null?void 0:_.id]===void 0,children:"Siguiente →"}):e.jsx("button",{className:"btn btn-coral btn-lg",onClick:oe,disabled:m||!E,children:m?"Generando orientación…":"Finalizar y ver resultado"})]}),!E&&o===x-1&&e.jsx("p",{className:"note text-center mt-3",children:'Te faltan algunas preguntas por contestar. Usa "Anterior" para revisarlas.'}),d&&e.jsx("div",{className:"mt-4",children:e.jsx(I,{variant:"warm",children:d})}),e.jsx("p",{className:"text-center mt-4",children:e.jsx(f,{to:"/",className:"note",children:"Salir y descartar respuestas"})})]}),e.jsx("style",{children:`
        .assess-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
      `})]})}function Xe({result:a}){if(!a)return null;const{total_score:s,general_level_label:n,anonymous_code:i,ai:t}=a;return e.jsx("section",{className:"result-card",children:e.jsxs("div",{className:"result-hero",children:[e.jsxs("div",{className:"result-score",children:[e.jsx("span",{className:"result-score-num",children:s}),e.jsx("span",{className:"result-score-label",children:"/ 100"})]}),e.jsxs("div",{className:"result-meta",children:[e.jsx("span",{className:"tag",children:"Tu orientación"}),e.jsx("h1",{className:"mt-2",children:n}),e.jsx("p",{className:"result-summary",children:(t==null?void 0:t.friendly_summary)||"Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas. Recuerda que esto es una orientación, no un diagnóstico."}),i&&e.jsxs("p",{className:"anon-code",children:["Tu código anónimo: ",e.jsx("strong",{children:i}),e.jsx("small",{children:"Puedes copiarlo si quieres consultar tu resultado nuevamente más tarde."})]})]})]})})}function Ze({dimensions:a}){const s=Object.entries(a);return e.jsx("div",{className:"dim-chart",role:"list",children:s.map(([n,i])=>e.jsxs("div",{className:"dim-row",role:"listitem",children:[e.jsx("div",{className:"dim-label",children:i.label}),e.jsx("div",{className:"dim-track","aria-label":`Puntaje ${i.score} de 100`,children:e.jsx("span",{className:`dim-fill lvl-bg-${i.level}`,style:{width:`${i.score}%`}})}),e.jsxs("div",{className:`dim-value lvl-${i.level}`,children:[i.score,e.jsx("small",{children:P[i.level]})]})]},n))})}function ea({sessionId:a}){const[s,n]=r.useState(0),[i,t]=r.useState(0),[o,c]=r.useState(""),[u,h]=r.useState(!1),[m,v]=r.useState(!1);async function d(){if(s!==0){if(v(!0),w)try{await y.from("assessment_feedback").insert({session_id:a||null,rating:s,comment:o.trim()||null})}catch(l){console.warn(l)}h(!0),v(!1)}}return u?e.jsx("div",{className:"feedback-thanks",children:e.jsxs("p",{children:["✨ ",e.jsx("strong",{children:"Gracias por tu retroalimentación."})," Nos ayuda a mejorar el programa."]})}):e.jsxs("div",{className:"feedback-box",children:[e.jsx("h3",{children:"¿Cómo te pareció esta orientación?"}),e.jsx("div",{className:"stars",role:"radiogroup","aria-label":"Calificación",children:[1,2,3,4,5].map(l=>e.jsx("button",{type:"button",role:"radio","aria-checked":s===l,className:`star ${(i||s)>=l?"active":""}`,onMouseEnter:()=>t(l),onMouseLeave:()=>t(0),onClick:()=>n(l),children:"★"},l))}),e.jsx("textarea",{placeholder:"Comentario opcional…",value:o,onChange:l=>c(l.target.value),rows:2}),e.jsx("button",{className:"btn btn-primary btn-sm",disabled:s===0||m,onClick:d,children:m?"Enviando…":"Enviar"}),e.jsx("style",{children:`
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
      `})]})}function aa(){var h,m,v,d;const a=U(),[s,n]=r.useState(null);if(r.useEffect(()=>{try{const l=sessionStorage.getItem(S.RESULT);if(!l)return a("/",{replace:!0});n(JSON.parse(l))}catch{a("/",{replace:!0})}},[a]),!s)return null;const i=((h=s.ai)==null?void 0:h.suggested_actions)||[],t=((m=s.ai)==null?void 0:m.recommended_resources)||[],o=(v=s.ai)==null?void 0:v.safety_note,c=s.base_recommendations?Ue(s.dimensions).map(l=>({title:l.title,description:l.description})):[];function u(){var x,_,E;const l=["Sintonía UNAM — Tu orientación",`Código anónimo: ${s.anonymous_code}`,`Nivel general: ${s.general_level_label} (${s.total_score}/100)`,"","Dimensiones:",...Object.entries(s.dimensions).map(([,N])=>`  • ${N.label}: ${N.score} (${N.level_label})`),"",((x=s.ai)==null?void 0:x.friendly_summary)||"",((_=s.ai)==null?void 0:_.safety_note)||"Esta orientación es informativa y no sustituye atención profesional."].join(`
`);(E=navigator.clipboard)==null||E.writeText(l).catch(()=>{})}return e.jsxs("section",{className:"section",children:[e.jsxs("div",{className:"container",style:{maxWidth:1e3},children:[e.jsx(Xe,{result:s}),s.general_level==="prioritario"&&e.jsxs("div",{className:"crisis-banner",children:[e.jsx("strong",{children:"📞 Tus respuestas sugieren acercarte a apoyo profesional."}),e.jsxs("p",{children:["Hay servicios universitarios y la ",e.jsx("strong",{children:"Línea de la Vida 800 290 0024"})," disponibles 24/7."]}),e.jsx(f,{to:"/apoyo",className:"btn btn-coral btn-sm",children:"Ver opciones de apoyo →"})]}),e.jsxs("div",{className:"route-cta mt-3",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"✨ Crea tu ruta de bienestar"}),e.jsx("small",{children:"Pum-AI te puede generar un plan diario de 7 o 14 días personalizado a tu resultado."})]}),e.jsx(f,{to:"/ruta",className:"btn btn-gold",children:"Comenzar mi ruta →"})]}),e.jsx(I,{children:o||e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Esta orientación es informativa."})," Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado, pero no constituyen un diagnóstico clínico. Si lo necesitas, acércate a un servicio de orientación universitario."]})}),e.jsxs("div",{className:"results-grid mt-4",children:[e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag azul",children:"Tus dimensiones"}),e.jsx("h2",{className:"mt-2",children:"Cómo se ve tu bienestar por área"}),e.jsx("p",{className:"lede",children:"Cada barra representa el nivel de atención que sugieren tus respuestas en esa área. Mayor puntaje = mayor invitación al autocuidado."}),e.jsx(Ze,{dimensions:s.dimensions})]}),e.jsxs("div",{className:"panel",children:[e.jsx("span",{className:"tag coral",children:"Acciones sugeridas"}),e.jsx("h2",{className:"mt-2",children:"Pasos pequeños y útiles"}),i.length>0?e.jsx("ul",{className:"rec-list",children:i.map((l,x)=>e.jsxs("li",{children:["✦ ",l]},x))}):e.jsxs("ul",{className:"rec-list",children:[c.length===0&&e.jsx("li",{children:"Sigue cultivando tus rutinas de bienestar. Tus respuestas no muestran áreas urgentes hoy."}),c.map((l,x)=>e.jsxs("li",{children:[e.jsxs("strong",{children:[l.title,"."]})," ",l.description]},x))]})]})]}),e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag sage",children:"Recursos sugeridos"}),e.jsx("h2",{className:"mt-2",children:"Recursos universitarios para ti"}),t.length>0?e.jsx("ul",{className:"rec-list",children:t.map((l,x)=>e.jsxs("li",{children:["📌 ",l]},x))}):e.jsxs("p",{children:["Visita la sección de ",e.jsx(f,{to:"/recursos",children:"Recursos de apoyo"})," para ver el catálogo completo."]})]}),((d=s.top_attention_areas)==null?void 0:d.length)>0&&e.jsxs("div",{className:"panel mt-4",children:[e.jsx("span",{className:"tag",children:"Áreas con mayor atención sugerida"}),e.jsx("h2",{className:"mt-2",children:"Dónde poner foco"}),e.jsx("ul",{className:"rec-list",children:s.top_attention_areas.map(l=>e.jsxs("li",{children:[e.jsx("strong",{children:l.label})," — Puntaje: ",l.score,", nivel: ",l.level==="prioritario"?"prioritario":"moderado","."]},l.id))})]}),e.jsx(ea,{sessionId:s.session_id}),e.jsxs("div",{className:"results-actions mt-4",children:[e.jsx("button",{className:"btn btn-gold",onClick:u,children:"📋 Copiar resultado"}),e.jsx(f,{to:"/recursos",className:"btn btn-secondary btn-primary",children:"Ver recursos universitarios"}),e.jsx(f,{to:"/evaluacion",className:"btn btn-ghost",children:"Volver a evaluar"}),e.jsx(f,{to:"/",className:"btn btn-ghost",children:"Ir al inicio"})]})]}),e.jsx("style",{children:`
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
      `})]})}const sa=r.lazy(()=>b(()=>import("./Resources-yUHna9I6.js"),__vite__mapDeps([0,1,2,3]))),na=r.lazy(()=>b(()=>import("./Privacy-Do91-uVm.js"),__vite__mapDeps([4,1,2]))),ia=r.lazy(()=>b(()=>import("./MyHistory-uLBlukXO.js"),__vite__mapDeps([5,1,2]))),ta=r.lazy(()=>b(()=>import("./CheckIn-DZbja3n5.js"),__vite__mapDeps([6,1,2]))),ra=r.lazy(()=>b(()=>import("./Journal-AKCrvKgb.js"),__vite__mapDeps([7,1,2]))),oa=r.lazy(()=>b(()=>import("./Support-BkmIAncg.js"),__vite__mapDeps([8,1,2]))),ca=r.lazy(()=>b(()=>import("./WellnessRoute-Dav_RZ_7.js"),__vite__mapDeps([9,1,2]))),la=r.lazy(()=>b(()=>import("./Companion-2cxYoCu_.js"),__vite__mapDeps([10,1,2]))),da=r.lazy(()=>b(()=>import("./Library-C5m9AJb5.js"),__vite__mapDeps([11,1,2]))),ua=r.lazy(()=>b(()=>import("./Emotions-BYrF0jkc.js"),__vite__mapDeps([12,1,2]))),ma=r.lazy(()=>b(()=>import("./MapPage-Di5ZQR-8.js"),__vite__mapDeps([13,1,2]))),pa=r.lazy(()=>b(()=>import("./Trees-C0N862iq.js"),__vite__mapDeps([14,1,2]))),xa=r.lazy(()=>b(()=>import("./Buddy-hbpLLrWR.js"),__vite__mapDeps([15,1,2]))),ha=r.lazy(()=>b(()=>import("./Adventure-CnDqNsWc.js"),__vite__mapDeps([16,1,2]))),ga=r.lazy(()=>b(()=>import("./Calendar-DTHBr6Dw.js"),__vite__mapDeps([17,1,2]))),va=r.lazy(()=>b(()=>import("./Admin-DH93SOiW.js"),__vite__mapDeps([18,1,19,2]))),fa=r.lazy(()=>b(()=>import("./AdminLogin-CgHqAW7t.js"),__vite__mapDeps([20,1,19,2])));function ba(){return e.jsx("div",{style:{display:"grid",placeItems:"center",minHeight:"40vh"},children:e.jsx("div",{className:"spinner"})})}function ja(){const s=z().pathname.startsWith("/admin");return e.jsxs(e.Fragment,{children:[!s&&e.jsx(Se,{}),e.jsx("main",{children:e.jsx(r.Suspense,{fallback:e.jsx(ba,{}),children:e.jsxs(de,{children:[e.jsx(g,{path:"/",element:e.jsx(Oe,{})}),e.jsx(g,{path:"/consentimiento",element:e.jsx(Le,{})}),e.jsx(g,{path:"/evaluacion",element:e.jsx(Ge,{})}),e.jsx(g,{path:"/resultado",element:e.jsx(aa,{})}),e.jsx(g,{path:"/recursos",element:e.jsx(sa,{})}),e.jsx(g,{path:"/privacidad",element:e.jsx(na,{})}),e.jsx(g,{path:"/mi-historia",element:e.jsx(ia,{})}),e.jsx(g,{path:"/check-in",element:e.jsx(ta,{})}),e.jsx(g,{path:"/diario",element:e.jsx(ra,{})}),e.jsx(g,{path:"/apoyo",element:e.jsx(oa,{})}),e.jsx(g,{path:"/ruta",element:e.jsx(ca,{})}),e.jsx(g,{path:"/companion",element:e.jsx(la,{})}),e.jsx(g,{path:"/biblioteca",element:e.jsx(da,{})}),e.jsx(g,{path:"/emociones",element:e.jsx(ua,{})}),e.jsx(g,{path:"/mapa",element:e.jsx(ma,{})}),e.jsx(g,{path:"/arboles",element:e.jsx(pa,{})}),e.jsx(g,{path:"/buddy",element:e.jsx(xa,{})}),e.jsx(g,{path:"/aventura",element:e.jsx(ha,{})}),e.jsx(g,{path:"/calendario",element:e.jsx(ga,{})}),e.jsx(g,{path:"/docentes",element:e.jsx(V,{to:"/admin/login",replace:!0})}),e.jsx(g,{path:"/admin/login",element:e.jsx(fa,{})}),e.jsx(g,{path:"/admin/*",element:e.jsx(va,{})}),e.jsx(g,{path:"*",element:e.jsx(V,{to:"/",replace:!0})})]})})}),!s&&e.jsx(we,{}),!s&&e.jsx(Ee,{}),!s&&e.jsx(qe,{})]})}(function(){const s=new URLSearchParams(window.location.search),n=s.get("p");if(n!==null){const i=s.get("q"),t=window.location.pathname.replace(/\/$/,"")+n+(i?"?"+i.replace(/~and~/g,"&"):"")+window.location.hash;window.history.replaceState(null,"",t)}})();const ya="/sintonia-unam/".replace(/\/$/,"");se(document.getElementById("root")).render(e.jsx(ue.StrictMode,{children:e.jsx(me,{basename:ya,children:e.jsx(ja,{})})}));export{Y as D,Sa as R,I as S,_e as a,S as b,Ne as c,Ea as d,Aa as e,wa as f,J as g,w as i,e as j,y as s,$ as u};
