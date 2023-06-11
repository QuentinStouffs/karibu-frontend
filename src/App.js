import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Points from './components/Points';
import NewPoint from './components/NewPoint';
import ModifyPoint from './components/ModifyPoint';
import Signin from './components/Signin';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Legal from './components/Legal';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/> 
          <Route path="/mes-points-de-vente/" element={<Points/>}/> 
          <Route path="/new-artisan/" element={<NewPoint/>}/> 
          <Route path="/modify/:id" element={<ModifyPoint/>}/> 
          <Route path="/legal" element={<Legal/>}/> 
          <Route path="*" element={<NotFound/>}/> 
        </Routes>
        <footer style={{backgroundColor: "black"}}><Link to={`/legal`} style={{color: "#fff"}}>Mentions légales</Link></footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
