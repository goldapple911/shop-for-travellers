import React,{useState} from "react";
import { Radio, Collapse } from "antd";

const { Panel } = Collapse;


function RadioBox(props) {
    const [value, setValue] = useState(0);
    const price = props.list;
    const renderRadioBox= ()=>(
        price.map(item =>(
            <Radio key={item._id} value={`${item._id}`}>{item.name}</Radio>
        ))
    )

    const handleChange= (event)=>{

        setValue(event.target.value);
        props.handleFilters(event.target.value);
    }
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Price range" key="1">
                    <Radio.Group onChange={handleChange} value={value}>
                        {renderRadioBox()}

                    </Radio.Group>


                </Panel>

            </Collapse>
        </div>
    )
}

export default RadioBox
