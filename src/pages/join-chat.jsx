import "./../css/chat.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios'
import { host, checkUserExists, addUser } from "../utils/api-routes";

const socket = io.connect("https://chat-app-9acl.onrender.com/");

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

  const submit = async () => {

    if (handleValidation()) {

      const { data } = await Axios.get(`${checkUserExists}/${email}`)

      if (
        data.status === true
        && Array.isArray(data.user)
        && data.user.length > 0
        && data.user[0].email === email
      ) {
        joinRoom();
      } else {
        addUserDB();
      }
    }
  };

  const addUserDB = async () => {
    const { data } = await Axios.post(addUser, {
      username: email.split("@")[0],
      email: email
    })
    if (data.status === true) {
      joinRoom();
    }
  }

  const joinRoom = () => {
    socket.emit("join_room", "fpt");
    setShowChat(true);
  }

  const handleValidation = () => {
    const emailRegex = /^[\w.-]+@fpt\.com$/;
    if (email === "") {
      toast.error(
        "Email is required.",
        toastOptions
      );
      return false
    } else if (!emailRegex.test(email)) {
      toast.error(
        "Input email @fpt.com",
        toastOptions
      );
      return false
    } else {
      return true
    }
  }

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
              event.key === "Enter" && submit();
            }}
          />
          <button onClick={submit}>Join</button>
          <ToastContainer />
        </div>
      ) : (
        <Chat socket={socket} email={email} />
      )}
    </div>
  );
}

export default JoinChat;