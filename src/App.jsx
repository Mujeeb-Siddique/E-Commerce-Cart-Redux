import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import NavBar from './Pages/NavBar';
import ProductDetails from './Pages/ProductDetails';
import Home from './Pages/Home';
import CheckOut from './Pages/CheckOut';
import ThankYou from './Pages/ThankYou'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <> <NavBar/> <Home/> </>
    },
    {
      path:'/products',
      element: <> <NavBar/> <Products/> </> ,
    },
    {
      path: '/cart',
      element: <> <NavBar/> <Cart/> </>
    },
    {
      path: '/products/:id',
      element: <> <NavBar/> <ProductDetails/> </>
    },
    {
      path: '/checkout',
      element: <> <NavBar/> <CheckOut/> </>
    },
    {
      path: '/thankyou',
      element: <> <NavBar/> <ThankYou/> </>
    },
  ])
  
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
