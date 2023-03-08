'use strict';

///////////////////////////////////////
// Modal window
const btnmodal=document.querySelectorAll('.btn--show-modal');
const btnCloseModal=document.querySelector('.btn--close-modal');
const btnscroll=document.querySelector('.btn--scroll-to');
const modal=document.querySelector('.modal');
const section=document.querySelector('.section');
const parent=document.querySelector('.nav__links');
const container=document.querySelector('.operations__tab-container');
const tabs=document.querySelectorAll('.operations__tab');
const content=document.querySelectorAll('.operations__content');
//
const overlay=document.querySelector('.overlay');
const openmodal=function(){
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
const closemodal=function(){
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
btnmodal.forEach(e=>e.addEventListener('click',openmodal));
btnCloseModal.addEventListener('click',closemodal);
btnscroll.addEventListener('click',function(){
  section.scrollIntoView({behavior:"smooth"});
})
parent.addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:"smooth"});
  }
});
container.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');
  console.log(clicked);
  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  if(!clicked) return;
  clicked.classList.add('operations__tab--active'); 
  console.log(clicked.dataset.tab);
  content.forEach(c=>c.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  //   document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

  // clicked.classList.add('operations__content--active');
})





























