//#region Spawn Color Templates
const colorBoxTemplate = document.getElementById("color-box-template");
const paletteContainer = document.querySelector(".palette-container");

function spawnColorTemplate() {
    const clone = colorBoxTemplate.content.cloneNode(true);
    paletteContainer.appendChild(clone);
}

for (let index = 0; index < 5; index++) {
    spawnColorTemplate();
}
//#endregion

//#region Palette
const generateButton = document.getElementById("generate-btn")
generateButton.addEventListener("click", generatePalette);

function generatePalette() {
    const colors = []
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box, index) => {
        const color = colors[index]
        const colorElement = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value")
        colorElement.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

generatePalette();
//#endregion

//#region Copy Hex
paletteContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("copy-btn")) {
        const hexValue = event.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(event.target))
            .catch((err) => console.log(err));
    }
    else if (event.target.classList.contains("color")) {
        const hexValue = event.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(event.target.nextElementSibling.querySelector(".copy-btn")))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(copyButton) {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "#48bb78"

    setTimeout(() => {
        copyButton.classList.add("far", "fa-copy");
        copyButton.classList.remove("fas", "fa-check");
        copyButton.style.color = ""
    }, 1000);
}
//#endregion