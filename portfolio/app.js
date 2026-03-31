
function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }

  window.onscroll = function() {headerShadow()};

  function headerShadow() {
    const navHeader =document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";

    } else {

      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";

    }
  }

// awdawd
 var typingEffect = new Typed(".typedText",{
    strings : ["Paul","an Overachiever","a Web and Software enthusiast", "a Learner"],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })








const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;
  
  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 500,
      sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

      document.querySelector('.nav-menu li a[href*=' + sectionId + ']').classList.add('active-link')

    }  else {

      document.querySelector('.nav-menu ul li a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}

window.addEventListener('scroll', scrollActive)



const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector(`.gallery-controls`);
const galleryControls = [`previous`, `next`];
const galleryItems = document.querySelectorAll(`.gallery-item`);

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  updateGallery(){
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`)
    });

  }

  setCurrentState(direction) {
    if(direction.className == `gallery-controls-previous`){
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift())
    }
    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement(`button`)).className = `gallery-controls-${control}`;
      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }

  useControls(){
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener(`click`, e => {
        e.preventDefault();
        this.setCurrentState(control);
      })
    })
  }

}


const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
exampleCarousel.setControls();
exampleCarousel.useControls();





const tooltip = document.getElementById('proj-tooltip');
const galleryHoverItems = document.querySelectorAll('.gallery-item');

let following = true;
let mouseX = 0, mouseY = 0;
let tooltipX = 0, tooltipY = 0;
const delay = 0.08; 
let rafId = null;

function setTooltipContent(el) {
  const title = el.getAttribute('data-title') || 'Project';
  const desc  = el.getAttribute('data-desc')  || '';
  const link  = el.getAttribute('data-link');

  let html = `<div class="tt-title">${title}</div>${desc}`;
  if (link) {
    html += `<br><a href="${link}" target="_blank" class="tt-link">⌘/Ctrl + click to open link.</a>`;
  }
  tooltip.innerHTML = html;
}

function animateTooltip() {
  
  tooltipX += (mouseX - tooltipX) * delay;
  tooltipY += (mouseY - tooltipY) * delay;

  const rect = tooltip.getBoundingClientRect();
  const tW = rect.width  || 300;
  const tH = rect.height || 80;
  const margin = 16;

  let left = tooltipX + 18;
  let top  = tooltipY - 18;

  
  if (left + tW + margin > window.innerWidth)  left = tooltipX - tW - 18;
  if (top  + tH + margin > window.innerHeight) top  = window.innerHeight - tH - margin;
  if (left < margin) left = margin;
  if (top  < margin) top  = margin;

  tooltip.style.left = `${left}px`;
  tooltip.style.top  = `${top}px`;

  rafId = requestAnimationFrame(animateTooltip);
}

function moveTooltip(e) {
  if (!following) return;
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function showTooltip(el) {
  setTooltipContent(el);
  tooltip.classList.add('visible');
  tooltip.setAttribute('aria-hidden', 'false');
  following = true;
  if (!rafId) rafId = requestAnimationFrame(animateTooltip);
}

function hideTooltip() {
  tooltip.classList.remove('visible');
  tooltip.setAttribute('aria-hidden', 'true');
  cancelAnimationFrame(rafId);
  rafId = null;
}


galleryHoverItems.forEach(el => {
  el.addEventListener('mouseenter', () => showTooltip(el));
  el.addEventListener('mousemove',  moveTooltip, { passive: true });
  el.addEventListener('mouseleave', hideTooltip);

  
  el.addEventListener('click', (e) => {
    const link = el.getAttribute('data-link');
    if (link && (e.metaKey || e.ctrlKey)) window.open(link, '_blank');
  });
});


tooltip.addEventListener('mouseenter', () => { following = false; });
tooltip.addEventListener('mouseleave', () => { following = true; });


galleryHoverItems.forEach(el => {
  el.addEventListener('touchstart', (e) => {
    if (e.target.closest('#proj-tooltip a')) return; 
    e.preventDefault();
    const already = tooltip.classList.contains('visible');
    if (!already) {
      showTooltip(el);
      const t = e.touches[0];
      mouseX = t.clientX;
      mouseY = t.clientY;
      if (!rafId) rafId = requestAnimationFrame(animateTooltip);
    } else {
      hideTooltip();
    }
  }, { passive: false });
});






(function () {
  "use strict";

  
  var items = document.querySelectorAll(".timeline li");

  
  
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();


window.initAnimations = function initAnimations() {
  
  try {
    
    const sr = ScrollReveal({ origin: 'top', distance: '80px', duration: 2000, reset: true });
    sr.reveal('.featured-text-card', {});
    sr.reveal('.featured-name', { delay: 100 });
    sr.reveal('.featured-text-info', { delay: 200 });
    sr.reveal('.featured-text-btn', { delay: 200 });
    sr.reveal('.social_icons', { delay: 200 });
    sr.reveal('.featured-image', { delay: 300 });
    sr.reveal('.project-box', { interval: 200 });
    sr.reveal('.top-header', {});
    sr.reveal('.gallery-container', { delay: 200 });
    sr.reveal('.timeline-box', { delay: 200 });
    sr.reveal('.slider', { delay: 200 });
    sr.reveal('.achievement_slider', { delay: 300 });
    sr.reveal('.skills-container', { delay: 100 });
    sr.reveal('.bar-skill-box', { delay: 200 });
    sr.reveal('.about-code', { delay: 200 });

    const srLeft  = ScrollReveal({ origin: 'left',  distance: '80px', duration: 2000, reset: true });
    const srRight = ScrollReveal({ origin: 'right', distance: '80px', duration: 2000, reset: true });
    srLeft.reveal('.about-info', { delay: 100 });
    srLeft.reveal('.contact-info', { delay: 100 });
    srLeft.reveal('.gallery-controls-previous', { delay: 300 });
    srLeft.reveal('.bar-skill-box-left', { delay: 200 });
    srRight.reveal('.skills-box', { delay: 100 });
    srRight.reveal('.contact-field', { delay: 100 });
    srRight.reveal('.gallery-controls-next', { delay: 300 });
    srRight.reveal('.bar-skill-box-right', { delay: 200 });
  } catch(_) {}

  
  window.dispatchEvent(new Event('resize'));
  window.dispatchEvent(new Event('scroll'));
};




let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    
    let active = 3;
    function loadShow(){
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        
        let stt = 0;

        for(var i = active + 1; i < items.length; i++){
            stt++;
            if (window.innerWidth >= 600) {
              items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
            }
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            if (window.innerWidth >= 600) {
              items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            }
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }
    loadShow();
    next.onclick = function(){
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
    prev.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }
    


const slides = document.querySelectorAll(".achievement_slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}





let circularProgressList = document.querySelectorAll(".circular-progress");
let progressValueList = document.querySelectorAll(".progress-value");
let progressEndValue = [90, 30, 50, 25, 20];
let speed = 10;
circularProgressList.forEach((circularProgress, index) => {
    let progressStartValue = 0;
    let progressValue = progressValueList[index];
    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(var(--first-color) ${progressStartValue * 3.6}deg, #f4f4f4 0deg)`;
        if (progressStartValue === progressEndValue[index]) {
            clearInterval(progress);
        }
    }, speed);
});




