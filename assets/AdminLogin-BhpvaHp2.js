import{j as a}from"./index-DaP6q7Nb.js";import{b as g,r as t,L as h}from"./vendor-react-BTW_75ak.js";import{g as m,a as b}from"./authService-DTeiDAfM.js";import"./vendor-supabase-DS4euJVY.js";function N(){const i=g(),[n,p]=t.useState(""),[s,u]=t.useState(""),[o,r]=t.useState(null),[l,c]=t.useState(!1);t.useEffect(()=>{(async()=>await m().catch(()=>null)&&i("/admin",{replace:!0}))()},[i]);async function x(e){e.preventDefault(),r(null),c(!0);try{if(await b(n.trim(),s),!await m()){r("Esta cuenta no tiene permisos administrativos.");return}i("/admin",{replace:!0})}catch(d){r(d.message||"Credenciales incorrectas.")}finally{c(!1)}}return a.jsxs("section",{className:"login-shell",children:[a.jsxs("div",{className:"login-card",children:[a.jsx("img",{src:"/sintonia-unam/Sintonia-icon192.png",srcSet:"/sintonia-unam/Sintonia-icon192.png 1x, /sintonia-unam/Sintonia-icon512.png 2x",alt:"Sintonía UNAM",className:"login-mark",width:"72",height:"72"}),a.jsx("h1",{children:"Acceso interno"}),a.jsx("p",{className:"lede text-center",children:"Panel administrativo · Sintonía UNAM"}),o&&a.jsx("div",{className:"login-error",children:o}),a.jsxs("form",{onSubmit:x,autoComplete:"off",children:[a.jsxs("div",{className:"field",children:[a.jsx("label",{htmlFor:"email",children:"Correo institucional"}),a.jsx("input",{id:"email",type:"email",required:!0,autoComplete:"username",value:n,onChange:e=>p(e.target.value),placeholder:"usuario@unam.mx"})]}),a.jsxs("div",{className:"field",children:[a.jsx("label",{htmlFor:"password",children:"Contraseña"}),a.jsx("input",{id:"password",type:"password",required:!0,autoComplete:"current-password",value:s,onChange:e=>u(e.target.value)})]}),a.jsx("button",{type:"submit",className:"btn btn-primary",style:{width:"100%"},disabled:l,children:l?"Verificando…":"Iniciar sesión"})]}),a.jsx("p",{className:"note text-center mt-3",children:"Solo personal autorizado. Si tu cuenta no aparece, contacta a la coordinación del programa."}),a.jsx("p",{className:"text-center mt-2",children:a.jsx(h,{to:"/",className:"note",children:"← Volver al sitio público"})})]}),a.jsx("style",{children:`
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
          width: 72px; height: 72px;
          border-radius: 18px;
          object-fit: cover;
          display: block;
          margin: 0 auto 16px;
          box-shadow: var(--sh-md);
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
      `})]})}export{N as default};
