import React from 'react';
import classNames from 'classnames';
import './ControlPanel.css';
import { bold, italic, underline } from '../../commands';

const FormatButton = ({ name, isActive, onClick }) => {
    return (
        <button
            className={classNames({ 'highight-menu': isActive })}
            type="button"
            onMouseDown={onClick}
        >
            <b>{name}</b>
        </button>
    );
};

const renderMarkup = (action, onClick) => {
    switch (action.command) {
        case bold.name:
        case italic.name:
        case underline.name: {
            return (
                <FormatButton
                    key={action.command}
                    name={action.displayName}
                    isActive={action.isActive}
                    onClick={(e) => {
                        e.preventDefault();
                        onClick(action.command);
                    }}
                />
            );
        }
        default: return null
    }
};

const ControlPanel = ({ formatButtons, onClick }) => {
    return (
        <div id="control-panel">
            <div id="format-actions">
                { formatButtons.map((action) => renderMarkup(action, onClick)) }
            </div>
        </div>
    );
};

export default ControlPanel;
