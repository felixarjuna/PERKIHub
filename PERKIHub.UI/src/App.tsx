import { Form } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <h1 className="text-2xl my-5">Sign in to PerkiHub</h1>

      <div className="border-2 border-red-200 px-8 py-8 rounded-md">
        <Form method="post">
          <div className="flex flex-col w-64 ">
            <label className="my-2 flex items-start" htmlFor="email-field">
              Username or email address
            </label>
            <input
              id="email-field"
              type="text"
              className="p-2 rounded-lg block mt-1"
              name="email"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="my-2 flex items-start" htmlFor="password-field">
              Password
            </label>
            <input
              id="password-field"
              type="password"
              className="p-2 rounded-lg block mt-1"
              name="password"
            />
          </div>
          <button className="mt-8">Sign in</button>
        </Form>
      </div>
    </div>
  );
}

export default App;
