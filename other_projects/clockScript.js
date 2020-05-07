'use strict';

/*** Redux Code */

/** Constants */
//Redux constants
const { Provider, connect } = ReactRedux;
const { createStore } = Redux;

//Clock constants
const SETBREAKINCREMENT = "SETBREAKINCREMENT";
const SETBREAKDECREMENT = "SETBREAKDECREMENT";
const SETALARMINCREMENT = "SETALARMINCREMENT";
const SETALARMDECREMENT = "SETALARMDECREMENT";
const STARTALARM = "STARTALARM";
const PAUSEALARM = "PAUSEALARM";
const RESETALARM = "RESETALARM";
const PLAYALARM = "PLAYALARM";
const COUNTDOWN = "COUNTDOWN";
const INACTIVE = "INACTIVE"
const SESSION = "SESSION";
const BREAK = "BREAK";

//Default clock state
const defaultClockState = {
    setBreakMinutes: 5,
    setSessionMinutes: 25,
    totalRemainingSeconds: 25 * 60, //use one variable to track total remaining seconds, whether session or break
    status: INACTIVE, //status can be one of three values: INACTIVE, SESSION, or BREAK
    pause: false,
    timerID: 0,
}

/** Action Creators */
const incrementSetBreakValue = () => {
    return { type: SETBREAKINCREMENT };
}

const decrementSetBreakValue = () => {
    return { type: SETBREAKDECREMENT };
}

const incrementSetAlarmValue = () => {
    return { type: SETALARMINCREMENT };
}

const decrementSetAlarmValue = () => {
    return { type: SETALARMDECREMENT };
}

const startAlarm = (timer_ID) => {
    return {
        type: STARTALARM,
        timerID: timer_ID
    };
}

const pauseAlarm = () => {
    return { type: PAUSEALARM };
}

const resetAlarm = () => {
    return { type: RESETALARM };
}

const playAlarm = () => {
    return { type: PLAYALARM };
}

const countdown = () => {
    return { 
        type: COUNTDOWN,
    };
}

/** Helper Functions */
const playAlarmSound = () => {
    let alarm = document.getElementById("beep");
    alarm.play();
}

const pauseAndRewindAlarmSound = () => {
    let alarm = document.getElementById("beep");
    alarm.pause();
    alarm.currentTime = 0;
}

const convertSecondsToTime = (seconds) => {
    let minutesDivisor = seconds % (60 * 60);
    let min = Math.floor(minutesDivisor / 60);

    if (seconds === 3600) {
        min = 60; //Allow 60 minutes to appear as 60:00
    }
    
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
    
    if (timeObject.minutes < 10) {
        timeText.minutes = "0" + timeText.minutes;
    }

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
            if (newState.setBreakMinutes < 60) { //breaks cannot be greater than 60 minutes
                newState.setBreakMinutes++;
            }
            return newState;
        case SETBREAKDECREMENT:
            if (newState.setBreakMinutes > 1) { //breaks cannot be less than 0 minutes
                newState.setBreakMinutes--;
            }
            return newState;
        case SETALARMINCREMENT:
            if (newState.setSessionMinutes < 60) { //sessions cannot be greater than 60 minutes
                newState.setSessionMinutes++;
                if (newState.status === INACTIVE) {
                    newState.totalRemainingSeconds = newState.setSessionMinutes * 60; //total remaining seconds only changes if the timer is inactive
                }
                
            }
            return newState;
        case SETALARMDECREMENT:
            if (newState.setSessionMinutes > 1) { //sessions cannot be less than 0 minutes
                newState.setSessionMinutes--;
                if (newState.status === INACTIVE) {
                    newState.totalRemainingSeconds = newState.setSessionMinutes * 60; //total remaining seconds only changes if the timer is inactive
                }
            }
            return newState;
        case STARTALARM:
            newState.pause = false;
            newState.status = SESSION;
            newState.timerID = action.timerID;
            return newState;
        case PAUSEALARM:
            newState.pause = true;
            return newState;
        case RESETALARM:
            newState = defaultClockState;
            pauseAndRewindAlarmSound();
            return newState;
        case PLAYALARM:
            playAlarmSound();
            return newState;
        case COUNTDOWN:
            switch (newState.status) {
                case INACTIVE: 
                    newState.totalRemainingSeconds--;
                    return newState;
                case SESSION: 
                    if (newState.totalRemainingSeconds === 0) {
                        playAlarmSound();
                        newState.totalRemainingSeconds = newState.setBreakMinutes * 60;
                        newState.status = BREAK;
                    }
                    else {
                        newState.totalRemainingSeconds--;
                    }
                    return newState;
                case BREAK: 
                    if (newState.totalRemainingSeconds === 0) {
                        playAlarmSound();
                        newState.totalRemainingSeconds = newState.setSessionMinutes * 60;
                        newState.status = SESSION;
                    }
                    else {
                        newState.totalRemainingSeconds--;
                    }
                    return newState;
                default:
                    newState.totalRemainingSeconds--;
                    return state;
            }
        default: 
            return state;
    }
}

