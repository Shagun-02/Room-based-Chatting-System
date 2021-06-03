import { Button, Card, CardContent, TextField } from "@material-ui/core"
import { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';

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
        socket.emit('createroom', { room_name: room });
    }

    const SelectRoom = (roomName) => {
        props.setSelRoom(roomName);
        socket.emit('joinroom', roomName);
    }

    return (
        <div>
            <Card className="col-md-12 mx-auto" >
                <CardContent>
                    <div style={{ height: '40rem' }}>
                        <ul className="list-group">
                            {roomList.map((roomobj, index) => {
                                return (
                                    <li key={index} className="list-group-item" onClick={e => SelectRoom(roomobj.room_name)}>
                                        {roomobj.room_name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-8">
                            <TextField className="w-100" label="Room Name" variant="filled" onChange={handleChange} />
                        </div>
                        <div className="col-4">
                            <Button
                                size="large"
                                variant="contained"
                                color="default"
                                onClick={handleClick}
                                startIcon={<AddIcon />}
                            >
                                Add Room
                      </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default ManageRooms;