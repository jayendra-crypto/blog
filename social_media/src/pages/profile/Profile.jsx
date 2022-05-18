import "./profile.css";
import Topbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { Edit, CameraAlt } from "@material-ui/icons"
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER_COVER;
    const BF = process.env.REACT_APP_PUBLIC_FOLDER_PROFILE;
    const DF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const [profilePic, setProfilePic] = useState(user.profilePicture);
    const [coverPic, setCoverPic] = useState(null);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const username = useParams().username;

    const handleCoverChange = async (e) => {
        setCoverPic(e.target.files[0])

    }

    const handleProfileChange = (e) => {
        setProfilePic(e.target.files[0])
    }


    useEffect(() => {
        const addCoverPic = async () => {
            if (coverPic) {
                const data = new FormData();
                const fileName = Date.now() + coverPic.name;
                data.append("name", fileName);
                data.append("file", coverPic);

                try {
                    await axios.post("http://localhost:8800/api/coverUpload", data);
                } catch (err) { }
                try {
                    await axios.put("http://localhost:8800/api/users/update/" + currentUser._id, { coverPicture: fileName });

                } catch (err) { console.log(err) }
                dispatch({ type: "CoverPic", payload: fileName });
                window.location.reload();

            }
        }

        addCoverPic();
    }, [coverPic]);

    useEffect(() => {
        const addProfilePic = async () => {
            if (profilePic) {
                const data = new FormData();
                const fileName = Date.now() + profilePic.name;
                data.append("name", fileName);
                data.append("file", profilePic);

                try {
                    await axios.post("http://localhost:8800/api/profileUpload", data);
                } catch (err) { }
                try {
                    await axios.put("http://localhost:8800/api/users/update/" + currentUser._id, { profilePicture: fileName });

                } catch (err) { console.log(err) }
                dispatch({ type: "CoverPic", payload: fileName });
                window.location.reload();

            }
        }

        addProfilePic();
    }, [profilePic]);


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    user.coverPicture
                                        ? PF + user.coverPicture
                                        : DF + "person/noCover.png"
                                }
                                alt=""
                            />


                            {user.username == currentUser.username && (
                                <form >
                                    <label htmlFor="filex" className="cameraIcon">
                                        <CameraAlt />
                                        <span className="cameraTitle">Change cover photo</span>
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            id="filex"
                                            accept=".png,.jpeg,.jpg"
                                            onChange={handleCoverChange}
                                        />
                                    </label>


                                </form>

                            )}



                            <img
                                className="profileUserImg"
                                src={
                                    user.profilePicture
                                        ? BF + user.profilePicture
                                        : DF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                            {user.username == currentUser.username && (
                                <form>
                                    <label htmlFor="file" className="editIcon">
                                        <Edit />

                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            id="file"
                                            accept=".png,.jpeg,.jpg"
                                            onChange={handleProfileChange}
                                        />

                                    </label>
                                </form>


                            )}


                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}