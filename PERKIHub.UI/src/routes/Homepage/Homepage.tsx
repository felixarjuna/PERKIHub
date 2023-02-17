import { NavLink } from 'react-router-dom';

export const Homepage = () => {
  return (
    <div className="xl:ml-32 p-10 flex h-screen">
      <div className=" w-3/5 self-center">
        <h2 className="text-8xl max-w-xl">Welcome to </h2>
        <h2 className="text-8xl max-w-xl text-transparent bg-clip-text bg-gradient-to-r from-parchment-200 to-maroon">
          Perki Hub.
        </h2>
        <h3 className="text-2xl mt-2">
          All in one place for our developed Apps.
        </h3>
        <div className="my-10 flex gap-6 pb-10">
          <div className="bg-lightmaroon w-24 flex items-center justify-center">
            <NavLink
              to="/register"
              className="w-24 bg-parchment-200 px-3 py-2 text-parchment-500 border-2 border-lightmaroon hover:-translate-x-1 hover:-translate-y-1 duration-500"
              type="button"
              onClick={() => console.log('register')}
            >
              Register
            </NavLink>
          </div>
          <div className="w-24 flex items-center justify-center bg-cream">
            <NavLink
              to="/login"
              className="px-3 py-2 border-2 border-cream w-24 flex items-center justify-center bg-tundora-700 hover:-translate-x-1 hover:-translate-y-1 duration-500"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
