import React,{useState} from 'react';
import Dropzone from 'react-dropzone';
import {PlusOutlined} from '@ant-design/icons';
import './utils.css';
import { useDispatch } from 'react-redux';
import {uploadImage} from '../../actions/product_action';

function FileUpload(props) {
    const [images, setImages]= useState([]);

    const dispatch = useDispatch();
    const onDrop=(files)=>{
        // set file format to send it to the server.
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        dispatch(uploadImage(formData, config)).then(response => {
            console.log(response);
            if (response.payload.success){
                setImages([...images, response.payload.image]);
                props.refreshFunction([...images, response.payload.image])

            }else{
                console.log(response);
                alert('Faild to save the image in Server');
            }
        })

    }

    return (
        <div className="fileupload">
            <Dropzone 
           onDrop={onDrop}
           multiple={false}
           maxSize={800000000}
            >

            {({getRootProps, getInputProps})=>(
                <div className="dropbox" {...getRootProps()}>
                                            {/* {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })} */}
                    <input {...getInputProps()}/>
                    <PlusOutlined style={{ fontSize: '3rem'}}/>
                </div>
            )}

            </Dropzone>

            <div className="selected_box">

                <div onClick>
                    <img />

                </div>
            </div>


            
        </div>
    )
}

export default FileUpload
