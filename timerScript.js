'use strict';

/*** Redux Code */


/** Constants */
//Redux constants
const { Provider, connect } = ReactRedux;
const { createStore } = Redux;
//Timer constants
const MAXMINUTES = 99;
const MAXSECONDS = 59;
const MINMINUTES = 0;
const MINSECONDS = 0;
const SETBREAKINCREMENT = "SETBREAKINCREMENT";
const SETBREAKDECREMENT = "SETBREAKDECREMENT";
//Default timer state
const defaultTimerState = {
    setBreakMinutes: 5,
    setBreakSeconds: 0,
    currentBreakMinutes: -1,
    currentBreakSeconds: -1,
    setTimerMinutes: 25,
    setTimerSeconds: 0,
    currentTimerMinutes: -1,
    currentTimerSeconds: -1,
    isTimerActive: false,
}

/** Action Creators */
const incrementSetBreakValue = () => {
    return {
        type: SETBREAKINCREMENT
    };
}

const decrementSetBreakValue = () => {
    return {
        type: SETBREAKDECREMENT
    };
}

/** Helper Functions */


/** Reducer */
const timerReducer = (state = defaultTimerState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case SETBREAKINCREMENT:
            return newState;
        case SETBREAKDECREMENT:
            return newState;
        default: 
            return state;
    }
}


/*** React-Redux Code */



/*** React Code */



/*
Pomodoro Timer To-do's
[ ] Implement Redux code
    [ ] Implement constant variables
        [X] Implement MAX break session value
        [X] Implement MIN break session value
        [X] Implement MAX alarm timer value
        [X] Implement MIN alarm timer value
        [ ] Implement reducer function constants
            [ ] Break session increment
            [ ] Break session decrement
            [ ] Alarm timer set value increment
            [ ] Alarm timer set value decrement
            [ ] Alarm activated
            [ ] Active alarm paused
            [ ] Reset
    [ ] Implement default state object with the following properties
        [ ] Break session value ({minutes, seconds} object?)
        [ ] Alarm timer set value ({minutes, seconds} object?)
        [ ] Is alarm active?
        [ ] (Should the audio file be triggered?)
    [ ] Implement action creators
        [ ] Break session value increment
        [ ] Break session value decrement
        [ ] Alarm timer set value increment
        [ ] Alarm timer set value decrement
        [ ] Alarm has been activated
        [ ] Active alarm has been paused
        [ ] Reset button has been pushed
    [ ] Implement pomodoro timer reducer
        [ ] Break session value increment
        [ ] Break session value decrement
        [ ] Alarm timer set value increment
        [ ] Alarm timer set value decrement
        [ ] Alarm has been activated
        [ ] Active alarm has been paused
        [ ] Reset button has been pushed
        [ ] Default state
    [ ] Implement helper functions
        [ ] (Convert seconds to {minutes, seconds} object?)
        [ ] (Convert {minutes, seconds} object to seconds?)
[ ] Implement React-Redux code
    [ ] Implement app wrapper
    [ ] Map Redux state to React props
    [ ] Map Redux dispatchers to React props
[ ] Implement React code template
    [ ] Implement constructor
    [ ] Implement break session increment and decrement buttons
    [ ] Implement break session display
    [ ] Implement set timer increment and decrement buttons
    [ ] Implement set timer display
    [ ] Implement active alarm timer
[ ] Learn how to implement a timer in vanilla JavaScript
    [ ] Learn about set interval
[ ] Learn how to play an HTML5 audio file in React
    [ ] How did I implement this with the drum project?
[ ] Implement CSS
    [x] Create pomodoro.css
    [ ] Implement button styles
    [ ] Implement break session, set timer, and active alarm timer display styles

*/