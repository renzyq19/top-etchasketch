const root = document.querySelector("#root");
const rainbowButton = document.querySelector("#rainbow");
const resetButton = document.querySelector("#reset");
const sizeSlider = document.querySelector(".size_slider");

let size = 32;
document.currentColor = ``;
let hue;
let rainbowFlag = false;

const hsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`;

function makeBoxes(size) {
  root.replaceChildren();
  document.documentElement.style.setProperty("--boxes-per-side", size);
  for (let i = 0; i < size * size; i++) {
    const el = document.createElement("div");
    el.addEventListener(
      "mousemove",
      () => {
        el.classList.add("active");
        el.style.setProperty(
          "--box-color",
          rainbowFlag ? hsl(3 * hue++, 100, 50) : document.currentColor
        );
      },
      {
        once: true,
      }
    );
    root.appendChild(el);
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
  rainbowFlag = false;
  rainbowButton.textContent = "Rainbow?";
  hue = 0;
  document.currentColor = "";
  makeBoxes(size);
}
document
  .querySelector("input[type=color")
  .addEventListener("input", function () {
    document.currentColor = this.value;
  });

sizeSlider.addEventListener("change", function (e) {
  makeBoxes(e.target.value);
});
sizeSlider.addEventListener("input", function (e) {
  this.children[0].textContent = e.target.value;
});

makeBoxes(sizeSlider.children[1].value);
