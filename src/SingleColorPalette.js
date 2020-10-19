import React, { Component } from 'react';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';
import './Palette.css';

export default class SingleColorPalette extends Component {

    state = {
        format: 'hex'
    };

    changeFormat = fmt => {
        this.setState({ format: fmt })
    }

    getShades = () => {
        const {palette, colorId} = this.props;
        let shades = [];

        for (const i in palette.colors) {
            shades = shades.concat(
                palette.colors[i].filter(color => color.id === colorId)
            )
        }

        //removing the brightness of 50(which is actaully just white)
        return shades.slice(1);
    }

    render() {
        const { emoji, paletteName } = this.props.palette;
        const { format } = this.state;

        const shades = this.getShades();
        // console.log(shades[0]['rgb']);
        const colorBoxes = shades.map(c => 
            <ColorBox
                bg={c[format]}
                name={c.name}
                key={c.name}
                showLink={false} />
        );

        return (
            <div className='Palette'>
                <Navbar
                    format={format}
                    changeFormat={this.changeFormat}
                    showLvl={false} />
                <div className="Palette-colors">{colorBoxes}</div>
                <PaletteFooter emoji={emoji} paletteName={paletteName} />
            </div>
        )
    }
}

