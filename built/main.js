const colorList = [
    { h: 286, s: 81, l: 65 },
    { h: 346, s: 81, l: 65 },
    { h: 54, s: 81, l: 65 },
    { h: 139, s: 81, l: 65 },
    { h: 180, s: 81, l: 65 },
    { h: 0, s: 0, l: 0 }
];
function buildColor(h, s, l) {
    return `hsl(${h},${s}%,${l}%)`;
}
function createColorBox(colorHSL) {
    let color = buildColor(colorHSL.h, colorHSL.s, colorHSL.l);
    let box = document.createElement("div");
    box.className = 'color__box';
    box.style.backgroundColor = color;
    return box;
}
function addColorOptions(colors) {
    let optionsContainer = document.querySelector('.color--options__boxes');
    optionsContainer.innerHTML = '';
    colors.forEach(color => {
        let colorBox = createColorBox(color);
        optionsContainer.appendChild(colorBox);
    });
}
function addClickToOptions() {
    const boxes = document.querySelectorAll('.color__box');
    [...boxes].forEach(box => {
        box.addEventListener('click', () => {
            let boxIndex = Array.from(box.parentElement.children).indexOf(box);
            createScreenColors(colorList[boxIndex]);
        });
    });
}
function createPixel(colorHSL) {
    let pixel = document.createElement("div");
    pixel.className = 'screen--pixel';
    pixel.style.backgroundColor = buildColor(colorHSL.h, colorHSL.s, colorHSL.l);
    return pixel;
}
function augmentLightColor(colorHSL, augment) {
    return Object.assign(Object.assign({}, colorHSL), { l: colorHSL.l + augment });
}
function createScreenColors(colorHSL) {
    let screen = document.querySelector('.color--screen');
    screen.innerHTML = '';
    let squaresPerRow = 5;
    let pixelList = [];
    for (let row = 0; row < squaresPerRow; row++) {
        let colorRoot = pixelList[row] || colorHSL;
        for (let col = 0; col < squaresPerRow; col++) {
            let lightAugment = col === 0 ? 0 : 6 - row;
            pixelList.push(augmentLightColor(colorRoot, lightAugment * col));
        }
    }
    const elementList = pixelList.map(pixelHSL => createPixel(pixelHSL));
    [...elementList].forEach((element, index) => {
        setTimeout(() => {
            screen.appendChild(element);
        }, index * 10);
    });
    // screen.append(...elementList);
    return true;
}
function buildElements() {
    addColorOptions(colorList);
    addClickToOptions();
    return true;
}
buildElements();
