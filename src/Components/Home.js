import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../ContextApi/Context'
const Home = () => {
  const { data, setData } = useContext(UserContext)
  const displaydata = data.length;
  return (
    <>
      <div className='container'>
        <h5>Dashboard</h5>
        <div className='row'>

          <div class="card col-md-4 col-sm-4 col-lg-4">
            <div class="card-body">
              <h5 class="card-title">Total User {displaydata}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>

          </div>

          <div class="card col-md-4 col-sm-4 col-lg-4">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>

          <div class="card col-md-4 col-sm-4 col-lg-4">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
