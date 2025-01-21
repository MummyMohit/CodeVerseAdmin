import {createBrowserRouter} from 'react-router-dom'
import Login from './LoginPage/Login'
import Layout from './MainLayout/Layout'
import Home from './Components/Home'
import UserList from './Components/UserList'
import Profile from './Components/Profile'
import Practice from './Components/Practice'
export const router = createBrowserRouter([
    {
     path: '/',
     element:<Login/>
    },
    {
        path:'/layout',
        element: <Layout/>,
       
        children: [  
          {
            path: 'home',
            element: <Home/>
          },
          {
            path: 'userlist',
            element: <UserList/>
          },

           {
            path: 'profile',
            element: <Profile/>
          },
          {
            path: 'practice',
            element: <Practice/>
          },
        ]
      }
  ])