const store = Redux.createStore(clockReducer);


/*** React-Redux Code */
const mapStateToProps = state => {
    return { storeState: state }
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
            //if (status === INACTIVE) { //dispatch only if there isn't an active session or break
                const timerID = setInterval(() => dispatch(countdown()), 1000); //dispatch countdown every second
                return dispatch(startAlarm(timerID)); //keep track of the timer's ID
            //}
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
            case "submitStartPauseAlarm":
                if (this.props.storeState.status === INACTIVE) { //If there isn't an active session, start one up
                    this.props.submitStartAlarm(); 
                }
                else { //There is an active session
                    if (this.props.storeState.pause) { //if the timer is on pause, start it up again
                        this.props.submitStartAlarm(); 
                    }
                    else { //otherwise, pause it
                        clearInterval(this.props.storeState.timerID);
                        this.props.submitPauseAlarm();
                    }
                }
                break;
            case "submitStartAlarm":
                this.props.submitStartAlarm(this.props.storeState.status);
                break;
            case "submitPauseAlarm":
                clearInterval(this.props.storeState.timerID);
                this.props.submitPauseAlarm();
                break;
            case "submitResetAlarm":
                clearInterval(this.props.storeState.timerID);
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

        //HTML audio tag
        const beepAudioElement = React.createElement(
            "audio",
            {
                id: "beep",
                src: "http://john-pham.com/freecodecamp/Organic_cloudcity.mp3"
            },
            null
        );

        // Display break length text
        const displayBreakLengthText = React.createElement(
            "div",
            { 
                style: { 
                    display: "inline",
                    fontSize: "1.1em",
                } 
            },
            "Break Length",
        )

        // Display break length value
        const displayBreakLengthValue = React.createElement(
            "div",
            {
                id: "break-length",
                style: { 
                    display: "block",
                    fontSize: "1.5em",
                },
            },
            this.props.storeState.setBreakMinutes,
        );

        // Display container for break length text and value
        const displayBreakLength = React.createElement(
            "div",
            { 
                style: { display: "block" }
            },
            displayBreakLengthText,
            displayBreakLengthValue
        );

        const buttonDefaultStyle = {
            display: "inline-block",
            fontSize: "1.1em",
            paddingBottom: "0.5em",
            margin: "auto 0.25em auto 0.25em",
            borderRadius: "8px",
            backgroundColor: "#693220",
            color: "white",
            border: "none",
            textAlign: "center",
            border: "none",
            textDecoration: "none",
            cursor: "pointer"    
        };


        // Display decrement break button
        const displayBreakDecrementButton = React.createElement(
            "button",
            {
                id: "break-decrement",
                style: buttonDefaultStyle,
                onClick: () => this.handleClockButtons("decrementSetBreakValue")
            },
            "\u2193" //down arrow
        );

        // Display increment break button
        const displayBreakIncrementButton = React.createElement(
            "button",
            {
                id: "break-increment",
                style: buttonDefaultStyle,
                onClick: () => this.handleClockButtons("incrementSetBreakValue")
            },
            "\u2191" //up arrow
        );

        // Display container for break elements
        const displayBreakContainer = React.createElement(
            "div",
            {
                id: "break-label",
                style: {
                    display: "inline-block",
                    margin: "1em",
                    padding: "1em",

                }
            },
            displayBreakLength,
            displayBreakIncrementButton,
            displayBreakDecrementButton,
        );

        // Display session length text
        const displaySessionLengthText = React.createElement(
            "div",
            { 
                style: { 
                    display: "inline",
                    fontSize: "1.1em",
                } 
            },
            "Session Length",
        );

        // Display session length
        const displaySessionLengthValue = React.createElement(
            "div",
            {
                id: "session-length",
                style: { 
                    display: "block",
                    fontSize: "1.5em",
                },
            },
            this.props.storeState.setSessionMinutes,
        );

        // Display container for session length text and value
        const displaySessionLength = React.createElement(
            "div",
            { 
                style: { display: "block" }
            },
            displaySessionLengthText,
            displaySessionLengthValue
        );

        // Display session increment button
        const displaySessionIncrementButton = React.createElement(
            "button",
            {
                id: "session-increment",
                style: buttonDefaultStyle,
                onClick: () => this.handleClockButtons("incrementSetAlarmValue")
            },
            "\u2191" //up arrow
        );

        // Display session decrement button
        const displaySessionDecrementButton = React.createElement(
            "button",
            {
                id: "session-decrement",
                style: buttonDefaultStyle,
                onClick: () => this.handleClockButtons("decrementSetAlarmValue")
            },
            "\u2193"
        );

        // Display container for session elements
        const displaySessionContainer = React.createElement(
            "div",
            {
                id: "session-label",
                style: {
                    display: "inline-block",
                    margin: "1em",
                    padding: "1em",
                }
            },
            displaySessionLength,
            displaySessionIncrementButton,
            displaySessionDecrementButton,
        );

        const displayBreakAndSessionContainers = React.createElement(
            "div",
            {
                style: {
                    textAlign: "center"
                }
            },
            displayBreakContainer,
            displaySessionContainer,
        );

        const displayRemainingTimeValueStyle = {
            display: "block",
            fontSize: "1.5em",
        };

        // Display remaining session or break time value
        const displayRemainingTimeValue = React.createElement(
            "span",
            this.props.storeState.totalRemainingSeconds < 60 ? // display red text if less than 60 seconds left
                {
                    id: "time-left",
                    style: { 
                        ...displayRemainingTimeValueStyle,
                        color: "red",
                    },
                }
                :
                {
                    id: "time-left",
                    style: {
                        ...displayRemainingTimeValueStyle
                    },
                },
            displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingSeconds)).minutes +
                ":" +
                displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingSeconds)).seconds 
        )

        // Display remaining session or break time label
        const displayRemainingTime = React.createElement(
            "div",
            {
                id: "timer-label",
                style: { 
                    display: "block",
                    fontSize: "2em",
                }
            },
            this.props.storeState.status === INACTIVE || this.props.storeState.status === SESSION ? //If status is inactive or session, display session as the label
                "Session" : "Break", //Otherwise, display break as the label
            displayRemainingTimeValue
        );

        // Display start/pause button
        const displayStartPauseSessionButton = React.createElement(
            "button",
            {
                id: "start_stop",
                style: { display: "inline-block" },
                onClick: () => this.handleClockButtons("submitStartPauseAlarm")
            },
            "Start/Pause"
        );

        // Display reset button
        const displayResetTimerButton = React.createElement(
            "button",
            {
                id: "reset",
                style: { display: "inline-block" },
                onClick: () => this.handleClockButtons("submitResetAlarm")
            },
            "Reset"
        );

        // Div that displays the start, pause, and reset buttons
        const displayStartPauseAndResetButtons = React.createElement(
            "div",
            {
                style: { marginTop: "0em" }
            },
            displayStartPauseSessionButton,
            displayResetTimerButton
        );

        // Div that displays clock elements: time left, start/pause, and reset buttons
        const displayClockElements = React.createElement(
            "div",
            {
                style: {
                    display: "block",
                    width: "164px",
                    margin: "1em",
                    padding: "1em",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderRadius: "1em",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
            }
            },
            displayRemainingTime,
            displayStartPauseAndResetButtons,
        );

        return (
            React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    {
                        id: "main"
                    },
                    displayBreakAndSessionContainers,
                    displayClockElements,
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