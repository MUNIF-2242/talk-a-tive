import { useEffect, useState } from "react";
import styles from "./conversation-box.module.css";
import { useRouter } from "next/router";
import { getConversationDetail } from "../../../api-routes/ApiRoutes";
import { useConnection } from "../../providers/SocketProvider";
import { useSession } from "next-auth/react";

const ConversationBox = () => {
  const router = useRouter();
  const { connection } = useConnection();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [messages, setMessages] = useState(undefined);
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [seen, setSeen] = useState();
  const [edit, setEdit] = useState({});
  const [deleted, setDeleted] = useState({});
  const [typing, setTyping] = useState(false);
  const [editMessageId, setEditMessageId] = useState("");
  const [onlineUsers, setOnlineUsers] = useState({});
  const conversationId = router.query.id;

  const getPreviousConversation = async (conversationId) => {
    const { data } = await getConversationDetail(conversationId);
    setAllMessages(data?.result?.conversation);
    setReceiverId(
      data?.result?.participantOne.userId == userId
        ? data?.result?.participantTwo.userId
        : data?.result?.participantOne.userId
    );

    if (data?.result?.conversation.length) {
      const lastMessage = data.result.conversation.slice(-1)[0];
      if (lastMessage.isSeen === false && lastMessage.receiverId == userId) {
        updateSeenMessage({ messageId: lastMessage._id });
      }
    }
  };

  const updateSeenMessage = ({ messageId }) => {
    connection?.emit("message-seen", { conversationId, messageId });
  };

  useEffect(() => {
    if (messages) {
      setAllMessages((prev) => [...prev, messages]);
      if (messages.senderId !== userId) {
        updateSeenMessage({ messageId: messages._id });
      }
    }
  }, [messages]);

  useEffect(() => {
    if (seen) {
      const updatedMessage = allMessages.map((msg) => {
        if (msg._id == seen) {
          return { ...msg, isSeen: true };
        }
        return msg;
      });
      setAllMessages(updatedMessage);
    }
  }, [seen]);

  useEffect(() => {
    if (edit) {
      const updatedMessage = allMessages.map((msg) => {
        if (msg._id == edit.messageId) {
          return { ...msg, content: { ...msg.content, text: edit.message } };
        }
        return msg;
      });
      setAllMessages(updatedMessage);
    }
  }, [edit]);

  useEffect(() => {
    if (deleted) {
      const updatedMessages = allMessages.filter(
        (msg) => msg._id !== deleted.messageId
      );
      setAllMessages(updatedMessages);
    }
  }, [deleted]);

  const socketListener = async (conversationId) => {
    connection?.emit("join", { roomId: conversationId });
    connection?.emit("get-users");

    connection?.on("receive-message", (data) => {
      setMessages(data);
    });

    connection?.on("update-seen-message", (messageId) => {
      setSeen(messageId);
    });

    connection?.on("update-edited-message", ({ messageId, message }) => {
      setEdit({ messageId, message });
    });

    connection?.on("update-deleted-message", ({ messageId }) => {
      setDeleted({ messageId });
    });

    connection?.on("is-typing", ({ typingFor, isTyping }) => {
      if (typingFor === userId) {
        setTyping(isTyping);
      }
    });

    connection?.on("online-users", (Users) => {
      setOnlineUsers(Users);
    });
  };

  useEffect(() => {
    socketListener(conversationId);
    getPreviousConversation(conversationId);
    setMessages("");
    setAllMessages([]);

    return () => {
      connection?.emit("leave", { roomId: conversationId });
    };
  }, [connection, conversationId]);

  useEffect(() => {
    switch (newMessage.length) {
      case 1:
        connection?.emit("typing", {
          conversationId,
          typingFor: receiverId,
          isTyping: true,
        });
        break;
      case 0:
        connection?.emit("typing", {
          conversationId,
          typingFor: receiverId,
          isTyping: false,
        });
        break;
    }
  }, [newMessage]);

  const handleSubmit = (e) => {
    connection?.emit(
      "send-message",
      {
        senderId: userId,
        receiverId: receiverId,
        content: { text: newMessage },
        contentType: "TEXT",
        isSeen: false,
        orderId: 1234,
      },
      conversationId
    );
    setNewMessage("");
  };

  const Edit = (message, messageId) => {
    setNewMessage(message);
    setEditMessageId(messageId);
  };

  const handleSave = () => {
    connection?.emit("save-message", {
      conversationId,
      messageId: editMessageId,
      message: newMessage,
    });
    setNewMessage("");
    setEditMessageId("");
  };

  const Delete = (messageId) => {
    connection?.emit("delete-message", {
      conversationId,
      messageId,
    });
  };

  return (
    <div className={styles.chat_container_main}>
      <div className={styles.chat_container}>
        <div className={styles.header}>
          <div className={styles.container7}>user name</div>
          <div className={styles.status}>
            {Object.values(onlineUsers).includes(receiverId)
              ? "online"
              : "offline"}
          </div>
        </div>
        <div className={styles.chat_body}>
          {allMessages?.map((msg, i) => (
            <div key={i}>
              {msg.senderId == userId ? (
                <>
                  <p className={styles.chat2}>{msg?.content?.text}</p>
                  <div className={styles.actions}>
                    <p
                      onClick={() => Edit(msg.content.text, msg._id)}
                      className={styles.edit}
                    >
                      edit
                    </p>
                    <p
                      onClick={() => Delete(msg._id)}
                      className={styles.delete}
                    >
                      delete
                    </p>
                  </div>
                  {msg?.isSeen === true ? (
                    <div className={styles.chat2_seen}>Read</div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <p className={styles.chat1}>{msg?.content?.text}</p>
              )}
            </div>
          ))}
        </div>
        <div className={styles.chat_footer}>
          <div>
            {editMessageId && (
              <div
                onClick={() => {
                  setEditMessageId(false), setNewMessage("");
                }}
              >
                x
              </div>
            )}
            <input
              className={styles.chat_footer_input}
              value={newMessage}
              type="text"
              placeholder="Enter your message"
              onChange={(e) => setNewMessage(e.target.value)}
            ></input>
            {editMessageId ? (
              <button
                onClick={handleSave}
                className={styles.chat_footer_button}
              >
                SAVE
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={styles.chat_footer_button}
              >
                SEND
              </button>
            )}

            {typing == true && <div>Typing...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
