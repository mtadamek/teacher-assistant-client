import { SOCKET_CONNECT, SOCKET_DISCONNECT } from "../constants";

export const connectToSocket = token => ({
    type: SOCKET_CONNECT,
    payload: token
})

export const disconnectFromSocket = () => ({
    type: SOCKET_DISCONNECT
})