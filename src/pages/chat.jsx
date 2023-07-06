import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { sendMsg, receiveMsg } from "../utils/api-routes";
import Axios from 'axios'
import JoinChat from "./join-chat";

function Chat({ socket, email }) {
  const [showChat, setShowChat] = useState(true)
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {

      const messageData = {
        room: "fpt",
        author: email,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      const { data } = await Axios.post(sendMsg, {
        room: messageData.room,
        author: email,
        message: messageData.message,
        time: messageData.time
      });


      setCurrentMessage("");
    }
  };

  const logout = async () => {
    setShowChat(false)
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    (async () => {
      const { data } = await Axios.get(`${receiveMsg}`)
      console.log(data)
      if (Array.isArray(data.receiveMessage) && data.receiveMessage.length > 0) {
        for (let i = 0; i < data.receiveMessage.length; i++) {
          setMessageList((list) => [...list, data.receiveMessage[i]])
        }
      }
    })();

  }, [socket]);

  return (
    <div>
      {showChat ? (
        <div className="chat-window" >
          <div className="chat-header">
            <p>
              Message
              <p
                className="chat-logout"
                onClick={logout}
              >X</p>
            </p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {
                console.log(messageContent)
                return (
                  <div
                    className="message"
                    id={email === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author.split("@")[0]}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Message"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            {/* <input type="file" id="fileInput"/> */}
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      ) : (
        <JoinChat />
      )
      }
    </div>
  );
}

export default Chat;
