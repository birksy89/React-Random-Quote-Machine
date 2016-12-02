import React, {Component} from 'react';

import axios from 'axios';
//import logo from './logo.svg';
import './App.css';

//Bootstrap React
import Button from 'react-bootstrap/lib/Button';

class App extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            quote: "Loading...",
            author: "Author...",
            image: ""
        };
    }

    componentDidMount() {
        this.getAJAX()
    }

    getAJAX() {

        var config = {
            headers: {
                "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        axios.get('https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies', config).then(function(response) {

            var data = response.data;
            return data;
        }).then(data => {
            console.log(data);
            this.setState({quote: data.quote, author: data.author});
            this.getAJAXMovie(data.author)
        }).catch(function(error) {
            console.log(error);
        });

    }

    getAJAXMovie(movieName) {

        var config = {
            headers: {

                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        axios.get('https://api.themoviedb.org/3/search/movie?api_key=35ba9fa081c2115ca3fb49ce685aa314&query=' + movieName, config).then(function(response) {

            var data = response.data.results[0];
            return data;
        }).then(data => {
            console.log(data);
            this.setState({
                image: "https://image.tmdb.org/t/p/w500" + data.backdrop_path
            });
        }).catch(function(error) {
            console.log(error);
        });

    }

    render() {

        var tweetHref = "https://twitter.com/intent/tweet?text=" + encodeURI(this.state.quote);

        return (
            <div className="App">

                <div className="Canvas">

                  <div className="QuoteCard bounceIn animated " style={{
                      backgroundImage: 'url(' + this.state.image + ')'
                  }}>
                      <div className="text-wrapper">
                          <h1>{this.state.quote}</h1>
                          <h4>{this.state.author}</h4>
                      </div>

                      <div className="buttonWrapper">

                          <Button bsStyle="success" onClick={this.getAJAX.bind(this)}>Load a Quote</Button>
                          <Button bsStyle="primary" target="_blank" href={tweetHref}>Tweet</Button>
                      </div>

                  </div>

                </div>



            </div>
        );
    }
}

export default App;
