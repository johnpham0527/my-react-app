'use strict';

/*** Redux Code */

/** Constants */
//Redux constants
const { Provider, connect } = ReactRedux;
const { createStore } = Redux;
//Clock constants
const MAXMINUTES = 99;
const MAXSECONDS = 59;
const MINMINUTES = 0;
const MINSECONDS = 0;
const SETBREAKINCREMENT = "SETBREAKINCREMENT";
const SETBREAKDECREMENT = "SETBREAKDECREMENT";
const SETALARMINCREMENT = "SETALARMINCREMENT";
const SETALARMDECREMENT = "SETALARMDECREMENT";
const STARTALARM = "STARTALARM";
const PAUSEALARM = "PAUSEALARM";
const RESETALARM = "RESETALARM";
const PLAYALARM = "PLAYALARM";
const COUNTDOWN = "COUNTDOWN";
//Default clock state
const defaultClockState = {
    setBreakMinutes: 5,
    totalRemainingBreakSeconds: 5 * 60,
    setSessionMinutes: 25,
    totalRemainingSessionSeconds: 25 * 60,
    isSessionActive: false,
    timerID: 0,
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

const incrementSetAlarmValue = () => {
    return {
        type: SETALARMINCREMENT
    };
}

const decrementSetAlarmValue = () => {
    return {
        type: SETALARMDECREMENT
    };
}

const startAlarm = (timer_ID) => {
    return {
        type: STARTALARM,
        timerID: timer_ID
    };
}

const pauseAlarm = () => {
    return {
        type: PAUSEALARM
    };
}

const resetAlarm = () => {
    return {
        type: RESETALARM
    };
}

const playAlarm = () => {
    return {
        type: PLAYALARM
    };
}

const countdown = () => {
    return {
        type: COUNTDOWN
    };
}

/** Helper Functions */
const playAlarmSound = () => {
    let alarm = document.getElementById("beep");
    alarm.play();
}

const convertSecondsToTime = (seconds) => {
    let minutesDivisor = seconds % (60 * 60);
    let min = Math.floor(minutesDivisor / 60);
    
    let secondsDivisor = minutesDivisor % 60;
    let sec = Math.ceil(secondsDivisor);

    let timeObject = {
        minutes: min,
        seconds: sec
    };

    return timeObject;
}

const displayTimeText = (timeObject) => {
    //add leading zeros if seconds is a single digit number
    let timeText = {
        minutes: timeObject.minutes.toString(),
        seconds: timeObject.seconds.toString()
    };
    
    if (timeObject.seconds < 10) {
        timeText.seconds = "0" + timeText.seconds;
    }
    //return an object containing the minutes and seconds in text format
    return timeText;
}

/** Reducer */
const clockReducer = (state = defaultClockState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case SETBREAKINCREMENT:
            newState.setBreakMinutes++;
            return newState;
        case SETBREAKDECREMENT:
            newState.setBreakMinutes--;
            return newState;
        case SETALARMINCREMENT:
            newState.setSessionMinutes++;
            return newState;
        case SETALARMDECREMENT:
            newState.setSessionMinutes--;
            return newState;
        case STARTALARM:
            newState.isSessionActive = true;
            newState.timerID = action.timerID;
            return newState;
        case PAUSEALARM:
            newState.isSessionActive = false;
            return newState;
        case RESETALARM:
            newState.setBreakMinutes = 999;
            return newState;
        case PLAYALARM:
            playAlarmSound();
            return newState;
        case COUNTDOWN:
            newState.totalRemainingSessionSeconds--;
            return newState;
        default: 
            return state;
    }
}

const store = Redux.createStore(clockReducer);


/*** React-Redux Code */
const mapStateToProps = state => {
    return {
        storeState: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitIncrementSetBreakValue: () => {
            return dispatch(incrementSetBreakValue())
        },
        submitDecrementSetBreakValue: () => {
            return dispatch(decrementSetBreakValue())
        },
        submitIncrementSetAlarmValue: () => {
            return dispatch(incrementSetAlarmValue())
        },
        submitDecrementSetAlarmValue: () => {
            return dispatch(decrementSetAlarmValue())
        },
        submitStartAlarm: (isSessionActive) => {
            if (!isSessionActive) { //don't dispatch countdown and startAlarm if there is already an active session
                const timerID = setInterval(() => dispatch(countdown()), 1000); //dispatch countdown every second
                return dispatch(startAlarm(timerID)); //keep track of the timer's ID
            }
        },
        submitPauseAlarm: () => {
            return dispatch(pauseAlarm())
        },
        submitResetAlarm: () => {
            return dispatch(resetAlarm())
        },
        submitPlayAlarm: () => {
            return dispatch(playAlarm())
        },
    }
}


