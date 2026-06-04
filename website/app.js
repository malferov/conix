
function fileForRoute(route){
 if(!route||route==='home') return 'content/index.md';
 if(route==='products') return 'content/products.md';
 if(route==='services') return 'content/services.md';
 if(route==='contact') return 'content/contact.md';
 if(route.startsWith('product/')) return 'content/products/'+route.split('/')[1]+'.md';
 if(route.startsWith('service/')) return 'content/services/'+route.split('/')[1]+'.md';
 return 'content/index.md';
}

function renderCards(route){
 const el=document.getElementById('cards');
 el.innerHTML='';
 
 const cap=s=>{
  if(s==='kubernetes-as-a-service') return 'Kubernetes as a Service';
  if(s==='registrationlogin') return 'Registration & Login';
  return s.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
 };
 PRODUCTS.forEach(p=>el.innerHTML+=`<div class="card"><h3>${cap(p)}</h3><a href="#product/${p}">View product</a></div>`);
 SERVICES.forEach(s=>el.innerHTML+=`<div class="card"><h3>${cap(s)}</h3><a href="#service/${s}">View service</a></div>`);
}

async function load(){
 const route=location.hash.slice(1)||'home';
 renderCards(route);
 const res=await fetch(fileForRoute(route));
 let md=await res.text();

 md=md.replace(/!\[[^\]]*\]\(([^)]+)\)/g,'<img src="content/$1">');
 document.getElementById('content').innerHTML=marked.parse(md);

 document.title=(document.querySelector('#content h1')?.textContent||'Conix One')+' | Conix One';
}
window.addEventListener('hashchange',load);
load();
