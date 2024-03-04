let canvas, ctx;

function initializeCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  setCanvasSize();
  animateCanva();
  window.addEventListener("resize", setCanvasSize);
}

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function drawTriangle(ctx, x1, y1, x2, y2, x3, y3, gradient) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function draw() {
  let time = new Date().getTime() * 0.002;
  // const colors = [
  //   "rgba(21,236,178,0.3)",
  //   "rgba(92,213,239,0.4)",
  //   "rgba(100,200,255,0.3)",
  // ];
  const colors = [
    "rgba(56, 135, 166, 0.3)",
    "rgba(242, 214, 179, 0.4)",
    "rgba(89, 59, 52, 0.3)",
  ];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  let randomX = random(0.2, 0.9);
  let randomY = random(0.1, 0.2);

  let rectX = Math.cos(time * 1) * 1.5 + randomX;
  let rectY = Math.sin(time * 1) * 1.5 + randomY;
  let rectX2 = Math.cos(time * 0.7) * 3 + randomX;
  let rectY2 = Math.sin(time * 0.7) * 3 + randomY;
  let rectX3 = Math.cos(time * 1.4) * 4 + randomX;
  let rectY3 = Math.sin(time * 1.4) * 4 + randomY;

  for (let i = 0; i < canvas.height; i += 300) {
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors[i % colors.length]);
    gradient.addColorStop(1, colors[(i + 1) % colors.length]);

    // Dessiner des triangles à gauche et à droite
    drawTriangle(
      ctx,
      rectX + 120,
      rectY - 100 + i,
      rectX + 460,
      rectY + 80 + i,
      rectX + 26,
      rectY + 185 + i,
      gradient
    );
    drawTriangle(
      ctx,
      rectX2 - 50,
      rectY2 - 25 + i,
      rectX2 + 270,
      rectY2 + 25 + i,
      rectX2 - 50,
      rectY2 + 195 + i,
      gradient
    );
    drawTriangle(
      ctx,
      rectX3 - 140,
      rectY3 - 150 + i,
      rectX3 + 180,
      rectY3 + 210 + i,
      rectX3 - 225,
      rectY3 - 50 + i,
      gradient
    );

    drawTriangle(
      ctx,
      canvas.width - rectX - 120,
      rectY - 100 + i,
      canvas.width - rectX - 460,
      rectY + 80 + i,
      canvas.width - rectX - 26,
      rectY + 185 + i,
      gradient
    );
    drawTriangle(
      ctx,
      canvas.width - rectX2 + 50,
      rectY2 - 25 + i,
      canvas.width - rectX2 - 270,
      rectY2 + 25 + i,
      canvas.width - rectX2 + 50,
      rectY2 + 195 + i,
      gradient
    );
    drawTriangle(
      ctx,
      canvas.width - rectX3 + 140,
      rectY3 - 150 + i,
      canvas.width - rectX3 - 180,
      rectY3 + 210 + i,
      canvas.width - rectX3 + 225,
      rectY3 - 50 + i,
      gradient
    );
  }

  ctx.restore();
}

function animateCanva() {
  requestAnimationFrame(animateCanva);
  draw();
}

initializeCanvas();
