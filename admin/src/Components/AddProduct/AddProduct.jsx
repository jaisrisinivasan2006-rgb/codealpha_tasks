import React, { useState } from 'react'
import './AddProduct.css';
import upload_area from '../../assets/upload_area.png';
export const AddProduct = () => {

    const [image,setImage]=useState(false);
    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })


    const imageHandler=(e)=>{
               setImage(e.target.files[0]);
    }

    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})

    }
    const Add_product=async ()=>{
        console.log(productDetails)
        //image endpoint to upload
        let responseData;
        let product = productDetails;


        let formData=new FormData();
        formData.append('product',image);


        await fetch('http://localhost:5000/upload',{
            method:'POST',
            headers:{
                Accept:"application/json",
            },
            body:formData
        }).then((resp)=>resp.json()).then((data)=>{
            responseData=data;
        })

        if(responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            //send this to addproduct endpoint
            await fetch('http://localhost:5000/addproduct',{
                method:'POST',
                headers:{
                    Accept:"application/json",
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),

            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    }

  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input type="text" name='name' placeholder='Type here' value={productDetails.name} onChange={changeHandler}/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} type="text" name="old_price" placeholder='Type here' onChange={changeHandler}/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} type="text" name="new_price" placeholder='Type here' onChange={changeHandler}/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} name="category" className='add-product-selector' onChange={changeHandler}>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input'>:
               <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt=''/>
            </label>
            <input type='file' name='image' id='file-input'onChange={imageHandler} hidden/>

        </div>
        <button onClick={Add_product} className='addproduct-btn'>Add</button>
    </div>
  )
}
export default AddProduct;
