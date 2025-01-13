import React from 'react'
import './profile.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Profile = () => {

    const [data, setData] = useState({})
    const fetchdata = async () => {
        try {
            const reasponse = await axios.get(`https://dummyjson.com/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('mohitToken')}`
                    }
                }
            )
            setData(reasponse.data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchdata()
    }, [])

    console.log(data, "data fjjlf")
    return (
        <>
            <div className='container'>
                <h5>User Profile</h5>
                <hr />
                <div className='custom-card col-md-12 col-sm-12 col-lg-12 mt-4'>
                    <div className='row'>
                        <div className='col-md-6  col-sm-6 col-lg-6 '>
                            <div class="form-group mb-3">

                                <input type="email"
                                    class="form-control"
                                    id="exampleInputEmail1" aria-describedby="emailHelp"
                                    placeholder="Enter firstName"
                                    value={data.firstName || ''}
                                />

                            </div>
                        </div>
                        <div className='col-md-6  col-sm-6 col-lg-6'>
                            <div class="form-group mb-3">

                                <input type="email" class="form-control"
                                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                    value={data.lastName || ''}
                                />

                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-md-6  col-sm-6 col-lg-6'>
                            <div class="form-group mb-3">

                                <input type="email" class="form-control"
                                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                    value={data?.address?.address || ''}

                                />

                            </div>
                        </div>
                        <div className='col-md-6  col-sm-6 col-lg-6'>
                            <div class="form-group mb-3">

                                <input type="email" class="form-control"
                                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                    value={data?.address?.city || ''}

                                />

                            </div>
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-md-6  col-sm-6 col-lg-6'>
                            <div class="form-group mb-3">

                                <input type="email" class="form-control"
                                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                    value={data.email || ''}
                                />

                            </div>
                        </div>
                        <div className='col-md-6  col-sm-6 col-lg-6'>
                            <div class="form-group mb-3">

                                <input type="email"
                                    class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" placeholder="Enter email"
                                    value={data?.address?.country || ''}
                                />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile