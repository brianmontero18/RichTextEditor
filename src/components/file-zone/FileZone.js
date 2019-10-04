import React from 'react';
import './FileZone.css';

const FileZone = ({ onDoubleClick }) => {
    return (
        <div id="file-zone">
            <div id="file" 
                spellCheck
                contentEditable
                suppressContentEditableWarning
                onDoubleClick={onDoubleClick}
            >
            </div>
        </div>
    );
};

export default FileZone;
