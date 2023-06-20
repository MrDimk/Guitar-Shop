import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {Outlet, useLocation} from 'react-router-dom';

export function MainLayout() {
  const location = useLocation();
  return (
        <div className="wrapper">
          <Header/>
          <main className="page-content">
            <Outlet/>
          </main>
          <Footer/>
        </div>
  );
}
