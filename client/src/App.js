import React from 'react';
import ErrorBody from '../src/components/ErrorBody'
import Body from '../src/components/Body'
import "./App.css";
import Offers from '../src/components/Offers'
import MenuList from '../src/components/MenuList'
import Cart from '../src/components/Cart'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home  from '../src/components/Home';
import UserAccount from './components/UserAccount';

const App = () => {
  const userDetails = useSelector((store) => store.userDetails.data);
  const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<ErrorBody/>,
    children :[
      {
        path:'/',
       element:<Body/>,
      },
      {
          path:"/offers",
          element:<Offers/>
      },
      {
        path:"/restuarant-menu/:name/:id",
        element : <MenuList/>
      },
      {
        path:"/checkout",
        element:userDetails !== null ? <Cart/> : <Body/>
      },
      {
        path:"/account",
        element:userDetails!==null ? <UserAccount/> :""
      }
    ]
  }
]);
return (
  <RouterProvider router={router} />
);
};

export default App;
