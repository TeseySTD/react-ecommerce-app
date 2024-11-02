import { Outlet } from 'react-router-dom';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const Layout = () => {
  return (
    <div className='App'>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </div>
  );
};

export default Layout;
