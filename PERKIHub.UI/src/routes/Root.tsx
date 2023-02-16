import { Form, Link, Outlet, useLoaderData } from 'react-router-dom';
import { UserResponse } from '../lib/api/contracts';

interface UserLoader {
  users: UserResponse[];
}

export default function Root() {
  const { users } = useLoaderData() as UserLoader;

  return (
    <>
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
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
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
    </>
  );
}
