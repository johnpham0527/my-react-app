'use strict';

let MyComponent = function MyComponent(props) {
    return React.createElement(
        "div",
        null,
        "Hello",
        props.name
    )
};

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement("div", null, "Hello", props.name)
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(MyComponent, {name: "John"}), app);