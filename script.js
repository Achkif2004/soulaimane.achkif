/* =========================================================
   SCHETSBOEK ANIMATIES

   Het idee: elk element krijgt een "type" animatie en een
   vertraging (in ms). Zodra het in beeld komt, krijgt het de
   class .is-visible en speelt de CSS-animatie af (zie style.css).

   Types:  up    → schuift zacht omhoog
           drop  → wordt als een foto op het blad gelegd
           pop   → springt op (icoontjes, vinkjes)
           flip  → slaat open als een bladzijde
           write → wordt letter per letter geschreven
           draw  → handgetekende lijn tekent zichzelf
========================================================= */

document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


function reveal(element, type = "up", delay = 0){

    if(!element) return;

    element.dataset.reveal = type;
    element.style.setProperty("--delay", delay + "ms");

}


// zet een tekst om in losse letters, zodat ze één voor één verschijnen
// (schermlezers lezen gewoon de volledige zin via .sr-only)
function writeLetters(element, delay = 0){

    if(!element) return delay;

    const fullText = element.textContent.replace(/\s+/g, " ").trim();
    let index = 0;

    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(node => {

        const text = node.textContent.replace(/\s+/g, " ");
        const letters = document.createElement("span");
        letters.setAttribute("aria-hidden", "true");

        [...text].forEach(letter => {

            if(letter === " "){
                letters.appendChild(document.createTextNode(" "));
                return;
            }

            const char = document.createElement("span");
            char.className = "char";
            char.textContent = letter;
            char.style.setProperty("--ci", index++);
            letters.appendChild(char);

        });

        node.replaceWith(letters);

    });

    if(element.getAttribute("aria-hidden") !== "true"){

        const srText = document.createElement("span");
        srText.className = "sr-only";
        srText.textContent = fullText;
        element.prepend(srText);

    }

    reveal(element, "write", delay);

    // geeft terug hoe lang het schrijven duurt, handig om erna iets te starten
    return delay + index * 32;

}


// zet elk woord van een titel in een eigen <span class="word">
function splitWords(heading){

    const words = [];

    [...heading.childNodes].forEach(node => {

        if(node.nodeType === Node.TEXT_NODE){

            const fragment = document.createDocumentFragment();

            node.textContent.split(/(\s+)/).forEach(part => {

                if(part.trim() === ""){
                    if(part) fragment.appendChild(document.createTextNode(" "));
                    return;
                }

                const word = document.createElement("span");
                word.className = "word";
                word.textContent = part;
                fragment.appendChild(word);
                words.push(word);

            });

            node.replaceWith(fragment);

        }else if(node.nodeType === Node.ELEMENT_NODE){

            const word = document.createElement("span");
            word.className = "word";
            node.replaceWith(word);
            word.appendChild(node);
            words.push(word);

        }

    });

    return words;

}


const SCRIBBLE_CIRCLE_SMALL =
    '<svg class="scribble" viewBox="0 0 60 36" preserveAspectRatio="none" aria-hidden="true">' +
    '<path pathLength="1" d="M46 6 C 32 1, 10 3, 5 15 C 1 27, 20 34, 36 32 C 52 30, 60 20, 54 10 C 50 4, 40 2, 30 3"/>' +
    '</svg>';

const SCRIBBLE_TICK =
    '<svg class="scribble scribble-tick" viewBox="0 0 18 16" aria-hidden="true">' +
    '<path pathLength="1" d="M2 9 C 4 10, 6 12, 7 14 C 10 9, 13 5, 16 2"/>' +
    '</svg>';



/* ---------- HERO (home) ---------- */

const hero = document.querySelector(".hero");

if(hero){

    const heroLabel = hero.querySelector(".small");
    const heroTitle = hero.querySelector("h1");
    const heroText = hero.querySelector(".hero-text > p:not(.small)");
    const heroButton = hero.querySelector(".hero-text .button");
    const profileCard = hero.querySelector(".profile-card");

    writeLetters(heroLabel, 0);

    let time = 250;

    if(heroTitle){

        splitWords(heroTitle).forEach(word => {
            reveal(word, "up", time);
            time += 70;
        });

    }

    reveal(heroText, "up", time + 100);
    reveal(heroButton, "up", time + 250);

    // krabbels rond "design" en "technologie" tekenen nadat de titel er staat
    const scribbles = hero.querySelectorAll("h1 .scribble");
    scribbles.forEach((scribble, i) => {
        reveal(scribble, "draw", time + 250 + i * 450);
    });

    reveal(profileCard, "drop", 350);

    const profileNote = hero.querySelector(".profile-note");
    if(profileNote){
        const done = writeLetters(profileNote, 1500);
        reveal(profileNote.querySelector(".scribble"), "draw", done + 100);
    }

}



