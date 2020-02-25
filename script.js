'use strict';

//Redux Code
const { Provider, connect } = ReactRedux;
//const { applyMiddleware, createStore, combineReducers, bindActionCreators} = Redux;
const { createStore, combineReducers } = Redux;
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

const defaultState = {
    count: 0,
}

const incrementCount = () => {
    return {
        type: INCREMENT
    }
}

const decrementCount = () => {
    return {
        type: DECREMENT
    }
}

const resetCount = () => {
    return {
        type: RESET
    }
}

const countReducer = (state = defaultState, action) => {
    const newState = Object.assign({},state)
    switch (action.type) {
        case INCREMENT:
            newState.count++;
            return newState;
        case DECREMENT:
            newState.count--;
            return newState;
        case RESET:
            newState.count = 0;
            return newState;
        default:
            return state;
    }
}

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
            return leftHand - rightHand;
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
    return numString[numString.length-1] === '.';
}

const hasNegative = (numString) => {
    return numString[0] === '-';
}

const numObjectHelper = (numString) => {
    let numObject = {left:"", decimal:"", right:""};
    let foundDecimal = false;
    for (let i = 0; i < numString.length; i++) {
        if (foundDecimal === false) {
            if (numString[i] === '.') {
                numObject.decimal = ".";
                foundDecimal = true;
            }
            else {
                numObject.left = numObject.left + numString[i];
            }
        }
        else {
            numObject.right = numObject.right + numString[i];
        }
    }
    return numObject;
}

const roundNumber = (numString) => {
    let digitsBeforeDecimal = '';
    let digitsAfterDecimal = '';
    for (let i = 0; i < numString.length; i++) {
        if (numString[i] === '.') {
            //check to see if the decimal isn't the last character
            //slice the digits before the decimal and store into digitsBeforeDecimal
            //slice the digits after the decimal and store into digitsAfterDecimal
            //cut off any digits (i.e. round) after the 8th digit in digitsAfterDecimal
            //concatenate digitsBeforeDecimal and digitsAfterDecimal in a new numString
            //return this new numString
        }
    }
}

const numDecimalPlacesToRound = (listOfNumStrings) => {
    //given a list of number strings, return the highest number of decimal places to round
    let maxDecimalRounding = 0;
    for (let i = 0; i < listOfNumStrings.length; i++) {
        let numObj = numObjectHelper(listOfNumStrings[i]);
        let numObjRounding = numDecimalPlaces(numObj);
        if (numObjRounding > maxDecimalRounding) {
            maxDecimalRounding = numObjRounding;
        }
    }
    return maxDecimalRounding;
}

const numDecimalPlaces = (numObject) => {
    //given a numObject, return the number of decimal places
    return numObject.right.length;
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
                return newState;
            }
            else if (newState.display == 0) {
                if (action.num == 0) {
                    return newState;
                }
                else {
                    newState.display = action.num;
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
            else { //replace previously pushed operator with this new operator
                newState.queue.pop();
                newState.queue.push(action.type);
            }
            return newState;
        case EQUAL:
            newState.queue.push(newState.display); //add the last displayed number into the queue

            

            let leftHand = parseFloat(newState.queue.shift(),10);
            let operator = newState.queue.shift();
            let rightHand = parseFloat(newState.queue.shift(),10);
            let result = evaluate(leftHand, operator, rightHand) //evaluate the result
            newState.queue.unshift(result); //add result back into the front of the queue
            
            while (newState.queue.length >= 3) { //process the rest of the queue
                leftHand = parseFloat(newState.queue.shift(),10);
                operator = newState.queue.shift();
                rightHand = parseFloat(newState.queue.shift(),10);
                result = evaluate(leftHand, operator, rightHand)
                newState.queue.unshift(result);
            }
            
            newState.result = result;
            newState.display = result;
            newState.queue = [];
            newState.operatorPressed = true;
            return newState;

        case DECIMAL:
            if (!hasDecimal(newState.display)) { // check if display variable already has a decimal
                newState.display = newState.display + '.';
            }
            return newState;
        case DEL:
            newState.display = newState.display.substring(0, newState.display.length-1);
            if (newState.display.length == 0) {
                newState.display = 0;
            }
            return newState;
        case CLEARALL:
            newState.queue = [];
            newState.display = 0;
            newState.result = 0;
            return newState;
        case CE:
            newState.display = 0;
            return newState; 
        case PLUSMINUS:
            newState.display = -1 * parseFloat(newState.display,10);
            return newState;
         default:
            return state;
    }
}

const rootReducer = Redux.combineReducers({
    //I will need to debug rootReducer. Creating a Redux store with the rootReducer produces an unknown error"
    count: countReducer,
    calc: calcReducer
});
  
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

function Button(props) {
    return React.createElement(
        "button",
        {
            onClick: props.handleClick
        },
        props.name
    )
}

