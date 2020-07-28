import React, {  Suspense,lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";
import Loader from './subcomponent/Loader'
import { Route, Switch } from 'react-router-dom';
const MyList = lazy(() => import('./container/MyListContainer'));
const MovieList = lazy(() => import('./container/MovieListContainer'));
function App() {
  return (
    <section className="main-area-root">
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route exact path="/" component={MovieList} />
          <Route exact path="/my-list" component={MyList} />
        </Suspense>
      </Switch>
    </section>
   
  )
}


export default App;
