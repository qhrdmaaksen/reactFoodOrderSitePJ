import React, {Fragment, useState} from 'react';
import Header from './components/Layout/Header'
import Menu from './components/Menu/Menu'
import Cart from './components/Cart/Cart'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <Fragment>
      {cartIsShown&& <Cart onClose={hideCartHandler}/>}{/*조건부 렌더링*/}
      <Header onShowCart={showCartHandler}/> {/*header 내부 showCartHandler 함수 호출하려면 함수 포인터를 전달해야함 프롭을 통해, 함수를 갖는 프롭은 on 으로 시작*/}
      <main>
        <Menu />
      </main>
    </Fragment>
  );
}

export default App;
