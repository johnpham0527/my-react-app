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

const defaultCalcState = {
    queue: []
}

const add = () => {
    return {
        type: ADD
    }
}

const subtract = () => {
    return {
        type: SUBTRACT
    }
}

const multiply = () => {
    return {
        type: MULTIPLY
    }
}

const divide = () => {
    return {
        type: DIVIDE
    }
}


const store = Redux.createStore(countReducer);

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
            this.setState({
                calcString: buttonValue
            })
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
        else if (buttonValue === "add") {
            
        }
        else if (buttonValue === "subtract") {
            
        }
        else {
            this.setState({
                calcString: this.state.calcString + buttonValue
            })
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
                            }
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
                            }
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
                            }
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
                            }
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
                            }
                        },
                        "="
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
JavaScript calculator pseudo-code:
[X] I'll create buttons for each of the 10 digits.
[X] I'll add and style a display
The local React state will store each digit as the button is pressed into a string.
    I need to re-factor the calculator code to create event handlers and add them as event listeners. I should explore creating a function factory to handle the various number buttons (0-9).
Once an operator (such as the plus sign) is pressed, the local string will be tranferred to a Redux queue along with the operator.
Once the equal button is pressed, the Redux queue operands and operators will be evaluated.
*/