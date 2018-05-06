import RegisterPage from '../components/pages/RegisterPage';
import LoginPage from '../components/pages/LoginPage';
import LogoutPage from '../components/pages/LogoutPage';
import ResetPage from '../components/pages/ResetPage';
import ProfilePage from '../components/pages/ProfilePage';
import DashboardPage from '../components/pages/DashboardPage';

export const routes = {
  login: '/login',
  register: '/register',
  logout: '/logout',
  reset: '/reset',
  profile: '/profile',
  dashboard: '/dashboard',
};

const routerConfig = {
  public: [
    {
      path: routes.login,
      component: LoginPage,
      redirectPath: routes.dashboard,
    },
    {
      path: routes.register,
      component: RegisterPage,
      redirectPath: routes.dashboard,
    },
    {
      path: routes.reset,
      component: ResetPage,
      redirectPath: routes.login,
    },
  ],
  private: [
    {
      path: routes.logout,
      component: LogoutPage,
      redirectPath: routes.login,
    },
    {
      path: routes.profile,
      component: ProfilePage,
      redirectPath: routes.login,
    },
    {
      path: routes.dashboard,
      component: DashboardPage,
      redirectPath: routes.login,
    },
  ],
};

export default routerConfig;