/* ---------- TITELS: markeerstift ---------- */

document.querySelectorAll("section h2").forEach(title => {

    const marker = document.createElement("span");
    marker.className = "marker";

    while(title.firstChild) marker.appendChild(title.firstChild);

    title.appendChild(marker);

    reveal(title, "up");

});



/* ---------- OVER MIJ ---------- */

reveal(document.querySelector(".about-image"), "drop", 100);

document.querySelectorAll(".text").forEach(text => {

    let delay = 0;

    [...text.children].forEach(child => {

        if(child.matches("ul")){

            child.querySelectorAll("li").forEach(li => {

                reveal(li, "up", delay);

                // in de opsomming op projectpagina's: vinkje dat zichzelf tekent
                if(child.matches(".feature-list")){
                    li.insertAdjacentHTML("afterbegin", SCRIBBLE_TICK);
                    reveal(li.querySelector(".scribble-tick"), "draw", delay + 300);
                }

                delay += 90;

            });

        }else{

            reveal(child, "up", delay);
            delay += 120;

        }

    });

});



/* ---------- PROJECTEN: kaarten worden neergelegd ---------- */

const tilts = [-7, 5, -4, 6];

document.querySelectorAll("a.project-card").forEach((card, i) => {

    reveal(card, "drop", i * 150);
    card.style.setProperty("--from-rotate", tilts[i % tilts.length] + "deg");

    const number = card.querySelector(".number");
    if(number) number.insertAdjacentHTML("beforeend", SCRIBBLE_CIRCLE_SMALL);

});



/* ---------- SKILLS ---------- */

reveal(document.querySelector(".skills-intro"), "up");

document.querySelectorAll(".skill-card").forEach((card, i) => {

    reveal(card, "up", i * 150);

    card.querySelectorAll(".tech").forEach((tech, j) => {
        reveal(tech, "pop", 350 + i * 150 + j * 90);
    });

});



/* ---------- CONTACT ---------- */

document.querySelectorAll("#contact").forEach(contact => {

    reveal(contact.querySelector(":scope > p:not(.email)"), "up", 100);
    reveal(contact.querySelector(":scope > .cta-row, :scope > .button, :scope > .contact-cta"), "up", 200);
    reveal(contact.querySelector(".email"), "up", 300);

    const contactNote = contact.querySelector(".contact-note");
    if(contactNote){
        const done = writeLetters(contactNote, 700);
        reveal(contactNote.querySelector(".scribble"), "draw", done + 100);
    }

});



/* ---------- PROJECTPAGINA'S ---------- */

const projectHero = document.querySelector(".project-hero");

if(projectHero){

    reveal(projectHero.querySelector(".back-link"), "up", 0);
    writeLetters(projectHero.querySelector(".small"), 100);

    // titel woord per woord, daarna tekent de krabbel zich
    let time = 250;
    const projectTitle = projectHero.querySelector("h1");

    if(projectTitle){

        splitWords(projectTitle).forEach(word => {
            reveal(word, "up", time);
            time += 55;
        });

        projectTitle.querySelectorAll(".scribble").forEach((scribble, i) => {
            reveal(scribble, "draw", time + 300 + i * 300);
        });

    }

    reveal(projectHero.querySelector(".lead"), "up", time + 50);
    reveal(projectHero.querySelector(".cta-row"), "up", time + 200);

    // grote foto krijgt een kader met plakband en wordt neergelegd
    const heroImage = projectHero.querySelector(".project-hero-img");

    if(heroImage){

        const frame = document.createElement("div");
        frame.className = "tape-frame";

        heroImage.before(frame);
        frame.appendChild(heroImage);

        reveal(frame, "drop", time + 300);
        frame.style.setProperty("--from-rotate", "-2deg");

    }

    // handgeschreven notitie (naast de intro of naast de knoppen)
    const projectNote = projectHero.querySelector(".lead-note, .cta-note");

    if(projectNote){
        const done = writeLetters(projectNote, time + 900);
        reveal(projectNote.querySelector(".scribble"), "draw", done + 100);
    }

}

