// check if ther eis color in local storage

let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // remove the active class
  const liColors = document.querySelectorAll(".colors-list li");
  liColors.forEach((activeLi) => {
    activeLi.classList.remove("active");
    // add the active class to the li with the data-set value
    if (activeLi.dataset.color === mainColor) {
      activeLi.classList.add("active");
    }
  });
}

// toggle spin class on icon

const settingBox = document.querySelector(".setting-box");
const icon = document.querySelector(".setting-box .toggle-settings .far");

icon.onclick = () => {
  icon.classList.toggle("fa-spin");
  settingBox.classList.toggle("opend");
};

// switch colors
const liColors = document.querySelectorAll(".colors-list li");

liColors.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set color on root var css

    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // add color value to local storage

    localStorage.setItem("color_option", e.target.dataset.color);

    // remove the active class and add it to the same element

    handleActive(e);
  });
});

// open burger menu onclick
const burgerMenu = document.querySelector(".toggle-menu");
const ulOfLinks = document.querySelector("header ul");

burgerMenu.addEventListener("click", (e) => {
  // stopProbagation
  e.stopPropagation();

  ulOfLinks.classList.toggle("open");
  burgerMenu.classList.toggle("menu-active");
});

document.addEventListener("click", (e) => {
  if (e.target !== burgerMenu && e.target !== ulOfLinks) {
    if (ulOfLinks.classList.contains("open")) {
      ulOfLinks.classList.toggle("open");
      burgerMenu.classList.toggle("menu-active");
    }
  }
});

// stopProbagation on menu
ulOfLinks.onclick = (e) => e.stopPropagation();

// random background option
let backgroundOption = true;

// random background intervel
let backgroundChanger;

// check if there is a local storge random backgroun item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if the the background option is not empty

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class and add a new one
  const backgroundEl = document.querySelectorAll(".random-background span");

  backgroundEl.forEach((span) => span.classList.remove("active"));

  if (backgroundOption) {
    document.querySelector("span.yes").classList.add("active");
  } else {
    document.querySelector("span.no").classList.add("active");
  }
}

// switch background img option
const backgroundEl = document.querySelectorAll(".random-background span");

backgroundEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    // change the background Option value

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomBackground();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundChanger);

      randomBackground();

      localStorage.setItem("background_option", false);
    }
    // remove class active and add active to the selected element
    handleActive(e);
  });
});

// select landing page element

const landPage = document.querySelector(".landing-page");

// get array of imgs

const imgArr = ["01.jpg", "02.png", "03.jpg", "04.jpg"];

function randomBackground() {
  if (backgroundOption === true) {
    backgroundChanger = setInterval(() => {
      // random index
      let randomIndex = Math.floor(Math.random() * imgArr.length);

      //   change the background url
      landPage.style.backgroundImage = `url("imgs/landing/${imgArr[randomIndex]}")`;
    }, 1000);
  }
}

randomBackground();

// change the width for progress on scroll

const ourskills = document.querySelector(".skills");

const arrayOfSkills = document.querySelectorAll(".skills .skill-progress span");

window.onscroll = () => {
  // skills offset top
  let skillsOffSetTop = ourskills.offsetTop;

  let skillsOuterHeight = ourskills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
    arrayOfSkills.forEach((progress) => {
      progress.style.width = progress.dataset.progress;
    });
  }
};

// create a popup with image

const ourGallery = document.querySelectorAll(".images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create the overlay element
    const overlay = document.createElement("div");

    // add class to style overlay
    overlay.className = "popup-overlay";

    // append overlay element
    document.body.appendChild(overlay);

    // create the popup img
    const popupBox = document.createElement("div");

    // add class to style the popupbox
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create heading
      const imgHeading = document.createElement("h3");

      // create text to heading
      const imgText = document.createTextNode(img.alt);

      // add text to heading
      imgHeading.appendChild(imgText);

      // append the heading
      popupBox.appendChild(imgHeading);
    }

    // create the img for the popup
    const popupImg = document.createElement("img");

    // set img source
    popupImg.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImg);

    // append popup box to the body
    document.body.appendChild(popupBox);

    // remove the popupbox when click on document
    overlay.addEventListener("click", (e) => {
      popupBox.remove();
      overlay.remove();
    });
  });
});

// select all bullets

const allBullets = document.querySelectorAll(".nav-bullets > div");

// select all links

const allLinks = document.querySelectorAll("header ul li a");

function scrollToSection(elemnts) {
  elemnts.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(allLinks);

// handle active state

function handleActive(ev) {
  // remove active class from all childrens

  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class to the target

  ev.target.classList.add("active");
}

const bulletsOption = document.querySelectorAll(".with-bullets span");

const bulletsContainer = document.querySelector(".nav-bullets");

const bulletsLocalStorge = localStorage.getItem("bullets_option");

if (bulletsLocalStorge !== null) {
  bulletsOption.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletsLocalStorge === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".with-bullets .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".with-bullets .no").classList.add("active");
  }
}

bulletsOption.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// reset button

document.querySelector(".reset").onclick = () => {
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};
