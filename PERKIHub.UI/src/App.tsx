import axios from 'axios';
import './App.css';

function App() {
  const onRequestWeather = async () => {
    const data = {
      email: 'felixarjuna@ymail.com',
      password: 'hello123',
    };
    const response = await axios.post('http://localhost:5089/auth/login', data);
    console.log(response);
  };

  return (
    <div className="">
      <h1 className="text-2xl my-5">Sign in to PerkiHub</h1>

      <div>
        <form method="POST">
          <div className="m-2 px-3 flex flex-col w-80">
            <label className="flex my-2">Username or email address</label>
            <input type="text" className="p-2 rounded-lg"></input>
          </div>
          <div className="m-2 px-3 flex flex-col w-80">
            <label className="flex my-2">Password</label>
            <input type="text" className="p-2 rounded-lg"></input>
          </div>
          <button onClick={onRequestWeather} className="mt-4">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
