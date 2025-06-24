import React from 'react'
import Header from '../components/Header'

const LandingPage = () => {
  return (
    <div className='bg-white'>
      <Header/>
      <div className='bg-white p-10 text-center'>
        <p className='text-[60px] font-bold text-blue-950 my-5'>Flight Training Platform</p>
        <p className='text-[30px] font-semibold text-blue-950'>An innovative platform for flight</p>
        <p className='text-[30px] font-semibold text-blue-950'>training and education</p>
        <button className='mt-10 py-3 px-4 text-[20px] bg-blue-600 text-white cursor-pointer rounded-lg hover:px-5 hover:text-[24px]'>Get Started</button>
        <p className='mt-15 text-[25px] font-medium text-blue-950'>Elevate Your Aviation Skills with Expert-Led Training</p>
        <p className='text-[20px] font text-blue-950'>Join the premier online platform for flight training. Track your progress, attempt real-world tasks, and boost your aviation knowledge anytime, anywhere.</p>
      </div>
    </div>
  )
}

export default LandingPage
