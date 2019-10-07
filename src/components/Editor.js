import React from 'react';
import * as Commands from '../utils/commands/index.js';
import { BASIC } from '../utils/commands/types';

const setPrivateProps = (defaultProps) => defaultProps.map((props) => ({
    ...props,
    isActive: false,
    type: Commands[props.command].type
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
        if(action.command === command && action.type === 'basic') { 
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

const Editor = (props) => {
    const [formatActions, dispatch] = React.useReducer(reducer, setPrivateProps(props.formatActions));
    const [isOpen, setOpen] = React.useState(false);

    const onDoubleClick = ({ target }) => {
        // hola = target;
        // setTimeout(function() {   
        //     while (hola.value.substr(hola.selectionEnd -1, 1) == " ")  {
        //         hola.selectionEnd = hola.selectionEnd - 1;
        //     }
            const wordSelected = window.getSelection().toString().trim();

            dispatch({ type: 'getFormat', payload: { target } });
            setOpen(true);
            props.openControlPanel(wordSelected);
        // }, 0);
        
    };
    const getControlPanelProps = () => {
        return {
            style: { display: isOpen ? 'block' : 'none' },
            onFocus: () => {
                setOpen(false);
            }
        };
    };
    const getActionProps = (props = { action: {} }) => {
        if(props.action.type === BASIC) {
            return {
                onClick: (e) => {
                    e.preventDefault();
                    dispatch({ type: 'setBasicFormat', payload: { command: props.action.command } });
                },
                ...props
            } 
        } else return props;
    };
    const getFileZoneProps = (props = {}) => {
        return {
            id: "file",
            spellCheck: true,
            contentEditable: true,
            suppressContentEditableWarning: true,
            onDoubleClick,
            ...props
        };
    };
    const replaceSelectedText = (event) => {
        event.preventDefault();
        var node, range;
        if (window.getSelection) {
            node = window.getSelection();
            if (node.rangeCount) {
                range = node.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(event.target.value));
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = event.target.value;
        }
    };

    return props.children({
        getControlPanelProps,
        getActionProps,
        getFileZoneProps,
        replaceSelectedText,
        commands: formatActions,
        isOpen
    });
}

export default Editor;
