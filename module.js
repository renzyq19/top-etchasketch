const root = document.querySelector("#root");
const rainbowButton = document.querySelector("#rainbow");
const resetButton = document.querySelector("#reset");
const colorPicker = document.querySelector("input[type=color");
const sizeSlider = document.querySelector(".size_slider");

document.currentColor = ``;
let hue;
let rainbowFlag = false;

const hsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`;

function makeBoxes() {
  const size = parseInt(sizeSlider.children[1].value);
  root.replaceChildren();
  document.documentElement.style.setProperty("--boxes-per-side", size);
  document.documentElement.style.setProperty(
    "--box-size",
    `${Math.floor(640 / size)}px`
  );
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const el = document.createElement("div");
      el.style.opacity = 0;
      el.addEventListener(
        "mousemove",
        () => {
          el.style.opacity = parseFloat(el.style.opacity) + 0.35;
          el.style.setProperty(
            "--box-color",
            rainbowFlag ? hsl(3 * hue++, 100, 50) : document.currentColor
          );
        },
        {
          //    once: true,
        }
      );
      el.classList.add(`x${i}y${j}`);

      root.appendChild(el);
    }
  }
}

rainbowButton.addEventListener("click", () => {
  rainbowFlag = !rainbowFlag;
  rainbowButton.textContent = rainbowFlag ? "Rainbow!" : "Rainbow?";
  document.currentColor = hsl(hue, 100, 50);
  hue = 0;
});

resetButton.addEventListener("click", reset);

function reset() {
  root.classList.add("shaking");
  setTimeout(() => root.classList.remove("shaking"), 500);
  rainbowFlag = false;
  rainbowButton.textContent = "Rainbow?";
  hue = 0;
  document.currentColor = "";
  colorPicker.value = 0x000000;
  makeBoxes();
}
colorPicker.addEventListener("input", function () {
  document.currentColor = this.value;
});

sizeSlider.addEventListener("change", function (e) {
  reset();
});
sizeSlider.addEventListener("input", function (e) {
  this.children[0].textContent = `Boxes Per Side: ${e.target.value}`;
});

reset();
