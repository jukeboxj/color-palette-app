import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generatePalette = starterPalette => {
    let newPalette = {
        paletteName : starterPalette.paletteName,
        id          : starterPalette.id,
        emoji       : starterPalette.emoji,
        colors      : {}
    };
    for(let lvl of levels){
        newPalette.colors[lvl] = [];
    }
    for(let c of starterPalette.colors){
        let scale = getScale(c.color, 10).reverse();
        for(let i in scale){
            newPalette.colors[levels[i]].push({
                name: `${c.name} ${levels[i]}`,
                id: c.name.toLowerCase().replace(/ /g, '-'),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                //changing rgb (23, 45, 1) to rgba (23, 45, 1, 1.0) 1.0 is the alpha value and it is not dealing with the opacity here
                rgba: chroma(scale[i]).css().replace("rgb", 'rgba').replace(')', ',1.0)')
            })
        }
    }
    return newPalette;
}

//getting color returned [color.darken(1.4), color, white]
//since black - color - white skew dark/black
const getRange = (hexColor) => {
    const end = '#fff';
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        end
    ];
}

const getScale = (hexColor, numberOfColors) => {
    return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors)
}

export {generatePalette};