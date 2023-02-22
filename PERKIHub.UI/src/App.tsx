import { CgProfile } from 'react-icons/cg';
import { FiLogIn } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './lib/hooks/useAuth';

function App() {
  const user = useAuth();
  const name = `${user?.currentUser?.firstName} ${user?.currentUser?.lastName}`;

  return (
    <div className="mx-16 my-5 p-10">
      <div className="flex justify-end items-center gap-3">
        {user?.currentUser ? (
          <>
            <h3 className="text-2xl">
              Welcome, <span>{user?.currentUser ? name : 'User'}</span>!
            </h3>
            <NavLink to={'/profile'} className="text-3xl">
              <CgProfile />
            </NavLink>
          </>
        ) : (
          <div className="flex gap-10 text-2xl">
            <NavLink to="/login" className="text-cream flex items-center gap-1">
              Login
              <FiLogIn />
            </NavLink>
          </div>
        )}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
