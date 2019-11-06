const canvas = document.getElementById('c');
const ct = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
bomList = [];
Expo = [];
ct.fillStyle = 'rgb(0,150,0)';
ct.fillRect(0, canvas.height / 4, canvas.width, canvas.height );
function random(min,max){return Math.floor(Math.random()*(max-min) + min);}
canvas.onclick = function() { if (bomList.length < 3) { bomList.push(new Bom(event.clientX, event.clientY, random(10,20))); } }

function Bom(x, y, r) {
  this.x = x;this.y = y;
  this.r = r;this.vy = Math.round(r/5);
  this.update = function() {
    ct.clearRect(x - r, y - r - this.vy, r * 2, this.vy);
    DrawBom(x, y, r, "black")
    img = ct.getImageData(x - r, y + r, r * 2, 1);
    for (var i = 0; i < img.data.length; i += 4) { if (img.data[i + 1] == 150) { Expo.push({ x: x, y: y, r: r, maxr: r * 3,c:-10}); this.vy = 0; break; } }
    y += this.vy;
  }}


function DrawExpo() {
  for (var i = 0; i < Expo.length; i++) {
    Expo[i].r = Expo[i].r * 1.07;Expo[i].c+=7;
    if (Expo[i].r <= Expo[i].maxr) {DrawBom(Expo[i].x, Expo[i].y, Expo[i].r, "hsl(0, 100%,"+Expo[i].c+"%)"); }
    else {Expo.splice(i, 1);}}}

function DrawBom(x, y, r, c) {
  ct.fillStyle = c;ct.beginPath();
  ct.arc(x, y, r, 0, 2 * Math.PI);
  ct.fill();ct.closePath();}

function animated() {
  requestAnimationFrame(animated);
  for (var i = 0; i < bomList.length; i++) {
    if (bomList[i].vy != 0) { bomList[i].update(); }
    else { bomList.splice(i, 1);}}DrawExpo();}

animated();
