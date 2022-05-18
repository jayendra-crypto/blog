import React from 'react'
import './navbar.css'
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link ,useHistory} from "react-router-dom";
import { useContext,useRef,useEffect ,useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function Navbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const BF = process.env.REACT_APP_PUBLIC_FOLDER_PROFILE;
    let history = useHistory();
    const [search,setSearch] = useState("");
    const handleSearch=async (e)=>{
        e.preventDefault();
        try
    {
        const res = await axios.get(`http://localhost:8800/api/users?username=${search}`);
        setSearch("")
        history.push("/profile/"+res.data.username);

    }catch (err) {alert("No user found with this username") }
        
    }
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">social</span>
                </Link>
            </div>

            <div className="navbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <form onSubmit={handleSearch}>
                    <input placeholder="Search for friend, post or video" className="searchInput" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    </form>
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarLinks">
                    <Link to="/" style={{ textDecoration: "none" ,color:"white"}} ><span className="navbarLink">Homepage</span></Link>
                    <Link to="/logout" style={{ textDecoration: "none" ,color:"white"}} ><span className="navbarLink">Logout</span></Link>
                    {/* <span className="navbarLink">Timeline</span> */}
                </div>
                <div className="navbarIcons">
                    <div className="navbarIconItem">
                        <Person />
                        <span className="navbarIconBadge">1</span>
                    </div>
                    <div className="navbarIconItem">
                        <Chat />
                        <span className="navbarIconBadge">2</span>
                    </div>
                    <div className="navbarIconItem">
                        <Notifications />
                        <span className="navbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                            user.profilePicture
                                ? BF + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="navbarImg"
                    />
                </Link>
            </div>

        </div>
    )
}

export default Navbar
