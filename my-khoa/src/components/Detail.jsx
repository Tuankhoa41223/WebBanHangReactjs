import React, { useEffect, useState} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
function Detail(props) {
    const [products, setProducts] = useState([]);
    const [product,setProduct] = useState({});
    const { id } = useParams(); // Fix: Add () after useParams
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
  

    useEffect(() => {
       fetchProducts();
    },[]);

    useEffect(() => {
       const productNew = products.find(element => element.id == id);
       setProduct(productNew); 
     },[id]);

     console.log(id);
     console.log(product)
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://66ac4fb0f009b9d5c7319adf.mockapi.io/products');
            setProducts(response.data);
            const productNew = response.data.find(element => element.id == id);
            setProduct(productNew); 
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }


    return (
        <div className='container'>
            <div className="row p-3">  
                <div className="col caroulImg">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner ">
                            <div class="carousel-item active">
                                <img src={product && product.img} class="d-block w-100" alt="..." />
                            </div   >
                            <div class="carousel-item">
                                <img src={product && product.img} class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={product && product.img} class="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col caroulName">
                    <h3>{product && product.name}  (NJ776W)</h3>
                    <p>Laptop Asus Vivobook Go 15 E1504FA R5 7520U (NJ776W) mang phong cách thiết kế sang trọng, hiệu năng mạnh mẽ cùng tính đa năng sử dụng, chắc chắn sẽ giúp bạn đáp ứng mọi tác vụ công việc và học tập hàng ngày một cách hiệu quả và chuyên nghiệp nhất.</p>
                    <span>Giá: {product && product.price} </span>
                    <div className="caroulNut mt-5 ">
                        <button type="button" class="btn btn-primary me-3 p-3"> <i class="fa-solid fa-plus me-2"></i>ADD CART </button> 
                        <button type="button" class="btn btn-success p-3"> <i class="fa-solid fa-cart-shopping me-2"></i>BUY PRODUCT</button>
                        
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Detail;