import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import memes from './lib/memes';
import * as serviceWorker from './serviceWorker';

// HOMEWORK: (feel free to collaborate)
 // 1.)
// Render App.js in 'Class Notation', instead of the 'stateless functional component' above
// just uncomment the code at the bottom. and comment out the one above
 // 2.)
// change the structure of memes to an array of objects in alphabetial order
// try to use modern js (these kind of operations become very important later on)
// e.g. [{title: 'Retarded Toad Head', image: 'http://example.com/retoadhead.jpg'},{..},...]
// change the code in App.js accordingly.
// render the title under the image via jsx
 // 3.)
// increase randomness to the length of the new title,image array (array of tuples)
 // 4.)
// add 2 input fields to the dom (name them: upperText, lowerText)
// add functions that get called when you type sth there (onkeypress) (onfocus) ...
// don't forget to bind 'this' in the constructor, you will need it later
 // 5.)
// exchange the standard input fields for the 'react-debounce-input' component (already in package.json)
// to not get the keypress handler be called for every single keystroke.
// find the documentation yourself: online, or deeeeeep inside exercises-for-mobile code
// then make sure the text of the input fields is rendered in jsx
 // 6.)
// add a select/option field that lets you select the images by title
// and fires an event when sth. has changed.
// remove the randomness of images
// remove button and handler
// within the event: update currentMemeIndex in the state to the selected index (use this.setState)
 // 7.)
// BONUS: feel free to use foundation to make things more beautiful
// just import it. It's already in the package.json
// beware: make sure not to load foundation twice.
// remember: we are on still inside our rails app,
// so check layouts/workshop.haml if it's not included already ;-)
// maybe try to give the image a maximum width and
// just make them scale down in proportion if they are too big

const newObject = Object.keys(memes).map(key => ({[key]:memes[key]}));
//console.log(newObject);

ReactDOM.render(<App memes={newObject}  />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
