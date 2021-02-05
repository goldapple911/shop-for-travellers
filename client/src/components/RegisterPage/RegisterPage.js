import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { registerUser} from '../../actions/user_action';
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");


    const emailHandler = (event)=>{
        setEmail(event.currentTarget.value);
    }

    const nameHandler = (event)=>{
        setName(event.currentTarget.value);
    }
    const passwordHandler = (event)=>{
        setPassword(event.currentTarget.value);
    }
    const password2Handler = (event)=>{
        setPassword2(event.currentTarget.value);
    }


    const submitHandler =(event)=>{
        event.preventDefault();

        if(password !== password2){
            setError( "The password is not matched!")
            return ;
        }

        let body = {
            email: email,
            password:password,
            name:name
        };

        console.log(body);

        dispatch(registerUser(body)).then(response =>{
            if(response.payload.registerSuccess){
                props.history.push("/login")
            }else{alert("Fail to sign up")}})

    };
    return (
        <div className="text-box">
        <div className="container">
                <h2> Register </h2>
                <div className="row">
                    <form className="col s12" onSubmit={submitHandler}>

                        <div className="row">
                            <div className="input-field col s12">
                                <div>
                                <label htmlFor="email">Email</label>
                                <input name="email" value={email} onChange={emailHandler} id="email" type="email" className="validate"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <div>
                                <label htmlFor="email">Name</label>
                                <input name="email" value={name} onChange={nameHandler} id="name" type="text" className="validate"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <div>
                                <label htmlFor="password">Password</label>
                                <input name="password" value={password} onChange={passwordHandler} id="password" type="password" className="validate"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <div>
                                <label htmlFor="password">Confirm Password</label>
                                <input name="password" value={password2} onChange={password2Handler} id="password2" type="password" className="validate"/>
                                </div>
                            </div>
                        </div>

                        {error.length > 0 && <div>{<p>{error}</p>}</div>}

                        <div className="row">   
                            <div className="col 12">
                                <button className="btn waves-effect red lighten-2 " type="submit" name="action" onClick={submitHandler}>
                                    Register
                                </button>
                            </div>
                        </div>
                
                    </form>
                </div>

            </div>
            </div>
    )
}

export default withRouter(RegisterPage)
