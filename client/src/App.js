import React, { Suspense } from 'react';
const ErrorBody = React.lazy(()=>import('../src/components/ErrorBody'))
const Body = React.lazy(()=>import('../src/components/Body'))
import "./App.css";
const Offers = React.lazy(()=>import('../src/components/Offers'))
const MenuList =  React.lazy(()=>import('../src/components/MenuList'))
const Cart =  React.lazy(()=>import('../src/components/Cart'))
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Home = React.lazy(()=>import('../src/components/Home'));
const UserAccount = React.lazy(()=> import('./components/UserAccount'));

const App = () => {
  const userDetails = useSelector((store) => store.userDetails.data);
  const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<Suspense><ErrorBody/></Suspense>,
    children :[
      {
        path:'/',
       element:<Suspense><Body/></Suspense>,
      },
      {
          path:"/offers",
          element:<Suspense><Offers/></Suspense>
      },
      {
        path:"/restuarant-menu/:name/:id",
        element : <Suspense><MenuList/></Suspense>
      },
      {
        path:"/checkout",
        element:userDetails !== null ?<Suspense> <Cart/></Suspense> : <Suspense><Body/></Suspense>
      },
      {
        path:"/account",
        element:userDetails!==null ? <Suspense><UserAccount/></Suspense> :""
      }
    ]
  }
]);
return (
  <RouterProvider router={router} />
);
};

export default App;
