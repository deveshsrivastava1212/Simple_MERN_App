import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Register from './Components/Register';
import Login from './Components/Login';
import { Route } from 'react-router-dom';

const App = () =>{
  return (
    <>
      <Navbar/>

      <Route exact path='/'>
        <Home/>
      </Route>

      <Route path='/About'>
        <About/>
      </Route>

      <Route path='/Contact'>
        <Contact/>
      </Route>

      <Route path='Login'>
        <Login/>
      </Route>

      <Route path='Register'>
        <Register/>
      </Route>
    </>
  )
}

export default App;
