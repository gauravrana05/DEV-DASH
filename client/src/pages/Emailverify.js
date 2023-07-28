/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Emailverify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const api = process.env.REACT_APP_BASE_URL;
  const params = useParams();

  useEffect(() => {
    console.log("running use effect");
    const checkUrl = async () => {
      try {
        const url = `${api}/auth/${params.id}/verify/${params.token}`;
        console.log(url);
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    checkUrl();
  }, []);

  return (
    <div>
      {console.log(validUrl)}
      {validUrl ? <div>"Email Verified"</div> : <h1>"404 Not Found!!!"</h1>}
    </div>
  );
};

export default Emailverify;
