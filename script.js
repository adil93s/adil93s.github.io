let scrollAmount = 0;

const menuContainer = document.getElementById("menuContainer");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

document.getElementById("nav-open").addEventListener("click", function () {
    document.getElementById("nav").classList.toggle("opacity-0");
    document.getElementById("nav").classList.toggle("-z-10");
    document.getElementById("nav").classList.add("opacity-100");
    document.getElementById("nav").classList.add("z-50");
});

var navClose = document.getElementsByClassName("nav-close");

Array.from(navClose).forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("nav").classList.toggle("opacity-100");
        document.getElementById("nav").classList.toggle("z-50");
        document.getElementById("nav").classList.add("opacity-0");
        document.getElementById("nav").classList.add("-z-10");
    });
});

function scrollLeft() {
    console.log("test");
    const maxScrollLeft = 0;
    const desiredScrollLeft = scrollAmount - 352;

    if (desiredScrollLeft < maxScrollLeft) {
        scrollAmount = maxScrollLeft;
    } else {
        scrollAmount = desiredScrollLeft;
    }

    menuContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
}

function scrollRight() {
    const maxScrollRight = menuContainer.scrollWidth - menuContainer.clientWidth;
    const desiredScrollRight = scrollAmount + 352;

    if (desiredScrollRight > maxScrollRight) {
        scrollAmount = maxScrollRight;
    } else {
        scrollAmount = desiredScrollRight;
    }

    menuContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
}

leftBtn.addEventListener("click", scrollLeft);
rightBtn.addEventListener("click", scrollRight);
