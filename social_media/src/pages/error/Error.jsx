import React from 'react'
import './error.css'
import { Link } from 'react-router-dom'
const Error = () => {
    return (


        <div className="banner">
            {/* <Banner title="404" subtitle="page not found">
                <Link to="/" className="btn-primary">
                   return Home
                </Link>
                
            </Banner> */}
            <h1>""404</h1>
            <div />
            <p>page not found</p>
            <Link to="/" className="btn-primary">
                return Home
            </Link>


        </div>


    )
}
export default Error;