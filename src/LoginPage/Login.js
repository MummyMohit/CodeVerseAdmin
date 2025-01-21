import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css'; // Include CSS with the autofill styling
import { useNavigate } from 'react-router-dom';
import { Istock } from '../Pic';

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef(null); // Ref for email input

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .min(8, 'Must be 8 characters or more')
                .required('Password is Required'),
            email: Yup.string().required('Email is Required'),
        }),
        onSubmit: (values) => {
            const payload = {
                username: values.email,
                password: values.password,
                expiresInMins: 30,
            };
            handleSubmitForm(payload);
        },
    });

    const handleSubmitForm = async (payload) => {
        try {
            const response = await axios.post(`https://dummyjson.com/auth/login`, payload);
            if (response.data) {
                localStorage.setItem('mohitToken', response.data.accessToken);
                navigate('/layout/home');
            }
        } catch (error) {
            console.log(error);
        }
    };

    
    useEffect(() => {
        const emailInput = emailRef.current;
        if (emailInput) {
            setTimeout(() => {
                const autofillValue = emailInput.value;
                if (autofillValue) {
                    formik.setFieldValue('email', autofillValue); 
                }
            }, 500); 
        }
    }, []);

    return (
        <>
            <div>
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-lg-6">
                        <img src={Istock} className="v1-img" alt="Background" />
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6">
                        <form className="main-form" onSubmit={formik.handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    name="email"
                                    ref={emailRef} // Attach ref for autofill detection
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-danger">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-danger">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <button
                                className="form-group col-md-12 col-sm-12 col-lg-12 mb-3 btn btn-success login-button"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
