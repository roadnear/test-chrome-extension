import { Box } from '@mui/material';
import React, { ReactNode, useEffect } from 'react';
import { createBrowserRouter, createMemoryRouter, Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import AccountProfilePage from './pages/AccountProfile';

import GetStartedPage from "./pages/GetStarted";
import RegistrationPage, { loader as registrationLoader } from './pages/Registration';
import SignInPage from './pages/SignIn';
import { getIsAccountInitializedSelector, getIsAuthenticatedSelector } from './state/account/selectors';
import { useAppSelector } from './state/hooks';

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuthenticatedSelector());

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in');
    }
  }, [isAuth])
  

  return (
    <>{props.children}</>
  );
}

interface InitializedAppRouteProps extends ProtectedRouteProps {}
const InitializedAppRoute = (props: InitializedAppRouteProps) => {
  const isInit = useAppSelector(getIsAccountInitializedSelector());
  const navigate = useNavigate();

  useEffect(() => {

    if (!isInit) {

      navigate('/get-started');
    }
  }, [isInit]);

  return (
    <>{props.children}</>
  );
}

const PageLayout = () => {

  return (
    <Box sx={{ width: '23rem' }}>
      <Outlet/>
    </Box>
  )
}

const router = createMemoryRouter([
  {
    path: '/',
    element: <PageLayout/>,
    children: [
      {
        index: true,
        element: <Navigate to="/sign-in" replace/>,
      },
      {
        path: '/get-started',
        element: <GetStartedPage/>,
      },
      {
        path: '/registration',
        element: <RegistrationPage/>,
        loader: registrationLoader,
      },
      {
        path: '/sign-in',
        element: (
          <InitializedAppRoute>
            <SignInPage/>
          </InitializedAppRoute>
        )
      }
    ],
  },
  {
    path: '/app',
    element: <PageLayout/>,
    children: [
      {
        index: true,
        element: <Navigate to="/app/account-profile" replace/>
      },
      {
        path: '/app/account-profile',
        element: (
          <ProtectedRoute>
            <AccountProfilePage/>
          </ProtectedRoute>
        )
      }
    ]
  }
]);

export default router;