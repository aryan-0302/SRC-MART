import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'


// AGAR TOKEN HAI TO USKE PRIVATE ROUTE KE CHILDREN MTLB DASHBOARD KO RENDER KRDO,WARNA LOGIN PAGE RENDER HOGA TAKI LOGIN KR SKE USER.
// AUR DASHBOARD SIDEBAR KO RENDER KR RAHA HAI.
const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );

    if(profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }

  return (
    <div className='relative flex bg-black'>
        <Sidebar />
        <div className=' flex-1 overflow-auto bg-richblack-900'>
            <div className='py-10'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard