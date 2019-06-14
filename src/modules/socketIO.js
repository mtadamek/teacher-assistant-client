import io from "socket.io-client";
import { SERVER_URL } from "../../config";

const socket = io(SERVER_URL);

socket.on("welcome", data => {
  //alert(data);
});

export default socket;
