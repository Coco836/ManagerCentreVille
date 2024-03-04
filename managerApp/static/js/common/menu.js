export function toggleMenu() {
  const menu = document.getElementById("navBarMenu");
  const mainNav = document.getElementById("mainNav");
  const burgerBtn = document.getElementById("burgerBtn");

  // Bascule les classes pour le menu et le nav
  menu.classList.toggle("showMenu");
  menu.classList.toggle("closeMenu");
  mainNav.classList.toggle("nav-border-open");
  mainNav.classList.toggle("nav-border-close");

  const isMenuShown = menu.classList.contains("showMenu");
  burgerBtn.classList.add("change");
  if (isMenuShown) {
    mainNav.classList.add("show-menu-radius");
  } else {
    mainNav.classList.remove("show-menu-radius");
  }

  // Changement de l'icône avec temporisation
  setTimeout(() => {
    // Utilisation d'une ternaire pour déterminer le caractère de l'icône
    burgerBtn.innerHTML = isMenuShown ? "&#x2715;" : "&#9776;";
    burgerBtn.classList.remove("change");
  }, 300); // Assurez-vous que la temporisation correspond à la durée de la transition CSS
}

function handleNavBar() {
  const menu = document.getElementById("navBarMenu");
  const mainNav = document.getElementById("mainNav");
  if (window.innerWidth < 1314) {
    menu.classList.add("closeMenu");
    // menu.classList.add("showMenu");
    menu.classList.remove("navBarMenu-desktop");
    menu.classList.add("navBarMenu-mobile");
    mainNav.classList.add("navbar-mobile");
    mainNav.classList.remove("navbar-desktop");
  } else {
    // menu.classList.add("showMenu");
    menu.classList.remove("closeMenu");
    menu.classList.add("navBarMenu-desktop");
    menu.classList.remove("navBarMenu-mobile");
    mainNav.classList.remove("navbar-mobile");
    mainNav.classList.add("navbar-desktop");
  }
}

// Fonction pour vérifier la position de défilement et afficher le menu burger
function checkScroll() {
  // Obtenir la position de défilement verticale
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  // Obtenir l'élément bouton burger
  const menu = document.getElementById("navBarMenu");
  const mainNav = document.getElementById("mainNav");
  const burgerBtn = document.getElementById("burgerBtn");
  // Seuil de défilement pour afficher le bouton burger, ajustez selon vos besoins
  const scrollThreshold = 111;
  // Vérifie si la position de défilement dépasse un certain seuil
  if (
    scrollPosition > scrollThreshold &&
    !menu.classList.contains("navBarMenu-mobile")
  ) {
    // Affiche le bouton burger
    burgerBtn.innerHTML = "&#9776;"; // Caractère pour le menu burgerBtn
    menu.classList.remove("showMenu");
    menu.classList.add("closeMenu");
    burgerBtn.style.display = "flex";
    menu.classList.remove("navBarMenu-desktop");
    menu.classList.add("navBarMenu-mobile");
    mainNav.classList.add("navbar-mobile");
    mainNav.classList.remove("navbar-desktop");
    mainNav.classList.remove("show-menu-radius");
    mainNav.classList.remove("show-menu-desktop-radius");
  } else if (
    scrollPosition < scrollThreshold &&
    !menu.classList.contains("navBarMenu-desktop")
  ) {
    // Cache le bouton burger
    burgerBtn.innerHTML = "&#x2715;"; // Caractère pour la croix
    menu.classList.remove("showMenu");
    menu.classList.remove("closeMenu");
    burgerBtn.style.display = "none";
    menu.classList.add("navBarMenu-desktop");
    menu.classList.remove("navBarMenu-mobile");
    mainNav.classList.remove("navbar-mobile");
    mainNav.classList.add("navbar-desktop");
    mainNav.classList.add("show-menu-desktop-radius");
  }
}

// Écouteur d'événement pour détecter le défilement
window.onscroll = function () {
  if (window.innerWidth > 1314) {
    checkScroll();
  }
};

handleNavBar();

window.addEventListener("resize", function () {
  handleNavBar();
});
