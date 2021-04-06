import React,{useEffect, useState} from'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [images, setImages] = useState([])
    useEffect(() => {
        if(props.detail.images && props.detail.images.length>0){
            let images =[];

            let url="";
            if(process.env.NODE_ENV ==="production"){
                url = "https://travel-shop.herokuapp.com/"
            }else{
                url="http://localhost:5000/"
            }
            props.detail.images.map(item=>{
                images.push({
                    original:`${url}${item}`,
                    thumbnail: `${url}${item}`
                })
            })
            setImages(images);
        }
    }, [props.detail]);
    return (
        <div>
            <ImageGallery items={images}/>
            
        </div>
    )
}

export default ProductImage
