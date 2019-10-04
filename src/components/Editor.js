import React, { useReducer } from 'react';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import * as Commands from '../commands';

const setPrivateProps = (defaultProps) => defaultProps.map((props) => ({
    ...props,
    isActive: false
}));

const getParentsNode = (node, target) => {
    const fileZoneNode = document.querySelector('#file');
    return (node.parentElement && !node.parentElement.isEqualNode(fileZoneNode) ? getParentsNode(node.parentElement, target) : []).concat([node]);
};

const getFormat = (target, state) => {
    const node = window.getSelection().getRangeAt(0).startContainer;
    const parents = getParentsNode(node, target);
    
    if(parents.length > 0) {
        return state.map((button) => ({
            ...button,
            isActive: parents.some((optionMenu) => optionMenu.tagName === Commands[button.command].tagName)
        }));
    }
};

const setBasicFormat = (command, state) => {
    document.execCommand(command, false);
    return state.map((button) => {
        if(button.command === command) { 
            return {
                ...button,
                isActive: !button.isActive
            };
        } else {
            return button;
        }
    });
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'setFormat': {
            if(Commands.bold.name === action.payload.command || Commands.bold.name === action.payload.command || Commands.bold.name === action.payload.command) {
                return setBasicFormat(action.payload.command, state);
            } else {
                return null;
            }
            break;
        }
        case 'getFormat':
            return getFormat(action.payload, state);
        default:
            throw new Error();
    }
};

const Editor = ({ formatActions }) => {
    const [formatButtons, dispatch] = useReducer(reducer, setPrivateProps(formatActions));
    
    return (
        <React.Fragment>
            <ControlPanel
                formatButtons={formatButtons}
                onClick={(command) => dispatch({ type: 'setFormat', payload: { command } })}
            />
            <FileZone
                onDoubleClick={({ target }) => dispatch({ type: 'getFormat', payload: { target } })}
            />
        </React.Fragment>
    );
};

export default Editor;
