import React from 'react'

function UserCartBlock(props) {
    let url="";
    if(process.env.NODE_ENV ==="production"){
        url = "https://travel-shop.herokuapp.com/"
    }else{
        url="http://localhost:5000/"
    }
    const renderCartImage=(images)=>{
        if(images.length >0){
            let image = images[0];
            return `${url}${image}`
        }
    }
    const renderItems=()=>(
        props.products && props.products.map(item=>(
            <tr key={item._id}>
            <td>
                <img style={{ width: '70px' }} alt="product" 
                src={renderCartImage(item.images)} />
            </td> 
            <td>{item.quantity} EA</td>
            <td>$ {item.price} </td>
            <td><button 
            onClick={()=> props.removeItem(item._id)}
            >Remove </button> </td>
        </tr>
        ))
    )
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Romove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                {renderItems()}
                </tbody>

            </table>
        </div>
    )
}

export default UserCartBlock
