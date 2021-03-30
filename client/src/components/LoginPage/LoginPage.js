import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../actions/user_action';
import {withRouter} from 'react-router-dom'
import "materialize-css/dist/css/materialize.min.css"

function LoginPage(props) {
    const dispatch = useDispatch();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailHandler = (event)=>{
        setEmail(event.currentTarget.value);
    }

    const passwordHandler = (event)=>{
        setPassword(event.currentTarget.value);
    }

    const submitHandler =(event)=>{
        event.preventDefault();

        let body = {
            email: email,
            password:password
        };

        console.log(body);

        dispatch(loginUser(body)).then(response =>{
            if(response.payload.loginSuccess){
                props.history.push("/")
            }else{alert("Fail to login")}})

    };

    return (
        <div className="text-box">
        <div className="container">
                <h2> Login </h2>
                <div className="row">
                    <form className="col s12" onSubmit={submitHandler}>

                        <div className="row">
                            <div className="input-field col s12">
                                <div>
                                <label htmlFor="email">Email</label>
                                <input name="email" value={email} onChange={emailHandler} id="email" type="email" className="validate"/>
                                <span className="helper-text" data-error="Type a right type email" data-success="right" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <div>
                                <label htmlFor="password">Password</label>
                                <input name="password" value={password} onChange={passwordHandler} id="password" type="password" className="validate"/>
                                <span className="helper-text" data-error="Type a right type password" data-success="right" />
                                </div>
                            </div>
                        </div>

                        <div className="row">   
                            <div className="col 12">
                                <button className="btn waves-effect red lighten-2 " type="submit" name="action" onClick={submitHandler}>
                                    Login
                                </button>
                            </div>
                        </div>
                
                    </form>
                </div>

            </div>
            </div>
    )
}

export default withRouter(LoginPage)
