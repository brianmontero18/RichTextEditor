import React from 'react';
import classNames from 'classnames';
import './ControlPanel.css';

const ControlPanel = ({ getControlPanelProps, commands, getActionProps, replaceSelectedText, synonyms=[] }) => (
    <div id="control-panel">
        <div id="format-actions" {...getControlPanelProps()}>
            { commands.map((action) => (
                <button
                    {...getActionProps({
                        key: action.command,
                        action,
                        className: classNames({ 'highight-menu': action.isActive }),
                        type: "button"
                    })}
                >
                    <b>{action.displayName}</b>
                </button>
            ))}
            <select onChange={replaceSelectedText}>
                { synonyms.length > 0 && synonyms.map((word) => (
                    <option key={word.word} value={word.word}>{word.word}</option>
                ))}
            </select>
        </div>
    </div>
);

export default ControlPanel;
