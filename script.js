'use strict';

//Redux Code
const { Provider, connect } = ReactRedux;
const { createStore } = Redux;

//JavaScript calculator
const ADD = "ADD";
const SUBTRACT = "SUBTRACT";
const MULTIPLY = "MULTIPLY";
const DIVIDE = "DIVIDE";
const EQUAL = "EQUAL";
const DIGIT = "DIGIT";
const DECIMAL = "DECIMAL";
const PLUSMINUS = "PLUSMINUS";
const CE = "CE";
const CLEARALL = "CLEARALL";
const DEL = "DEL";

const defaultCalcState = {
    queue: [],
    result: 0,
    display: "0",
    operatorPressed: false,
    isNegative: false,
}

const add = () => {
    return {
        type: ADD,
    }
}

const subtract = () => {
    return {
        type: SUBTRACT,
    }
}

const multiply = () => {
    return {
        type: MULTIPLY,
    }
}

const divide = () => {
    return {
        type: DIVIDE,
    }
}

const equal = () => {
    return {
        type: EQUAL,
    }
}

const digit = (number) => {
    return {
        type: DIGIT,
        num: number
    }
}

const decimal = () => {
    return {
        type: DECIMAL,
    }
}

const plusminus = () => {
    return {
        type: PLUSMINUS
    }
}

const ce = () => {
    return {
        type: CE
    }
}

const clearall = () => {
    return {
        type: CLEARALL
    }
}

const del = () => {
    return {
        type: DEL
    }
}

const evaluate = (leftHand, operator, rightHand) => {
    switch (operator) {
        case ADD:
            return leftHand + rightHand;
        case SUBTRACT:
            return leftHand - rightHand;
        case MULTIPLY:
            return leftHand * rightHand;
        case DIVIDE:
            return leftHand / rightHand;
        default:
            return -1;
   } 
} 

const isDigit = (char) => {
    switch (char) {
        case ONE:
        case TWO: 
        case THREE: 
        case FOUR: 
        case FIVE: 
        case SIX: 
        case SEVEN: 
        case EIGHT: 
        case NINE: 
        case ZERO: 
            return true;
        default:
            return false;
    } 
}

const isOperator = (char) => {
  switch (char) {
    case ADD:
    case SUBTRACT:
    case MULTIPLY: 
    case DIVIDE:
      return true;
    default:
      return false;
  } 
}

const hasDecimal = (numString) => {
    for (let i = 0; i < numString.length; i++) {
        if (numString[i] === '.') {
            return true;
        }
    }
    return false;
}

const hasNegative = (numString) => {
    return numString[0] === '-';
}

