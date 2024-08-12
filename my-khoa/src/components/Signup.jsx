import React from 'react';

function Signup(props) {

    return (
        <div className='register'>
            <form class="row g-3 ">
                <div className="sign">
                    <h1>Sign In</h1>
                </div>
                <div class="col-md-12">
                    <label for="inputEmail4" class="form-label">UseName</label>
                    <input type="text" class="form-control" id="inputEmail4"/>
                </div>
                <div class="col-md-12">
                    <label for="inputPassword4" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputPassword4"/>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputAddress" placeholder="Password"/>
                </div>
                <div class="col-12">
                    <label for="inputAddress2" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="inputAddress2" placeholder="Confirm Password"/>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;