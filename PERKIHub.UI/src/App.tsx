import { CgProfile } from 'react-icons/cg';
import { FiLogIn } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './lib/hooks/useAuth';

function App() {
  const { currentUser } = useAuth();
  const name = `${currentUser?.firstName} ${currentUser?.lastName}`;

  return (
    <div className="">
      <div className="flex justify-end items-center gap-3 sm:ml-16 px-10 mt-10 sm:mr-5">
        {currentUser ? (
          <>
            <h3 className="sm:text-2xl">
              Welcome, <span>{currentUser ? name : 'User'}</span>!
            </h3>
            <NavLink to={'/profile'} className="text-3xl">
              <CgProfile />
            </NavLink>
          </>
        ) : (
          <div className="flex gap-10 text-xl">
            <NavLink to="/login" className="text-cream flex items-center gap-1">
              Log in
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
