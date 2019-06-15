import React from 'react';
import DataPanel from './view/DataPanel';
require('./App.scss');

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <DataPanel/>
        </div>
      </div>
    </div>
  );
}

export default App;
