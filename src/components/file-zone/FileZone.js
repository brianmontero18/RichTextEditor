import React from 'react';
import './FileZone.css';

const FileZone = ({ getFileZoneProps }) => (
    <div id="file-zone">
        <div { ...getFileZoneProps()}></div>
    </div>
);

export default FileZone;
