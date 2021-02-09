import React, { createContext, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";
import { IDataReturnSocket } from "../hooks/useSocket";

interface IPropsProviderSocket {
  children: ReactNode;
}

export const SocketContext = createContext<IDataReturnSocket>({
  online: false,
  socket: Socket,
});

export const SocketProvider = ({ children }: IPropsProviderSocket) => {
  const { socket, online } = useSocket("http://192.168.15.157:3001");

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
