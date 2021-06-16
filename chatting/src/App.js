import logo from "./logo.svg";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Chat from "./components/chat";
import ManageRooms from "./components/managerooms";
import { ThemeProvider } from "@livechat/ui-kit";
import Header from "./components/header";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div style={{ height: '100%' }}>
      <ThemeProvider>
        <Router>

          <Header></Header>
          <Route path="/chat" component={Chat} />
          <Route path="/login">
            <Login />

          </Route>

          <Route path="/register">
            <Register />
          </Route>
          <Redirect to="/login" exact path="/"></Redirect>

        </Router>


      </ThemeProvider>
    </div>
  );
}

export default App;
