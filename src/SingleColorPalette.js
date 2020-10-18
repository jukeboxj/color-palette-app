import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

export default class SingleColorPalette extends Component {

    // state = {
    //     format: 'hex'
    // };

    // changeFormat = fmt => {
    //     this.setState({ format: fmt })
    // }

    findColor = () => {
        
    }

    render() {
        const { colors, emoji, paletteName, id } = this.props.palette;
        // const { format } = this.state;

        // const colorBoxes = colors['500'].map(c =>
        //     <ColorBox
        //         bg={c[format]}
        //         name={c.name}
        //         key={c.id}
        //         moreURL={`/${id}/${c.id}`} />
        // );

        return (
            <div className='SingleColorPalette'>
                {/* <Navbar
                    level={'500'}
                    format={format}
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat} />
                <div className="Palette-colors">
                    {colorBoxes}
                </div> */}
                <footer className="Palette-footer">{paletteName}<span className='emoji'>{emoji}</span></footer>
            </div>
        )
    }
}

