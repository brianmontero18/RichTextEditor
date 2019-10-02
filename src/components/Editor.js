import React, { useState } from 'react';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";

const Editor = () => {
    const [state, setState] = useState({ selected: '' });

    // const handleChange = (event) => {
    //     setState({ selected: event.target.innerHTML })
    // };

    const getSelection = ({ target }) => {
        setState({ selected: target.outerHTML })
    };

    return (
        <React.Fragment>
            <ControlPanel selected={state.selected} />
            <FileZone getSelection={getSelection} />
        </React.Fragment>
    );
};

export default Editor;