import React from 'react';

function Login(props) {

    return (
        <div className="login">
            
            <form class="row g-3 ">
            <div className=" tieude">
                <h3>Login</h3>
            </div>
            <div class="col-12 mb-3">
                <label for="inputEmail4" class=" chu form-label text-white">UserName</label>
                <input type="text" class="form-control" id="inputEmail4" />
            </div>
            <div class="col-12 mb-3">
                <label for="inputPassword4" class=" chu form-label text-white">Password</label>
                <input type="password" class="form-control" id="inputPassword4" />
            </div>
            <div class="col-12 mb-1">
                <button className='xacnhan'>Log In</button>
            </div>
            <div class="col-3 mb-3 nut">
            <i class="fa-brands fa-google fa-bounce text-danger"></i>
            </div>
            <div class="col-3 mb-3 nut">
              <i class="fa-brands fa-facebook fa-flip  text-primary"></i> 
            </div>
            <div class="col-3 mb-3 nut">
            <i class="fa-brands fa-twitter fa-beat-fade text-info"></i>
            </div>
            <div class="col-3 mb-3 nut " >
            <i class="fa-brands fa-instagram fa-spin fa-spin-reverse ist"></i>
            </div>
           
        </form>
        </div>       
    );
}

export default Login;