const contactForm = document.getElementById('form-control');

const sendEmail = (e) => {
    e.preventDefault();

    
    emailjs.sendForm('service_lq1s5lz', 'template_67jxw7s', '#form-control', 'rnaQYW9L1hlPQxTWb')
        .then(() => {
            Swal.fire({
                title: "Success!",
                text: "You will receive an automatic email confirmation!",
                icon: "success"
            });

            
            contactForm.reset()
        }, () => {
            
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: 'Name, Email, and Message are required!'
            });
        });
}

contactForm.addEventListener("submit", sendEmail);

(() => {
  const editor = document.querySelector('.code-editor.no-gutter');
  if (!editor) return;

  
  editor.classList.add('reveal');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        editor.classList.add('is-in');
        startScramble(editor);
        io.disconnect(); 
      }
    }
  }, { threshold: .2 });
  io.observe(editor);

  
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CHAOS = "!@#$%^&*()_+-=[]{}|;:,./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function getTextNodes(root){
    const out = [];
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        
        return /\S/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let n; while(n = walk.nextNode()) out.push(n);
    return out;
  }

  function scrambleNode(node, finalText, duration=3000, jitter=25){
    if (REDUCE) { node.nodeValue = finalText; return; }
    const start = performance.now();
    const len = finalText.length;

    const frame = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const out = [];
      for (let i=0;i<len;i++){
        const target = finalText[i];
        if (!/[A-Za-z0-9]/.test(target)) { out.push(target); continue; }

        
        const resolveAt = Math.min(1, (i / len) * 0.6 + 0.25 + Math.random()*0.1);
        if (t < resolveAt) {
          
          out.push(CHAOS[Math.floor(Math.random()*CHAOS.length)]);
        } else {
          out.push(target);
        }
      }
      node.nodeValue = out.join('');
      if (t < 1) requestAnimationFrame(frame);
      else node.nodeValue = finalText; 
    };

    
    setTimeout(() => requestAnimationFrame(frame), Math.random()*jitter);
  }

  function startScramble(editorEl){
    const codeRoot = editorEl.querySelector('pre.code code');
    if (!codeRoot) return;

    
    const nodes = getTextNodes(codeRoot);

    
    const originals = nodes.map(n => n.nodeValue);

    
    const base = 2500;     
    const spread = 450;   
    nodes.forEach((node, i) => {
      const dur = base + Math.random()*spread;
      scrambleNode(node, originals[i], dur, 35);
    });
  }
})();


