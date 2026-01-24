import{j as t}from"./three-vendor-19bERZqO.js";import{r as s}from"./react-vendor-Fx7eYSTI.js";import{c as v,V as d,N as h,F as j}from"./main-CztOB6zE.js";import"./motion-vendor-DdkHDI88.js";function q(){const[c,m]=s.useState(""),[p,x]=s.useState(!0),l=s.useRef(null),u=s.useRef(null);return s.useEffect(()=>{fetch("/content/_aboutme/aboutme/index.html").then(o=>o.text()).then(o=>{const i=new DOMParser().parseFromString(o,"text/html"),r=i.querySelector("article")||i.querySelector("main");if(r){const a=r.cloneNode(!0),g=a.querySelectorAll("script"),b=a.querySelectorAll("style");g.forEach(e=>e.remove()),b.forEach(e=>e.remove()),a.querySelectorAll("a").forEach(e=>{const f=e.getAttribute("href"),y=e.textContent.trim().toLowerCase();(f==="/"||f==="#")&&y==="home"&&e.remove()}),a.querySelectorAll('h2, p, li, a, span:not([class*="code"]):not([class*="pre"])').forEach(e=>{e.querySelector("code, pre")||!e.textContent||!e.textContent.trim()||(e.setAttribute("data-variable-proximity","true"),e.setAttribute("data-text-content",e.textContent.trim()))}),m(a.innerHTML)}else m("<p>Content not found</p>");x(!1)}).catch(o=>{console.error("Error loading content:",o),m("<p>Error loading content</p>"),x(!1)})},[]),s.useEffect(()=>{if(!c||!u.current)return;u.current.querySelectorAll('[data-variable-proximity="true"]').forEach(n=>{const i=n.getAttribute("data-text-content");if(!i||n.hasAttribute("data-proximity-processed"))return;const r=document.createElement("span");r.style.display="inline",v(r).render(t.jsx(d,{label:i,containerRef:l,radius:90,falloff:"gaussian",className:n.className})),n.innerHTML="",n.appendChild(r),n.setAttribute("data-proximity-processed","true")})},[c]),p?t.jsxs("div",{className:"relative z-10 pointer-events-none min-h-screen",children:[t.jsx("div",{className:"pointer-events-auto",children:t.jsx(h,{})}),t.jsx("div",{className:"pointer-events-auto min-h-screen flex items-center justify-center",children:t.jsxs("div",{className:"text-center",children:[t.jsx("div",{className:"inline-block w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin mb-4"}),t.jsx("p",{className:"text-white font-light",children:"Loading..."})]})})]}):t.jsxs("div",{className:"relative z-10 pointer-events-none min-h-screen",children:[t.jsx("div",{className:"pointer-events-auto",children:t.jsx(h,{})}),t.jsxs("div",{className:"pointer-events-auto relative",ref:l,children:[t.jsxs("div",{className:"max-w-4xl mx-auto px-6 lg:px-16 py-20 pt-24 md:pt-32",children:[t.jsxs("div",{className:"mb-16 md:mb-20",children:[t.jsx("h1",{className:"text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight",style:{fontFamily:"'Outfit', sans-serif"},children:t.jsx(d,{label:"About Me",containerRef:l,radius:90,falloff:"gaussian",className:"text-5xl md:text-6xl lg:text-7xl font-bold text-white"})}),t.jsx("p",{className:"text-lg md:text-xl text-white font-light leading-relaxed",style:{fontFamily:"'Sora', sans-serif"},children:t.jsx(d,{label:"A journey through sound, code, and everything in between",containerRef:l,radius:90,falloff:"gaussian",className:"text-lg md:text-xl text-white font-light"})})]}),t.jsx("article",{ref:u,className:"about-content",dangerouslySetInnerHTML:{__html:c}}),t.jsx("style",{children:`
            .about-content {
              color: white;
              font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 16px;
              line-height: 1.7;
              font-weight: 300;
            }
            
            
            .about-content h1 {
              display: none;
            }
            
            .about-content h2 {
              font-family: 'Outfit', sans-serif;
              font-size: 1.75rem;
              font-weight: 600;
              margin-top: 3rem;
              margin-bottom: 1rem;
              color: white;
              line-height: 1.3;
            }
            
            .about-content h2:first-of-type {
              margin-top: 0;
            }
            
            
            .about-content p {
              margin-bottom: 1.25rem;
              color: rgba(255, 255, 255, 0.95);
              font-weight: 300;
              font-size: 1rem;
              line-height: 1.7;
              max-width: 65ch;
            }
            
            .about-content p:first-of-type {
              font-size: 1.05rem;
              margin-bottom: 1.5rem;
            }
            
            
            .about-content ul {
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;
            }
            
            .about-content li {
              margin-bottom: 0.5rem;
              color: rgba(255, 255, 255, 0.95);
              font-weight: 300;
              line-height: 1.6;
            }
            
            
            .about-content a {
              color: rgba(255, 255, 255, 0.9);
              text-decoration: underline;
              text-decoration-color: rgba(255, 255, 255, 0.4);
            }
            
            .about-content a:hover {
              color: white;
            }
            
            .about-content h2 + p {
              margin-top: 0.5rem;
            }
            
            .about-content ::selection {
              background: rgba(255, 255, 255, 0.2);
            }
          `})]}),t.jsx(j,{})]})]})}export{q as default};
