import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Todolist from './components/Todolist.jsx';
import Account from './components/Account.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import './Home.css';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { useState } from 'react';
import Categories from './components/Categories.jsx';
import Product from './components/Product.jsx';
import Detail from './components/Detail.jsx';
function App() {
  const [auThenTion, setAuThenTion] = useState(false);
  return (
    <BrowserRouter>
      {auThenTion ? (   
         <>
         <Routes>
           <Route exact path='/login' element={<Login />} />
           <Route exact path='/signup' element={<Signup />} />
         </Routes>
       </>
      ) : (
        <>
          <Header setAuThenTion={setAuThenTion} />
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/' element={<Todolist />} />
            <Route exact path='/account' element={<Account />} />
            <Route exact path='/categories' element={<Categories/>} />
            <Route exact path='/product' element={<Product/>}/>
            <Route exact path='/detail/:id' element={<Detail/>}/>
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>

  );
}

export default App;
