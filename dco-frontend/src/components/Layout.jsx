import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default Layout;
