import{j as e}from"./three-vendor-19bERZqO.js";import{e as E,b as N,r as i}from"./react-vendor-Fx7eYSTI.js";import{c as q,V as z,N as y,F as C}from"./main-BTjPv0b2.js";import"./motion-vendor-DdkHDI88.js";const T={"new-school-recital":"/content/_performances/new-school-recital/","radiohead-ensemble":"/content/_performances/Radio-Head-Ensemble/","improv-ensemble-fall-2023":"/content/_performances/improv_ensemble_fall23/",mingus:"/content/_performances/mingus/","steely-dan":"/content/_performances/steelydan/","julius-hemphil":"/content/_performances/juliushemphil/","afro-cuban":"/content/_performances/afrocuban/","kennedy-dream":"/content/_performances/kdream/",unsilent:"/content/_performances/unsilent/","calc-project":"/content/_dataprojects/calcproject/","prog-logic":"/content/_dataprojects/proglogic/","internet-geographies":"/content/_dataprojects/internetgeo/","stats-one":"/content/_dataprojects/statsone/",milestones:"/content/_compositions/miles/"};function K(){const{category:f,slug:h}=E();N();const[m,c]=i.useState(""),[M,v]=i.useState(""),[w,d]=i.useState(!0),b=i.useRef(null),g=i.useRef(null);return i.useEffect(()=>{const r=T[h||f];if(r){const s=r.endsWith("/")?r+"index.html":r;fetch(s).then(n=>{if(!n.ok)throw new Error(`Failed to load: ${n.status} ${n.statusText}`);return n.text()}).then(n=>{var x;const p=new DOMParser().parseFromString(n,"text/html"),u=p.querySelector("article"),S=((x=p.querySelector("h1"))==null?void 0:x.textContent)||p.title;if(u){const a=u.cloneNode(!0);a.querySelectorAll("script").forEach(t=>t.remove());const j=a.querySelector("#scrollTrack");j&&j.remove(),a.querySelectorAll("style").forEach(t=>{t.remove()});const _=a.querySelectorAll("img"),A=s.replace("/index.html","");_.forEach(t=>{const o=t.getAttribute("src");o&&!o.startsWith("http")&&!o.startsWith("/")?t.setAttribute("src",A+"/"+o):o&&o.startsWith("http://localhost:4000")&&t.setAttribute("src",o.replace("http://localhost:4000",""))}),a.querySelectorAll("iframe").forEach(t=>{const o=t.getAttribute("src");o&&o.startsWith("http://localhost:4000")&&t.setAttribute("src",o.replace("http://localhost:4000",""))}),a.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, a, span:not([class*="code"]):not([class*="pre"])').forEach(t=>{t.querySelector("code, pre")||!t.textContent||!t.textContent.trim()||(t.setAttribute("data-variable-proximity","true"),t.setAttribute("data-text-content",t.textContent.trim()))}),c(a.innerHTML),v(S)}else c("<p>Content not found</p>");d(!1)}).catch(n=>{console.error("Error loading content:",n),c("<p>Error loading content</p>"),d(!1)})}else c("<p>Page not found</p>"),d(!1)},[f,h]),i.useEffect(()=>{if(!m||!g.current)return;g.current.querySelectorAll('[data-variable-proximity="true"]').forEach(r=>{const s=r.getAttribute("data-text-content");if(!s||r.hasAttribute("data-proximity-processed"))return;r.innerHTML;const n=r.className,l=document.createElement("span");l.style.display="inline",q(l).render(e.jsx(z,{label:s,containerRef:b,radius:90,falloff:"gaussian",className:n})),r.innerHTML="",r.appendChild(l),r.setAttribute("data-proximity-processed","true")})},[m]),w?e.jsxs("div",{className:"relative z-10 pointer-events-none min-h-screen",children:[e.jsx("div",{className:"pointer-events-auto",children:e.jsx(y,{})}),e.jsx("div",{className:"pointer-events-auto min-h-screen flex items-center justify-center",children:e.jsx("p",{className:"text-white font-light",children:"Loading..."})})]}):e.jsxs("div",{className:"relative z-10 pointer-events-none min-h-screen",ref:b,children:[e.jsx("div",{className:"pointer-events-auto",children:e.jsx(y,{})}),e.jsxs("div",{className:"pointer-events-auto",children:[e.jsxs("div",{className:"max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 pt-24 md:pt-28",children:[e.jsx("article",{ref:g,className:"project-content",dangerouslySetInnerHTML:{__html:m}}),e.jsx("style",{children:`
            .project-content {
              color: white;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 16px;
              line-height: 1.75;
              position: relative;
            }
            
            .project-content::before {
              content: '';
              position: absolute;
              left: -2rem;
              top: 0;
              bottom: 0;
              width: 1px;
              background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
            }
            
            .project-content h1 {
              font-size: clamp(2rem, 6vw, 4rem);
              font-weight: 100;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              color: white;
              letter-spacing: -0.04em;
              line-height: 0.95;
              position: relative;
              text-transform: uppercase;
              font-style: italic;
            }
            
            .project-content h1:first-of-type {
              margin-top: 0;
              font-size: clamp(2.5rem, 7vw, 5rem);
              padding-bottom: 1rem;
              margin-bottom: 2rem;
              position: relative;
              transform: rotate(-0.5deg);
            }
            
            .project-content h1:first-of-type::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 60%;
              height: 2px;
              background: linear-gradient(to right, rgba(255, 255, 255, 0.5), transparent);
              transform: rotate(-1deg);
            }
            
            .project-content h1:not(:first-of-type) {
              margin-left: -1.5rem;
              padding-left: 1.5rem;
              border-left: 3px solid transparent;
              border-image: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent) 1;
            }
            
            .project-content h2 {
              font-size: clamp(1.5rem, 4vw, 2.25rem);
              font-weight: 200;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              color: white;
              letter-spacing: 0.05em;
              text-transform: lowercase;
              position: relative;
              padding-left: 2.5rem;
              transform: rotate(0.3deg);
            }
            
            .project-content h2::before {
              content: '//';
              position: absolute;
              left: 0;
              top: 0;
              font-family: monospace;
              color: rgba(255, 255, 255, 0.2);
              font-size: 0.6em;
              font-weight: 300;
            }
            
            .project-content h3 {
              font-size: clamp(1.1rem, 2.5vw, 1.5rem);
              font-weight: 300;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              color: rgba(255, 255, 255, 0.95);
              letter-spacing: 0.02em;
              font-style: italic;
            }
            
            .project-content p {
              margin-bottom: 1.25rem;
              color: rgba(255, 255, 255, 0.95);
              font-weight: 300;
              max-width: 60ch;
              position: relative;
            }
            
            .project-content p:first-of-type {
              font-size: clamp(1rem, 1.8vw, 1.2rem);
              line-height: 1.75;
              color: white;
              margin-bottom: 2.5rem;
              max-width: 70ch;
              padding-left: 1.5rem;
              border-left: 2px solid rgba(255, 255, 255, 0.15);
              font-style: italic;
            }
            
            .project-content p:nth-child(even) {
              margin-left: 1.5rem;
            }
            
            .project-content img {
              max-width: 100%;
              height: auto;
              margin: 2rem 0;
              border-radius: 0;
              box-shadow: 
                15px 15px 0 rgba(255, 255, 255, 0.05),
                30px 30px 0 rgba(255, 255, 255, 0.02);
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              border: 1px solid rgba(255, 255, 255, 0.1);
              transform: rotate(-0.5deg);
            }
            
            .project-content img:hover {
              transform: rotate(0deg) translateY(-6px);
              box-shadow: 
                20px 20px 0 rgba(255, 255, 255, 0.08),
                40px 40px 0 rgba(255, 255, 255, 0.03);
            }
            
            .project-content img:nth-child(even) {
              transform: rotate(0.5deg);
              margin-left: 2rem;
            }
            
            .project-content img:nth-child(even):hover {
              transform: rotate(0deg) translateY(-6px);
            }
            
            .project-content iframe {
              width: 100%;
              margin: 2rem 0;
              border: none;
              border-radius: 0;
              box-shadow: 
                12px 12px 0 rgba(255, 255, 255, 0.05),
                24px 24px 0 rgba(255, 255, 255, 0.02);
              min-height: 400px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .project-content .image-column {
              display: flex;
              flex-direction: column;
              gap: 2rem;
              margin: 2rem 0;
              align-items: flex-start;
              padding-left: 1.5rem;
            }
            
            .project-content .image-column img {
              max-width: 75%;
              transform: rotate(-1deg);
            }
            
            .project-content .image-stageplot {
              display: flex;
              justify-content: flex-start;
              margin: 2rem 0;
              padding-left: 2rem;
            }
            
            .project-content .image-stageplot img {
              max-width: 70%;
              transform: rotate(1deg);
            }
            
            .project-content ul, .project-content ol {
              margin: 2rem 0;
              padding-left: 2.5rem;
              color: rgba(255, 255, 255, 0.95);
              list-style: none;
              position: relative;
            }
            
            .project-content ul li::before {
              content: '→';
              position: absolute;
              left: -1.5rem;
              color: rgba(255, 255, 255, 0.5);
            }
            
            .project-content li {
              margin-bottom: 0.75rem;
              line-height: 1.7;
              padding-left: 0.75rem;
            }
            
            .project-content code {
              background: rgba(255, 255, 255, 0.08);
              padding: 0.15em 0.5em;
              border-radius: 0;
              font-family: 'ui-monospace', 'SF Mono', 'Monaco', 'Consolas', monospace;
              font-size: 0.9em;
              color: rgba(255, 255, 255, 0.95);
              border: 1px solid rgba(255, 255, 255, 0.1);
              transform: rotate(-0.2deg);
              display: inline-block;
            }
            
            .project-content pre {
              background: rgba(0, 0, 0, 0.3);
              padding: 1.5rem;
              border-radius: 0;
              overflow-x: auto;
              margin: 2rem 0;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-left: 4px solid rgba(255, 255, 255, 0.2);
              transform: rotate(0.3deg);
              box-shadow: 8px 8px 0 rgba(255, 255, 255, 0.03);
            }
            
            .project-content pre code {
              background: none;
              padding: 0;
              color: rgba(255, 255, 255, 0.9);
              transform: none;
              border: none;
            }
            
            .project-content table {
              width: 100%;
              margin: 2rem 0;
              border-collapse: separate;
              border-spacing: 0;
              border: 1px solid rgba(255, 255, 255, 0.1);
              transform: rotate(-0.2deg);
            }
            
            .project-content th {
              background: rgba(255, 255, 255, 0.03);
              padding: 1rem 0.75rem;
              text-align: left;
              font-weight: 300;
              color: rgba(255, 255, 255, 0.95);
              border-bottom: 2px solid rgba(255, 255, 255, 0.1);
              text-transform: uppercase;
              letter-spacing: 0.1em;
              font-size: 0.85em;
            }
            
            .project-content td {
              padding: 1rem 0.75rem;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
              color: rgba(255, 255, 255, 0.95);
            }
            
            .project-content tr:hover {
              background: rgba(255, 255, 255, 0.02);
            }
            
            .project-content blockquote {
              border-left: 4px solid rgba(255, 255, 255, 0.2);
              padding-left: 1.5rem;
              margin: 2rem 0;
              color: rgba(255, 255, 255, 0.9);
              font-style: italic;
              transform: rotate(0.2deg);
              margin-left: 1.5rem;
              font-size: 1.05em;
            }
            
            .project-content em {
              font-style: italic;
              font-weight: 300;
              color: rgba(255, 255, 255, 0.95);
            }
            
            .project-content a {
              color: rgba(255, 255, 255, 0.9);
              text-decoration: none;
              border-bottom: 2px solid rgba(255, 255, 255, 0.2);
              transition: all 0.3s ease;
              position: relative;
            }
            
            .project-content a:hover {
              color: white;
              border-bottom-color: rgba(255, 255, 255, 0.6);
              transform: translateY(-1px);
            }
            
            .project-content hr {
              border: none;
              height: 1px;
              background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
              margin: 2.5rem 0;
              transform: rotate(-0.5deg);
            }
            
            @media (max-width: 768px) {
              .project-content::before {
                display: none;
              }
              
              .project-content h1:first-of-type {
                transform: none;
              }
              
              .project-content p:first-of-type {
                padding-left: 0;
                border-left: none;
                border-top: 2px solid rgba(255, 255, 255, 0.15);
                padding-top: 1rem;
              }
              
              .project-content p:nth-child(even),
              .project-content img:nth-child(even),
              .project-content blockquote {
                margin-left: 0;
              }
              
              .project-content img,
              .project-content img:nth-child(even) {
                transform: none;
              }
            }
          `})]}),e.jsx(C,{})]})]})}export{K as default};
