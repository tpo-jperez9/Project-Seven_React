import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Form from './components/Form';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';
import apiKey from './config2';


// strings for the default navs//
const defaultLoads = ['godzilla', 'helicopters', 'airplanes'];
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Photos: [],
      godzilla: [],
      helicopters: [],
      airplanes: [],
      homePhotos: [],
    };
  }


  
  // on page load, arrrays from the default strings are loaded into state for use in the default navs//
  componentDidMount() {
    
    let homePhotosArray = []
    // prevents no results from flashing on page refresh//
    this.setState({loading: true, homePhotos: []})

    // makes sure all axios calls have completed before updating the loading state//
    let bar = new Promise((resolve) => {
    
    defaultLoads.forEach((vehicle, index) => {
      axios
        .get(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey.apiKey}&text=${vehicle}&per_page=24&format=json&nojsoncallback=1`
        )
        .then((response) => {
          switch (vehicle) {
            case 'godzilla':
              this.setState({ godzilla: response.data.photos.photo });
              homePhotosArray.splice(0,0,response.data.photos.photo[0])
              break;
            case 'helicopters':
              this.setState({ helicopters: response.data.photos.photo });
              homePhotosArray.splice(1,0,response.data.photos.photo[0])
              break;
            case 'airplanes':
              this.setState({ airplanes: response.data.photos.photo });
              homePhotosArray.splice(2,0,response.data.photos.photo[0])
              break;

            default:
              // nothing but default//
          }
          if(index === Array.length -1) resolve()
      })
        .catch((error) => {
          'error fetching data';
        });

    })
  })

  bar.then(() => {
    this.setState({loading: false, homePhotos: homePhotosArray})
    this.searchFlikr(this.props.history.location.state);
  })
  }
  // this function that will handle forward and backward clicks//
  componentDidUpdate() {
    // prevents an update for each component update//

    window.onpopstate = (e) => {
      if (
        this.props.history.location.state !== this.state.searchString &&
        typeof this.props.history.location.state != 'undefined'
      ) {
        // reads the history object and calls flikr again for the previous search//
        let historyQuery = this.props.history.location.state;
        this.searchFlikr(historyQuery);
      }
    };


  }


  // takes a string and searches flikr for up to 24 images//
  searchFlikr = (search) => {
    this.setState({ loading: true });
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey.apiKey}&text=${search}&per_page=24&format=json&nojsoncallback=1`;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState(() => {
          return {
            Photos: responseData.photos.photo,
            SearchString: search,
            loading: false,
          };
        });
      })
      .catch((error) => {
        'error fetching data';
      });
  };

  // Routes: While queries are in progress, loading will be displayed. If no route is available, 404 will be displayed instead//
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Form searchFunction={this.searchFlikr} />
          <Nav />
          {
          (this.state.loading) 
            ? <p>Loading...</p>
            : 
            
            <Switch>
              <Route exact path="/" render={() => (
                  <PhotoList
                    data={this.state.homePhotos}
                    search={''}
                  />)} />
              <Route
                exact
                path="/search/:query"
                render={() => (
                  <PhotoList
                    data={this.state.Photos}
                    search={this.state.SearchString}
                  />
                )}
              />
              <Route
                exact
                path="/godzilla"
                render={() => (
                  <PhotoList data={this.state.godzilla} search={'godzilla'} />
                )}
              />
              <Route
                exact
                path="/helicopters"
                render={() => (
                  <PhotoList
                    data={this.state.helicopters}
                    search={'helicopters'}
                  />
                )}
              />
              <Route
                exact
                path="/airplanes"
                render={() => (
                  <PhotoList data={this.state.airplanes} search={'airplanes'} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}
export default App;