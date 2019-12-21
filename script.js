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

const defaultCalcState = {
    queue: [],
    result: 0
}

const add = (leftHandOperand) => {
    return {
        type: ADD,
        operand: leftHandOperand
    }
}

const subtract = (leftHandOperand) => {
    return {
        type: SUBTRACT,
        operand: leftHandOperand
    }
}

const multiply = (leftHandOperand) => {
    return {
        type: MULTIPLY,
        operand: leftHandOperand
    }
}

const divide = (leftHandOperand) => {
    return {
        type: DIVIDE,
        operand: leftHandOperand
    }
}

const equal = (leftHandOperand) => {
    return {
        type: EQUAL,
        operand: leftHandOperand
    }
}

const calcReducer = (state = defaultCalcState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ADD:
        case SUBTRACT:
        case MULTIPLY:
        case DIVIDE:
            newState.queue.push(action.operand);
            newState.queue.push(action.type);
            return newState;
        case EQUAL:
            newState.queue.push(action.operand); //add the last operand into the queue
            
            //evaluate the queue expressions
            newState.result = parseFloat(newState.queue.shift(),10);

            while (newState.queue.length > 0) {
                let operator = newState.queue.shift();
                let rightHandOperand = parseFloat(newState.queue.shift(),10); 
                switch (operator) {
                    case ADD:
                        newState.result += rightHandOperand;
                        break;
                    case SUBTRACT:
                        newState.result -= rightHandOperand;
                        break;
                    case MULTIPLY:
                        newState.result *= rightHandOperand;
                        break;
                    case DIVIDE:
                        newState.result /= rightHandOperand;
                        break;
                    default:
                        newState.result = "ERROR: unknown operator";
                        return newState;
                }
            }
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
        submitAdd: (leftHandOperand) => {
            return dispatch(add(leftHandOperand))
        },
        submitSubtract: (leftHandOperand) => {
            return dispatch(subtract(leftHandOperand))
        },
        submitMultiply: (leftHandOperand) => {
            return dispatch(multiply(leftHandOperand))
        },
        submitDivide: (leftHandOperand) => {
            return dispatch(divide(leftHandOperand))
        },
        submitEqual: (leftHandOperand) => {
            return dispatch(equal(leftHandOperand))
        }
    }
}


//React Code
const br = React.createElement(
    "br",
    null,
    null
);

const hello = React.createElement(
    "h2",
    {},
    "Hello!"
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
        if (this.state.calcString === "0") {
            if (buttonValue === "0") {
                return;
            }
            else if (buttonValue !== "plusMinus") {
                this.setState({
                    calcString: buttonValue
                })
            }
        }
        else if (buttonValue === "Del") {
            this.setState({
                calcString: this.state.calcString.slice(0,this.state.calcString.length-1)
            })
        }
        else if (buttonValue === "CE") {
            this.setState({
                calcString: "0"
            })
        }
        else if (buttonValue === "plusMinus") {
            if (this.state.calcString !== "0") {        
                if (this.state.calcString[0] === "-") { //toggle negative to positive by removing negative sign
                    this.setState({
                        calcString: this.state.calcString.slice(1)
                    })
                }
                else { //toggle positive to negative by adding negative sign
                    this.setState({
                        calcString: "-" + this.state.calcString
                    })
                }
            }
            else {
                return;
            }
        }
        else if (buttonValue === "add") {
            this.props.submitAdd(this.state.calcString); //calcString contains the left-hand operand
            this.setState({
                calcString: "0"
            });
        }
        else if (buttonValue === "subtract") {
            this.props.submitSubtract(this.state.calcString); //calcString contains the left-hand operand
            this.setState({
                calcString: "0"
            });
        }
        else if (buttonValue === "multiply") {
            this.props.submitMultiply(this.state.calcString); //calcString contains the left-hand operand
            this.setState({
                calcString: "0"
            });
        }
        else if (buttonValue === "divide") {
            this.props.submitDivide(this.state.calcString); //calcString contains the left-hand operand
            this.setState({
                calcString: "0"
            });
        }
        else if (buttonValue === "equal") {
            this.props.submitEqual(this.state.calcString); //calcString contains the left-hand operand
            this.setState({
                calcString: this.props.storeState.result
            });
        }
        else if (buttonValue === "decimal") {
            this.setState({
                calcString: this.state.calcString + "."
            })
        }
        else {
            this.setState({
                calcString: this.state.calcString + buttonValue
            });
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
                React.createElement("h1", {style: {color: "blue"}}, "Hi there!"),
                hello,
                React.createElement(
                    MyName,
                    {
                        name: "John Pham"
                    },
                    null
                ),
                br,
                React.createElement(
                    BadgeList, 
                    null, 
                    null
                ),
                br,
                React.createElement(
                    Button,
                    {
                        handleClick: this.handleIncrement,
                        name: "Increment"
                    },
                    null
                ),
                React.createElement(
                    Button,
                    {
                        handleClick: this.handleDecrement,
                        name: "Decrement"
                    },
                    null
                ),
                React.createElement(
                    Button,
                    {
                        handleClick: this.handleReset,
                        name: "Reset"
                    },
                    null
                ),
                React.createElement(
                    DisplayCounter,
                    {counter: this.props.storeState},
                    null
                ),
                br,
                React.createElement(
                    "input",
                    { 
                        value: this.state.input,
                        type: "text",
                        onChange: this.handleInputChange
                    },
                    null
                ),
                br,
                React.createElement(
                    "div",
                    null,
                    `Your input: ${this.state.input}`
                ),
                React.createElement(
                    "button",
                    {
                        onClick: this.handleFormSubmit
                    },
                    "Submit"
                ),
                React.createElement(
                    "div",
                    null,
                    this.state.printText
                ),
                React.createElement(
                    "ul",
                    null,
                    React.createElement(listElement, {list: this.state.list}, null)
                ),
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
                        this.state.calcString
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
                            }
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
                            onClick: () => this.handleCalcButton("7")
                        },
                        "7"
                    ),
                    React.createElement(
                        "button",
                        {style: 
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
                            onClick: () => this.handleCalcButton("9")
                        },
                        "9",
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
                            onClick: () => this.handleCalcButton("multiply")
                        },
                        "*"
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
                            onClick: () => this.handleCalcButton("4")
                        },
                        "4"
                    ),
                    React.createElement(
                        "button",
                        {style: 
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
                        {style: 
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
                        {style: 
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
                        this.props.storeState.result
                    )
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
[ ] Display the result onto the calculator after the equal button is pressed
[~] Implement the decimal function. ALMOST DONE: need to account for the default case where decimal is pressed immediately before any other digit has been entered
[ ] Implement divs and classes for the calculator buttons
[ ] Implement a feature where if the user presses two operators in a row, the second operator supercedes the prior operator
[ ] Debug the calc; I have spotted errors with the queue. NOTE: I should get rid of local state and let Redux handle all state variables.
[X] Properly handle plus/minus when the default display is zero
[~] Do not allow for there to be a leading zero in any whole number
[ ] There are "rounding" errors associated with how JavaScript handles decimals. Need to fix this.
[ ] Implement plus/minus properly for the default case. Zero can't be negative, but what if user wants to input -0.3?

*/