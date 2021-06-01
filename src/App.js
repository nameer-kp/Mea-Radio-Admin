import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Login from './components/Login/Login'
import MainNavigation from './components/MainNavigation/MainNavigation'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form,Button } from 'react-bootstrap'


function App() {
  const [isLoggedIn, setLogin] = useState(false)
  document.title="MEA Radio"
  
  return (
    <div className="App">
      {isLoggedIn ? <MainNavigation isLoggedIn={isLoggedIn} setLogin={setLogin} /> : <Login isLoggedIn={isLoggedIn} setLogin={setLogin}/>}
      
      
    </div>
  );
}

export default App;
