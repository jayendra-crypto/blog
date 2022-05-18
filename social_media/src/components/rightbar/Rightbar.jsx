import React from 'react'
import './rightbar.css'
import { Users } from "../../dummyData";
import Online from '../online/Online'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const BF = process.env.REACT_APP_PUBLIC_FOLDER_PROFILE;
    
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
   
    const currentlyFolowing=currentUser.followings.includes(user?.id)
    
    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("http://localhost:8800/api/users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (err) {
          
        }
      };
      getFriends();
    }, [user]);
  
    const handleClick = async () => {
      try {
        if (currentUser.followings.includes(user._id)) {
          await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user._id });
        }
        
      } catch (err) {
      }
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
              </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };



    const ProfileRightbar = () => {
        const PF=process.env.REACT_APP_PUBLIC_FOLDER;
        return (
            <>
            {user.username !== currentUser.username && (
              <button className="rightbarFollowButton" onClick={handleClick}>
              
                {currentUser.followings.includes(user._id) ? "Unfollow" : "Follow"}
                {currentUser.followings.includes(user._id) ? <Remove /> : <Add />}
              </button>
            )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">
                  {user.relationship === 1
                    ? "Single"
                    : user.relationship === 1
                    ? "Married"
                    : "-"}
                </span>
              </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
              {friends.map((friend) => (
                <Link
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend.profilePicture
                          ? BF + friend.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        );
    };

    return (
        <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    )
}

export default Rightbar
