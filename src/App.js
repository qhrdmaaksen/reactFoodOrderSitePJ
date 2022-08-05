import React, {Fragment} from 'react';
import Header from './components/Layout/Header'
import Menu from './components/Menu/Menu'

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Menu />
      </main>
    </Fragment>
  );
}

export default App;
