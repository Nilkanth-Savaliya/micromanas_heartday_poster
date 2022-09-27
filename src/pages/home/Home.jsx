import React from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineUser} from 'react-icons/ai'
import './home.css'
const Home = () => {
  return (
    <div>
        <div className='mainLogo'>
          <img src="/headerlogo.png" alt="logo" />
        </div>
        <div className='iconList'>
          <Link to='/registerMr'>
            <div className='singleUser'>
              <img src="/mr.png" alt="" />
              {/* <AiOutlineUser color='#fff' size={20}/> */}
              <p>Micro</p>
            </div>
          </Link>
          {/* <Link to='/selectDoctor'>
            <div className='singleUser'>
              <img src="/doctor.jpg" alt="" />
              <p>Continue as Doctor</p>
            </div>
          </Link> */}
          
        </div>
        <div className='logoList'>
          <div className='singleLogo'>
            <img src="/logo1.png" alt="logo" />
          </div>
          {/* <div className='singleLogo'>
            <img src="/logo1.png" alt="logo" />
          </div>
          <div className='singleLogo'>
            <img src="/logo1.png" alt="logo" />
          </div> */}
        </div>
    </div>
  )
}

export default Home