document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('active-file-title');
  const codeLines = document.getElementById('code-lines');
  const tabs = document.querySelectorAll('.vsc-tab');
  if (!title || !codeLines || tabs.length === 0) return;

  
  function getTemplateId(btn) {
    
    const explicit = btn.dataset.tpl && btn.dataset.tpl.trim();
    if (explicit) return explicit;
    const lang = (btn.dataset.lang || '').trim();       
    return `tpl-${lang}`;                                
  }

  function loadFromTemplateId(tplId) {
    const tpl = document.getElementById(tplId);
    if (tpl) {
      codeLines.innerHTML = tpl.innerHTML.trim();
    } else {
      
      codeLines.textContent = `/* Missing template: #${tplId} */`;
      console.warn(`Code editor: template not found -> #${tplId}`);
    }
  }

  function activate(btn) {
    tabs.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected','true');

    
    title.textContent = btn.dataset.filename || '';

    
    loadFromTemplateId(getTemplateId(btn));

    
    const pre = document.querySelector('.code-editor pre.code');
    if (pre) pre.scrollTop = 0;
  }

  
  const initial = document.querySelector('.vsc-tab.is-active') || tabs[0];
  if (initial) activate(initial);

  
  tabs.forEach(btn => btn.addEventListener('click', () => activate(btn)));
});


const map = { js: 'tpl-js', py: 'tpl-py', cpp: 'tpl-cpp', java: 'tpl-java', json: 'tpl-json' };


