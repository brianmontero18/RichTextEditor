import React, { useState } from 'react';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";

const Editor = () => {
    const [state, setState] = useState({ selected: '' });

    // const handleChange = (event) => {
    //     setState({ selected: event.target.innerHTML })
    // };

    const getSelection = ({ target }) => {
        if(target.innerHTML) {
            const node = window.getSelection().getRangeAt(0).startContainer;
            const parents = (node) => (node.parentElement ? parents(node.parentElement) : []).concat([node]);
            console.log(parents(node));
            setState({ selected: target.outerHTML })
        }
    };

    return (
        <React.Fragment>
            <ControlPanel selected={state.selected} />
            <FileZone getSelection={getSelection} />
        </React.Fragment>
    );
};

export default Editor;