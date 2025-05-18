import React from "react";
import { UserProvider } from "./context/UserContext";

const Home = () => {
  return (
    <UserProvider>
      <div>Home</div>
    </UserProvider>
  );
};

export default Home;
