import Register from 'pages/Register';
import Login from 'pages/Login';
import Reset from 'pages/Reset';
import Profile from 'pages/Profile';
import Habits from 'pages/Habits';

export const paths = {
  register: '/account/resister',
  login: '/account/login',
  reset: '/account/reset',
  profile: '/account/profile',
  habits: '/habits',
};

export default [
  {
    path: paths.register,
    component: Register,
    redirect: paths.habits,
    protected: false,
  },
  {
    path: paths.login,
    component: Login,
    redirect: paths.habits,
    protected: false,
  },
  {
    path: paths.reset,
    component: Reset,
    redirect: paths.login,
    protected: false,
  },
  {
    path: paths.profile,
    component: Profile,
    redirect: paths.login,
    protected: true,
  },
  {
    path: paths.habits,
    component: Habits,
    redirect: paths.login,
    protected: true,
  },
];
