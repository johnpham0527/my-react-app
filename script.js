'use strict';

//Redux Code
const { Provider, connect } = ReactRedux;
//const { applyMiddleware, createStore, combineReducers, bindActionCreators} = Redux;
const { createStore } = Redux;
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

const defaultState = {
    count: 0,
    queue: []
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
            calculatorString: ""
        };
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

    handleFormSubmit(event) {
        event.preventDefault();
        let newList = this.state.list.slice();
        newList.push(this.state.input);
        let newPrintText = newList.join(", ");
        this.setState({
            list: newList,
            printText: newPrintText,
            input: ""
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
                        "button",
                        null,
                        "7"
                    ),
                    React.createElement(
                        "button",
                        null,
                        "8"
                    ),
                    React.createElement(
                        "button",
                        null,
                        "9"
                    ),
                    br,
                    React.createElement(
                        "button",
                        {style: 
                            {
                                width: "35px",
                                marginRight: "5px"
                            }
                        },
                        "4"
                    ),
                    React.createElement(
                        "button",
                        {style: 
                            {
                                width: "35px",
                                marginLeft: "0px",
                                marginRight: "0px"
                            }
                        },
                        "5"
                    ),
                    React.createElement(
                        "button",
                        {style: 
                            {
                                width: "35px",
                                marginLeft: "5px"
                            }
                        },
                        "6"
                    ),
                    br,
                    React.createElement(
                        "button",
                        {style: 
                            {
                                width: "35px",
                                marginRight: "5px"
                            }
                        },
                        "1"
                    ),
                    React.createElement(
                        "button",
                        {style: 
                            {
                                width: "35px",
                                marginLeft: "0px",
                                marginRight: "0px"
                            }
                        },
                        "2"
                    ),
                    React.createElement(
                        "button",
                        {style: 
                            {
                                width: "35px",
                                marginLeft: "5px"
                            }
                        },
                        "3"
                    ),
                    br,
                    React.createElement(
                        "button",
                        {style: {width: "115px"}},
                        "0"
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
JavaScript calculator pseudo-code:
I'll create buttons for each of the 10 digits.
The local React state will store each digit as the button is pressed into a string.
Once an operator (such as the plus sign) is pressed, the local string will be tranferred to a Redux queue along with the operator.
Once the equal button is pressed, the Redux queue operands and operators will be evaluated.
*/