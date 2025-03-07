import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
// import { getInstructorDashboard } from '../../../../services/operations/profileAPI.js'
import { fetchAdminItems } from '../../services/operations/itemDetailsAPI.js'
import DashboardChart from './DashboardChart.jsx'

const AdminDashboard = () => {
    const [details, setDetails] = useState([])
    const [courses, setCourses] = useState([])
    const [currentChart, setCurrentChart] = useState('revenue')
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) return;
        (async () => {
            try {
                if (token) {
                    // Fetch instructor dashboard details and courses
                    // const instructorDetails = await getInstructorDashboard(token, dispatch)
                    const instructorCourses = await fetchAdminItems(token)

                    // Set the retrieved data to state
                    setCourses(instructorCourses)
                    //setDetails(instructorDetails)
                }
            } catch (error) {
                console.error('Error fetching data:', error.message)
            }
        })()
    }, [token, dispatch])

    // Calculate total earnings and students from details
    const totalEarnings = details?.reduce((acc, course) => acc + course?.totalRevenue, 0)
    const totalStudents = details?.reduce((acc, course) => acc + course?.totalStudents, 0)

    return (
        <div className='bg-pink-600'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <div>
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-bold text-richblack-5'>Hi {user?.name || 'Instructor'} 👋</h1>
                        <p className='font-medium text-richblack-200'>Let's start something new</p>
                    </div>
                    <div className='my-4 flex flex-col-reverse gap-3 md:flex-row md:h-[450px] md:space-x-4'>
                        <div className='flex flex-col flex-1 rounded-md bg-richblack-800 p-6'>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-bold text-richblack-5'>Visualize</p>
                                <div className='flex items-center space-x-4'>
                                    <button onClick={() => setCurrentChart('revenue')}
                                        className={`px-2 py-2 rounded-md ${currentChart === 'revenue' ? 'bg-richblack-900 text-yellow-100' : 'bg-richblack-800 text-richblack-100'}`}>
                                        Revenue
                                    </button>
                                    <button onClick={() => setCurrentChart('students')}
                                        className={`px-2 py-2 rounded-md ${currentChart === 'students' ? 'bg-richblack-900 text-yellow-100' : 'bg-richblack-800 text-richblack-100'}`}>
                                        Users
                                    </button>
                                </div>
                            </div>
                            <DashboardChart details={details} currentChart={currentChart} />
                        </div>
                        <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
                            <p className='text-lg font-bold text-richblack-5'>Statistics</p>
                            <div className='mt-4 space-y-4'>
                                <div>
                                    <p className='text-lg text-richblack-200'>Total Items</p>
                                    <p className='text-3xl font-semibold text-richblack-50'>{courses?.length || 0}</p>
                                </div>
                                <div>
                                    <p className='text-lg text-richblack-200'>Total Users</p>
                                    <p className='text-3xl font-semibold text-richblack-50'>{totalStudents || 0}</p>
                                </div>
                                <div>
                                    <p className='text-lg text-richblack-200'>Total Earnings</p>
                                    <p className='text-3xl font-semibold text-richblack-50'>₹ {totalEarnings || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rounded-md bg-richblack-800 p-6'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold text-richblack-5'>Your Items</p>
                        <button onClick={() => navigate('/dashboard/my-courses')} className='text-xs font-semibold text-yellow-50'>
                            View all
                        </button>
                    </div>
                    <div className='my-4 flex space-x-6'>
                        {courses?.length === 0 ? (
                            <p className='text-sm font-medium text-richblack-300'>You have not created any items yet</p>
                        ) : (
                            courses.slice(0, 3).map((course, index) => (
                                <div key={index} className='w-1/3'>
                                    <img src={course?.thumbnail} alt="course" className='aspect-video md:h-[201px] w-full rounded-md object-cover' />
                                    <div className='mt-3 w-full'>
                                        <p className='text-sm font-medium text-richblack-50'>{course?.courseName}</p>
                                        <div className='mt-1 md:space-x-2 md:flex'>
                                            <p className='text-xs font-medium text-richblack-300'>{course?.studentsEnrolled?.length} Students</p>
                                            <p className='hidden md:block text-xs font-medium text-richblack-300'>|</p>
                                            <p className='text-xs font-medium text-richblack-300'>₹ {course?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
