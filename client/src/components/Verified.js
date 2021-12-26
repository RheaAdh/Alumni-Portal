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
      url: `/api/auth/verifyemail/${token}`,
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
    <div className="checkverify">
      {verified ? (
        <div className="verify">
          <h1> Yippe your verified!</h1>
        </div>
      ) : (
        <div className="unverify">
          <h1> Something went wrong </h1>
        </div>
      )}
    </div>
  );
};

export default Verified;
