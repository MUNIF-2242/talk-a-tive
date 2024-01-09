import { useContext, createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSession } from "next-auth/react";

const Context = createContext();
export const useConnection = () => useContext(Context);

export const Provider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  const { data: session } = useSession();
  const data = {
    connection,
  };

  useEffect(() => {
    let socket;

    if (session?.user?.id) {
      axios.get("/api/conversation/socket");
      socket = io();
      socket.connect();
      socket.on("connect", () => {
        setConnection(socket);
      });
      socket.emit("login", { userId: session?.user?.id });
    }
    return () => {
      socket?.off("connect");
    };
  }, [session?.user.id]);

  return <Context.Provider value={{ ...data }}>{children}</Context.Provider>;
};

export default Context;
