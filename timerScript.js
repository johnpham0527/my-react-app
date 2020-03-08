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
const SETALARMINCREMENT = "SETALARMINCREMENT";
const SETALARMDECREMENT = "SETALARMDECREMENT";
const STARTALARM = "STARTALARM";
const PAUSEALARM = "PAUSEALARM";
const RESETALARM = "RESETALARM";
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


/** Helper Functions */


/** Reducer */
const timerReducer = (state = defaultTimerState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case SETBREAKINCREMENT:
            return newState;
        case SETBREAKDECREMENT:
            return newState;
        case SETALARMINCREMENT:
            return newState;
        case SETALARMDECREMENT:
            return newState;
        case STARTALARM:
            return newState;
        case PAUSEALARM:
            return newState;
        case RESETALARM:
            return newState;
        default: 
            return state;
    }
}

const store = Redux.createStore(timerReducer);


/*** React-Redux Code */
const mapStateToProps = state => {
    return {
        storeState: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitIncrementSetBreakValue: () => {
            return dispatch(incrementSetBreakValue)
        },
        submitDecrementSetBreakValue: () => {
            return dispatch(decrementSetBreakValue)
        },
        submitIncrementSetAlarmValue: () => {
            return dispatch(incrementSetAlarmValue)
        },
        submitDecrementSetAlarmValue: () => {
            return dispatch(decrementSetAlarmValue)
        },
        submitStartAlarm: () => {
            return dispatch(startAlarm)
        },
        submitPauseAlarm: () => {
            return dispatch(pauseAlarm)
        },
        submitResetAlarm: () => {
            return dispatch(resetAlarm)
        },
    }
}


/*** React Code */

/** HTML tag constants */
const br = React.createElement(
    "br",
    null,
    null
);

/** Pomodoro Clock class */
class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
        this.handleClockButtons = this.handleClockButtons.bind(this);
    }

    handleClockButtons(buttonValue) {
        switch (buttonValue) {
            case "incrementSetBreakValue":
                this.props.submitIncrementSetAlarmValue;
                break;
            case "decrementSetBreakValue":
                this.props.submitDecrementSetBreakValue;
                break;
            case "incrementSetAlarmValue":
                this.props.submitIncrementSetAlarmValue;
                break;
            case "decrementSetAlarmValue":
                this.props.submitDecrementSetAlarmValue;
                break;
            case "submitStartAlarm":
                this.props.submitStartAlarm;
                break;
            case "submitPauseAlarm":
                this.props.submitPauseAlarm;
                break;
            case "submitResetAlarm":
                this.props.submitResetAlarm;
            default:
                return -1;
        }
    }

    render() {
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
                        id: "pomodoroclock"
                    },
                    React.createElement(
                        "div",
                        {
                            id: "break-label"
                        },
                        "Break Length"
                    )
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
[X] Implement React-Redux code
    [X] Implement app wrapper
    [X] Map Redux state to React props
    [X] Map Redux dispatchers to React props
[ ] Implement React code template
    [X] Implement constructor
    [X] Implement handleClockButtons method
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