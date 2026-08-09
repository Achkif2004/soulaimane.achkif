const elements = document.querySelectorAll(
    "section, article, .skills div, .gallery figure"
);



elements.forEach(element => {

    element.classList.add("hidden");

});



const observer = new IntersectionObserver(entries => {


    entries.forEach(entry => {


        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }


    });


});



elements.forEach(element => {

    observer.observe(element);

});



/* =========================
   HAMBURGER / MOBIELE NAVIGATIE
========================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if(hamburger && navMenu){

    // overlay dynamisch aanmaken zodat er geen HTML-aanpassing nodig is
    const overlay = document.createElement("div");
    overlay.classList.add("nav-overlay");
    document.body.appendChild(overlay);

    function openMenu(){

        hamburger.classList.add("active");
        navMenu.classList.add("active");
        overlay.classList.add("active");

        hamburger.setAttribute("aria-expanded","true");

        document.body.style.overflow = "hidden";

    }

    function closeMenu(){

        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        overlay.classList.remove("active");

        hamburger.setAttribute("aria-expanded","false");

        document.body.style.overflow = "";

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


});





prevButton.addEventListener("click",()=>{


    currentIndex--;


    if(currentIndex < 0){

        currentIndex = images.length - 1;

    }


    lightboxImage.src = images[currentIndex].src;


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