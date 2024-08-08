import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  let isLoggedIn = false;

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
