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

const startAlarm = () => {
    return {
        type: STARTALARM
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
            newState.isClockActive = true;
            return newState;
        case PAUSEALARM:
            newState.isClockActive = false;
            return newState;
        case RESETALARM:
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
        submitStartAlarm: () => {
            return dispatch(startAlarm())
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
                this.props.submitStartAlarm();
                break;
            case "submitPauseAlarm":
                this.props.submitPauseAlarm();
                break;
            case "submitResetAlarm":
                this.props.submitResetAlarm();
            case "submitPlayAlarm":
                this.props.submitPlayAlarm();
            default:
                return -1;
        }
    }

    render() {
        /** HTML tag constants */
        const br = React.createElement(
            "br",
            null,
            null
        );

        const colon = React.createElement(
            "span",
            null,
            ":"
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
                        colon, " ",
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
                        colon, " ",
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
                        "Remaining Session Time",
                        colon,
                        " ",
                        displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingSessionSeconds)).minutes,
                        colon,
                        displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingSessionSeconds)).seconds,
                    ),
                    br,
                    /** Elements for displaying the break value from the Redux state */
                    React.createElement(
                        "div",
                        {},
                        "Remaining Break Time",
                        colon,
                        " ",
                        displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingBreakSeconds)).minutes,
                        colon,
                        displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingBreakSeconds)).seconds,
                    ),
                    br,
                    /** Play alarm button */
                    /*
                    React.createElement(
                        "button",
                        {
                            onClick: () => this.handleClockButtons("submitPlayAlarm")
                        },
                        "Play Alarm"
                    ),
                    br,
                    */
                    /** Start session timer */
                    React.createElement(
                        "button",
                        {
                            onClick: () => this.handleClockButtons("submitStartAlarm")
                        },
                        "Start Session Timer"
                    ),
                    /** Pause session timer */
                    React.createElement(
                        "button",
                        {
                            onClick: () => this.handleClockButtons("submitPauseAlarm")
                        },
                        "Pause Session Timer"
                    )
                ),
                React.createElement(
                    "audio",
                    {
                        className: "clip",
                        id: "beep",
                        src: "http://john-pham.com/freecodecamp/Organic_cloudcity.mp3"
                    },
                    null
                )
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
[ ] Implement Redux code
    [ ] Implement constant variables
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
    [ ] Implement default state object with the following properties
        [X] Break session value ({minutes, seconds} object?)
        [X] Alarm timer set value ({minutes, seconds} object?)
        [X] Is alarm active?
        [ ] (Should the audio file be triggered?)
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
        [ ] Active alarm has been paused
        [ ] Reset button has been pushed
        [X] Default state
    [ ] Implement helper functions
        [ ] (Convert seconds to {minutes, seconds} object?)
        [ ] (Convert {minutes, seconds} object to seconds?)
        [ ] Write a function that checks a value, converts it to text, and adds a leading zero if necessary
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
        [ ] The reducer should be a pure function with no side effects
        [ ] If timer is active, there should be a way to call, within React, the set interval function with a function that counts down one second
        [ ] Consider creating a component that is rendered only when the boolean local state is set to true by Start.
        [ ] Consider creating a component that is rendered when the boolean local state is set to false by Pause or Reset.
        [ ] Read this carefully, particularly on how to handle the store: https://stackoverflow.com/questions/39562317/react-js-redux-setinterval-and-clearinterval-in-reducers
        [ ] Research on Google: https://www.google.com/search?client=firefox-b-1-d&q=how+to+use+set+interval+in+redux
        [ ] This seems like the solution: https://codesandbox.io/s/vigilant-wildflower-3yvux. Look at mapDispatchToProps
        [ ] Learn how to implement a timer in vanilla JavaScript
    [ ] Learn about set interval
    [ ] Implement a simple countdown timer using set interval
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