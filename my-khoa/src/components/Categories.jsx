import React, { useEffect, useState } from 'react';
import axios from "axios";
import { storage } from "./config/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
function Categories(props) {
    const [categories, setCategories] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const [deleterow, setDeleterow] = useState(null);
    const [editrow,setEditrow] = useState(null);
 
    useEffect(() => {
        fetchCategories();
    });

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://66ac4fb0f009b9d5c7319adf.mockapi.io/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    }
    //handle img chance
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
    const handleAddCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const brand = formData.get("brand");
        // ramdom url 
        const categoryRef = ref(storage, `categories/${uuidv4()}`);
        // tai anh len firebasr
        await uploadBytes(categoryRef, imgUpload);
        // lay ve duong dan 
        const categoryURL = await getDownloadURL(categoryRef);
        const category = {
            img: categoryURL,
            name: name,
            brand: brand
        }
        if(editrow){
            await axios.push("https://66ac4fb0f009b9d5c7319adf.mockapi.io/categories", categories);
        }
        else{
            await axios.post("https://66ac4fb0f009b9d5c7319adf.mockapi.io/categories", categories);
        }
        
       
    }

    const resetForm = () => {
        setPreviewImg(null);
        setEditrow(null);
    }
    const deleteModal = (id) =>{
        setDeleterow(id);
    }
    const deleteall = async ()=>{
       try {
        await axios.delete(`https://66ac4fb0f009b9d5c7319adf.mockapi.io/categories/${deleterow}`);
       } catch (error) {
        console.error('Error deleting category:', error);
       }
    }
    const editchu = (element) =>{
      setEditrow(element);
      setPreviewImg(element.img);   
    }
   

    return (
        <div className='container admin'>
            <div class="row">
                <div className="col-3">
                    <h3>List Categories</h3>
                </div>
                <div className="col-6">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button class="btn bg-primary text-white" type="button" id="button-addon2">Button</button>
                    </div>
                </div>
                <div className="col-3 text-end">
                    <button onClick={resetForm} data-bs-toggle="modal"  data-bs-target="#cartModal" className="btn bg-success text-white" type="button">
                        Add Category
                    </button>
                </div>

                <div className="modal" id="cartModal" tabIndex="-1" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleAddCategory}>
                                <div className="modal-header">
                                    <img src={previewImg ? previewImg : "https://cdn.pixabay.com/photo/2019/03/28/20/22/owl-4087984_640.png"

                                    } alt="" />
                                </div>
                                <div className="modal-body">
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Choose File</label>
                                        <input  onChange={handleImageChange} class="form-control" type="file" id="formFile" />
                                    </div>
                                    <div class="imb-3">
                                        <label for="formFile" class="form-label">Name</label>
                                        <input defaultValue={editrow ? editrow.name : ""} type="text" name="name" class="form-control" placeholder="FullName" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Brand</label>
                                        <input defaultValue={editrow ? editrow.brand:""} type="text" name='brand' class="form-control" placeholder="123 Add..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button  type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bang">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((element, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td ><img style={{ height: "50px", width: "50px" }} src={element.logo} alt="" /></td>
                                    <td>{element.name}</td>
                                    <td>{element.brand}</td>
                                    <td>
                                        <button onClick={() => editchu(element)} class="btn bg-success text-white me-2 " data-bs-toggle="modal"  data-bs-target="#cartModal"  type="button" id="button-addon2"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button onClick={() => deleteModal(element.id)} class="btn bg-danger text-white" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" id="button-addon2"><i class="fa-solid fa-trash"></i></button>
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
                                    <div class="modal-body text-center" style={{fontSize:"30px", color:"red"} }>
                                        ARE YOU OKE ?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
                                        <button onClick={() => deleteall()} type="button"  data-bs-dismiss="modal" class="btn btn-primary">YES</button>
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

export default Categories;