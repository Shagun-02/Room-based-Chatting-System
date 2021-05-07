import { useEffect, useState } from "react";
import app_config from "../config";
import io from "socket.io-client";
import ManageRooms from "./managerooms";
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

const api_url = app_config.api_url;

const Chat = () => {
  const [socket, setSocket] = useState(io(api_url, { autoConnect: false }));
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [selRoom, setSelRoom] = useState("")

  const connectToServer = () => {
    socket.connect();
    console.log("requested");
  };

  useEffect(() => {
    connectToServer();

    socket.on('rcvmsg', data => {
        console.log(data);
        console.log(messageList);
        setMessageList([...messageList, data]);
        console.log(messageList);
    });

  }, []);

  const sendMessage = () => {
      console.log('message sent');
      let obj = {message : message, room : selRoom}
      setMessageList([...messageList , obj]);
      socket.emit('sendmsg', obj);
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const recieveMsg = () => {
      return new Promise( obj => {
          socket.on('rcvmsg', data => {
              return data;
          })
      }).then(data => {
          console.log(data);
      }).catch(err => console.error(err));
  }

  return (
    <div>
    <ManageRooms socket={socket} selRoom = {selRoom} setSelRoom={setSelRoom}></ManageRooms>
      <h2>Chat Component</h2>
      <h3>Selected Room  : {selRoom}</h3>

      <div className="card">
        <div className="card-body">
            <div className="chat-box" style={{height: "20rem"}}>
            <ul className="list-group">
            {messageList.map((messageobj, index) => {
              return (
                
                <ChatMsg key={index}
      avatar={''}
      messages={[ messageobj.message
        
      ]}
    />
              )
          } )}

            </ul>
            </div>
            <div className="input-group">
                <input className="form-control" placeholder="Enter message"  value={message} onChange={handleChange}/>
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
