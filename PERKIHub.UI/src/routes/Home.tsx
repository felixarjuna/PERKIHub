import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="mx-5 my-5 p-10">
      <div className="flex justify-end items-center gap-3">
        <h3 className="text-2xl">
          Welcome, <span>Felix Arjuna</span>!
        </h3>
        <NavLink to={'/profile'} className="text-3xl">
          <CgProfile />
        </NavLink>
      </div>

      <div className=" p-10">
        <h1 className="text-6xl text-lightmaroon">Events</h1>
        <h3 className="mt-10 text-4xl">This Week</h3>
      </div>

      <div>
        
      </div>
    </div>
  );
};
