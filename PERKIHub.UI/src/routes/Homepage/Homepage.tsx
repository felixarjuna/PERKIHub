import { NavLink } from 'react-router-dom';

export const Homepage = () => {
  return (
    <div className="xl:ml-32 p-10 flex h-screen">
      <div className=" w-3/5 self-center">
        <h2 className="text-8xl max-w-xl">Welcome to </h2>
        <h2 className="text-8xl max-w-xl text-gradient">Perki Hub.</h2>
        <h3 className="text-2xl mt-2">
          All in one place for our developed Apps.
        </h3>
        <div className="my-10 flex gap-6 pb-10">
          <div className="bg-lightmaroon w-24 flex items-center justify-center">
            <NavLink to="/register" className="button-cream" type="button">
              Register
            </NavLink>
          </div>
          <div className="w-24 flex items-center justify-center bg-cream">
            <NavLink to="/login" className="button-gray">
              Login
            </NavLink>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
