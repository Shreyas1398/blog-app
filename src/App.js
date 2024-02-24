import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import CreateBlog from './Pages/CreateBlog'
import PostDetail from './Pages/PostDetail'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/read/:id" element={<PostDetail />} />
      </Routes>
    </div>
  )
}

export default App