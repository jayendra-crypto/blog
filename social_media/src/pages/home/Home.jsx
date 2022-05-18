import React from 'react'
import './Home.css'
import Navbar from '../../components/navbar/Navbar'
import Feed from '../../components/feed/Feed'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Demo from '../../components/demo/Demo'
function home() {
    return (
        <div>
            <Navbar />
            <div className="homeContainer">
                <Sidebar />
                
                <Feed />
                <Demo/>
                {/* <Rightbar /> */}
            </div>
        </div>
    )
}

export default home
