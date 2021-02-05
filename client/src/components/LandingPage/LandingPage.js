import React, {useEffect} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom'

function LandingPage(props) {
    useEffect(()=>{
        axios.get("/api")
        .then(response => console.log(response.data))
    }, []);

    const handleLogout = ()=>{
        axios.get('/api/user/logout')
        .then(response => {
            console.log(response.data);
            if(response.data.success){
                props.history.push("/login");
            }else{
                alert("Error")
            }
        })
    }
    return (
        <div>
            <h1>please</h1>
            <button onClick={handleLogout}>Logout</button>
            
        </div>
    )
}

export default withRouter(LandingPage)
