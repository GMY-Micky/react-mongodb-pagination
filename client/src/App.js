import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import DataPage from "./components/dataPage/DataPage"

function App() {
  return (
   <div className="App">
       <Router>
           <Routes>
               <Route path={"/"} element={<MainPage/>}/>
               <Route path={"/pages"} element={<DataPage/>}/>
           </Routes>
       </Router>
   </div>
  );
}

export default App;
