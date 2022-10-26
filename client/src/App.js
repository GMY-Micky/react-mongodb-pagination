import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import DataPage from "./components/dataPage/DataPage";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";

function App() {
  return (
   <div className="App">
       <Router>
           <Routes>
               <Route path={"/"} element={<MainPage/>}/>
               <Route path={"/pages"} element={<DataPage/>}/>
               <Route path={"/signin"} element={<SignIn/>}/>
               <Route path={"/signup"} element={<SignUp/>}/>
           </Routes>
       </Router>
   </div>
  );
}

export default App;
