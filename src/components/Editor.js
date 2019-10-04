import React, { useReducer } from 'react';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import * as Commands from '../utils/commands/index.js';

const setPrivateProps = (defaultProps) => defaultProps.map((props) => ({
    ...props,
    isActive: false,
    group: Commands[props.command].group
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

    return state.map((action) => {
        if(action.command === command && action.group === 'basic') { 
            return {
                ...action,
                isActive: !action.isActive
            };
        } else {
            return action;
        }
    });
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'setBasicFormat':
            return setBasicFormat(action.payload.command, state);
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
                onClick={(command, type) => dispatch({ type, payload: { command } })}
            />
            <FileZone
                onDoubleClick={({ target }) => dispatch({ type: 'getFormat', payload: { target } })}
            />
        </React.Fragment>
    );
};

export default Editor;
