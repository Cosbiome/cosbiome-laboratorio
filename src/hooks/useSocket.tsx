import { useMemo, useEffect, useState } from "react";
import io from "socket.io-client";

export interface IDataReturnSocket {
  socket: SocketIOClient.Socket;
  online: boolean;
}

const token = sessionStorage.getItem("token");

export const useSocket = (serverPath: string): IDataReturnSocket => {
  const socket: SocketIOClient.Socket = useMemo(
    () => io.connect(serverPath, { query: { token } }),
    [serverPath]
  );
  const [online, setOnline] = useState<boolean>(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("aaa");

      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("bbb");
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};
