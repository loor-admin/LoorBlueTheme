document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-open-dialog]');
  if (opener) { const dialog = document.getElementById(opener.dataset.openDialog); if (dialog && !dialog.open) { dialog._returnFocus = opener; dialog.showModal(); } }
  const closer = event.target.closest('[data-close-dialog]');
  if (closer) closer.closest('dialog')?.close();
  if (event.target instanceof HTMLDialogElement) { const r = event.target.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.target.close(); }
});
document.addEventListener('close', (event) => { if (event.target instanceof HTMLDialogElement) event.target._returnFocus?.focus(); }, true);
document.addEventListener('change', (event) => { if (event.target.matches('[data-localization-select]')) event.target.form.requestSubmit(); });

const footerBreakpoint = matchMedia('(min-width: 750px)');
function syncFooter(event) { document.querySelectorAll('.footer-accordion').forEach(detail => { detail.open = event.matches; }); }
syncFooter(footerBreakpoint);
footerBreakpoint.addEventListener('change', syncFooter);

document.querySelectorAll('[data-product-grid]').forEach(section => {
 const list=section.querySelector('[data-products]'), items=[...list.querySelectorAll('[data-product-item]')], count=section.querySelector('[data-product-count]');
 function update(){const shape=section.querySelector('[data-shape].is-active')?.dataset.shape || 'all'; let visible=0; items.forEach(item=>{item.hidden=shape!=='all' && !item.dataset.tags.includes(shape); if(!item.hidden) visible++;}); count.textContent=`${visible} ${visible===1?'frame':'frames'}`; section.querySelector('[data-empty-products]').hidden=visible!==0;}
 section.querySelectorAll('[data-shape]').forEach(button=>button.addEventListener('click',()=>{section.querySelectorAll('[data-shape]').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false')});button.classList.add('is-active');button.setAttribute('aria-pressed','true');update()}));
 section.querySelector('[data-product-sort]').addEventListener('change',event=>{const mode=event.target.value; items.sort((a,b)=>mode==='price-ascending'?+a.dataset.price-+b.dataset.price:mode==='price-descending'?+b.dataset.price-+a.dataset.price:mode==='title'?a.dataset.title.localeCompare(b.dataset.title):+a.dataset.index-+b.dataset.index);items.forEach(item=>list.append(item));}); update();
});
