'use strict';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement("div", null, "Hello ", this.props.name)
        //return React.createElement("div", null, "Hello");
    }
}

class Hello extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            `Hello ${this.props.toWhat}`
        );
    }
}

/*
ReactDOM.render(
    React.createElement(Hello, { toWhat: 'World' }, null),
    document.querySelector("#app")
);
*/

ReactDOM.render(
    React.createElement(MyComponent, { name: 'John' }, null), 
    document.querySelector("#app")
);