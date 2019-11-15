'use strict';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement("div", {}, "Hello");
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(MyComponent), domContainer);