/*** React Code */



/** Pomodoro Clock class */
class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
        this.handleClockButtons = this.handleClockButtons.bind(this);
    }

    handleClockButtons(buttonValue) {
        switch (buttonValue) {
            case "incrementSetBreakValue":
                this.props.submitIncrementSetBreakValue();
                break;
            case "decrementSetBreakValue":
                this.props.submitDecrementSetBreakValue();
                break;
            case "incrementSetAlarmValue":
                this.props.submitIncrementSetAlarmValue();
                break;
            case "decrementSetAlarmValue":
                this.props.submitDecrementSetAlarmValue();
                break;
            case "submitStartAlarm":
                this.props.submitStartAlarm(this.props.storeState.isSessionActive);
                break;
            case "submitPauseAlarm":
                clearInterval(this.props.storeState.timerID);
                this.props.submitPauseAlarm();
                break;
            case "submitResetAlarm":
                this.props.submitResetAlarm();
                break;
            case "submitPlayAlarm":
                this.props.submitPlayAlarm();
                break;
            default:
                break;
        }
    }

    render() {
        /** HTML tag constants */
        //HTML line break tag
        const br = React.createElement(
            "br",
            null,
            null
        );

        //HTML audio tag
        const beepAudioElement = React.createElement(
            "audio",
            {
                className: "clip",
                id: "beep",
                src: "http://john-pham.com/freecodecamp/Organic_cloudcity.mp3"
            },
            null
        );

        //Display play alarm button
        const displayPlayAlarmButton = React.createElement(
            "button",
            {
                style: { display: "block" },
                onClick: () => this.handleClockButtons("submitPlayAlarm")
            },
            "Play Alarm"
        );

        //Display start session button
        const displayStartSessionButton = React.createElement(
            "button",
            {
                style: { display: "inline-block" },
                onClick: () => this.handleClockButtons("submitStartAlarm")
            },
            "Start Session Timer"
        );

        //Display pause button
        const displayPauseTimerButton = React.createElement(
            "button",
            {
                style: { display: "inline-block" },
                onClick: () => this.handleClockButtons("submitPauseAlarm")
            },
            "Pause Session Timer"
        );

        //Display reset button
        const displayResetTimerButton = React.createElement(
            "button",
            {
                style: { display: "inline-block" },
                onClick: () => this.handleClockButtons("submitResetAlarm")
            },
            "Reset Session Timer"
        );

        // Display timerID
        const displayTimerID = React.createElement(
            "div",
            null,
            this.props.storeState.timerID
        );

        return (
            React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    {
                        style: {
                            color: "charcoal"
                        }
                    },
                    "Pomodoro Clock"
                ),
                React.createElement(
                    "div",
                    {
                        id: "main"
                    },
                    /** Elements for setting the break length */
                    React.createElement(
                        "span",
                        {
                            id: "break-label"
                        },
                        "Break Length",
                        ": ",
                        React.createElement(
                            "span",
                            {
                                id: "break-length"
                            },
                            this.props.storeState.setBreakMinutes,
                        ),
                        br,
                        React.createElement(
                            "button",
                            {
                                id: "break-increment",
                                onClick: () => this.handleClockButtons("incrementSetBreakValue")
                            },
                            "Increment Break"
                        ),
                        React.createElement(
                            "button",
                            {
                                id: "break-decrement",
                                onClick: () => this.handleClockButtons("decrementSetBreakValue")
                            },
                            "Decrement Break"
                        ),
                    ),
                    /** Elements for setting the session length */
                    React.createElement(
                        "div",
                        {
                            id: "session-label",
                            style: {
                                marginTop: "1em"
                            }
                        },
                        "Session Length",
                        ": ",
                        React.createElement(
                            "span",
                            {
                                id: "session-length"
                            },
                            this.props.storeState.setSessionMinutes,
                        ),
                        br,
                        React.createElement(
                            "button",
                            {
                                id: "session-increment",
                                onClick: () => this.handleClockButtons("incrementSetAlarmValue")
                            },
                            "Increment Session"
                        ),
                        React.createElement(
                            "button",
                            {
                                id: "session-decrement",
                                onClick: () => this.handleClockButtons("decrementSetAlarmValue")
                            },
                            "Decrement Session"
                        ),
                    ),
                    br,
                    /** Elements for displaying the clock value from the Redux state */
                    React.createElement(
                        "div",
                        {},
                        "Remaining Session Time: ",
                        displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingSessionSeconds)).minutes,
                        ":",
                        displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingSessionSeconds)).seconds,
                    ),
                    br,
                    /** Elements for displaying the break value from the Redux state */
                    React.createElement(
                        "div",
                        {
                            style: {
                                display: "block"
                            }
                        },
                        "Remaining Break Time: ",
                        displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingBreakSeconds)).minutes,
                        ":",
                        displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingBreakSeconds)).seconds,
                    ),
                    displayPlayAlarmButton,
                    displayStartSessionButton,
                    displayPauseTimerButton,
                    displayResetTimerButton,
                    displayTimerID,
                ),
                beepAudioElement
            )
        )
    }

}