const calcReducer = (state = defaultCalcState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case DIGIT:
            if (newState.operatorPressed === true) {
                newState.operatorPressed = false;
                newState.display = "0";
            }
            if (newState.display == "0.") {
                newState.display = newState.display + action.num;
                if (newState.isNegative) {
                    newState.display = -1 * parseFloat(newState.display,10);
                }
                return newState;
            }
            else if (newState.display == 0) {
                if (action.num == 0) {
                    return newState;
                }
                else {
                    newState.display = action.num;
                    if (newState.isNegative) {
                        newState.display = -1 * parseFloat(newState.display,10);
                    }
                    return newState;
                }
            }
            else {
                newState.display = newState.display + action.num;
                return newState;
            }
        case ADD:
        case SUBTRACT:
        case MULTIPLY:
        case DIVIDE:
            newState.isNegative = false; //reset the plus/minus sign to positive
            if (newState.queue.length === 0) {
                newState.queue.push(newState.display);
                newState.queue.push(action.type);
                newState.operatorPressed = true;
            }
            else if (newState.operatorPressed === false) {
                newState.queue.push(newState.display);
                newState.queue.push(action.type);
                newState.operatorPressed = true;
            }
            else if (action.type == SUBTRACT) { //instead of replacing previously pushed operator, change the plus/minus sign
                newState.isNegative = !newState.isNegative; //reverse true to false, or false to true
                return newState;
            }
            else { //replace previously pushed operator with this new operator
                newState.queue.pop();
                newState.queue.push(action.type);
            }
            return newState;
        case EQUAL:
            if (newState.queue.length === 0) { //empty queue, a number may be displayed, and equal button pressed
                newState.result = newState.display;
                newState.operatorPressed = true;
                return newState;
            }
            else if (newState.operatorPressed === true) { //equal operator pressed immediately after another operator
                newState.queue.pop();
                newState.result = newState.display;
                newState.queue = [];
                return newState;
            }
            
            newState.queue.push(newState.display); //add the last displayed number into the queue

            let leftHand = parseFloat(newState.queue.shift(),10);
            let operator = newState.queue.shift();
            let rightHand = parseFloat(newState.queue.shift(),10);
            let result = evaluate(leftHand, operator, rightHand) //evaluate the result
            result = Math.round(result * 1e8) / 1e8; //max decimal places: 8
            newState.queue.unshift(result); //add result back into the front of the queue
            
            while (newState.queue.length >= 3) { //process the rest of the queue
                leftHand = parseFloat(newState.queue.shift(),10);
                operator = newState.queue.shift();
                rightHand = parseFloat(newState.queue.shift(),10);
                result = evaluate(leftHand, operator, rightHand);
                result = Math.round(result * 1e8) / 1e8; //max decimal places: 8
                newState.queue.unshift(result);
            }
            
            newState.result = result;
            newState.display = String(result);
            newState.queue = [];
            newState.operatorPressed = true;
            return newState;

        case DECIMAL:
            if (newState.operatorPressed === true) { //this handles the case where a decimal is placed immediately after an operator
                newState.operatorPressed = false;
                newState.display = "0";
            }
            if (!hasDecimal(newState.display)) { // check if display variable already has a decimal
                newState.display = newState.display + '.';
            }
            return newState;
        case DEL:
            newState.display = newState.display.substring(0, newState.display.length-1);
            if (newState.display.length == 0) {
                newState.display = "0";
            }
            return newState;
        case CLEARALL:
            newState.queue = [];
            newState.display = "0";
            newState.result = 0;
            newState.operatorPressed = false;
            return newState;
        case CE:
            newState.display = "0";
            return newState; 
        case PLUSMINUS:
            newState.isNegative = !newState.isNegative; //reverse true to false, or false to true
            if (newState.display != 0) { //don't multiply 0 by -1, or else a bug is introduced
                newState.display = -1 * parseFloat(newState.display,10);
            }
            return newState;
         default:
            return state;
    }
}
  
//const store = Redux.createStore(countReducer);
const store = Redux.createStore(calcReducer);

//React Redux Code
const mapStateToProps = state => {
    return {
        storeState: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitIncrement: () => {
            return dispatch(incrementCount())
        },
        submitDecrement: () => {
            return dispatch(decrementCount())
        },
        submitReset: () => {
            return dispatch(resetCount())
        },
        submitAdd: () => {
            return dispatch(add())
        },
        submitSubtract: () => {
            return dispatch(subtract())
        },
        submitMultiply: () => {
            return dispatch(multiply())
        },
        submitDivide: () => {
            return dispatch(divide())
        },
        submitEqual: () => {
            return dispatch(equal())
        },
        submitDigit: (number) => {
            return dispatch(digit(number))
        },
        submitDecimal: () => {
            return dispatch(decimal())
        },
        submitPlusMinus: () => {
            return dispatch(plusminus())
        },
        submitClearAll: () => {
            return dispatch(clearall())
        },
        submitCE: () => {
            return dispatch(ce())
        },
        submitDel: () => {
            return dispatch(del())
        }
    }
}


