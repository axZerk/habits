import Register from 'pages/Register';
import Login from 'pages/Login';
import Logout from 'pages/Logout';
import Reset from 'pages/Reset';
import Profile from 'pages/Profile';
import Habits from 'pages/Habits';

export const routes = {
  register: '/account/register',
  login: '/account/login',
  logout: '/account/logout',
  reset: '/account/reset',
  profile: '/account/profile',
  habits: '/habits',
};

const routerConfig = {
  public: [
    {
      path: routes.register,
      component: Register,
      redirectPath: routes.habits,
    },
    {
      path: routes.login,
      component: Login,
      redirectPath: routes.habits,
    },
  ],
  private: [
    {
      path: routes.logout,
      component: Logout,
      redirectPath: routes.login,
    },
    {
      path: routes.reset,
      component: Reset,
      redirectPath: routes.login,
    },
    {
      path: routes.profile,
      component: Profile,
      redirectPath: routes.login,
    },
    {
      path: routes.habits,
      component: Habits,
      redirectPath: routes.login,
    },
  ],
};

export default routerConfig;
