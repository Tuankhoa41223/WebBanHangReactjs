import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
function Home(props) {
    const [products, setProducts] = useState([]);
    const [categoriId, setCategoryId] = useState(0);
    const [slideIndexes, setSlideIndexes] = useState({
        iphone: 1,
    });
 
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndexes(prevIndexes => {
                const newIndex = prevIndexes.iphone + 1;
                showSlides('iphone', newIndex);
                return { ...prevIndexes, iphone: newIndex };
            });
        }, 3000);

        return () => clearInterval(interval); // Cleanup function to clear interval on unmount
    }, []); // Empty array to run only once on mount

    useEffect(() => {
        fetchProducts();
    });
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://66ac4fb0f009b9d5c7319adf.mockapi.io/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    }

    function showSlides(type, n) {
        const products = document.querySelectorAll(`.${type} .col`);
        let numProductsToShow;
        // Determine the number of products to show based on screen width
        if (window.matchMedia("(max-width: 767px)").matches) { // Mobile
            numProductsToShow = 2;
        } else if (window.matchMedia("(max-width: 1024px)").matches) { // Tablet
            numProductsToShow = 3;
        } else { // Laptop and larger devices
            numProductsToShow = 5;
        }

        // Adjust slideIndex if out of range
        if (n > products.length - numProductsToShow + 1) {
            slideIndexes[type] = 1;
        } else if (n < 1) {
            slideIndexes[type] = products.length - numProductsToShow + 1;
        }

        // Hide all products
        for (let i = 0; i < products.length; i++) {
            products[i].style.display = "none";
        }

        // Show the appropriate number of products
        for (let i = 0; i < numProductsToShow; i++) {
            if (products[slideIndexes[type] + i - 1]) {
                products[slideIndexes[type] + i - 1].style.display = "block";
            }
        }
    }

    // Function to handle left button click
    const handleLeftClick = () => {
        setSlideIndexes(prevIndexes => {
            const newIndex = prevIndexes.iphone - 1;
            showSlides('iphone', newIndex);
            return { ...prevIndexes, iphone: newIndex };
        });
    };

    // Function to handle right button click
    const handleRightClick = () => {
        setSlideIndexes(prevIndexes => {
            const newIndex = prevIndexes.iphone + 1;
            showSlides('iphone', newIndex);
            return { ...prevIndexes, iphone: newIndex };
        });
    };

    return (
        <div className=" mt-5 container">
            <div className="row ">
                <div className="col">
                    <div class="card luuY" style={{ height: '22rem', width: '33rem' }}>
                        <div class="card-body">
                            <h1 class="card-title mb-3">Thứ 4 Vui Vẻ Mua Thật Rẻ</h1>
                            <p class="card-text mb-3">Ưu đãi cho tất cả các loại mặt hàng lến đến 50%. Nhanh tay dặt mua bỏ vô giỏ hàng nào bà con ơi!!!!</p>
                            <a href="#" class="btn btn-danger">Xem Thêm</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                                <img src="https://i.pinimg.com/564x/8d/62/33/8d6233adda739d4a144f08f2b230e95d.jpg" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                                <img src="https://i.pinimg.com/564x/20/56/63/205663507539385cc9ccf7715d83c2c1.jpg" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="https://i.pinimg.com/564x/e3/3b/01/e33b019e92d7074ea3cdf15adafe231b.jpg" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev " type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden ">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className=" container product2">
                <img src="https://cdn.tgdd.vn/2024/07/campaign/Frame-1-1200x152.png" alt="" />
                <div class="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-4 iphone ">
                    {
                        products.filter(element => element.categoryId == "2").map((element) => (
                            <div class="col">
                                <div class="card">
                                    <img src={element.img} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{element.name}</h5>
                                        <p class="card-text">{element.description}</p>
                                        <span>{element.price}$</span>
                                    </div>
                                </div>
                            </div>


                        ))
                    }
                    <button className='nut-trai' onClick={handleLeftClick}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className='nut-phai' onClick={handleRightClick}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>

                </div>
                <div className="nut mt-3">
                    <button type="button" class="btn btn-warning btn-lg">Xem Tất Cả Ở Đây <i class="fa-solid fa-angle-right"></i></button>
                </div>
            </div>
            <div className=" container product3 ">
                <img src="https://cdn.tgdd.vn/2024/07/banner/Frame-427320073-1200x119-1.png" alt="" />
                <div class="row row-cols-1 row-cols-md-5 g-4 ">
                    {
                        products.filter(element => element.categoryId == "1").map((element) => (
                            <Link as={Link} to={`/detail/${element.id}`} class="col">
                                <div class="card">
                                    <img src={element.img} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{element.name}</h5>
                                        <p class="card-text">{element.description}</p>
                                        <span>{element.price}$</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className="nut mt-3">
                    <button type="button" class="btn btn-warning btn-lg">Xem Tất Cả Ở Đây <i class="fa-solid fa-angle-right"></i></button>
                </div>
            </div>
            <div className="boxroom container mt-5">
                <h2>Gợi Ý Hôm Nay</h2>
                <div className=" boxchu d-flex justify-content-between">
                    <a data-bs-toggle="collapse" onClick={() => setCategoryId(1)} href="#collapseExample" > <i class="fa-solid fa-fire-flame-curved text-danger"></i><span> Cho Bạn</span></a>
                    <a data-bs-toggle="collapse" onClick={() => setCategoryId(2)} href="#collapseExample"> <i class="fa-solid fa-laptop text-warning"></i><span> Laptop Gaming</span></a>
                    <a data-bs-toggle="collapse" onClick={() => setCategoryId(3)} href="#collapseExample"><i class="fa-solid fa-charging-station text-info"></i><span>Phụ Kiện</span></a>
                    <a data-bs-toggle="collapse" onClick={() => setCategoryId(4)} href="#collapseExample"><i class="fa-solid fa-tablet text-success"></i><span>Tablet Giá Rẻ</span></a>
                </div>
                <div class="collapse mt-3" id="collapseExample">
                    <div class="row row-cols-1 row-cols-md-5 g-4 ">
                        {
                            products.filter(element => element.categoryId == categoriId).map((element) => (
                                <Link as={Link} to={`/detail/${element.id}`} class="col">
                                    <div class="card">
                                        <img src={element.img} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{element.name}</h5>
                                            <p class="card-text">{element.description}</p>
                                            <span>{element.price}$</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;