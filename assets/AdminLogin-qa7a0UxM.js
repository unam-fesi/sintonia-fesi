import{j as e}from"./index-xsdvGM5F.js";import{b as g,r,L as h}from"./vendor-react-BTW_75ak.js";import{g as m,a as f}from"./authService-C_Z62r03.js";import"./vendor-supabase-DS4euJVY.js";function y(){const t=g(),[n,p]=r.useState(""),[s,u]=r.useState(""),[l,i]=r.useState(null),[o,c]=r.useState(!1);r.useEffect(()=>{(async()=>await m().catch(()=>null)&&t("/admin",{replace:!0}))()},[t]);async function x(a){a.preventDefault(),i(null),c(!0);try{if(await f(n.trim(),s),!await m()){i("Esta cuenta no tiene permisos administrativos.");return}t("/admin",{replace:!0})}catch(d){i(d.message||"Credenciales incorrectas.")}finally{c(!1)}}return e.jsxs("section",{className:"login-shell",children:[e.jsxs("div",{className:"login-card",children:[e.jsx("div",{className:"login-mark",children:e.jsxs("svg",{width:"34",height:"34",viewBox:"0 0 30 30",fill:"none",children:[e.jsx("path",{d:"M3 18 C 7 8, 12 8, 15 18 S 23 28, 27 18",stroke:"#C9A227",strokeWidth:"2.4",strokeLinecap:"round",fill:"none"}),e.jsx("circle",{cx:"15",cy:"6",r:"2.2",fill:"#C9A227"})]})}),e.jsx("h1",{children:"Acceso interno"}),e.jsx("p",{className:"lede text-center",children:"Panel administrativo · Sintonía UNAM"}),l&&e.jsx("div",{className:"login-error",children:l}),e.jsxs("form",{onSubmit:x,autoComplete:"off",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"email",children:"Correo institucional"}),e.jsx("input",{id:"email",type:"email",required:!0,autoComplete:"username",value:n,onChange:a=>p(a.target.value),placeholder:"usuario@unam.mx"})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"password",children:"Contraseña"}),e.jsx("input",{id:"password",type:"password",required:!0,autoComplete:"current-password",value:s,onChange:a=>u(a.target.value)})]}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{width:"100%"},disabled:o,children:o?"Verificando…":"Iniciar sesión"})]}),e.jsx("p",{className:"note text-center mt-3",children:"Solo personal autorizado. Si tu cuenta no aparece, contacta a la coordinación del programa."}),e.jsx("p",{className:"text-center mt-2",children:e.jsx(h,{to:"/",className:"note",children:"← Volver al sitio público"})})]}),e.jsx("style",{children:`
        .login-shell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 40px 20px;
          background:
            radial-gradient(circle at 30% 20%, rgba(201,162,39,0.18), transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(143,184,160,0.18), transparent 50%),
            linear-gradient(135deg, var(--c-azul-800), #0A1929);
        }
        .login-card {
          width: 100%;
          max-width: 440px;
          background: #fff;
          border-radius: var(--r-xl);
          padding: 36px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
        }
        .login-mark {
          width: 64px; height: 64px;
          border-radius: 18px;
          background: linear-gradient(135deg, var(--c-azul-800), var(--c-azul-700));
          display: grid; place-items: center;
          margin: 0 auto 16px;
        }
        .login-card h1 {
          text-align: center;
          font-size: 1.6rem;
          margin: 0 0 4px;
        }
        .login-error {
          background: var(--c-coral-100);
          color: #93362A;
          border: 1px solid rgba(232,130,107,0.4);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 0.92rem;
          margin: 12px 0;
        }
      `})]})}export{y as default};
