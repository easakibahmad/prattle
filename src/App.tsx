import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ChatRoom from "./components/Chat/ChatRoom";

function App() {
  return (
    <div>
      <h1>Chat Application</h1>
      <Register />
      <Login />
      <ChatRoom />
    </div>
  );
}

export default App;
