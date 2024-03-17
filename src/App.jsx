import { Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Register from './Pages/Register'
import LoginPage from './Pages/Login'
import MyNavbar from './Componenets/Navbar'
import Listingpage from './Pages/List'
import HomePage from './Pages/Home'
import BookDetailsPage from './Pages/Details'
import OrdersPage from './Pages/Vieworders'
import ViewOrderDetails from './Pages/ViewOrderDetails'



function App() {


  return (
    <>
       <MyNavbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<h1>About</h1>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/book/list' element={<Listingpage />} />
        <Route path="/book/view/:bookId" element={<BookDetailsPage />} />
        <Route path='/book/orders' element={<OrdersPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
        

      </Routes>
     
    </>
  )
}

export default App
