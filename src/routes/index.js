import Register from 'pages/Register';
import Login from 'pages/Login';
import Reset from 'pages/Reset';
import Profile from 'pages/Profile';
import Habits from 'pages/Habits';

export const paths = {
  register: '/account/register',
  login: '/account/login',
  reset: '/account/reset',
  profile: '/account/profile',
  habits: '/habits',
};

export default [
  {
    path: paths.register,
    component: Register,
    redirectPath: paths.habits,
    protected: false,
  },
  {
    path: paths.login,
    component: Login,
    redirectPath: paths.habits,
    protected: false,
  },
  {
    path: paths.reset,
    component: Reset,
    redirectPath: paths.login,
    protected: false,
  },
  {
    path: paths.profile,
    component: Profile,
    redirectPath: paths.login,
    protected: true,
  },
  {
    path: paths.habits,
    component: Habits,
    redirectPath: paths.login,
    protected: true,
  },
];
