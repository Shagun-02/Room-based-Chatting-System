import logo from "./logo.svg";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Chat from "./components/chat";
import ManageRooms from "./components/managerooms";
import { ThemeProvider } from "@livechat/ui-kit";
import Header from "./components/header";
function App() {
  return (
    <div>
      <ThemeProvider>
        <Chat></Chat>
        <Header></Header>
        
      </ThemeProvider>
    </div>
  );
}

export default App;
