import { CgProfile } from 'react-icons/cg';
import { NavLink, Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="mx-16 my-5 p-10">
      <div className="flex justify-end items-center gap-3">
        <h3 className="text-2xl">
          Welcome, <span>Felix Arjuna</span>!
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
};
