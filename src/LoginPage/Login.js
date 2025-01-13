import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { Istock } from '../Pic';
const Login = () => {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .min(8, 'Must be 8 characters or more')
                .required(' Password is Required'),
            email: Yup.string().required('Email is Required'),
        }),
        onSubmit: (values) => {

            const payload = {
                username: values.email,
                password: values.password,
                expiresInMins: 30
            }
            handleSubmitForm(payload)
        },
    });

    const handleSubmitForm = async (payload) => {
        try {
            const reasponse = await axios.post(`https://dummyjson.com/auth/login`, payload)
            if (reasponse.data) {
                localStorage.setItem('mohitToken', reasponse.data.accessToken)
                navigate('/layout/home')

            }
            console.log(reasponse.data)
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <div>
                <div className='row '>
                    <div className='col-md-6 col-sm-6 col-lg-6 '>
                        <img src={Istock}
                        className='v1-img'
                        />
                    </div>
                    <div className='col-md-6 col-sm-6 col-lg-6 '>
                        <form className='main-form' onSubmit={formik.handleSubmit}>
                            <div className="form-group  mb-3">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="text" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" placeholder="Enter email"
                                    name='email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-danger'>{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="form-group mb-3">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"
                                    placeholder="Password"
                                    name='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className='text-danger'>{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <button className="form-group col-md-12 col-sm-12 col-lg-12 mb-3 btn btn-success login-button" type="submit">Submit</button>

                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login