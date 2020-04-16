import image from "./feature_back_of_head.jpg";

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
                <p>Link: {this.state.pictureDisplayURL}</p>

            </div>
        );
    }
}

module.exports = App;

//<img src={require("feature_back_of_head.jpg")} alt="slideshow" />       
//<img src={require(`${this.state.pictureDisplayURL}`)} alt="slideshow" />