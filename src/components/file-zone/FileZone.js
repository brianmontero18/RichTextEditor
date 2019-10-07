import React from 'react';
import './FileZone.css';

const FileZone = ({ getFileZoneProps }) => (
    <div id='file-zone'>
        <div id='file' { ...getFileZoneProps()}></div>
    </div>
);

export default FileZone;
