import {HashRouter as Router, Routes, Route} from "react-router-dom"
import { GraphPage } from "./Pages/GraphPage"
import { About } from "./Pages/About"

/*
TODO:
- fix proxy routing when running on AWS
- Add dancing guy
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