/** Container */
const Container = connect(mapStateToProps,mapDispatchToProps)(PomodoroClock);

/** AppWrapper */
class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            React.createElement(
                Provider,
                {store: store},
                React.createElement(Container, null, null)
            )
        )
    }
}

/** ReactDOM */
ReactDOM.render(
    React.createElement(AppWrapper),
    document.querySelector("#app")
);

/*** Pomodoro Clock To-do's
[ ] Pomodoro Clock Logic
    [ ] How and where should I check to see if the session variable is equal to zero seconds?
        [ ] Should I check for this in the reducer? If so, in the countdown case?
        [ ] What exactly should happen?
            [ ] The audio needs to be played
            [ ] Which variables need to change?
                [ ] What needs to be done to start the break timer?
                [ ] How can the break timer left be displayed? Can I reuse the same variable, but change it to the break session number of seconds?
                [ ] Can I keep the same setInterval timer?
    [ ] After the break timer is equal to zero seconds, I need to start the session timer
        [ ] Should the audio be played? See FreeCodeCamp instructions
    [ ] What happens after the reset button is pressed?
        [ ] Break length resets to 5
        [ ] Session length resets to 25
        [ ] Active timer variables are set to false
        [ ] Clear the timer interval
[ ] Implement Redux code
    [X] Implement constant variables
        [X] Implement MAX break session value
        [X] Implement MIN break session value
        [X] Implement MAX alarm timer value
        [X] Implement MIN alarm timer value
        [X] Implement reducer function constants
            [X] Break session increment
            [X] Break session decrement
            [X] Alarm timer set value increment
            [X] Alarm timer set value decrement
            [X] Alarm activated
            [X] Active alarm paused
            [X] Reset
    [X] Implement default state object with the following properties
        [X] Break session value ({minutes, seconds} object?)
        [X] Alarm timer set value ({minutes, seconds} object?)
        [X] Is alarm active?
    [X] Implement action creators
        [X] Break session value increment
        [X] Break session value decrement
        [X] Alarm timer set value increment
        [X] Alarm timer set value decrement
        [X] Alarm has been activated
        [X] Active alarm has been paused
        [X] Reset button has been pushed
    [ ] Implement pomodoro timer reducer
        [ ] Break session value increment
            [ ] Does FreeCodeCamp set a max value here?
        [ ] Break session value decrement
            [ ] Check for min value (cannot be less than zero)
        [ ] Alarm timer set value increment
            [ ] Does FreeCodeCamp set a max value here?
        [ ] Alarm timer set value decrement
            [ ] Check for min value (cannot be less than zero)
        [ ] Alarm has been activated
        [ ] Reset button has been pushed
        [X] Active alarm has been paused
        [X] Default state
    [X] Implement helper functions
        [X] Write a function that checks a value, converts it to text, and adds a leading zero if necessary
[X] Implement React-Redux code
    [X] Implement app wrapper
    [X] Map Redux state to React props
    [X] Map Redux dispatchers to React props
[ ] Implement React code template
    [X] Implement constructor
    [X] Implement handleClockButtons method
    [X] Implement break session increment and decrement buttons
    [X] Implement break session display
    [X] Implement set timer increment and decrement buttons
    [X] Implement set timer display
    [ ] Implement active alarm timer
    [ ] Clean up HTML: break up the huge block of createElements into smaller HTML const variables
    [ ] Let the React code handle whether the clock is active or not in local state
        [X] React Redux timer example: https://codesandbox.io/s/vigilant-wildflower-3yvux
    [X] Learn about set interval
    [X] Implement a simple countdown timer using set interval
    [ ] Implement reset timer button
    [ ] Implement button IDs (FreeCodeCamp)
[X] Implement helper function to play audio
    [X] Create playAudio helper function
[ ] Implement images
    [ ] Implement up and down arrow clickable images instead of using buttons
[ ] Implement CSS
    [x] Create pomodoro.css
    [ ] Implement button styles
    [ ] Implement break session, set timer, and active alarm timer display styles
*/