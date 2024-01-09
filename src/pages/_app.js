import "../styles/globals.css";
import { Provider as ConnectionProvider } from "../components/providers/SocketProvider";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ConnectionProvider>
        <Component {...pageProps} />
      </ConnectionProvider>
    </SessionProvider>
  );
}

export default MyApp;
