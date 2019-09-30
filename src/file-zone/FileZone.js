import React, { Component } from 'react';
import './FileZone.css';

// const onDoubleClick = ({ target }) => {
//     console.log(target.value.substring(target.selectionStart, target.selectionEnd))
// };
const handleChange = (event) => {
    console.log(event.target.innerHTML)
};

class FileZone extends Component {
    render() {
        return (
            <div id="file-zone">
                <div id="file" spellCheck contentEditable suppressContentEditableWarning
                    onInput={handleChange}
                >
                </div>
            </div>
        );
    }
}

export default FileZone;
