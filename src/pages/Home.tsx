import React from 'react'
import { Link } from 'react-router-dom';
import hero from '../assets/img/sambatra1.png';

const Home: React.FC = () => {
    return (
        <div className='w-full h-full flex flex-col justify-start items-center mt-6 min-h-[70vh]'>
            <span className='text-4xl font-semibold text-primary text-wrap tracking-[5px]'>DARK BY SAMBATRA</span>

            <div className="w-full h-full mt-10">
                <img src={hero} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col w-full my-10">
                <div className="flex flex-row justify-center items-center ">
                    <div className="lg:w-1/12 flex justify-center items-center  text-white bg-black hover:bg-secondary hover:text-black px-4 py-2">
                        <Link to={'/purchase'} className='text-3xl text-center'>BUY NOW</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home;
