# reactFoodOrderSitePJ
## 음식 주문 사이트

```js

  비타민777 리엑트 레스토랑
1. 메인 화면
2. 메뉴 목록
3. 레스토랑 설명
4. 장바구니
5. 주문 수량 및 총 가격 출력

React CSS Html

Components
    Layout 폴더 
    Header.js : main 상단 헤더 사이트 명 및 내 장바구니 
    HeaderCartButton.js : 내 장바구니 버튼 컴포넌트
  Cart 폴더 
    CartIcon.js : 내 장바구니 아이콘
    Cart.js : 내 장바구니 화면 컴포넌트
    Cheakout.js : 주문자 정보 입력 폼 컴포넌트
  Menu 폴더 : 음식 리스트 등 목록 관련
    Menu.js : 메뉴 아이템, 메뉴 장바구니 담기, 주문가능 목록, 레스토랑 설명 컴포넌트
    MenuItem.js : 메뉴에 필요한 정보 컴포넌트
    MenuItemForm.js : 메뉴 수량 인풋 폼 컴포넌트
    AvailableMenu.js : 주문 가능 메뉴 컴포넌트
    MealsSummary.js : 음식 요약 설명 컴포넌트
  UI 폴더 : 인풋, 팝업, 카드 레이아웃 관련 폴더
    Card.js : 요소들이 들어갈 카드 틀 컴포넌트
    Input.js : 입력 담당 컴포넌트
    Modal.js : 모달 오버레이로 내 장바구니 팝업에 사용
  store 폴더 : 컨텍스트 스토어
    cart-context.js : 메뉴 아이템, 가격, 수량, 메뉴 추가 및 삭제 , 초기화 등 초기 값을 
                      각 컴포넌트에서 활요토록 함
    CartProvider.js : 장바구니 추가 및 삭제 , 장바구니 데이터, 장바구니 초기화 관련 로직으로 
                       필요 컴포넌트에서 활용 가능토록 함

Function
  Cart.js
    cartItemRemoveHandler : 장바구니에 담겨있는 메뉴의 아이디를 받아 
                            컨텍스트 스토어 활용하여 메뉴 삭제토록 함
    cartItemAddHandler : 장바구니에 메뉴를 추가함
    orderHandler : 주문 버튼을 눌렀는지 상태 관리 함수
    submitOrderHandler : 장바구니 데이터 및 유저 정보 전송 함수
  Checkout.js
    confirmHandler : 유저 정보 입력 받을 함수
  MenuItem.js
    addToCartHandler : 메뉴 장바구니에 추가 시 메뉴에대한 정보를 받을 함수
  MenuItemForm.js
    submitHandler : 음식 수량을 받을 함수
  AvailableMenu.js
    fetchMeals : 데이터 서버에 등록된 주문 가능 목록 데이터 가져올 함수
  Modal.js
    Backdrop : 배경 환경 및 배경 클릭시 모달 닫히게 할 함수 
    ModalOverlay : 모달 팝업 함수    
  CartProvider.js
    cartReducer : 장바구니 추가/제거 초기화 상태 관리할 함수  
    addItemToCartHandler : 장바구니에 추가해야할 항목 얻는 함수
    removeItemFromCartHandler : 장바구니에서 아이템 삭제하는 함수
    clearCartHandler : 장바구니 주문 완료 후 비워주는 함수
  App.js
    showCartHandler : 장바구니 보여줄 상태 관리 함수
    hideCartHandler : 장바구니를 숨겨줄 상태 관리 함수
    
```

메인 화면

![20221028_071732](https://user-images.githubusercontent.com/75942405/198408590-59fc7a6d-e200-4c41-9cf0-5824cdf7bbd1.png)

주문 가능 메뉴 불러오는 중

![foodSiteLoading](https://user-images.githubusercontent.com/75942405/198408749-05d6d23f-ac4a-4b2e-a5e3-83d0b4a11a4a.png)

주문 가능 메뉴 불러오기 실패

![mainErrorFoodsite](https://user-images.githubusercontent.com/75942405/198408821-a5cee51b-7fc9-40de-bb35-43120d4cc3cf.png)

파이어 베이스 등록된 주문 가능 메뉴

![foodSiteFirebaseDummy](https://user-images.githubusercontent.com/75942405/198409278-c03ee06a-5409-45a3-beb7-15a6a13e807e.png)

장바구니 클릭 시 모달 오픈 및 백드롭 설정 화면

![foodSiteEmptyMenu](https://user-images.githubusercontent.com/75942405/198409446-ef0367ad-9682-4865-86f9-22e93bb678c3.png)

장바구니에 메뉴 추가 시

![foodSiteMyCart](https://user-images.githubusercontent.com/75942405/198409514-9336c9a5-68d3-43b5-9dfd-63b521388ba8.png)

음식 메뉴 주문 유저 정보 입력 폼

![foodSiteInputInfo](https://user-images.githubusercontent.com/75942405/198409710-3fd78c5c-295b-48ed-b340-e546bec79b3f.png)

내 장바구니에서 Firebase 에 추가

![foodSiteAddInfo02](https://user-images.githubusercontent.com/75942405/198409847-4e8410ae-d0c1-412b-b0be-bb1653fd6ae9.png)

주문 성공 시

![foodSiteOrderSuccess](https://user-images.githubusercontent.com/75942405/198409928-f289d569-e297-4db1-bb60-b8775f6ef44e.png)









