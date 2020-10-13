import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';

export default class PaletteList extends Component {
    render() {
        const { palettes } = this.props;
        console.log(palettes);
        return (
            <div>
                <MiniPalette />
                <h1>React Colors</h1>
                <ul>
                    {palettes.map(p =>
                        <li>
                            <Link to={`/${p.id}`}>{p.paletteName}</Link>
                        </li>)}
                </ul>
            </div>
        )
    }
}
