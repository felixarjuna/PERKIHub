import { Form, Link, Outlet, useLoaderData } from 'react-router-dom';
import { UserResponse } from '../lib/api/contracts';

interface UserLoader {
  users: UserResponse[];
}

export default function Root() {
  const { users } = useLoaderData() as UserLoader;

  return (
    <div className="flex h-screen w-screen">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className="rounded-md px-3 py-2 shadow-sm bg-white border-2 border-tundora-200"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button
              type="submit"
              className="text-tundora-700 px-3 py-2 border-2 border-tundora-200 rounded-md bg-white hover:shadow-lg hover:translate-y-1 hover:translate-x-1 duration-200"
            >
              New
            </button>
          </Form>
        </div>

        <nav>
          {users.length ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <Link to={`users/${user.id}`}>
                    {user.firstName || user.lastName ? (
                      <>
                        {user.firstName} {user.lastName}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
