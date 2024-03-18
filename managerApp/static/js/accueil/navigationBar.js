export function navigateToSection(sectionId) {
  window.location.hash = sectionId;
}

document.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY + 150;
  const selectOptions = document.querySelectorAll("#mobileNavDropdown option");

  selectOptions.forEach(function (option) {
    const targetId = option.value;
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      if (
        targetPosition <= scrollPosition &&
        targetPosition + targetElement.offsetHeight > scrollPosition
      ) {
        document.querySelector("#mobileNavDropdown").value = targetId;
      }
    }
  });
});

function updateActiveLink(menuHeight, navLinks) {
  const scrollPosition = window.scrollY + 150;

  navLinks.forEach(function (link) {
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      if (
        targetPosition - menuHeight <= scrollPosition &&
        targetPosition + targetElement.offsetHeight - menuHeight >
          scrollPosition
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
}

function initializeOnePageNavigation() {
  const menuHeight = document.querySelector(".nav").offsetHeight;
  const navLinks = document.querySelectorAll(".smooth-scroll");

  window.addEventListener("scroll", () =>
    updateActiveLink(menuHeight, navLinks)
  );

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
      const targetId = this.getAttribute("href");
      const targetPosition =
        document.querySelector(targetId).getBoundingClientRect().top +
        window.scrollY -
        (menuHeight + 130);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeOnePageNavigation();
});
