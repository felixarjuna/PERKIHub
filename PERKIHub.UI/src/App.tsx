import { Form } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="">
      <h1 className="text-2xl my-5">Sign in to PerkiHub</h1>

      <div>
        <Form method="post">
          <div className="m-2 px-3 w-80">
            <label className="my-2">
              Username or email address
              <input type="text" className="p-2 rounded-lg" name="email" />
            </label>
          </div>
          <div className="m-2 px-3 flex flex-col w-80">
            <label className="my-2">
              Password
              <input type="text" className="p-2 rounded-lg" name="password" />
            </label>
          </div>
          <button className="mt-4">Sign in</button>
        </Form>
      </div>
    </div>
  );
}

export default App;
