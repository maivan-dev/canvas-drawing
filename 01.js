const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const brushwidth = document.querySelector("#brush-wid");
const brushcolor = document.querySelector("#color-picher");
const brush = document.querySelector(".brush");
const eraser = document.querySelector(".eraser");
const clearbtn = document.querySelector(".clear");
const savebtn = document.querySelector(".save");

let isDrawing = false;
let currentwid = 5;
let currentcolor = "";

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function startdraw() {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currentwid;
}

function drawing(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = `${currentcolor}`;
  ctx.stroke();
}

function enddraw() {
  isDrawing = false;
}

canvas.addEventListener("mousedown", startdraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", enddraw);

brushwidth.addEventListener("change", () => {
  currentwid = brushwidth.value;
});

brushcolor.addEventListener("change", () => {
  currentcolor = brushcolor.value;
});

eraser.addEventListener("click", () => {
  eraser.classList.add("active");
  brush.classList.remove("active");
  currentcolor = "white";
});

brush.addEventListener("click", () => {
  brush.classList.add("active");
  eraser.classList.remove("active");
  currentcolor = brushcolor.value;
});

clearbtn.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

savebtn.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `${Date.now().jpg}`;
  link.href = canvas.toDataURL();
  link.click();
});
