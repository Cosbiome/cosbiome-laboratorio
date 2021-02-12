import { useMemo, useEffect, useState } from "react";
import io from "socket.io-client";

export interface IDataReturnSocket {
  socket: SocketIOClient.Socket;
  online?: boolean;
}

export const useSocket = (serverPath: string): IDataReturnSocket => {
  const socket: SocketIOClient.Socket = useMemo(
    () =>
      io.connect(serverPath, {
        query: { token: sessionStorage.getItem("token") },
      }),
    [serverPath]
  );
  const [online, setOnline] = useState<boolean>(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};
