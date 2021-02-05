import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {auth} from '../actions/user_action'

export default function(SpecificComponent, option, adminRoute = null){

    //null => everybody can enter
    //true => only logged in user can enter
    //false => logged in user can not enter

    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response =>{
                console.log(response);

                // status without login
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push("/login")
                    }

                }else{
                    // status with login 
                    // but not admin for an admin page
                    if(adminRoute && !response.payload.isAuth){
                        props.history.push("/")
                    }
                    if(!option){
                        props.history.push("/")

                    }
                }
            } )
           
        }, []);

        return (<SpecificComponent />)
    }




    return AuthenticationCheck;

}