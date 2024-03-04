// Définition des fonctions en dehors de l'écouteur d'événements
async function animate(isForward, selectors, interpolator) {
  if (isForward) {
    selectors.playIcon.style.display = "none";
  }

  let steps = 150;
  let startTranslate = isForward
    ? { x: 350.61, y: 192.63 }
    : { x: -127, y: -27 };
  let endTranslate = isForward ? { x: -127, y: -27 } : { x: 350.61, y: 192.63 };
  let delta = {
    x: (endTranslate.x - startTranslate.x) / steps,
    y: (endTranslate.y - startTranslate.y) / steps,
  };
  let opacityChange = isForward ? -1 / steps : 1 / steps;
  let opacity = isForward ? 1 : 0;
  let widthTitleVal = parseFloat(selectors.widthTitle.style.width) || 52;

  for (let i = 0; i <= steps; i++) {
    await sleep(10);
    let currentX = startTranslate.x + delta.x * i;
    let currentY = startTranslate.y + delta.y * i;
    let pathProgress = isForward ? i / steps : 1 - i / steps;

    selectors.imgPresPath.setAttribute("d", interpolator(pathProgress));
    selectors.imgPresPath.style.opacity = Math.min(
      Math.max(opacity + opacityChange * i, 0),
      1
    );
    selectors.gElement.setAttribute(
      "transform",
      `translate(${currentX} ${currentY})`
    );
    selectors.svgVideoPath.setAttribute(
      "transform",
      `translate(${currentX} ${currentY})`
    );
    selectors.clipPathPath.setAttribute("d", interpolator(pathProgress));

    updateVisibilityAndOpacity(isForward, i, selectors.svgVideo);

    widthTitleVal += isForward ? -0.12 : 0.12;
    selectors.widthTitle.style.width = `${widthTitleVal}%`;
  }

  if (!isForward) {
    selectors.playIcon.style.display = "block";
    selectors.svgVideo.forEach((element) => (element.style.display = "none"));
  }
}

function updateVisibilityAndOpacity(isForward, step, elements) {
  let opacityVideo = isForward
    ? step >= 100
      ? (step - 100) / 50
      : 0
    : 1 - step / 50;
  elements.forEach((element) => {
    element.style.opacity = opacityVideo;
    element.style.display = isForward && step >= 100 ? "block" : "none";
  });
}

function sleep(ms) {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

// Initialisation et configuration à l'intérieur de l'écouteur DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  const selectors = {
    playIcon: document.getElementById("playIcon"),
    svgVideo: Array.from(document.getElementsByClassName("svg-video-fill")),
    svgMask: document.getElementById("svg-mask"),
    svgVideoPath: document.getElementById("svg-path"),
    widthTitle: document.getElementById("mainTitle"),
    imgPresPath: document.getElementById("imgPresPath"),
    gElement: document.querySelector("#visual > g"),
    clipPathPath: document.getElementById("clipPathPath"),
  };

  const paths = {
    imgPath:
      "M135.7 -196.4 C161.1 -168.3 157.0 -109.0 168.7 -58.3 C180.4 -7.6 208.0 34.5 198.5 64.7 C189.0 95.0 142.3 113.3 103.0 133.7 C63.8 153.9 31.9 176.2 0.2 175.9 C-31.5 175.6 -63.0 152.8 -106.2 133.8 C-149.4 114.7 -204.4 99.5 -218.9 68.0 C-233.3 36.6 -207.3 -11.2 -195.6 -68.5 C-183.9 -125.9 -186.4 -192.9 -156.2 -219.6 C-125.9 -246.1 -63.0 -232.3 -3.9 -226.9 C55.1 -221.6 110.2 -224.6 135.7 -196.4",
    videoPath:
      "M 57.3,0.0 L 617.1,0.0 C 631.4,0.0 631.4,14.3 631.4,14.3 L 631.4,357.7 C 631.4,372.0 617.1,372.0 617.1,372.0 L 57.3,372.0 C 43.0,372.0 43.0,357.7 43.0,357.7 L 43.0,14.3 C 43.0,0.0 57.3,0.0 57.3,0.0 Z",
  };

  let interpolator = flubber.interpolate(paths.imgPath, paths.videoPath);

  selectors.playIcon.addEventListener("click", function () {
    animate(true, selectors, interpolator);
  });

  selectors.svgMask.addEventListener("ended", function () {
    animate(false, selectors, interpolator);
  });
});
