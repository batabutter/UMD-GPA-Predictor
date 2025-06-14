import {HashRouter as Router, Routes, Route} from "react-router-dom"
import { GraphPage } from "./Pages/GraphPage"
import { About } from "./Pages/About"

/*
TODO:
- Turn off prev graphs when entering a search
- Fix null errors when trying to render parts of a json that don't exist
- Change colors of graphs to make them more visually appealing
- Fix A and A+ reversed when dispying section distribution
- Fix rendering bugs when navigating through webpages
- Fix confusing locations of stuff in the css files
- Remove nused routes
- Maintain consistent style
- fix proxy errors
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
