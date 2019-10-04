import React from 'react';
import classNames from 'classnames';
import './ControlPanel.css';
import { BASIC } from '../../utils/commands/groups';

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

const renderMarkupByGroup = (action, onClick) => {
    switch (action.group) {
        case BASIC:
            return (
                <FormatButton
                    key={action.command}
                    name={action.displayName}
                    isActive={action.isActive}
                    onClick={(e) => {
                        e.preventDefault();
                        onClick(action.command, 'setBasicFormat');
                    }}
                />
            );
        default: 
            return null
    }
};

const ControlPanel = ({ formatButtons, onClick }) => {
    return (
        <div id="control-panel">
            <div id="format-actions">
                { formatButtons.map((action) => renderMarkupByGroup(action, onClick)) }
            </div>
        </div>
    );
};

export default ControlPanel;
