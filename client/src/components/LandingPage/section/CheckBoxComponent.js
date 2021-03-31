import React,{useState} from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;



function CheckBoxComponent(props) {

      const continents = props.list;

      const [checked, setChecked] = useState([]);
      const handleToggle= (key)=>{  
        const currentIndex = checked.indexOf(key);
        const newChecked = [...checked];
        if(currentIndex ===-1){
            newChecked.push(key);
        }else{
            newChecked.splice(currentIndex,1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
      }
      
      const renderCheckboxLists = () => (
        continents.map((item, index) => (
            <React.Fragment key={index}>
            <Checkbox onChange={()=>handleToggle(item.key)} type="checkbox" checked={checked.indexOf(item.key) ===-1 ? false : true}/>
            <span>{item.value}</span>
          </React.Fragment>
        ))
      );
  return (
    <div>
         <Collapse defaultActiveKey={['0']} >
         <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBoxComponent;
