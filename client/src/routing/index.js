import RegisterPage from '../components/pages/RegisterPage';
import LoginPage from '../components/pages/LoginPage';
import LogoutPage from '../components/pages/LogoutPage';
import ProfilePage from '../components/pages/ProfilePage';
import DashboardPage from '../components/pages/DashboardPage';

export const routes = {
  login: '/login',
  register: '/register',
  logout: '/logout',
  profile: '/profile',
  dashboard: '/dashboard',
};

const routerConfig = {
  public: [
    {
      path: routes.login,
      component: LoginPage,
    },
    {
      path: routes.register,
      component: RegisterPage,
    },
  ],
  private: [
    {
      path: routes.logout,
      component: LogoutPage,
      redirectTo: routes.login,
    },
    {
      path: routes.profile,
      component: ProfilePage,
      redirectTo: routes.login,
    },
    {
      path: routes.dashboard,
      component: DashboardPage,
      redirectTo: routes.login,
    },
  ],
};

export default routerConfig;