const DisplayCounter = (props) => {
    return React.createElement(
        "div",
        null,
        "Count: ",
        props.counter.count
    )
}

let MyName = function MyName(props) {
    return React.createElement(
        "div",
        null,
        "Hello ",
        props.name
    );
};

const listElement = function listElement(props) {
    return props.list.map((element) => React.createElement("li",null,element));
}

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            list: [],
            printText: "",
            calcString: "0"
        };
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleCalcButton = this.handleCalcButton.bind(this);
    }

    handleIncrement(event) {
       event.preventDefault();
       this.props.submitIncrement();
    };

    handleDecrement(event) {
       event.preventDefault();
       this.props.submitDecrement();
    };

    handleReset(event) {
        event.preventDefault();
        this.props.submitReset();
    };

    handleInputChange(event) {
        this.setState({
            input: event.target.value
        })
    };

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

    handleFormSubmit(event) {
        event.preventDefault();
        let newList = this.state.list.slice();
        newList.push(this.state.input);
        let newPrintText = newList.join(", ");
        this.setState({
            list: newList,
            printText: newPrintText,
            input: "",
        })
    };

    render() {
        return(
            React.createElement(
                "div",
                null,
                React.createElement("h1", {style: {color: "blue"}}, "Calculator"),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        {
                            style: {
                                border: "1px solid black",
                                width: "135px",
                                padding: "10px",
                                textAlign: "right",
                                marginTop: "10px",
                                marginBottom: "-10px"
                            }
                        },
                        this.props.storeState.display
                    ),
                    br,
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
                            onClick: () => this.handleCalcButton("CE")
                        },
                        "CE"
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
                        {style: 
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
                        {style: 
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
                        {style: 
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
                        {style: 
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
                        {style: 
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
                )
            )
        )
    }
}


class Badge extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            React.createElement(
                "div",
                null,
                this.props.name
            )
        )
    }
}

class BadgeList extends React.Component {
    render() {
        return React.createElement(
            "div",
            {style: {color: "green"}},
            React.createElement(Badge, { name: "Bill" }, null),
            React.createElement(Badge, { name: "Tom" }, null)
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

//I should implement Redux middleware in order to practice async programming
//I should practice implementing React Redux code that handles the input via the Redux store
//Implement multiple reducers
//I should practice implementing a simple calculator using React Redux
//I should practice styling buttons using a CSS stylesheet for this React code

/*
JavaScript calculator to-do list:
[X] I'll create buttons for each of the 10 digits.
[X] I'll add and style a display
[X] The local React state will store each digit as the button is pressed into a string.
[X] Once an operator (such as the plus sign) is pressed, the local string will be tranferred to a Redux queue along with the operator.
[X] Once the equal button is pressed, the Redux queue operands and operators will be evaluated.
[X] Implement subtract, multiply and divide cases for handleCalcButton
[X] Display the result onto the calculator after the equal button is pressed
[X] Debug decimal: account for the default case where decimal is pressed immediately before any other digit has been entered
    [X] Debug decimal code: decimal 2 + 3 doesn't equal 3.2
[ ] Implement divs and classes for the calculator buttons
[X] Implement a feature where if the user presses two operators in a row, the second operator supercedes the prior operator
[X] Debug the calc; I have spotted errors with the queue. NOTE: I should get rid of local state and let Redux handle all state variables.
[X] Properly handle plus/minus when the default display is zero
[~] Do not allow for there to be a leading zero in any whole number
[ ] There are "rounding" errors associated with how JavaScript handles decimals. Need to fix this.
    [ ] To fix this, I need to keep track of how many decimal places there are and use the toFixed(n) function
    [ ] Debug this situation: .333 * 9 = 2.9970000000000...
[ ] Implement plus/minus properly for the default case. Zero can't be negative, but what if user wants to input -0.3?
[ ] After equal button is pressed, if user presses an operator, the operand continues chaining. If user presses a digit or decimal, reset the chain and build a new operand
[ ] Re-implement everything to avoid using calcString local state
    [X] Re-implement the divide button
    [X] Re-implement the equal button code to test what I currently have
    [X] Insert code to "overwrite" operands and not allow two consecutive operands to be pushed into the queue
    [X] Perform error checks for calcReducer decimal case 
    [ ] Debug equal operator code to handle cases such as where the equal operator is pressed immediately after another operator has entered the queue
        - In these situations, I will need to remove the last operator before doing the calculation
    [~] Debug decimal code: rounding errors
    [X] Implement CE (clear display)
    [X] Implement C (clear queue, result, and display)
    [X] Implement Plus-Minus
    [X] Debug this situation: 8*9= ... +3 = ... The answer should be 75, but it's not
    [ ] Debug this situation: a digit is pressed, followed by the equal operator. The result is -1.
    [ ] Debug this situation: .33 * .9 ... displays 0.33.
*/
