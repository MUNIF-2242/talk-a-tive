import { Server } from "socket.io";
import {
  updateConversationMessageDeleteService,
  updateConversationMessageEditService,
  updateConversationSeenService,
  updateConversationService,
} from "../../../../lib/services/conversation-service";

let users = {};

const SocketHandler = async (req, res) => {
  if (res.socket.server.io) {
    console.log("already set up");
    res.end();
    return;
  }
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.use((socket, next) => {
    setInterval(() => {
      socket.emit("ping", "ok");
    }, 1000);
    next();
  });

  io.on("connection", async (socket) => {
    
    // console.log("after connect",socket.id);

    // console.log("total active users",users);

    socket.on("join", async ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("leave", async ({ roomId }) => {
      socket.leave(roomId);
    });

    socket.on("send-message", async (message, conversationId) => {
      const data = await updateConversationService({
        message: message,
        conversationId,
      });
      io.to(conversationId).emit("receive-message", data);
    });

    socket.on("message-seen", async ({ conversationId, messageId }) => {
      const data = await updateConversationSeenService({
        conversationId,
        messageId,
      });
      if (data == "updated") {
        io.to(conversationId).emit("update-seen-message", messageId);
      }
    });

    socket.on("typing", async ({ conversationId, typingFor, isTyping }) => {
      io.to(conversationId).emit("is-typing", {typingFor,isTyping});
    });

    socket.on("save-message", async ({ conversationId, messageId, message }) => {
      const data = await updateConversationMessageEditService({ conversationId, messageId, message });
      if (data == "updated") {
        io.to(conversationId).emit("update-edited-message", {messageId, message});
      }
    });

    socket.on("delete-message", async ({ conversationId, messageId }) => {
      const data = await updateConversationMessageDeleteService({ conversationId, messageId });
      if (data == "updated") {
        io.to(conversationId).emit("update-deleted-message", {messageId});
      }
    });

    socket.on("login", async ({userId}) => {
      users[socket.id] = userId;
      // console.log("login",users);
      io.emit("online-users",users);
    });

    socket.on("get-users", async () => {
      io.emit("online-users",users);
    });

    socket.on("disconnect", async () => {
      delete users[socket.id];
      // console.log("logout",users);
      io.emit("online-users",users);
    });

  });
};

export default SocketHandler;
