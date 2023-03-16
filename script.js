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
const head=document.querySelector('.nav');
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
});
const handleHover=function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const sibilings=link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(sibilings);
    const logo=link.closest('.nav').querySelector('img');
    sibilings.forEach(e1=>{
      if(e1!==link) e1.style.opacity=this;
    });
      logo.style.opacity=this;
}
}
head.addEventListener('mouseover',handleHover.bind(0.5));
head.addEventListener('mouseout',handleHover.bind(1));
// const inital=section.getBoundingClientRect();
// console.log(inital.top);
// window.addEventListener('scroll',function(){
//   console.log(this.window.scrollY);
// if(window.scrollY>inital.top){
//   head.classList.add('sticky');
// }
// else{
//   head.classList.remove('sticky');
// }
// });
//entries holds an array of threshold.threshold is a value that a target element intersecting the root.
//the observer observe the target element intersecting the root at the threshold value.
const header=document.querySelector('.header');
const sticky=function(entries){
  const [entry]=entries;
  // console.log(entry);
  if(!entry.isIntersecting) head.classList.add('sticky');
  else head.classList.remove('sticky');
}
const headerObeserver=new IntersectionObserver(sticky,{
  root:null,
  threshold:0,
});
headerObeserver.observe(header);
const sections=document.querySelectorAll('.section');
const secall=function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
}
const sectionObserver=new IntersectionObserver(secall,{
  root:null,
  threshold:0.15,
});
sections.forEach(function(eachsection){
  sectionObserver.observe(eachsection);
  eachsection.classList.add('section--hidden');
})
const lazyload=function(entries){
  const [entry]=entries;
  entry.target.src=entry.target.dataset.src;
  if(!entry.isIntersecting) return
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });
}
const imgObserver=new IntersectionObserver(lazyload,{
  root:null,
  threshold:0,
});
const allimg=document.querySelectorAll('img[data-src]');
allimg.forEach(function(images){
  
});
allimg.forEach(img=>imgObserver.observe(img));
const photo=document.querySelectorAll('.slide');
const slider=document.querySelector('.slider');
const left=document.querySelector('.slider__btn--left');
const right=document.querySelector('.slider__btn--right');
const dots=document.querySelector('.dots');

let currentsilde=0;
const maxslide=photo.length;
// slider.style.transform='scale(0.5) translateX(-1300px)';
// slider.style.overflow='visible';
const createdots=function(){
  photo.forEach((s,i)=>{
    dots.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};
createdots();
const activeclass=function(slide){
 const dd=document.querySelectorAll('.dots__dot')
    dd.forEach(function(s){
      s.classList.remove('dots__dot--active'); //first remove all active class from the buttons
      document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    })
}
//-100,0,100,200
const goto=function(slide){
    photo.forEach((s,i)=>{
    s.style.transform=`translateX(${100 * (i-slide)}%)`;
    })
  }
  goto(0);
  const nextslide=function(){
    if(currentsilde===maxslide-1)
         currentsilde=0;
     else{
        currentsilde++;
     }
     goto(currentsilde);
     activeclass(currentsilde);
  }
  const prevslide=function(){
    if(currentsilde===0)
    currentsilde=maxslide-1;
    else{
   currentsilde--;
     }
    goto(currentsilde);
    activeclass(currentsilde);
   }
right.addEventListener('click',nextslide);
left.addEventListener('click',prevslide);
document.addEventListener('keydown',function(e){
  if(e.key==='ArrowLeft') prevslide();
  e.key === 'ArrowRight' && nextslide(); //short circuiting
})
dots.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    goto(slide);
    activeclass(slide);
  }
})


















