import React from 'react';
import './App.css';
import Editor from './components/Editor';
import { SynonymsProvider, useSynonyms } from './components/synonyms';
import ControlPanel from "./components/control-panel/ControlPanel";
import FileZone from "./components/file-zone/FileZone";

const formatActions = [
    {command: 'bold', displayName: 'B'},
    {command: 'italic', displayName: 'I'},
    {command: 'underline', displayName: 'U'}
];

const Content = () => {
    const [synonyms, getSynonymsByWord] = useSynonyms();
    const openControlPanel = ({ wordSelected }) => {
        getSynonymsByWord(wordSelected);
    };

    return (
        <Editor
            formatActions={formatActions}
            openControlPanel={openControlPanel}
        >
            {(props) => (
                <React.Fragment>
                    <ControlPanel
                        getControlPanelProps={props.getControlPanelProps}
                        commands={props.commands}
                        getActionProps={props.getActionProps}
                        replaceSelectedText={props.replaceSelectedText}
                        synonyms={synonyms}
                    />
                    <FileZone
                        getFileZoneProps={props.getFileZoneProps}
                    />
                </React.Fragment>
            )}
        </Editor>
    );
}

const App = () => {
    return (
        <div className="App">
            <header>
                <span>Simple Text Editor</span>
            </header>
            <main>
                <SynonymsProvider>
                    <Content />
                </SynonymsProvider>
            </main>
        </div>
    );
}

export default App;
