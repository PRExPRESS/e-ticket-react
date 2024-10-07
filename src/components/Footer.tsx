import React from 'react';

import facebook from '../assets/icons/facebook.svg';
import insta from '../assets/icons/insta.svg';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/16/solid';

const Footer: React.FC = () => {
    return (
        <div className='w-full flex flex-col  relative bottom-0 mt-10 '>
            <div className="flex flex-col md: items-center justify-center">
                <div className='flex flex-col '>
                    <div className="flex">
                        <span className='flex'>
                            <PhoneIcon className='w-5 h-5 text-primary' />
                            <Link to={'tel:+94705883550'} target='_blank' className='ml-2'>+94 70 588 3550</Link>
                        </span>
                        <span className='flex ml-4'>
                            <EnvelopeIcon className='w-5 h-5 text-primary' />
                            <Link to={'mailto:chathura.wijesekara32@gmail.com'} target='_blank' className='ml-2'>chathura.wijesekara32@gmail.com</Link>
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-4 ">
                    <div className="flex flex-row items-center justify-center">
                        <Link to={'https://www.facebook.com/share/zQjXorZX1XF6cP62/?mibextid=kFxxJD'} target='_blank' className='ml-4'><img src={facebook} alt="" width={20} height={20} /></Link>
                        <Link to={'https://www.instagram.com/enigmaevents_ofc?igsh=NGVhN2U2NjQ0Yg=='} target='_blank' className='ml-4'><img src={insta} alt="" width={20} height={20} /></Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center mt-4 border-t-2 border-black/20 py-5">
                <p className='text-sm font-normal'>© {new Date().getFullYear()} Enigma Events. All rights reserved.</p>
                <p className='text-sm font-normal ml-4'>Developed by | <Link to={'https://www.linkedin.com/in/pasindurash/'} target='_blank' className='ml-2'>Rush</Link></p>
            </div>

        </div>
    )
}

export default Footer
