import React from 'react';
import './App.css';
import Editor from './components/Editor';
import { SynonymsProvider } from './components/synonyms';

const App = () => {
    return (
        <div className="App">
            <header>
                <span>Simple Text Editor</span>
            </header>
            <main>
                <SynonymsProvider>
                    <Editor 
                        formatActions={[
                            {command: 'bold', displayName: 'B'},
                            {command: 'italic', displayName: 'I'},
                            {command: 'underline', displayName: 'U'}
                        ]}
                    />
                </SynonymsProvider>
            </main>
        </div>
    );
}

export default App;
