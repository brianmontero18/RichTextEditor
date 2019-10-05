import React, { useReducer } from 'react';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import * as Commands from '../utils/commands/index.js';
import { useSynonyms } from '../components/synonyms';

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
    const [formatActions, dispatch] = useReducer(reducer, setPrivateProps(props.formatActions));
    const [synonyms, getSynonymsByWord] = useSynonyms();

    const onDoubleClick = ({ target }) => {
        hola = target;
        setTimeout(function() {   
            while (hola.value.substr(hola.selectionEnd -1, 1) == " ")  {
                hola.selectionEnd = hola.selectionEnd - 1;
            }
            const wordSelected = window.getSelection().toString().trim();

            getSynonymsByWord(wordSelected);
            dispatch({ type: 'getFormat', payload: { target } });
        }, 0);
        
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

    return (
        <React.Fragment>
            <ControlPanel
                formatActions={formatActions}
                onFormat={(command, type) => dispatch({ type, payload: { command } })}
                synonyms={synonyms}
                replaceSelectedText={replaceSelectedText}
            />
            <FileZone
                onDoubleClick={onDoubleClick}
            />
        </React.Fragment>
    );
};

export default Editor;
