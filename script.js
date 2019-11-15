let MyComponent = function MyComponent(props) {
    return React.createElement(
        "div",
        null,
        "Hello",
        props.name
    )
};

ReactDOM.render(React.createElement(MyComponent, {name: "John"}), app);