var React = require('react');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.featurePictures = [
            "feature_back_of_head.jpg"
        ];
        this.URL = "http://www.john-pham.com/audreybergensten/feature/"
        this.state = {
            pictureDisplayURL: this.URL + this.featurePictures[0]
        }
    }
    
    
    

    render() {
        return <h1>Testing, testing. 1 2 3. Hello world!</h1>;
    }
}

module.exports = App;