import React from 'react';
import useActions from './useActions';
import { BASIC } from './commands/types';
import * as stateChangeTypes from './stateChangeTypes'

const Editor = (props) => {
    const [formatActions, dispatch] = useActions(props.formatActions);
    const [isControlPanelOpen, setOpen] = React.useState(false);
    const fileZoneRef = React.createRef();

    const handleDoubleClick = () => {
        openControlPanel();
    };

    const handleKeyDown = (event) => {
        if(event.ctrlKey && event.keyCode === 32 && event.currentTarget === fileZoneRef.current) {
            openControlPanel();
        }
    };

    const handleClick = () => {
        if(isControlPanelOpen) {
            setOpen(false);
        }
    }

    const openControlPanel = () => {
        const wordSelected = window.getSelection().toString();

        if(wordSelected.includes(' ') || wordSelected.includes(String.fromCharCode(160))) {
            alert('please select a word without trailing spaces');
        } else {
            dispatch({ type: stateChangeTypes.getFormat, payload: fileZoneRef.current });
            setOpen(true);
            props.openControlPanel({ wordSelected });
        }
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

    const getControlPanelProps = () => ({
        style: { display: isControlPanelOpen ? 'block' : 'none' }
    });

    const getActionProps = (props = { action: {} }) => {
        if(props.action.type === BASIC) {
            return {
                onClick: (event) => {
                    event.preventDefault();
                    dispatch({ type: stateChangeTypes.setBasicFormat, payload: props.action.command });
                },
                ...props
            } 
        } else {
            return props;
        }
    };

    const getFileZoneProps = (props = {}) => ({
        ref: fileZoneRef,
        spellCheck: true,
        contentEditable: true,
        suppressContentEditableWarning: true,
        onDoubleClick: handleDoubleClick,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        ...props
    });

    return props.children({
        getControlPanelProps,
        getActionProps,
        getFileZoneProps,
        replaceSelectedText,
        commands: formatActions
    });
}

export default Editor;
