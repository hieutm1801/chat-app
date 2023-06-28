import "./../css/chat.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const socket = io.connect("http://localhost:3001");

function JoinChat() {
  const [email, setEmail] = useState("");
  const [showChat, setShowChat] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const joinRoom = () => {

    const emailRegex = /^[\w.-]+@fpt\.com$/;
    if (email === "") {
      toast.error(
        "Email is require.",
        toastOptions
      );
    } else if (!emailRegex.test(email)) {
      toast.error(
        "Input email @fpt.com",
        toastOptions
      );
    } else {
      socket.emit("join_room", "fpt");
      setShowChat(true);
    }
  };

  return (
    <div className="common">
      {!showChat ? (
        <div className="join-chat-container">
          <h3>FPT Chat</h3>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinRoom();
            }}
          />
          <button onClick={joinRoom}>Join</button>
          <ToastContainer />
        </div>
      ) : (
        <Chat socket={socket} email={email} />
      )}
    </div>
  );
}

export default JoinChat;