document.querySelectorAll(".sketchbook").forEach(sketchbook => {

    reveal(sketchbook, "flip", 0);

    let delay = writeLetters(sketchbook.querySelector(".sketch-title"), 550);

    const sketch = sketchbook.querySelector("img");
    if(sketch){
        reveal(sketch, "up", delay);
        delay += 300;
    }

    // notities worden één voor één geschreven
    sketchbook.querySelectorAll(".notes p").forEach(note => {
        writeLetters(note, delay + 200);
        delay += 550;
    });

});

// galerij: elke foto krijgt een stukje plakband en een handgeschreven onderschrift
document.querySelectorAll(".gallery figure").forEach((figure, i) => {

    const item = document.createElement("div");
    item.className = "gallery-item";

    figure.before(item);
    item.appendChild(figure);

    reveal(item, "drop", i * 150);
    item.style.setProperty("--from-rotate", tilts[i % tilts.length] + "deg");
    item.style.setProperty("--tape-rotate", (i % 2 ? 3 : -3) + "deg");

    const caption = figure.querySelector("figcaption");
    if(caption && caption.textContent.trim()){
        writeLetters(caption, i * 150 + 650);
    }

});



/* ---------- ALLES IN GANG ZETTEN ---------- */

const revealElements = document.querySelectorAll("[data-reveal]");

if(reduceMotion || !("IntersectionObserver" in window)){

    revealElements.forEach(element => element.classList.add("is-visible"));

}else{

    const waiting = new Set(revealElements);

    function show(element){

        element.classList.add("is-visible");
        waiting.delete(element);
        revealObserver.unobserve(element);

    }

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            // genoeg in beeld, of al voorbij gescrold (bv. na een klik op "Contact")
            const inView = entry.isIntersecting && entry.intersectionRatio >= 0.15;
            const alreadyPassed = entry.boundingClientRect.bottom < 0;

            if(inView || alreadyPassed) show(entry.target);

        });

    }, { threshold:[0, 0.15], rootMargin:"0px 0px -6% 0px" });

    revealElements.forEach(element => revealObserver.observe(element));

    // vangnet: na het scrollen (of als alle foto's geladen zijn) alles tonen
    // wat al in of boven beeld staat, ook als je er heel snel voorbij sprong
    function showPassed(){

        waiting.forEach(element => {

            const box = element.getBoundingClientRect();

            if(box.width && box.top < window.innerHeight * .94) show(element);

        });

    }

    let sweepTimer;

    window.addEventListener("scroll", () => {

        clearTimeout(sweepTimer);
        sweepTimer = setTimeout(showPassed, 150);

    }, { passive:true });

    window.addEventListener("load", showPassed);

}



/* ---------- POTLOOD-SCROLLBALK onder de navigatie ---------- */

const navBar = document.querySelector("nav");

if(navBar){

    const pencil = document.createElement("div");
    pencil.className = "scroll-pencil";
    pencil.setAttribute("aria-hidden", "true");

    pencil.innerHTML =
        '<span class="scroll-pencil-line"></span>' +
        '<span class="scroll-pencil-icon">' +
            '<svg viewBox="0 0 44 14" width="44" height="14">' +
                '<rect x="1" y="2.5" width="6" height="9" rx="2" fill="#111"/>' +
                '<rect x="7" y="2" width="24" height="10" fill="#1769ff" stroke="#111" stroke-width="1.2"/>' +
                '<line x1="8" y1="5" x2="30" y2="5" stroke="rgba(255,255,255,.45)" stroke-width="1.2"/>' +
                '<path d="M31 2 L43 7 L31 12 Z" fill="#f1d6ae" stroke="#111" stroke-width="1.2" stroke-linejoin="round"/>' +
                '<path d="M38.5 5 L43 7 L38.5 9 Z" fill="#111"/>' +
            '</svg>' +
        '</span>';

    navBar.appendChild(pencil);

    const pencilLine = pencil.querySelector(".scroll-pencil-line");
    const pencilIcon = pencil.querySelector(".scroll-pencil-icon");

    let ticking = false;
    let movingTimer;

    function updatePencil(){

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

        pencilLine.style.transform = `scaleX(${progress})`;
        pencilIcon.style.transform = `translateX(${progress * pencil.clientWidth}px)`;

        pencil.classList.toggle("is-writing", progress > 0.005);

        ticking = false;

    }

    window.addEventListener("scroll", () => {

        if(!ticking){
            requestAnimationFrame(updatePencil);
            ticking = true;
        }

        // potlood wiebelt even terwijl je scrolt
        pencil.classList.add("is-moving");
        clearTimeout(movingTimer);
        movingTimer = setTimeout(() => pencil.classList.remove("is-moving"), 180);

    }, { passive:true });

    window.addEventListener("resize", updatePencil);

    updatePencil();

}



