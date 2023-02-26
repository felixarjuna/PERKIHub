import React from 'react';
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit
} from 'react-router-dom';
import { UserResponse } from '../lib/api/contracts';

interface UserLoader {
  users: UserResponse[];
  q: string;
}

export default function Root() {
  const { users, q } = useLoaderData() as UserLoader;

  const [query, setQuery] = React.useState<string>(q);
  React.useEffect(() => {
    setQuery(q);
  }, [q]);

  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  return (
    <div className="flex h-screen w-screen">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? 'loading' : 'text-input'}
              defaultValue={q}
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                const isFirstSearch = q == null;
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            {/* <div className="sr-only" aria-live="polite"></div> */}
          </Form>
          <Form method="post">
            <button
              type="submit"
              className="text-input text-tundora-200 hover:shadow-lg hover:translate-y-1 hover:translate-x-1 duration-200"
            >
              New
            </button>
          </Form>
        </div>

        <nav>
          {users.length ? (
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  <NavLink
                    to={`users/${user.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {user.firstName || user.lastName ? (
                      <>
                        {user.firstName} {user.lastName}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                  </NavLink>
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

      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </div>
  );
}
