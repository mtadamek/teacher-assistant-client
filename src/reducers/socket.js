import io from "socket.io-client";
import { SOCKET_CONNECT, SOCKET_DISCONNECT, AUTH_KEY } from "../constants";
import { SERVER_URL } from "../../config";
import { addQuiz } from "../actions/student";
import { updateActive } from "../actions/groups";
import store from "../store";

let socket = null;

export default (state = socket, action) => {
  const { type, payload } = action;
  switch (type) {
    case SOCKET_CONNECT:
      if (!socket) {
        socket = io(SERVER_URL, {
          query: { token: payload }
        });

        socket.on("welcome", data => {
          //alert(data);
        });

        socket.on("get-new-quiz", quiz => {
          store.dispatch(addQuiz(quiz));
        });

        socket.on("update-active", active => {
          store.dispatch(updateActive(active));
        })
      }
      return socket;
    case SOCKET_DISCONNECT:
      if (socket) {
        console.log("Socket close");
        socket.close();
        socket = null;
      }
      return socket;

    default:
      return state;
  }
};
