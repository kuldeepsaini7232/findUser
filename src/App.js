import React,{useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link}  from 'react-router-dom';
import {ToastContainer}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNot';
import { UserContext } from './context/userContext';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import firebaseConfig from './firebase/firebase';

firebase.initializeApp(firebaseConfig);

const App=()=>{
  const [user,setUser]=useState(null);
  
  return(
    <Router>
      <ToastContainer/>
      <UserContext.Provider value={{user,setUser}}>
        <Header/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signIn' component={SignIn}/>
         <Route exact path='/signUp' component={SignUp}/>
         <Route exact path='*' component={PageNotFound}/>
      </Switch>
      <Footer/>
      </UserContext.Provider>
    </Router>
  )
}

export default App;