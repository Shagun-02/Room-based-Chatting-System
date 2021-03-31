import { Button, Card, CardContent, TextField } from "@material-ui/core"
import { useEffect, useState } from "react";

const ManageRooms = (props) => {

    const socket = props.socket;

    const [room, setRoom] = useState("");
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        socket.on('room_update', data => {
            setRoomList(data);
            console.log('room updated');
        });
    }, [])

    const handleChange = (e) => {
        setRoom(e.target.value);
    }

    const handleClick = () => {
        createRoom();
        console.log('room created!!');
    }

    const createRoom = () => {
        socket.emit('createroom', {room_name : room});
    }

    const SelectRoom = (roomName) => {
        props.setSelRoom(roomName);
        socket.emit('joinroom', roomName);
    }

    return (
        <div>
            <Card className="col-md-6 mx-auto">
                <CardContent>
                <TextField label="Room Name" variant="filled" onChange={handleChange}/>
                <Button onClick={handleClick}>Add Room</Button>

                <hr />

                <ul className="list-group">
                    {roomList.map((roomobj, index) => {
                        return (
                            <li key={index} className="list-group-item" onClick={e =>SelectRoom(roomobj.room_name) }>
                                {roomobj.room_name}
                            </li>
                        )
                    })}
                </ul>
                </CardContent>
            </Card>

        </div>
    )
}

export default ManageRooms;