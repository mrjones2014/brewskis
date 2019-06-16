import React from 'react';
import DataPanel from './view/DataPanel';
import DetailView from './view/DetailView';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import beer from './beer.jpg';

require('./App.scss');

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Switch>
              <Route path="/:id" component={DetailView}/>
              <Route path="/" component={DataPanel}/>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
