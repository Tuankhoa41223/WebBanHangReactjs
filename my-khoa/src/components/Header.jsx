import React from 'react';
import { Link } from 'react-router-dom';

function Header({setAuThenTion}) {
  return (
    <div>
      <header>
        <div class="px-3 py-2 bg-dark text-white">
          <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              </a>
              <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <Link className='list' as={Link} to="home">
                  <a href="#" class="nav-link text-white">
                    <i class="fa-solid fa-house"></i>
                    Home
                  </a>
                </Link>
                <Link className='list' as={Link} to="/">
                  <a href="#" class="nav-link text-white">
                    <i class="fa-solid fa-gauge"></i>
                    Todolist
                  </a>
                </Link>
                <Link className='list' as={Link} to="categories">
                  <a href="#" class="nav-link text-white">
                    <i class="fa-solid fa-table"></i>
                    Category
                  </a>
                </Link>
                <Link className='list' as={Link} to="product">
                  <a href="#" class="nav-link text-white">
                    <i class="fa-brands fa-product-hunt"></i>
                    Products
                  </a>
                </Link>
                <Link className='list' as={Link} to="account">
                  <a href="#" class="nav-link text-white">
                    <i class="fa-solid fa-user"></i>
                    Customers
                  </a>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div class="px-3 py-2 border-bottom mb-3">
          <div class="container d-flex flex-wrap justify-content-center">
            <form class="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
              <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
            </form>
            <div class="text-end">
              <Link as={Link} onClick={() => setAuThenTion(true) } to="login" type="button" class="btn btn-light text-dark me-2">Login</Link>
              <Link as={Link} onClick={()=>setAuThenTion(true)} to="signup" type="button" class="btn btn-primary">Sign-up</Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;