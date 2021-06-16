import { useEffect, useState } from "react";
import app_config from "../config";
import io from "socket.io-client";
import ManageRooms from "./managerooms";
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

import { Card, CardContent, TextField, CardHeader } from "@material-ui/core";



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
    let obj = { message: message, room: selRoom, sent: true }
    setMessageList([...messageList, obj]);
    socket.emit('sendmsg', obj);
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const recieveMsg = () => {
    return new Promise(obj => {
      socket.on('rcvmsg', data => {
        return data;
      })
    }).then(data => {
      console.log(data);
    }).catch(err => console.error(err));
  }



  return (
    <div className="row mt-3" >
      <div className="col-md-11 mx-auto">
        <Card>
          <CardContent>
            <div className="row">
              <div className="col-md-4" style={{ borderRight: '1px solid grey', borderRight: '1px solid grey' }}>
                <h2>Chat Component</h2>
                <h3>Selected Room  : {selRoom}</h3>
                <ManageRooms socket={socket} selRoom={selRoom} setSelRoom={setSelRoom}></ManageRooms>
              </div>
              <div className="col-md-8" >
                <Card>
                  <div style={{ padding: '1rem 2rem' }}>

                    <h3>{selRoom}</h3>

                  </div>
                  <hr />
                  <CardContent>
                    <div className="chat-box" style={{ height: "63vh", padding: '3rem' }}>
                      <ul className="list-group">
                        {messageList.map((messageobj, index) => {
                          return (
                            <ChatMsg key={index}
                              side={messageobj.sent ? 'right' : 'left'}
                              avatar={''}
                              messages={[messageobj.message
                              ]}
                            />
                          )
                        })}

                      </ul>

                    </div>

                    <div className="input-group" style={{ marginTop: 'auto' }}>
                      <input className="form-control" placeholder="Enter message" value={message} onChange={handleChange} />
                      <div className="input-group-append">
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                      </div>
                    </div>
                  </CardContent>
                </Card>



              </div>
            </div>

          </CardContent>

        </Card>
      </div>
    </div >
  );
};

export default Chat;