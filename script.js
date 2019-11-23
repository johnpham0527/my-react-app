'use strict';

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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleIncrement() {
        this.setState({
            num: this.state.num + 1
        });
    };

    handleDecrement() {
        this.setState({
            num: this.state.num - 1
        })
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
                    "div",
                    null,
                    `Your counter: ${this.state.num}`
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

const myList = [1,2,3,4];

ReactDOM.render(
    React.createElement(listElement, {list: myList}, null),
    document.querySelector("#app")
);
/*
ReactDOM.render(
    React.createElement(MyComponent, null, null),
    document.querySelector("#app")
);
*/