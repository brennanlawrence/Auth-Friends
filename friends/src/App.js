import LoginForm from "./components/LoginForm";
import './App.css';
import Public from "./components/Public";

import { Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/protected">Protected</Link>
        </li>
      </ul>
      <Route path="/login" component={LoginForm} />
      <PrivateRoute path="/protected" component={ProtectedRoute}/>
    </div>
  );
}

export default App;
