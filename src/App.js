import React, {Fragment} from 'react';
import Header from './components/UI/Layout/Header'
import MenuItem from './components/UI/Menu/MenuItem'

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <MenuItem />
      </main>
    </Fragment>
  );
}

export default App;
