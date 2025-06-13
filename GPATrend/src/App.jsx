import {HashRouter as Router, Routes, Route} from "react-router-dom"
import { GraphPage } from "./Pages/GraphPage"
import { About } from "./Pages/About"

/*
TODO:
- Make webpage run a lot faster
- Fix null errors when trying to render parts of a json that don't exist
- Change colors of graphs to make them more visually appealing
- Fix rendering bugs when navigating through webpages
- Fix confusing locations of stuff in the css files
*/

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<GraphPage/>}/>
          <Route path='/About' element={<About/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
