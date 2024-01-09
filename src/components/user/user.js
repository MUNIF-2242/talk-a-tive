import { useRouter } from "next/router";
import styles from "./user.module.css";
import { useState } from "react";
import { createUser } from "../../api-routes/ApiRoutes";
import { useSession, signIn, signOut } from "next-auth/react";

const user = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const Enter_Login = async () => {
    const status = await signIn('credentials',{
      redirect:false,
      name:name,
      password: password,
      callbackUrl:"/conversations"
    })
    if(status.ok){
      router.push(status.url);
    }
    else{
      console.log(status.error);
    }
  };

  const Enter_Register = async () => {
    await createUser({name,password});
    router.push("/conversations");
  };

  return (
    <div className={styles["container"]}>
      <h1>Join & Message</h1>
      <div>
        <div>
          <label>Name</label> <br />
          <input onChange={(e) => setName(e.target.value)}></input> <br />
          <label>Password</label> <br />
          <input onChange={(e) => setPassword(e.target.value)}></input> <br />
          <button onClick={Enter_Login}>Login</button>
          <button onClick={Enter_Register}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default user;
