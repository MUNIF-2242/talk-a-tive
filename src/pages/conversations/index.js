import { getSession } from "next-auth/react";
import ConversationBox from "../../components/conversation/conversation-box/conversation-box";
import ConversationsUserList from "../../components/conversation/conversations-user-list/conversations-user-list";

const index = () => {
  return (
    <>
      <ConversationsUserList/>
    </>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default index;