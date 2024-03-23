import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { RouteContext } from 'context/routeProvider';
import { RequestState } from 'enum/requestState';
import { AuthService } from 'services/authService';
import {jwtDecode, JwtPayload } from 'jwt-decode';
import { toast } from 'react-toastify';

  type FormValues = {
    email: string
    password: string
    termsAndConditions: boolean
  }
  
  const resolver: Resolver<FormValues> = async (values) => {
    const errors: FieldErrors<FormValues> = {};
  
    // Validate email
    if (!values.email) {
      errors.email = {
        type: 'required',
        message: 'Email is required.'
      };
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = {
        type: 'pattern',
        message: 'Invalid email address.'
      };
    }
  
    // Validate password
    if (!values.password) {
      errors.password = {
        type: 'required',
        message: 'Password is required.'
      };
    }
  
    return {
      values: values.email ? values : {}, // Only return values if email is provided
      errors: errors
    };
  }

  interface CustomJwtPayload extends JwtPayload {
    role?: string; // Assuming role is a string
  }

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    
    const [isProtected, setIsProtected] = useContext(RouteContext)
    const [loginRequestState, setLoginRequestState] = useState<RequestState>(RequestState.INITIAL)
    
    const { register, handleSubmit, formState: { errors }, } = useForm<FormValues>({ resolver })

    const onSubmit = handleSubmit(async (data) => {
      try {
        setLoginRequestState(RequestState.LOADING);
        const email = data.email;
        const res = await AuthService.userLogin(data); // logged user token...
    
        if (res.success) {
          setLoginRequestState(RequestState.SUCCESS);
          const decodedToken = jwtDecode<CustomJwtPayload>(res.data);
          if (decodedToken) {
            const userRes = await AuthService.getMe();
            if (userRes.success) {
              const completeUser = userRes.data;
              if (completeUser.role) {
                navigate(`/${completeUser.role}/dashboard`, { replace: true });
              } else {
                navigate(`/404`, { replace: true });
              }
            } else if (res.errorCode === 1) {
              setLoginRequestState(RequestState.FAILED);
              setIsProtected(true);
              navigate("/email-verification", { state: { email: email } });
            } else {
              setLoginRequestState(RequestState.FAILED);
              toast.error(res.error, {
                position: 'bottom-right',
                className: "foo-bar",
                style: {marginBottom: "4rem"},
              });
            }
          }
        }
        } catch(e) {
          setLoginRequestState(RequestState.FAILED);
        }
    });
    

    return(
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
                      <h6 className="fw-light">Sign in to continue.</h6>
                      <form className="pt-3" onSubmit={onSubmit}>
                          <div className="form-group">
                            <input type="email" 
                            {...register('email', { 
                              required: 'Email is required', 
                              pattern: { 
                                  value: /^\S+@\S+$/, 
                                  message: 'Invalid email address' 
                              } 
                              })} 
                              className="form-control form-control-lg" 
                              id="exampleInputEmail1" placeholder="Username"/>
                              {errors.email && <span>{errors.email.message}</span>}
                          </div>
                          <div className="form-group">
                          <input type="password" 
                          {...register('password', { 
                              required: 'Password is required', 
                              minLength: { 
                                  value: 8, 
                                  message: 'Password must have at least 8 characters' 
                              },
                              })}
                              className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"/>
                              {errors.password && <span>{errors.password.message}</span>}
                          </div>
                          <div className="mt-3">
                          <button type='submit' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >SIGN IN</button>
                          </div>
                          <div className="my-2 d-flex justify-content-between align-items-center">
                          <div className="form-check">
                              <label className="form-check-label text-muted">
                              <input {...register('termsAndConditions')} type="checkbox" className="form-check-input"/>
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

export default SignIn;