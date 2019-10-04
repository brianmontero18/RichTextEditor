import React, {Component} from 'react';
import './App.css';
import Editor from './components/Editor';
import getMockText from './text.service';

class App extends Component {
    getText() {
        getMockText().then(function (result) {
            console.log(result);
        });
    }
    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <Editor formatActions={[
                        {command: 'bold', displayName: 'B'},
                        {command: 'italic', displayName: 'I'},
                        {command: 'underline', displayName: 'U'}
                    ]}/>
                </main>
            </div>
        );
    }
}

export default App;
