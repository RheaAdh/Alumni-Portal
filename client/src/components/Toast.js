import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Toast = ({ message }) => {
  const notify = () => toast(message);
  return (
    <div>
      {/* <button onClick={notify}>{message}</button> */}
      <h4 style={{ display: "none" }}>{notify()}</h4>
      <Toaster />
    </div>
  );
};

export default Toast;
