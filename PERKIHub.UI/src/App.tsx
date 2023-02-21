import { CgProfile } from 'react-icons/cg';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './lib/hooks/useAuth';

function App() {
  const user = useAuth();
  const name = `${user?.currentUser?.firstName} ${user?.currentUser?.lastName}`;

  return (
    <div className="mx-16 my-5 p-10">
      <div className="flex justify-end items-center gap-3">
        <h3 className="text-2xl">
          Welcome, <span>{user?.currentUser ? name : 'User'}</span>!
        </h3>
        <NavLink to={'/profile'} className="text-3xl">
          <CgProfile />
        </NavLink>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
