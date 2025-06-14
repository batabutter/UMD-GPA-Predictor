import {HashRouter as Router, Routes, Route} from "react-router-dom"
import { GraphPage } from "./Pages/GraphPage"
import { About } from "./Pages/About"

/*
TODO:
- Fix null errors when trying to render parts of a json that don't exist
- Fix A and A+ reversed when dispying section distribution
- Fix rendering bugs when navigating through webpages
- Remove unused routes
- Maintain consistent style
- fix proxy errors
- Make working on mobile
- Get favicon working
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
