import logo from "./logo.svg";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Chat from "./components/chat";
import ManageRooms from "./components/managerooms";
import { ThemeProvider } from "@livechat/ui-kit";
import Header from "./components/header";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
function App() {
  return (
    <div style={{ height: '100%' }}>
      <ThemeProvider>
        <Router>

          <Header></Header>
          <Redirect to ="/login" exact  path="/"></Redirect>
          <Route path ="/chat">
             <Chat/>
          </Route>

          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/login">
            <Login />

          </Route>

          <Route path="/register">
            <Register />
          </Route>
        </Router>


      </ThemeProvider>
    </div>
  );
}

export default App;
