const colorList: {h:number,s:number,l:number}[] =[
    {h:286,s:81,l:65},
    {h:346,s:81,l:65},
    {h:54,s:81,l:65},
    {h:139,s:81,l:65},
    {h:180,s:81,l:65},
    {h:0,s:0,l:0}
];

function buildColor(h:number,s:number,l:number):string{
    return `hsl(${h},${s}%,${l}%)`;
}
function createColorBox(colorHSL:{h:number,s:number,l:number}): HTMLElement | null{
    let color:string = buildColor(colorHSL.h,colorHSL.s,colorHSL.l);
    let box: HTMLElement = document.createElement("div");
    box.className = 'color__box';
    box.style.backgroundColor = color;
    return box;
}
function addColorOptions(colors:{h:number, s:number, l:number}[]){
    let optionsContainer:HTMLElement = document.querySelector('.color--options__boxes');
    optionsContainer.innerHTML = '';
    colors.forEach(color => {
        let colorBox:HTMLElement = createColorBox(color);
        optionsContainer.appendChild(colorBox);
    });
}
function addClickToOptions(){
    const boxes:NodeListOf<HTMLElement> = document.querySelectorAll('.color__box');
    [...boxes].forEach(box =>{
        box.addEventListener('click', ()=>{
            let boxIndex:number = Array.from(box.parentElement.children).indexOf(box);
            createScreenColors(colorList[boxIndex]);
        })
    })
}

function createPixel(colorHSL){
    let pixel = document.createElement("div");
    pixel.className = 'screen--pixel';
    pixel.style.backgroundColor = buildColor(colorHSL.h, colorHSL.s, colorHSL.l);
    return pixel;
}

function augmentLightColor(colorHSL, augment){
    return {...colorHSL, l:colorHSL.l + augment};
}

function createScreenColors(colorHSL){
    let screen = document.querySelector('.color--screen');
    screen.innerHTML = '';
    let squaresPerRow = 5;
    let pixelList = [];
    for (let row = 0; row < squaresPerRow; row++) {
        let colorRoot = pixelList[row] || colorHSL;
        for (let col = 0; col < squaresPerRow; col++) {
            let lightAugment = col === 0 ? 0 : 6-row;
            pixelList.push(augmentLightColor(colorRoot, lightAugment*col));
        }
    }
    const elementList = pixelList.map(pixelHSL => createPixel(pixelHSL));
    [...elementList].forEach((element,index)=>{
        setTimeout(()=>{
            screen.appendChild(element);
        }, index * 10)
    })
    // screen.append(...elementList);
    return true;
}

function buildElements(){
    addColorOptions(colorList);
    addClickToOptions();
    return true;
}

buildElements();
