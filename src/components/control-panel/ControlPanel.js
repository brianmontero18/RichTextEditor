import React from 'react';
import classNames from 'classnames';
import './ControlPanel.css';
import { BASIC } from '../../utils/commands/types';

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

const renderActionByType = (action, onFormat) => {
    switch (action.type) {
        case BASIC:
            return (
                <FormatButton
                    key={action.command}
                    name={action.displayName}
                    isActive={action.isActive}
                    onClick={(e) => {
                        e.preventDefault();
                        onFormat(action.command, 'setBasicFormat');
                    }}
                />
            );
            
        default: 
            return null
    }
};

const ControlPanel = ({ formatActions, onFormat, synonyms=[], replaceSelectedText }) => {
    return (
        <div id="control-panel">
            <div id="format-actions">
                { formatActions.map((action) => renderActionByType(action, onFormat)) }
                <select onChange={replaceSelectedText}>
                    { synonyms.length > 0 && synonyms.map((word) => (
                        <option key={word.word} value={word.word}>{word.word}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ControlPanel;
