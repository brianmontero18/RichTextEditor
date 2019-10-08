# Simple text editor
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Initial setup
Run `npm install` in order to setup application

## Development server
Run `npm start` for a dev server.

## Notes
+ Render prop and Controlled Props patterns were applied to allows you to render whatever you want inside <Editor /> . It also puts you in total control of when, where, and how you render the action items in the control panel.
+ User is able to interact with words of text by double-click or CTRL + SPACE, to select a word.
+ Editor folder has all the logic of the simple text editor
+ components folder has external components that will be rendered within <Editor />
+ Formatting default list: Bold, Italic, Underline, provided to the Editor component
+ User is able to see synonyms for any word selected and replace it with a synonym, while keeping all formatting settings.