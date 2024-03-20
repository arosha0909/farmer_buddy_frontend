import React from 'react';
const SignUp: React.FC = () => {
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                    <div className="col-lg-4 mx-auto">
                        <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div className="brand-logo">
                            <img src="../../assets/images/logo.svg" alt="logo"/>
                        </div>
                        <h4>Hello! let's get started</h4>
                        <h6 className="fw-light">Sign up with your factory.</h6>
                        <form className="pt-3">
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <input type="confirm password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Confirm Password"/>
                            </div>
                            <div className="mt-3">
                                <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index.html">SIGN IN</a>
                            </div>
                            <div className="my-2 d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <label className="form-check-label text-muted">
                                    <input type="checkbox" className="form-check-input"/>
                                    Keep me signed in
                                    </label>
                                </div>
                            <a href="/" className="auth-link text-black">Forgot password?</a>
                            </div>
                            <div className="text-center mt-4 fw-light">
                            Don't have an account? <a href="/signup" className="text-primary">Create</a>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp