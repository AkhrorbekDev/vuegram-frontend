import MainLayout from '@/layouts/MainLayout';
import Error404 from '@/pages/Error404';
import ProfilePage from '@/pages/ProfilePage';
import CameraPage from '@/pages/CameraPage';
import EmptyLayout from '@/layouts/EmptyLayout';
import RegistryPage from '@/pages/RegistryPage';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import PosterPage from '@/pages/PosterPage';
import EmptyPage from 'pages/EmptyPage';

const routes = [
  {
    path: '/',
    redirect: {
      name: 'home',
    },
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      layout: MainLayout,
      // protected: true,

    },
    component: HomePage,
  },
  {
    path: '/profile/:login',
    name: 'profile',
    meta: {
      layout: MainLayout,
    },
    component: ProfilePage,
    props: (route) => ({ login: route.params.login }),
  },
  {
    path: '/camera',
    name: 'camera',
    meta: {
      layout: MainLayout,
    },
    component: CameraPage,
  },
  {
    path: '/poster/',
    name: 'poster',
    meta: {
      layout: MainLayout,
    },
    component: PosterPage,
  },
  {
    path: '/registry',
    name: 'registry',
    meta: {
      layout: EmptyLayout,
    },
    component: RegistryPage,
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: EmptyLayout,
    },
    component: LoginPage,
  },
  {
    path: '/empty',
    name: 'empty',
    meta: {
      layout: EmptyLayout,
    },
    component: EmptyPage,
  },
  {
    path: '*',
    component: Error404,
  },
];

export default routes;
