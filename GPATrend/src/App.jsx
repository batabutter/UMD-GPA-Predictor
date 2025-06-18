import {HashRouter as Router, Routes, Route} from "react-router-dom"
import { GraphPage } from "./Pages/GraphPage"
import { About } from "./Pages/About"

/*
TODO:
- Fix slow searches
- Fix bugs where it still displays results that have professors name and such
- Fix proxy routing when running on AWS
- Add ReactGA component to pagest to track user activity
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
