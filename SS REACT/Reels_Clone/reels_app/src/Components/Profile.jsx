import React from 'react'
import {useState} from 'react'
import {useContext} from "react";
import {AuthContext} from "./AuthContext";

import './Profile.css'
function Profile() {
  let cUser = useContext(AuthContext);
  let [loading,setLoading] = useState("");
  return (
    <>
      {
          cUser == null ? <div>Need To Login</div>
        :
        <>
          <div className="header"></div>
            <div className="main">
              <div className="ping_container">
                <img className = "pimg" src='https://via.placeholder.com/150' alt="jai"></img>
              </div>
              <div className="details">
                <div className="content">JAI</div>
                <div className="content">No Of Posts <span className="bold_text"> Posts </span></div>
                <div className = "content">Email <span>Email.com</span></div>
              </div>
          </div>
        </>
      }
    </>
  )
}
export default Profile