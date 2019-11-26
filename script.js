'use strict';

//Redux Code
const { Provider, connect } = ReactRedux;
//const { applyMiddleware, createStore, combineReducers, bindActionCreators} = Redux;
const { createStore } = Redux;
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

const defaultState = {
    count: 0
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
            num: 0,
            input: "",
            list: [],
            printText: ""
        };
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleIncrement(event) {
        /*
        this.setState({
            num: this.state.num + 1
        });
        */
       event.preventDefault();
       this.props.submitIncrement();
    };

    handleDecrement(event) {
        /*
        this.setState({
            num: this.state.num - 1
        })
        */
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
                /*
                React.createElement(
                    "div",
                    null,
                    `Your counter: ${this.state.num}`
                ),
                */
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

/*
ReactDOM.render(
    React.createElement(MyComponent, null, null),
    document.querySelector("#app")
);
*/

//I should implement Redux middleware in order to practice async programming