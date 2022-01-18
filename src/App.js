import logo from './logo.svg';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import './App.css';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path='/' render={(props)=>(
        <>
          <Banner {...props}/>
          <Movies {...props}/>
        </>
      )}></Route>
      <Route path='/favourites' component={Favourite}/>
      {/* <Banner/>
      <Movies/>
      <Favourite/> */}
    </Router>
  );
}

export default App;