//React Code
const br = React.createElement(
    "br",
    null,
    null
);

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleCalcButton = this.handleCalcButton.bind(this);
    }

    handleCalcButton(buttonValue) {
        switch (buttonValue) {
            case "Del":
                this.props.submitDel();
                break;
            case "CE":
                this.props.submitCE();
                break;
            case "plusMinus":
                this.props.submitPlusMinus();
                break;
            case "add":
               this.props.submitAdd();
                break;
            case "subtract":
                this.props.submitSubtract();
                break;
            case "multiply":
                this.props.submitMultiply();
                break;
            case "divide":
                this.props.submitDivide();
                break;
            case "equal":
                this.props.submitEqual();
                break;
            case "decimal":
                this.props.submitDecimal();
                break;
            case "clearAll":
                this.props.submitClearAll();
                break;
            default: //the default case is a digit
                this.props.submitDigit(buttonValue);
        }
    }


    render() {
        return(
            React.createElement(
                "div",
                null,
                React.createElement("h1", {style: {color: "charcoal"}}, "Calculator"),
                React.createElement(
                    "div",
                    {
                        id: "main",
                        style: {
                        border: "1px solid black",
                        width: "160px",
                        padding: "10px",
                        borderRadius: "10px",
                        backgroundColor: "#dddddd",
                        boxShadow: "2px 2px #888888"
                        }
                    },
                    React.createElement(
                        "div",
                        {
                            id: "display",
                            style: {
                                border: "1px solid black",
                                width: "135px",
                                padding: "10px",
                                textAlign: "right",
                                marginTop: "5px",
                                marginBottom: "-10px", 
                                backgroundColor: "#eeeeee"
                            }
                        },
                        this.props.storeState.display
                    ),
                    br,
                    React.createElement(
                        "button",
                        {
                            style: {
                                width: "35px",
                                marginRight: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center",
                            },
                            onClick: () => this.handleCalcButton("CE")
                        },
                        "CE"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "clear",
                            style: 
                            {
                                width: "35px",
                                marginRight: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("clearAll")
                        },
                        "C"
                    ),
                    React.createElement(
                        "button",
                        {style: 
                            {
                                width: "35px",
                                marginRight: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("Del")
                        },
                        "Del"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "divide",
                            style: 
                            {
                                width: "35px",
                                marginRight: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("divide")
                        },
                        "/"
                    ),
                    br,
                    React.createElement(
                        "button",
                        {
                            id: "seven",
                            style: 
                            {
                                width: "35px",
                                marginRight: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("7")
                        },
                        "7"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "eight",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "0px",
                                marginRight: "0px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("8")
                        },
                        "8"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "nine",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("9")
                        },
                        "9",
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "multiply",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("multiply")
                        },
                        "*"
                    ),
                    br,
                    React.createElement(
                        "button",
                        {
                            id: "four",
                            style: 
                            {
                                width: "35px",
                                marginRight: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("4")
                        },
                        "4"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "five",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "0px",
                                marginRight: "0px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("5")
                        },
                        "5"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "six",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("6")
                        },
                        "6"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "subtract",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("subtract")
                        },
                        "-"
                    ),
                    br,
                    React.createElement(
                        "button",
                        {
                            id: "one",
                            style: 
                            {
                                width: "35px",
                                marginRight: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("1")
                        },
                        "1"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "two",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "0px",
                                marginRight: "0px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("2")
                        },
                        "2"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "three",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("3")
                        },
                        "3"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "add",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("add")
                        },
                        "+"
                    ),
                    br,
                    React.createElement(
                        "button",
                        {style: 
                            {
                                width: "35px",
                                marginRight: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("plusMinus")
                        },
                        "+|-"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "zero",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "0px",
                                marginTop: "5px",
                                marginRight: "0px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("0")
                        },
                        "0"
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "decimal",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("decimal")
                        },
                        "."
                    ),
                    React.createElement(
                        "button",
                        {
                            id: "equals",
                            style: 
                            {
                                width: "35px",
                                marginLeft: "5px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                backgroundColor: "#eeeeee",
                                padding: "10px",
                                textAlign: "center"
                            },
                            onClick: () => this.handleCalcButton("equal")
                        },
                        "="
                    ),
                    br,
                    /*
                    //Delete this code after exploring how to use the debugger:
                    
                    React.createElement(
                        "div",
                        {},
                        this.props.storeState.queue
                    ),
                    br,
                    React.createElement(
                        "div",
                        {},
                        "Result: ",
                        this.props.storeState.result
                    ),
                    br,
                    React.createElement(
                        "div",
                        {},
                        "Display: ",
                        this.props.storeState.display
                    ),
                    br,
                    React.createElement(
                        "div",
                        {},
                        "Queue Length: ",
                        this.props.storeState.queue.length
                    ),
                    */
                )
            )
        )
    }
}

const Container = connect(mapStateToProps,mapDispatchToProps)(MyComponent);

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

ReactDOM.render(
    React.createElement(AppWrapper),
    document.querySelector("#app")
)

/*
JavaScript calculator to-do list:
[~] Debug this situation: 5 * - 5 should equal -25. 
[ ] Practice using the browser to debug using console.log
    [ ] Practice using breakpoints
*/
