import React from 'react'
import { assets } from '../../assets/assets'
import { IoIosArrowDown } from 'react-icons/io'
import {CiCalendar} from 'react-icons/ci'
import { Link } from 'react-router-dom'

const FacilitiesHeader = () => {

  
  return (
    <div>
      {/* Full Background */}
      <div
        className="relative max-w-screen h-fit pt-24 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${assets.hero_2})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full">
          
          {/* Heading */}
          <div className="flex flex-col justify-center h-[70vh] text-white text-center md:text-start md:items-start items-center gap-4">
            <h2 className="text-xl md:text-3xl ">WELCOME TO</h2>
            <h1 className="text-2xl md:text-4xl font-bold font-serif">
              Kandaw 101 Hotel
            </h1>
            <h3 className="text-lg md:text-2xl">
              Experience the best hospitality in the heart of the town.
            </h3>
          </div>

          {/* Bottom Center */}
          <div className="absolute bottom-1/50 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          
          <Link to="/rooms">
            <button className="bg-blue-500 flex flex-row gap-2 items-center  hover:bg-blue-700 text-white cursor-pointer hover:font-bold font-normal py-2 px-4 rounded">
             <CiCalendar /> Book Now
            </button>
            </Link>
            

            <div className="flex flex-col  items-center">
              <button
  onClick={() =>
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }
  className="cursor-pointer"
>
  <IoIosArrowDown className="bg-white text-black mt-1 animate-bounce w-8 h-8 rounded-full shadow-md hover:scale-110 transition duration-300" />
</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FacilitiesHeader