import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Components/Home"
import SearchPage from "./Components/search";
import Popular from "./Components/Popular";
import New from "./Components/new";
import AnimeDetails from "./Components/AnimeDetails";

function App() {
  return(
    <Router>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/search" element={<SearchPage/>}/>
         <Route path="/popular" element={<Popular/>}/>
         <Route path="/new" element={<New/>}/>
         <Route path="/anime/:id" element={<AnimeDetails/>}/>
       </Routes>
    </Router>
  )
}
export default App;