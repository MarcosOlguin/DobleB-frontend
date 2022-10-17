import { createContext, useEffect, useState } from "react";

const Context = createContext();

const UserContextProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    setJwt(window.localStorage.getItem("UserLogged"));
  }, []);

  let data = {
    jwt,
    setJwt,
  };
  return <Context.Provider value={data}>{children}</Context.Provider>;
};
export { UserContextProvider };
export default Context;
