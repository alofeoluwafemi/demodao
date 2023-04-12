import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import AboutIcon from '../icons/AboutIcon'
import ExploreIcon from '../icons/ExploreIcon'
import SpacesIcon from '../icons/SpacesIcon'

const MobileSidebar: React.FC<{ showMobileNavbar: boolean; useref: any; navbarToggler: boolean; setShowMobileNavbar: (show: boolean)  => void }> = ({
    showMobileNavbar,
    useref,
    setShowMobileNavbar,
  }) => {
    const router = useRouter();


  return (
    <>
    
        <div className={`md:hidden block  `} ref={useref}>
            <div className={`h-full  flex justify-between shadow-sm scrollbar-change flex-col overflow-y-auto w-60 border-r border-r-[#545252] bg-[#373636] sidebar ${showMobileNavbar ? "show": ""}`} >
                <div className='h-full flex flex-col justify-between'>
                    <div>

                    
                        <div className='logo flex items-center justify-center py-4 mb-3'>
                            <Link href="/">
                                <img src='/Logo.svg'/>
                            </Link>
                            
                        </div>

                        <div className='flex items-center justify-center mx-auto py-4'>
                            <Link href="/" className='flex items-center justify-between px-6 py-3 gap-5 bg-[#3F3F3F] rounded-full text-sm text-white'>
                                <img src='/Vector.svg'/>
                                Create Space
                            </Link>

                        </div>

                        <div className='nav__inner mt-5'>
                            <div className="flex flex-col justify-between " >

                                <Link href="/explore" className={`nav__link hover:bg-[#3F3F3F] transition-all ease-in duration-200 ${(router.asPath === "/explore") ? 'bg-[#3F3F3F] active' : ''} `}>
                                    <div className='flex items-center gap-3 py-4 px-6 mx-auto border-b border-[#545252] text-sm relative'>
                                    <span>
                                            <ExploreIcon/>
                                        </span>
                                        
                                        <span className="nav_item">Explore</span> 
                                        <span className='right_border'></span>

                                    </div>
                                </Link>
                                <Link href="/spaces" className={`nav__link hover:bg-[#3F3F3F] transition-all ease-in duration-200 border-b border-[#545252] ${(router.asPath === "/spaces" || router.pathname.startsWith("/spaces")) ? 'bg-[#3F3F3F] active' : ''}`}>
                                    <div className='flex items-center gap-3 py-4 px-6 mx-auto text-sm relative'>
                                    <span>
                                            <SpacesIcon/>
                                        </span>
                                        
                                        <span className="nav_item">Spaces</span> 

                                        <span className='right_border'></span>
                                    </div>
                                </Link>
                                
                            </div>
                        </div>

                    </div>

                    <div className="about_btn hover:bg-[#3F3F3F] transition-all ease-in duration-200 ">
                        <Link href="/spaces">
                            <div className='flex items-center gap-3 py-4 px-6 mx-auto text-sm'>
                                <span>
                                    <AboutIcon/>
                                </span>
                                
                                <span className="nav_item">About</span> 
                            </div>
                        </Link>

                    </div>

                </div>
                

            </div>
            
        </div>
    
    </>
  )
}

export default MobileSidebar