import React from 'react';

function Account(props) {

    return (
        <div className="container">
            <div className='Account'>
                <div className="row">
                    <div className="col">
                        <div className="card text-white bg-dark mb-3 p-3" >
                            <div class="card-header">PICTURE</div>
                            <div class="card-body picture">
                                <img src="https://i.pinimg.com/564x/84/55/38/845538f60da19b781c2216b214385993.jpg" alt="" />
                                <button type='submit' className='btn bg-info text-white'>Edit Picture</button>
                            </div>

                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-white bg-dark mb-3 p-3" >
                            <div class="card-header">INFORMATION</div>
                            <div class="card-body">
                                <form class="row g-3 needs-validation" novalidate>
                                    <div class="col-md-6">
                                        <label for="inputEmail4" class="form-label">First Name</label>
                                        <input type="text" class="form-control" id="inputEmail4" placeholder="First Name" />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputPassword4" class="form-label">Last Name</label>
                                        <input type="text" class="form-control" id="inputPassword4" placeholder="Last Name" />
                                    </div>
                                    <div class="col-12">
                                        <label for="inputAddress" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="inputAddress" placeholder="@gmail.com" />
                                    </div>
                                    <div class="col-12">
                                        <label for="inputAddress2" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="inputAddress2" placeholder="Password" />
                                    </div>
                                    <div class="col-6">
                                        <label for="inputCity" class="form-label">Address</label>
                                        <input type="text" class="form-control" id="inputCity" placeholder="1234 Main St" />
                                    </div>
                                    <div class="col-6">
                                        <label for="inputCity" class="form-label">Phone Number</label>
                                        <input type="number" class="form-control" id="inputCity" placeholder="+084XXXX" />
                                    </div>
                                    <div class="col-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                            <label class="form-check-label" for="exampleRadios1">
                                               Male
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                            <label class="form-check-label" for="exampleRadios1">
                                              Female
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary">Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
export default Account;