import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

export default class Palette extends Component {
    
    state = { 
        level : 500,
        format : 'hex' 
    };

    changeLevel = lvl => {
        this.setState({ level: lvl })
        // console.log(lvl)
    }

    changeFormat = fmt => {
        this.setState({ format: fmt })
    }
    
    render() {
        const { colors, emoji, paletteName } = this.props.palette;
        const { level, format } = this.state;

        const colorBoxes = colors[level].map(c => 
            <ColorBox bg={c[format]} name={c.name} key={c.id} />
        );

        return (
            <div className="Palette">
                <Navbar 
                    level={level}
                    format={format} 
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat} />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <footer className="Palette-footer">{paletteName}<span className='emoji'>{emoji}</span></footer>
            </div>
        )
    }
}
