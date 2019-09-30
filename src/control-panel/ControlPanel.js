import React, { Component } from 'react';
import './ControlPanel.css';

const EditButton = ({ cmd, name }) => {
    return (
        <button
            className="format-action"
            key={cmd}
            type="button"
            onMouseDown={evt => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                console.log(cmd)
                document.execCommand(cmd, false); // Send the command to the browser
            }}
        >
            <b>{name}</b>
        </button>
    );
}

class ControlPanel extends Component {
    render() {
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <EditButton cmd="bold" name='B'/>
                    <EditButton cmd="italic" name='I'/>
                    <EditButton cmd="underline" name='U'/>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