/* ---------- ACTIEVE LINK in de navigatie (krabbel blijft staan) ---------- */

const sectionLinks = [...document.querySelectorAll('#nav-menu a[href^="#"]')];

const linkedSections = sectionLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if(linkedSections.length && "IntersectionObserver" in window){

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                sectionLinks.forEach(link => {
                    link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
                });

            }

        });

    }, { rootMargin:"-55% 0px -40% 0px" });

    linkedSections.forEach(section => sectionObserver.observe(section));

}



/* =========================
   HAMBURGER / MOBIELE NAVIGATIE
========================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if(hamburger && navMenu){

    // overlay dynamisch aanmaken zodat er geen HTML-aanpassing nodig is
    const overlay = document.createElement("div");
    overlay.classList.add("nav-overlay");
    // in de nav plaatsen, zodat de overlay ONDER het menu ligt (zelfde stapelvolgorde)
    (hamburger.closest("nav") || document.body).appendChild(overlay);

    function openMenu(){

        hamburger.classList.add("active");
        navMenu.classList.add("active");
        overlay.classList.add("active");

        hamburger.setAttribute("aria-expanded","true");

        document.documentElement.style.overflow = "hidden";

    }

    function closeMenu(){

        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        overlay.classList.remove("active");

        hamburger.setAttribute("aria-expanded","false");

        document.documentElement.style.overflow = "";

    }

    hamburger.addEventListener("click", () => {

        const isOpen = navMenu.classList.contains("active");

        if(isOpen){

            closeMenu();

        }else{

            openMenu();

        }

    });

    // menu sluiten bij klik op overlay
    overlay.addEventListener("click", closeMenu);

    // menu sluiten bij klik op een link (bv. #about)
    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    // menu sluiten met Escape
    document.addEventListener("keydown", (e) => {

        if(e.key === "Escape"){

            closeMenu();

        }

    });

    // menu sluiten als het scherm weer groter wordt dan tablet-breakpoint
    window.addEventListener("resize", () => {

        if(window.innerWidth > 1024){

            closeMenu();

        }

    });

}



/* =========================
   IMAGE LIGHTBOX
========================= */


const galleryImages = document.querySelectorAll(".gallery-image");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeButton = document.querySelector(".close-lightbox");

const nextButton = document.querySelector(".next-image");

const prevButton = document.querySelector(".prev-image");


let currentIndex = 0;


const images = Array.from(galleryImages);




if(lightbox){


galleryImages.forEach((img,index)=>{


    img.addEventListener("click",()=>{


        currentIndex = index;

        openLightbox();


    });


});





function openLightbox(){

    lightbox.classList.add("active");

    lightboxImage.src = images[currentIndex].src;


}





function closeLightbox(){

    lightbox.classList.remove("active");

}




// foto schuift als een nieuw blad binnen (1 = volgende, -1 = vorige)
function swapAnimation(direction){

    lightboxImage.style.setProperty("--swap-from", (direction * 40) + "px");

    lightboxImage.classList.remove("is-swapping");

    void lightboxImage.offsetWidth; // herstart de animatie

    lightboxImage.classList.add("is-swapping");

}





closeButton.addEventListener("click",closeLightbox);





lightbox.addEventListener("click",(e)=>{


    if(e.target === lightbox){

        closeLightbox();

    }


});





nextButton.addEventListener("click",()=>{


    currentIndex++;


    if(currentIndex >= images.length){

        currentIndex = 0;

    }


    lightboxImage.src = images[currentIndex].src;

    swapAnimation(1);


});





prevButton.addEventListener("click",()=>{


    currentIndex--;


    if(currentIndex < 0){

        currentIndex = images.length - 1;

    }


    lightboxImage.src = images[currentIndex].src;

    swapAnimation(-1);


});





document.addEventListener("keydown",(e)=>{


    if(e.key === "Escape"){

        closeLightbox();

    }


    if(e.key === "ArrowRight"){

        nextButton.click();

    }


if(e.key === "ArrowLeft"){

        prevButton.click();

    }


});


}   // ← sluit if(lightbox) hier af