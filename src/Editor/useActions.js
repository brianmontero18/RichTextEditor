import React from 'react';
import * as Commands from './commands/index.js';
import * as stateChangeTypes from './stateChangeTypes';

const setPrivateProps = (defaultProps) => defaultProps.map((props) => ({
    ...props,
    isActive: false,
    type: Commands[props.command].type
}));

const getParentsNode = (node, target) => {
    return (node.parentElement && !node.parentElement.isEqualNode(target) ? getParentsNode(node.parentElement, target) : []).concat([node]);
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
        case stateChangeTypes.setBasicFormat:
            return setBasicFormat(action.payload, state);
        case stateChangeTypes.getFormat:
            return getFormat(action.payload, state);
        default:
            throw new Error();
    }
};

const useActions = (initialState) => {
    const [state, dispatch] = React.useReducer(reducer, setPrivateProps(initialState));

    return [state, dispatch];
}

export default useActions;
