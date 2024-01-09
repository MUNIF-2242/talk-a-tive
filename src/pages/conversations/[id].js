import { useRouter } from "next/router";
import ConversationsUserList from "../../components/conversation/conversations-user-list/conversations-user-list";
import { useEffect } from "react";
import ConversationBox from "../../components/conversation/conversation-box/conversation-box";
import { getSession } from "next-auth/react";

const index = () => {
  
  return (
    <>
      <ConversationsUserList />
      <ConversationBox />
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
