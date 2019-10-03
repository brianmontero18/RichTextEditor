import React from 'react';
import './FileZone.css';

const FileZone = ({ getSelection }) => {
    return (
        <div id="file-zone">
            <div id="file" 
                spellCheck
                contentEditable
                suppressContentEditableWarning
                //onInput={handleChange}
                onDoubleClick={getSelection}
                onClick={getSelection}
            >
            </div>
        </div>
    );
};

export default FileZone;
