import Register from 'pages/Register';
import Login from 'pages/Login';
import Reset from 'pages/Reset';
import Profile from 'pages/Profile';
import Habits from 'pages/Habits';

export const routes = {
  register: '/account/register',
  login: '/account/login',
  reset: '/account/reset',
  profile: '/account/profile',
  habits: '/habits',
};

const routerConfig = [
  {
    path: routes.register,
    component: Register,
    redirectPath: routes.habits,
    protected: false,
  },
  {
    path: routes.login,
    component: Login,
    redirectPath: routes.habits,
    protected: false,
  },
  {
    path: routes.reset,
    component: Reset,
    redirectPath: routes.login,
    protected: false,
  },
  {
    path: routes.profile,
    component: Profile,
    redirectPath: routes.login,
    protected: true,
  },
  {
    path: routes.habits,
    component: Habits,
    redirectPath: routes.login,
    protected: true,
  },
];

export default routerConfig;
