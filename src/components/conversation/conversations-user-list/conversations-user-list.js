import { FiSearch } from "react-icons/fi";
import styles from "./conversations-user-list.module.css";
import { useEffect, useState } from "react";
import { createConversation, getUserList } from "../../../api-routes/ApiRoutes";
import { useRouter } from "next/router";
import { useConnection } from "../../providers/SocketProvider";
import { signOut, useSession } from "next-auth/react";

const ConversationsUserList = () => {
  const [users, setUsers] = useState();
  const router = useRouter();
  const { data: session } = useSession();

  const getData = async () => {
    const data = await getUserList();
    setUsers(data?.data?.result);
  };

  useEffect(() => {
    getData();
  }, []);

  const Message = async (id) => {
    const userId = session?.user?.id;
    const {data} = await createConversation({participantOneId:userId,participantTwoId:id});
    let conversationId = data.result;
    router.push(`/conversations/${conversationId}`);
  };

  const Logout = async () => {
    signOut();
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["search"]}>
          <FiSearch />
          <input
            className={styles["search-input"]}
            type="text"
            placeholder="Search"
          />
        </div>
        <div className={styles["user-container"]}>
          {users?.map((u, i) => (
            <div
              onClick={() => Message(u._id)}
              key={i}
            >
              {session.user.id!=u._id && <div className={styles["user"]}>{u.name}</div>}
            </div>
          ))}
        </div>
        <div onClick={Logout} className={styles["log-out"]}>Log Out</div>
      </div>
    </>
  );
};

export default ConversationsUserList;
