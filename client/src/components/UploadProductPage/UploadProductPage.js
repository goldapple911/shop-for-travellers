import React,{useState} from 'react'
import './Upload.css';
import {Typography, Button, Form, message, Input} from "antd";
import FileUpload from '../utils/FileUpload';
import axios from 'axios';

const {Title} = Typography;
const {TextArea} =Input;

const continents=[
    {key: 1, value:"Africa"},
    {key: 2, value:"Europe"},
    {key: 3, value:"Asia"},
    {key: 4, value:"North America"},
    {key: 5, value:"South America"},
    {key: 6, value:"Australia"},
    {key: 7, value:"Antarctica"},

]


function UploadProductPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);

    const [images, setImages]= useState([]);

    const onTitleChange = (event)=>{
        setTitle(event.currentTarget.value);
    }

    const onDescriptionChange = (event)=>{
        setDescription(event.currentTarget.value);
    }

    const onPriceChange = (event)=>{
        setPrice(event.currentTarget.value);
    }

    const onContinentselect = (event)=>{
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImage)=>{
        console.log(newImage);
        setImages(newImage)
    }

    const onSubmit=(event)=>{
        event.preventDefault();

        if(!title || !description || !continent || !images){
            return alert("Please fill all the inputs")
        }

        const variables= {
            writer: props.user.userData._id,
            title,
            description,
            price,
            images,
            continent,
        
        }

        axios.post('/api/product/uploadProduct',variables ).then(response =>{
            console.log(response.data);
            if(response.data.success){
                alert("Product successfully uploaded!")
                props.history.push('/');
            }else{
                alert("Failed to upload the product")
            }
        })

    }

    return (
        <div className="upload_page">
            <div className="upload_header">
                    <Title level={2}>Upload Travel Product</Title>
            </div>
  

        <Form onSubmi={onSubmit} >
            <FileUpload refreshFunction ={updateImages}/>

            <label>Title</label>
            <Input onChange={onTitleChange}  value={title}/>

            <br/>
            <br/>
            <label >Description</label>
            <TextArea onChange={onDescriptionChange} value={description} />
            <br/>
            <br/>
            <label >Price($)</label>
            <Input 
            onChange={onPriceChange}
            value={price}
            type="number"
           />
           <br/>
           <br/>
           <label >Continents</label>

           <select onChange={onContinentselect}  value={continent}>
                {continents.map(item =>(
                      <option key={item.key} value={item.key}>{item.value}</option>
                ))}
            </select>
            <br/>
            <br/>
            <Button onClick={onSubmit}>
                Submit
            </Button>
        </Form>
        </div>
    )
}

export default UploadProductPage
