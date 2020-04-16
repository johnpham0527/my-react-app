var React = require('react');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.featurePictures = [
            "feature_back_of_head.jpg"
        ];
        this.URL = "feature/"
        this.state = {
            pictureDisplayURL: this.URL + this.featurePictures[0]
        }
    }
    
    
    

    render() {
        return (
            <div>
                <h1>Testing, testing. 1 2 3. Hello world!</h1>
                <p>{this.state.pictureDisplayURL}</p>
                <img src={require(`${this.state.pictureDisplayURL}`)} alt="slideshow" />
            </div>
        );
    }
}

module.exports = App;