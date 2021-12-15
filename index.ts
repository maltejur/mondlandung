const game = document.getElementById("game");
const lander = document.getElementById("lander");
const statusE = document.getElementById("status");
const stats = document.getElementById("stats");
const flame = document.getElementById("flame");
const explosion = document.getElementById("explosion");

let gravity = 10;
let velocity = 0;
let position = 80;
let done = false;
let thrusting = false;
let fuel = 100;

setInterval(() => {
  if (done) return;
  thrusting = thrusting && fuel > 0;
  if (thrusting) fuel -= 0.3;
  const force = -gravity + (thrusting ? 30 : 0);
  stats.innerText = `Position:\t${position.toFixed(0)} m
Velocity:\t${velocity.toFixed(2)} m/s
Force:\t${force} m/s^2
Fuel:\t${fuel.toFixed(0)}`;
  velocity += force / 100;
  position += velocity / 100;
  lander.style.bottom = (position * 10).toString() + "px";
  flame.style.opacity = thrusting ? "1" : "0";
  flame.style.bottom = (position * 10 - 50).toString() + "px";
  if (position <= 0) {
    done = true;
    if (velocity > -5) {
      statusE.innerHTML = `<span style="color:green">Success</span>`;
    } else {
      statusE.innerHTML = `<span style="color:red">Failed</span>`;
      explosion.style.display = "unset";
      setTimeout(() => {
        explosion.style.display = "none";
      }, 1000);
    }
  }
}, 10);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    thrusting = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    thrusting = false;
  }
});
