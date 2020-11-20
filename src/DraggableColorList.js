import React from 'react';
import NewColorBox from './NewColorBox';
import {SortableContainer} from 'react-sortable-hoc';

const DraggableColorList = ({colors , removeColor}) => {
    return (
        <div style={{ height: "100%" }}>
            {colors.map((c, i) => (
                <NewColorBox
                    index={i}
                    key={c.color} 
                    color={c.color}
                    name={c.name}
                    handleClick={() => removeColor(c.name)}
                />
            ))}
        </div>
    )
}

export default SortableContainer(DraggableColorList);