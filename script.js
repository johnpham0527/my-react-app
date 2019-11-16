'use strict';

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

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }
    handleIncrement = () => {
        this.setState({
            num: this.state.num + 1
        })
    }
    handleDecrement = () => {
        this.setState({
            num: this.state.num - 1
        })
    }
    render() {
        return React.createElement(
            "div", 
            {style: {color: "blue"}}, 
            "Hello ", 
            this.props.name, 
            br,
            React.createElement(
                "div",
                {style: {color: "black"}},
                `Hello ${this.props.toWhat}`
            ),
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
                this.state.num
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



/*
let BadgeList = React.createClass({
    displayName: "BadgeList",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Badge, { name: "Bill" }),
            React.createElement(Badge, { name: "Tom" })
        );
    }
});
*/

ReactDOM.render(
    React.createElement(
        MyComponent, 
        { 
            name: 'John', 
            toWhat: 'World' 
        }, 
        null), 
    document.querySelector("#app")
);