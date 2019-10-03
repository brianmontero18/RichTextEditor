import React, { useState } from 'react';
import classNames from 'classnames';
import './ControlPanel.css';

const FormatButton = ({ cmd, name, isActive, onClick }) => {
    return (
        <button
            className={classNames({ 'highight-menu': isActive })}
            key={cmd}
            type="button"
            onMouseDown={onClick}
        >
            <b>{name}</b>
        </button>
    );
}

const ControlPanel = ({ selected }) => {
    
    const onClick = (e, cmd) => {
        e.preventDefault();
        document.execCommand(cmd, false);
    };

    return (
        <div id="control-panel">
            <div id="format-actions">
                <FormatButton cmd="bold" name='B' isActive={/(.*)<b>(.*?)<\/b>(.*)/.test(selected)} onClick={(e) => onClick(e, 'bold')} />
                <FormatButton cmd="italic" name='I' isActive={/(.*)<i>(.*?)<\/i>(.*)/.test(selected)} onClick={(e) => onClick(e, 'italic')} />
                <FormatButton cmd="underline" name='U' isActive={/(.*)<u>(.*?)<\/u>(.*)/.test(selected)} onClick={(e) => onClick(e, 'underline')} />
            </div>
        </div>
    );
};

export default ControlPanel;
