import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from '../Home/Home';

export default function AppRouter():ReactElement {
  return (
    <Router>
        <div>
          <Routes>
            <Route path=':page' element={<Home />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
    </Router>
  )
}
