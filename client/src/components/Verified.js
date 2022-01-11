import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loading from "./Loading";

const Verified = () => {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://primus-alumni-portal.herokuapp.com/api/auth/verifyemail/${token}`,
    }).then((result) => {
      setLoading(false);
      if (result.data.success) {
        setVerified(true);
      }
    });
  }, []);
  if (loading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }
  return (
    // <div className="register">
    //   <div className="shade" style={{ zIndex: "0" }}></div>
    //   <div className="overlay">
    //     <div>
    // <div className="checkverify">
    //   {verified ? (
    //     <div className="verify">
    //       <h1 style={{ color: "white" }}> You are verified!</h1>
    //       <center>
    //         <button
    //           onClick={() => {
    //             history.push("/login");
    //           }}
    //           style={{ zIndex: "100" }}
    //         >
    //           Login Here
    //         </button>
    //       </center>
    //     </div>
    //   ) : (
    //     <div className="unverify">
    //       <h1 style={{ color: "white" }}> Something went wrong </h1>
    //     </div>
    //   )}
    // </div>
    //     </div>
    //   </div>
    // </div>
    <div className="register">
      <div className="shade"></div>
      <div className="overlay">
        <div className="container">
          <div>
            <div className="checkverify">
              {verified ? (
                <div className="verify">
                  <h1 style={{ color: "white" }}> You are verified!</h1>
                </div>
              ) : (
                <div className="unverify">
                  <h1 style={{ color: "white" }}> Something went wrong </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verified;
