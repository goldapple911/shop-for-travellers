import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from './about'
import LandingPage from './LandingPage/LandingPage'
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage'
import Auth from '../hoc/auth'
import NavBar from './navbar/NavBar';
import Footer from './footer/Footer';
import UploadProductPage from './UploadProductPage/UploadProductPage';
import DetailProductPage from './detailProductPage/DetailProductPage';
 
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <NavBar />
        <div  style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
            <Switch>
              {/* <Route path="/" component={Home} /> */}
              <Route exact path="/" component={Auth(LandingPage, null )} />
              <Route exact path="/about" component={Auth(AboutPage, null )} /> 
              <Route exact path="/login" component={Auth(LoginPage, false )} /> 
              <Route export path ="/register" component={Auth(RegisterPage, false )} />
              <Route export path ="/product/upload" component={Auth(UploadProductPage, true )} />
              <Route export path ="/product/:productId" component={Auth(DetailProductPage, null )} />
            </Switch>
        </div>
        <Footer />
    </Suspense>
  );
}

export default App;
