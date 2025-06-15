function toggleMenu() {
  document.querySelector(".navlist").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
}
document.addEventListener("click", function (event) {
  const navList = document.querySelector(".navlist");
  const hamburger = document.querySelector(".hamburger");


  if (navList.classList.contains("active")) {
    if (!navList.contains(event.target) && !hamburger.contains(event.target)) {
      navList.classList.remove("active");
      hamburger.classList.remove("active");
    }
  }
});

var copy = document.querySelector(".logos-slide").cloneNode(true);
      document.querySelector(".logos").appendChild(copy);


gsap.registerPlugin(CustomEase, Flip )

CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1")

gsap.defaults({
  ease: "osmo-ease",
  duration: 0.8,
});

function initFlipButtons() {
  let wrappers = document.querySelectorAll('[data-flip-button="wrap"]');
  
  wrappers.forEach((wrapper) => {
    let buttons = wrapper.querySelectorAll('[data-flip-button="button"]');
    let bg = wrapper.querySelector('[data-flip-button="bg"]');
    
    buttons.forEach(function (button) {
      // mouse enter
      button.addEventListener("mouseenter", function () {
        const state = Flip.getState(bg);
        this.appendChild(bg);
        Flip.from(state, {
          duration: 0.4,
        });
      });

      //focus for keyboard navigation
      button.addEventListener("focus", function () {
        const state = Flip.getState(bg);
        this.appendChild(bg);
        Flip.from(state, {
          duration: 0.4,
        });
      });

      // mouse leave ;)
      button.addEventListener("mouseleave", function () {
        const state = Flip.getState(bg);
        const activeLink = wrapper.querySelector(".active");
        activeLink.appendChild(bg);
        Flip.from(state, {
          duration: 0.4,
        });
      });

      // Handle blur to reset background for keyboard navigation
      button.addEventListener("blur", function () {
        const state = Flip.getState(bg);
        const activeLink = wrapper.querySelector(".active");
        activeLink.appendChild(bg);
        Flip.from(state, {
          duration: 0.4,
        });
      });
    });
  });
}

function initTabSystem(){
  let wrappers = document.querySelectorAll('[data-tabs="wrapper"]')
  
  wrappers.forEach((wrapper) => {
    let nav = wrapper.querySelector('[data-tabs="nav"]')
    let buttons = nav.querySelectorAll('[data-tabs="button"]')
    let contentWrap = wrapper.querySelector('[data-tabs="content-wrap"]')
    let contentItems = contentWrap.querySelectorAll('[data-tabs="content-item"]')
    let visualWrap = wrapper.querySelector('[data-tabs="visual-wrap"]')
    let visualItems = visualWrap.querySelectorAll('[data-tabs="visual-item"]')

    let activeButton = buttons[0];
    let activeContent = contentItems[0];
    let activeVisual = visualItems[0];
    let isAnimating = false;

    function switchTab(index, initial = false) {
      if (!initial && (isAnimating || buttons[index] === activeButton)) return; // ignore click if the clicked button is already active 
      isAnimating = true; // keep track of whether or not one is moving, to prevent overlap

      const outgoingContent = activeContent;
      const incomingContent = contentItems[index];
      const outgoingVisual = activeVisual;
      const incomingVisual = visualItems[index];

      let outgoingLines = outgoingContent.querySelectorAll("[data-tabs-fade]") || [];
      let incomingLines = incomingContent.querySelectorAll("[data-tabs-fade]");

      const timeline = gsap.timeline({
        defaults:{
          ease:"power3.inOut"
        },
        onComplete: () => {
          if(!initial){
            outgoingContent && outgoingContent.classList.remove("active");
            outgoingVisual && outgoingVisual.classList.remove("active");            
          }
          activeContent = incomingContent;
          activeVisual = incomingVisual;
          isAnimating = false;
        },
      });

      incomingContent.classList.add("active");
      incomingVisual.classList.add("active");

      timeline
        .to(outgoingLines, { y: "-2em", autoAlpha:0 }, 0)
        .to(outgoingVisual, { autoAlpha: 0, xPercent: 3 }, 0)
        .fromTo(incomingLines, { y: "2em", autoAlpha:0 }, { y: "0em", autoAlpha:1, stagger: 0.075 }, 0.4)
        .fromTo(incomingVisual, { autoAlpha: 0, xPercent: 3 }, { autoAlpha: 1, xPercent: 0 }, "<");

      activeButton && activeButton.classList.remove("active");
      buttons[index].classList.add("active");
      activeButton = buttons[index];
    }

    switchTab(0, true); // on page load
 
    buttons.forEach((button, i) => {
      button.addEventListener("click", () => switchTab(i)); 
    });

    contentItems[0].classList.add("active");
    visualItems[0].classList.add("active");
    buttons[0].classList.add("active");    
    
  })
  
}

document.addEventListener("DOMContentLoaded", () =>{
  initTabSystem()
  initFlipButtons()
})

