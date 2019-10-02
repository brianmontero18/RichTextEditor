import React, { useState } from 'react';
import classNames from 'classnames';
import './ControlPanel.css';

const FormatButton = ({ cmd, name, isActive, onMouseDown }) => {
    //const dale = .includes("<b>")
    return (
        <button
            className={classNames({ 'highight-menu': isActive })}
            key={cmd}
            type="button"
            onMouseDown={onMouseDown}
        >
            <b>{name}</b>
        </button>
    );
}

const ControlPanel = ({ selected }) => {
    
    const onMouseDown = (e, cmd) => {
        e.preventDefault();
        document.execCommand(cmd, false);
    };

    return (
        <div id="control-panel">
            <div id="format-actions">
                <FormatButton cmd="bold" name='B' isActive={selected} onMouseDown={(e) => onMouseDown(e, 'bold')} />
                <FormatButton cmd="italic" name='I' isActive={selected} onMouseDown={(e) => onMouseDown(e, 'italic')} />
                <FormatButton cmd="underline" name='U' isActive={selected} onMouseDown={(e) => onMouseDown(e, 'underline')} />
            </div>
        </div>
    );
};

export default ControlPanel;
