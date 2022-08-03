import React, {Fragment} from 'react';
import Header from './components/UI/Layout/Header'
import Menu from './components/UI/Menu/Menu'

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
