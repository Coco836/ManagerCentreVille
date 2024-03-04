export function navigateToSection(sectionId) {
  window.location.href = sectionId;
}

// ONE PAGE NAVIGATION

// Fonction pour mettre à jour la classe "active" en fonction de la position de la page
function updateActiveLink(menuHeight, navLinks) {
  // Récupérez la position actuelle de la page
  const scrollPosition = $(window).scrollTop() + 150;

  // Parcourez tous les liens de navigation
  navLinks.each(function () {
    const targetId = $(this).attr("href");
    const targetElement = $(targetId);

    // Vérifiez si la section est visible à l'écran
    if (
      targetElement.offset().top - menuHeight <= scrollPosition &&
      targetElement.offset().top + targetElement.height() - menuHeight >
        scrollPosition
    ) {
      // Ajoutez la classe "active" au lien correspondant
      navLinks.removeClass("active");
      $(this).addClass("active");
    } else {
      // Retirez la classe "active" des liens qui ne correspondent pas à la section visible
      $(this).removeClass("active");
    }
  });
}

function initializeOnePageNavigation() {
  // Récupérez la hauteur du menu sticky
  const menuHeight = $(".nav").outerHeight();

  // Récupérez tous les liens de navigation avec la classe "smooth-scroll"
  const navLinks = $(".smooth-scroll");

  $(window).scroll(() => updateActiveLink(menuHeight, navLinks));

  // Lorsqu'un lien avec la classe "smooth-scroll" est cliqué
  $(".smooth-scroll").on("click", function (event) {
    event.preventDefault();

    // Retirez la classe "active" de tous les liens
    navLinks.removeClass("active");

    // Ajoutez la classe "active" au lien cliqué
    $(this).addClass("active");

    // Récupérer l'ID de la section cible à partir de l'attribut href du lien
    const targetId = $(this).attr("href");

    // Animer le défilement vers la section cible tout en compensant la hauteur du menu
    $("html, body").animate(
      {
        scrollTop: $(targetId).offset().top - (menuHeight + 130),
      },
      800 // Durée de l'animation en millisecondes (ajustez-la selon vos préférences)
    );
  });
}

$(document).ready(function () {
  initializeOnePageNavigation();
});
