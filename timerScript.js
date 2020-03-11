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
    currentBreakRemaining: {
        minutes: 5,
        seconds: 0
    },
    setTimerMinutes: 25,
    currentTimerRemaining: {
        minutes: 25,
        seconds: 0
    },
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
const playAlarm = () => {
    let alarm = document.getElementById("alarm");
    alarm.play();
}

/** Reducer */
const timerReducer = (state = defaultTimerState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case SETBREAKINCREMENT:
            newState.setBreakMinutes++;
            return newState;
        case SETBREAKDECREMENT:
            newState.setBreakMinutes--;
            return newState;
        case SETALARMINCREMENT:
            newState.setTimerMinutes++;
            return newState;
        case SETALARMDECREMENT:
            newState.setTimerMinutes--;
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
            ": "
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
                    React.createElement(
                        "span",
                        {
                            id: "break-label"
                        },
                        "Break Length",
                        colon,
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
                    React.createElement(
                        "div",
                        {
                            id: "session-label",
                            style: {
                                marginTop: "1em"
                            }
                        },
                        "Session Length",
                        colon,
                        React.createElement(
                            "span",
                            {
                                id: "session-length"
                            },
                            this.props.storeState.setTimerMinutes,
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
[ ] Learn how to implement a timer in vanilla JavaScript
    [ ] Learn about set interval
    [ ] Implement a simple countdown timer using set interval
[X] Implement helper function to play audio
    [X] Create playAudio helper function
[ ] Implement images
    [ ] Implement up and down arrow clickable images instead of using buttons
[ ] Implement CSS
    [x] Create pomodoro.css
    [ ] Implement button styles
    [ ] Implement break session, set timer, and active alarm timer display styles
*/