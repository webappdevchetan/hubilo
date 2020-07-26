import React, { Component } from 'react';
import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";
import Loader from './subcomponent/Loader'
const MyList = lazy(() => import('./container/MyListContainer'));
const MovieList = lazy(() => import('./container/MovieListContainer'));
class App extends Component {
  
  render() {
    return (
      <div className="App" >
        <section className="main-area-root">
          <Switch>
            <Suspense fallback={<Loader />}>
              <Route exact path="/" component={MovieList} />
              <Route exact path="/my-list" component={MyList} />
            </Suspense>
          </Switch>
        </section>
        
      </div>
    );
  }

}


export default App;
