import React,{useState} from "react";
import { Input} from "antd";

const{Search} = Input;

function SearchCompnent(props) {
    const [searchKeyword, setSearchKeyword] = useState("");

    const onChangeSearch= (event)=>{
        setSearchKeyword(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value)
    }
    return (
        <div>
            <Search 
            value={searchKeyword}
            onChange ={onChangeSearch}
            placeholder="Type the keyword.."
            />
            
        </div>
    )
}

export default SearchCompnent
