import { groupList } from "./data";

export const ServiceGroups = () => {
  return (
    <div className="p-8 sm:px-20 text-center">
      <div className="text-4xl font-bold sm:text-6xl text-gradient-soft">
        Cooking and Cleaning Groups
      </div>

      <div className="mt-10 flex justify-center">
        <div className="sm:mt-16 flex gap-16 w-1/2 flex-wrap justify-center">
          {groupList.map(g => (
            <div className="w-60">
              <div className="bg-lightmaroon">
                <div className="button-cream w-60 text-center -translate-x-1 -translate-y-1 text-xl sm:text-2xl">
                  <p>{g.Name}</p>
                </div>
              </div>
              <ul className="mt-4 text-center  sm:text-xl font-extralight flex flex-col gap-3 font-unbounded">
                {g.Members.map(m => (
                  <li>{m}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
