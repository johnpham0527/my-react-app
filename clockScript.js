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

//Default clock state
const defaultClockState = {
    setBreakMinutes: 5,
    totalRemainingBreakSeconds: 5 * 60,
    setSessionMinutes: 25,
    totalRemainingSessionSeconds: 25 * 60,
    isSessionActive: false,
    isBreakActive: false,
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
    return { type: COUNTDOWN };
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
                newState.totalRemainingBreakSeconds = newState.setBreakMinutes * 60;
            }
            return newState;
        case SETBREAKDECREMENT:
            if (newState.setBreakMinutes > 1) { //breaks cannot be less than 0 minutes
                newState.setBreakMinutes--;
                newState.totalRemainingBreakSeconds = newState.setBreakMinutes * 60;
            }
            return newState;
        case SETALARMINCREMENT:
            if (newState.setSessionMinutes < 60) { //sessions cannot be greater than 60 minutes
                newState.setSessionMinutes++;
                newState.totalRemainingSessionSeconds = newState.setSessionMinutes * 60;
            }
            return newState;
        case SETALARMDECREMENT:
            if (newState.setSessionMinutes > 1) { //sessions cannot be less than 0 minutes
                newState.setSessionMinutes--;
                newState.totalRemainingSessionSeconds = newState.setSessionMinutes * 60;
            }
            return newState;
        case STARTALARM:
            newState.isSessionActive = true;
            newState.timerID = action.timerID;
            return newState;
        case PAUSEALARM:
            newState.isSessionActive = false;
            return newState;
        case RESETALARM:
            newState = defaultClockState;
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
            case "submitStartPauseAlarm":
                if (this.props.storeState.isSessionActive === true) { //If there is an active session, clear the interval
                    clearInterval(this.props.storeState.timerID);
                    this.props.submitPauseAlarm();
                }
                else {
                    this.props.submitStartAlarm(this.props.storeState.isSessionActive);
                }
                break;
            case "submitStartAlarm":
                this.props.submitStartAlarm(this.props.storeState.isSessionActive);
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
                id: "beep",
                src: "http://john-pham.com/freecodecamp/Organic_cloudcity.mp3"
            },
            null
        );

        //Display h1 header
        const displayPomodoroClockHeader = React.createElement(
            "h1",
            {
                style: { color: "charcoal" }
            },
            "Pomodoro Clock"
        );

        // Display play alarm button
        const displayPlayAlarmButton = React.createElement(
            "button",
            {
                style: { 
                    marginTop: "1em",
                    display: "block" 
                },
                onClick: () => this.handleClockButtons("submitPlayAlarm")
            },
            "Play Alarm"
        );

        // Display session length text
        const displaySessionLengthText = React.createElement(
            "div",
            { 
                style: { display: "inline" } 
            },
            "Session Length: ",
        );

        // Display session length
        const displaySessionLengthValue = React.createElement(
            "div",
            {
                style: { display: "inline" },
                id: "session-length"
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
                style: { display: "inline-block" },
                id: "session-increment",
                onClick: () => this.handleClockButtons("incrementSetAlarmValue")
            },
            "Increment Session"
        );

        // Display session decrement button
        const displaySessionDecrementButton = React.createElement(
            "button",
            {
                id: "session-decrement",
                onClick: () => this.handleClockButtons("decrementSetAlarmValue")
            },
            "Decrement Session"
        );

        // Display container for session elements
        const displaySessionContainer = React.createElement(
            "div",
            {
                id: "session-label",
                style: {
                    marginTop: "1em"
                }
            },
            displaySessionLength,
            displaySessionIncrementButton,
            displaySessionDecrementButton,
        );

        // Display remaining session time */
        const displayRemainingSessionTime = React.createElement(
            "div",
            {
                style: {
                    marginTop: "1em",
                    display: "block"
                }
            },
            "Remaining Session Time: ",
            displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingSessionSeconds)).minutes,
            ":",
            displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingSessionSeconds)).seconds,
        );

        // Display remaining break time
        const displayRemainingBreakTime = React.createElement(
            "div",
            {
                style: {
                    marginTop: "1em",
                    display: "block"
                }
            },
            "Remaining Break Time: ",
            displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingBreakSeconds)).minutes,
            ":",
            displayTimeText(convertSecondsToTime(this.props.storeState.totalRemainingBreakSeconds)).seconds,
        );

        // Display remaining session or break time label
        const displayRemainingTimeLabel = React.createElement(
            "div",
            {
                id: "timer-label",
                style: {

                }
            },
            "Remaining Time: "
        );

        // Display remaining session or break time value
        const displayRemainingTimeValue = React.createElement(
            "div",
            {
                id: "timer-left",
                style: {}
            },
            this.props.storeState.isBreakActive ?
            "Break is active" :
            "Session is active",
        )

        // Display remaining time container
        const displayRemainingTimeContainer = React.createElement(
            "div",
            {
                style: {
                    marginTop: "1em",
                    display: "block"
                }
            },
            displayRemainingTimeLabel,
            displayRemainingTimeValue
        )
        

        //Display start/pause button
        const displayStartPauseSessionButton = React.createElement(
            "button",
            {
                id: "start_stop",
                style: { display: "inline-block" },
                onClick: () => this.handleClockButtons("submitStartPauseAlarm")
            },
            "Start/Pause Session Timer"
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
                id: "reset",
                style: { display: "inline-block" },
                onClick: () => this.handleClockButtons("submitResetAlarm")
            },
            "Reset Session Timer"
        );

        //Div that displays the start, pause, and reset buttons
        const displayStartPauseAndResetButtons = React.createElement(
            "div",
            {
                style: { marginTop: "1em" }
            },
            displayStartPauseSessionButton,
            //displayStartSessionButton,
            //displayPauseTimerButton,
            displayResetTimerButton
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
                displayPomodoroClockHeader,
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
                    displaySessionContainer,
                    displayRemainingSessionTime,
                    displayRemainingBreakTime,
                    displayRemainingTimeContainer,
                    //displayPlayAlarmButton,
                    displayStartPauseAndResetButtons,
                    //displayTimerID,
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
    [ ] Either remaining session time or remaining break time should be displayed, but not both at the same time
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
    [X] What happens after the reset button is pressed?
        [X] Break length resets to 5
        [X] Session length resets to 25
        [X] Active timer variables are set to false
        [X] Clear the timer interval
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
        [X] Break session value increment
            [X] Does FreeCodeCamp set a max value here?
        [X] Break session value decrement
            [X] Check for min value (cannot be less than zero)
        [X] Alarm timer set value increment
            [X] Does FreeCodeCamp set a max value here?
        [X] Alarm timer set value decrement
            [X] Check for min value (cannot be less than zero)
        [X] Reset button has been implemented
        [ ] Activate alarm when timer reaches 00:00
        [ ] Implement start and stop as one button
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
    [X] Implement reset timer button
    [ ] Implement button IDs (FreeCodeCamp)
[X] Implement helper function to play audio
    [X] Create playAudio helper function
[ ] Implement images
    [ ] Implement up and down arrow clickable images instead of using buttons
[ ] Implement CSS
    [x] Create pomodoro.css
    [ ] Implement button styles
    [ ] Implement break session, set timer, and active alarm timer display styles
[ ] Add comments in my code so that readers can understand what is going on
*/