(function () {
  const overlay = document.getElementById("equals-overlay");
  if (!overlay) return;
  const SEEN_KEY = 'equalsOverlaySeen';

  
  function whenKatexReady(cb, tries = 0) {
    if (window.katex) return cb();
    if (tries > 200) return cb(); 
    setTimeout(() => whenKatexReady(cb, tries + 1), 40);
  }

  whenKatexReady(() => {
    const leftCol  = overlay.querySelector(".eq-left");
    const rightCol = overlay.querySelector(".eq-right");
    const hint     = overlay.querySelector(".eq-hint");
    if (hint) hint.hidden = true;

    
    
    function makeLayeredSlots(col){
      const a = document.createElement('div'); a.className = 'eq-layer';
      const b = document.createElement('div'); b.className = 'eq-layer';
      const ra = document.createElement('div'); ra.className = 'eq-row'; a.appendChild(ra);
      const rb = document.createElement('div'); rb.className = 'eq-row'; b.appendChild(rb);
      col.appendChild(a); col.appendChild(b);
      a.style.opacity = '1';  
      b.style.opacity = '0';  
      return {
        frontLayer: a, frontRow: ra,
        backLayer:  b, backRow:  rb,
        flip(){
          [this.frontLayer, this.backLayer] = [this.backLayer, this.frontLayer];
          [this.frontRow,   this.backRow]   = [this.backRow,   this.frontRow];
        }
      };
    }

    const left  = makeLayeredSlots(leftCol);
    const right = makeLayeredSlots(rightCol);

    
    function withTempClasses(el, addList = [], timeout = 220){
      addList.forEach(c => el.classList.add(c));
      setTimeout(() => addList.forEach(c => el.classList.remove(c)), timeout);
    }
    


    
    

    
    const __userExtra = [];
    window.addEquations = (pairs) => { if (Array.isArray(pairs)) __userExtra.push(...pairs); };

    
    const push = (arr, ...pairs) => { for (const p of pairs) if (p && p.length === 2) arr.push(p); };

    function buildEquationPool(){
      const E = [];

      
      push(E,
        ["(a+b)^2", "a^2+2ab+b^2"],
        ["(a-b)^2", "a^2-2ab+b^2"],
        ["(a+b)(a-b)", "a^2-b^2"],
        ["\\binom{n}{k}", "\\frac{n!}{k!(n-k)!}"],
        ["\\phi", "\\frac{1+\\sqrt{5}}{2}"],
        ["1", "0.999\\ldots"],
        ["\\sum_{k=1}^{n} k", "\\frac{n(n+1)}{2}"],
        ["\\sum_{k=1}^{n} k^2", "\\frac{n(n+1)(2n+1)}{6}"],
        ["\\sum_{k=1}^{n} k^3", "\\left(\\frac{n(n+1)}{2}\\right)^2"]
      );

      
      push(E,
        ["\\frac{d}{dx}\\,\\sin x", "\\cos x"],
        ["\\frac{d}{dx}\\,\\cos x", "-\\sin x"],
        ["\\frac{d}{dx}\\,\\tan x", "\\sec^2 x"],
        ["\\frac{d}{dx}\\,\\ln x", "\\frac{1}{x}"],
        ["\\frac{d}{dx}\\,e^{kx}", "k e^{kx}"],
        ["\\int e^{ax}\\,dx", "\\frac{1}{a}e^{ax}+C"],
        ["\\int \\frac{1}{x}\\,dx", "\\ln|x|+C"],
        ["\\lim_{x\\to0}\\frac{\\sin x}{x}", "1"],
        ["\\frac{d}{dx}\\,x^n", "n x^{n-1}"],
        ["\\int x^n\\,dx", "\\frac{x^{n+1}}{n+1}+C"]
      );

      
      push(E,
        ["y' = ky", "y = Ce^{kx}"],
        ["y''+\\omega^2 y", "0"],
        ["\\mathcal{L}\\{f'(t)\\}(s)", "sF(s)-f(0^+)"],
        ["\\frac{\\partial u}{\\partial t}", "D\\,\\nabla^2 u"],
        ["\\nabla^2 \\phi", "0"]
      );

      
      push(E,
        ["A\\,x", "b"],
        ["\\det(A)", "\\prod_{i=1}^n \\lambda_i"],
        ["A^{-1}A", "I"],
        ["\\|Ax\\|_2^2", "x^\\top A^\\top A x"],
        ["A", "Q\\,R"],                
        ["A", "U\\,\\Sigma\\,V^\\top"],
        ["A^n", "P\\,\\Lambda^n P^{-1}"] 
      );

      
      push(E,
        ["e^{i\\pi}+1", "0"],
        ["\\bar{z}", "x-iy"],
        ["\\frac{\\partial u}{\\partial x}", "\\frac{\\partial v}{\\partial y}"], 
        ["\\frac{\\partial u}{\\partial y}", "-\\frac{\\partial v}{\\partial x}"] 
      );

      
      push(E,
        ["\\nabla\\cdot(\\nabla\\times \\mathbf{F})", "0"],
        ["\\nabla\\times(\\nabla \\phi)", "0"],
        ["\\iint_{\\partial S} \\mathbf{F}\\cdot d\\mathbf{S}", "\\iiint_{V} (\\nabla\\cdot\\mathbf{F})\\,dV"], 
        ["\\oint_{\\partial S}\\mathbf{F}\\cdot d\\mathbf{r}", "\\iint_{S}(\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}"] 
      );

      
      push(E,
        ["\\sum_{k=0}^{\\infty} x^k", "\\frac{1}{1-x}\\;(|x|<1)"],
        ["e^x", "\\sum_{k=0}^{\\infty} \\frac{x^k}{k!}"],
        ["\\sin x", "\\sum_{m=0}^{\\infty} (-1)^m \\frac{x^{2m+1}}{(2m+1)!}"],
        ["\\mathcal{F}\\{\\sin \\omega_0 t\\}(\\omega)", "\\pi[\\delta(\\omega-\\omega_0)-\\delta(\\omega+\\omega_0)]/i"],
        ["\\mathcal{F}\\{e^{-at}\\,u(t)\\}(\\omega)", "\\frac{1}{a+i\\omega}"]
      );

      
      push(E,
        ["\\mathbb{E}[X]", "\\int x\\,f_X(x)\\,dx"],
        ["\\operatorname{Var}(X)", "\\mathbb{E}[X^2]-\\mathbb{E}[X]^2"],
        ["P(A\\mid B)", "\\frac{P(B\\mid A)P(A)}{P(B)}"],
        ["\\text{softmax}(z_i)", "\\frac{e^{z_i}}{\\sum_j e^{z_j}}"],
        ["\\nabla J(\\theta)", "\\frac{1}{m}X^\\top (X\\theta-y)"]
      );

      
      push(E,
        ["F", "ma"],
        ["E", "mc^2"],
        ["V", "IR"],
        ["pV", "nRT"],
        ["\\Delta G", "\\Delta H - T\\Delta S"],
        ["\\mathbf{F}_g", "G\\frac{m_1 m_2}{r^2}\\,\\hat{\\mathbf{r}}"],
        ["\\nabla\\cdot\\mathbf{E}", "\\rho/\\varepsilon_0"],
        ["\\nabla\\times\\mathbf{E}", "-\\frac{\\partial \\mathbf{B}}{\\partial t}"],
        ["i\\hbar\\,\\frac{\\partial}{\\partial t}\\,\\Psi", "\\hat{H}\\,\\Psi"],
        ["\\lambda", "\\frac{h}{p}"]
      );

      push(E,
        
        ["e^{i\\pi} + 1", "0"],
        ["\\operatorname{Re}(z)", "\\tfrac{z + \\bar{z}}{2}"],
        ["\\operatorname{Im}(z)", "\\tfrac{z - \\bar{z}}{2i}"],
        ["|z|^2", "z\\bar{z}"],

        
        ["\\nabla \\cdot (\\nabla \\times \\mathbf{F})", "0"],
        ["\\nabla \\times (\\nabla f)", "\\mathbf{0}"],
        ["\\frac{d}{dx}(\\sin^{-1}x)", "\\frac{1}{\\sqrt{1-x^2}}"],
        ["\\int e^{ax}\\,dx", "\\tfrac{1}{a}e^{ax} + C"],

        
        ["A\\mathbf{v}", "\\lambda \\mathbf{v}"],
        ["\\det(A - \\lambda I)", "0"],
        ["\\mathrm{tr}(AB)", "\\mathrm{tr}(BA)"],

        
        ["E[X+Y]", "E[X]+E[Y]"],
        ["\\mathrm{Var}(aX+b)", "a^2\\mathrm{Var}(X)"],
        ["P(A\\cup B)", "P(A)+P(B)-P(A\\cap B)"],

        
        ["y'' + \\omega^2 y", "0"],
        ["y(x)", "Ae^{rx} + Be^{-rx}"],
        ["\\frac{dy}{dx}", "ky"],

        
        ["E_k", "\\tfrac{1}{2}mv^2"],
        ["E_p", "mgh"],
        ["F", "q(E + v\\times B)"],

        
        ["\\Gamma(n)", "(n-1)!"],
        ["B(x,y)", "\\tfrac{\\Gamma(x)\\Gamma(y)}{\\Gamma(x+y)}"]
      );


      
      
      for (let n=2; n<=20; n++){
        push(E,
          [`\\frac{d}{dx}\\,x^{${n}}`, `${n}x^{${n-1}}`],
          [`\\int x^{${n}}\\,dx`, `\\frac{x^{${n+1}}}{${n+1}}+C`]
        );
      }

      
      for (let k=2; k<=30; k++){
        push(E,
          [`a_{${k}}`, `r\\,a_{${k-1}}+d`],
          [`\\det(A_{${k}})`, `\\prod_{i=1}^{${k}}\\lambda_i`]
        );
      }

      
      const trig = [
        ["\\sin x","\\cos x"],
        ["\\cos x","-\\sin x"],
        ["\\tan x","\\sec^2 x"],
        ["\\ln x","\\tfrac{1}{x}"],
        ["\\exp x","e^x"]
      ];
      for (let i=0;i<40;i++){
        const [f,d] = trig[i%trig.length];
        push(E,[`\\frac{d}{dx}\\,(${f})`, d]);
      }

      return E;
    }

    
    const eqLatex = buildEquationPool().concat(__userExtra);

    
    const toHTML = (latex) => katex.renderToString(latex, { throwOnError:false });
    const pool = eqLatex.map(([L,R]) => [toHTML(L), toHTML(R)]);



  
    
    const FADE = 40;           
    const INTERVAL = 80;       
    function fitToCol(el, col) {
      
      el.style.transform = 'scale(1)';

      const cs   = getComputedStyle(col);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const padY = parseFloat(cs.paddingTop)  + parseFloat(cs.paddingBottom);

      
      const colW = Math.max(1, col.clientWidth  - padX - 4);
      const colH = Math.max(1, col.clientHeight - padY - 2);

      const elW = Math.max(1, el.scrollWidth);
      const elH = Math.max(1, el.scrollHeight);

      const sW = colW / elW;
      const sH = colH / elH;

      
      const scale = Math.min(1, sW * 0.85, sH * 0.92);
      el.style.transform = `scale(${scale})`;
    }



    
    function crossSwap(slot, html, col){
      
      slot.backRow.innerHTML = html;

      
      requestAnimationFrame(() => {
        fitToCol(slot.backRow, col);

        
        slot.frontLayer.style.transition = 'opacity .16s linear';
        slot.backLayer.style.transition  = 'opacity .16s linear';
        slot.frontLayer.style.opacity = '0';
        slot.backLayer.style.opacity  = '1';

        
        setTimeout(() => slot.flip(), 180);
      });
    }


    
    let lastIndex = -1;
    function pickPair() {
      let i;
      do {
        i = Math.floor(Math.random() * pool.length);
      } while (pool.length > 1 && i === lastIndex);
      lastIndex = i;
      return pool[i];
    }

    
    const DURATION = 7000;
    let timerId = null, t0 = performance.now();

    function tick(){
      const now = performance.now();
      const elapsed   = now - t0;
      const progress  = Math.min(elapsed / DURATION, 1); 




      
      
      
      const ramp = Math.pow(progress, 0.5);

      
      const MAX_INTERVAL = 350;  
      const MIN_INTERVAL = 35;   
      const currentInterval = MAX_INTERVAL - (MAX_INTERVAL - MIN_INTERVAL) * ramp;

      if (elapsed >= DURATION) return finish();

      
      const [Lhtml, Rhtml] = pickPair();
      crossSwap(left,  Lhtml, leftCol);
      crossSwap(right, Rhtml, rightCol);

      timerId = setTimeout(tick, currentInterval); 


    }

    
    function restartPageAnimations(){
      
      try {
        if (window.AOS && typeof AOS.refreshHard === 'function') {
          AOS.refreshHard();
        }
      } catch(e){}

      try {
        if (window.ScrollReveal && typeof ScrollReveal === 'function') {
          const sr = ScrollReveal();
          
          sr.clean('*');
          sr.reveal('[data-sr], .sr, .reveal', { reset: false });
        }
      } catch(e){}

      try {
        if (window.gsap && window.ScrollTrigger) {
          window.ScrollTrigger.refresh(true); 
        }
      } catch(e){}

      
      document.querySelectorAll('[data-anim], .animate, .reveal, [data-aos], [style*="animation"]').forEach(el => {
        el.style.animation = 'none';
        
        
        el.offsetHeight;
        el.style.animation = '';
      });

      
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('scroll'));

      
      window.dispatchEvent(new CustomEvent('overlay:entered'));
    }



    function finish(){
      if (timerId) clearTimeout(timerId);

      
      crossSwap(left,  toHTML("my\\;name"), leftCol);
      crossSwap(right, toHTML("paul"),      rightCol);

      const close = () => {
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch (e) {
          
        }

        overlay.remove();
        document.body.style.overflow = "";
        if (typeof window.initAnimations === 'function') window.initAnimations();
        window.scrollTo({ top: 0, behavior: 'instant' });
      };


      if (hint) {
        
        hint.hidden = false;

        
        hint.style.pointerEvents = 'auto';
        hint.style.cursor = 'pointer';
        hint.setAttribute('role', 'button');
        hint.setAttribute('tabindex', '0');
        hint.setAttribute('aria-label', 'Click to enter');

        
        requestAnimationFrame(() => {
          hint.classList.add('show');
          
          setTimeout(() => {
            try { hint.focus(); } catch(_) {}
          }, 0);
        });

        
        hint.addEventListener('click', (e) => { e.stopPropagation(); close(); });

        
        const onHintKey = (e) => {
          const key = e.key;
          const code = e.code;
          const kc = e.keyCode;
          const isActivate =
            key === 'Enter' || key === ' ' || key === 'Spacebar' ||
            code === 'Space' || kc === 13 || kc === 32;

          if (isActivate) {
            e.preventDefault();
            e.stopPropagation();
            close();
          }
        };
        hint.addEventListener('keydown', onHintKey);

        
        const onWindowKey = (e) => {
          if (document.activeElement === hint) onHintKey(e);
        };
        window.addEventListener('keydown', onWindowKey, { once: true });
      }

      
      
    }




    function start(){
      
      
      try {
        if (sessionStorage.getItem(SEEN_KEY)) {
          overlay.remove();
          document.body.style.overflow = "";
          if (typeof window.initAnimations === 'function') {
            window.initAnimations();
          }
          return; 
        }
      } catch (e) {
        
      }

      document.body.style.overflow = "hidden";

      
      const [L0, R0] = pickPair();
      left.frontRow.innerHTML  = L0;
      right.frontRow.innerHTML = R0;

      requestAnimationFrame(() => {
        fitToCol(left.frontRow,  leftCol);
        fitToCol(right.frontRow, rightCol);
      });

      setTimeout(tick, 80);
    }





    if (document.readyState === "complete" || document.readyState === "interactive") start();
    else document.addEventListener("DOMContentLoaded", start, { once:true });
  });
})();

