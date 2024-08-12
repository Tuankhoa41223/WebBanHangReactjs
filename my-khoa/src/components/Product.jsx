import React, { useEffect, useState } from 'react';
import axios from "axios";
import { storage } from "./config/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
function Product(props) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const [deleteproduct, setDeleteproduct] = useState(null);
    const [editproduct,setEditproduct] = useState(null);
    const [update,setUpdate] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    },[update]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://66ac4fb0f009b9d5c7319adf.mockapi.io/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://66ac4fb0f009b9d5c7319adf.mockapi.io/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    }
    const handleImageChange = (e) => {
        const selectedImg = e.target.files[0];
        if (selectedImg) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(selectedImg);
            setImgUpload(selectedImg);
        } else {
            setPreviewImg(null);
            setImgUpload(null);
        }
    }
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const price = formData.get("price");
        const categoryId = formData.get("categoryId");
        const quantity = formData.get("quantity");
        // ramdom url 
        const productRef = ref(storage, `product/${uuidv4()}`);
        // tai anh len firebasr
        await uploadBytes(productRef, imgUpload);
        // lay ve duong dan 
        const productURL = await getDownloadURL(productRef);
        const product = {
            img: productURL,
            name: name,
            price: price,
            quantity: quantity,
            categoryId: categoryId
        };
        if(editproduct){
            await axios.put(`https://66ac4fb0f009b9d5c7319adf.mockapi.io/products/${editproduct.id}`, product);
            setUpdate(!update);
        }
        else{
            await axios.post("https://66ac4fb0f009b9d5c7319adf.mockapi.io/products", product);
            setUpdate(!update);
        }
     
    }

    function getBrandCategory(id) {
        const category = categories.find(element => element.id == id);

        return category ? category.brand : "" ;
    }
    const resetForm = () => {
        setPreviewImg(null);
        setEditproduct(null);
    }
    const deleteModal = (id) =>{
        setDeleteproduct(id);
    }
    const deleteall = async ()=>{
       try {
        await axios.delete(`https://66ac4fb0f009b9d5c7319adf.mockapi.io/products/${deleteproduct}`);
        setUpdate(!update);
       } catch (error) {
        console.error('Error deleting category:', error);
       }
    }
    const editname = (element) =>{
        console.log(element);
      setEditproduct(element);
      setPreviewImg(element.img); 
      console.log(element.img) ;
    }
    return (
        <div className='container'>
            <div class="row">
                <div className="col-3">
                    <h3>List Product</h3>
                </div>
                <div className="col-6">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button class="btn bg-primary text-white" type="button" id="button-addon2">Button</button>
                    </div>
                </div>
                <div className="col-3 text-end">
                    <button onClick={resetForm} type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add Products
                    </button>
                </div>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={handleAddProduct}>
                                    <div class=" modal-header">
                                        <img src={previewImg ? previewImg : "https://cdn.pixabay.com/photo/2019/03/28/20/22/owl-4087984_640.png"} alt="" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Choose File</label>
                                        <input onChange={handleImageChange} class="form-control" type="file" id="formFile" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Name</label>
                                        <input defaultValue={editproduct ? editproduct.name : ""} type="text" name='name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">CategoryID</label>
                                        <select class="form-select form-select-lg mb-3" name='categoryId' aria-label=".form-select-lg example">
                                            <option selected>Open this select menu</option>
                                            {
                                                categories.map((element) => (
                                            <option value={element.id}>{element.brand}</option>
                                                ))
                                            }
                                        </select>

                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Price</label>
                                        <input defaultValue={editproduct ? editproduct.price : ""} type="number" name='price' class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Quanity</label>
                                        <input  defaultValue={editproduct ? editproduct.quantity : ""} type="number" name='quantity' class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"> Add </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bang">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Img</th>
                            <th scope="col">Name</th>
                            <th scope='col'>CategoryId</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quanity</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((element, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td ><img style={{ height: "50px", width: "50px" }} src={element.img} alt="" /></td>
                                    <td>{element.name}</td>
                                    <td>{getBrandCategory(element.categoryId)}</td>
                                    <td>{element.price}</td>
                                    <td>{element.quantity}</td>
                                    <td>
                                        <button onClick={() => editname(element)} class="btn bg-success text-white me-2 " data-bs-toggle="modal"  data-bs-target="#staticBackdrop"  type="button" id="button-addon2"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button  onClick={() => deleteModal(element.id)} class="btn bg-danger text-white" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" id="button-addon2"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal Delete</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-center" style={{ fontSize: "30px", color: "red" }}>
                                        ARE YOU OKE ?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
                                        <button onClick={() => deleteall()} type="button" data-bs-dismiss="modal" class="btn btn-primary">YES</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;