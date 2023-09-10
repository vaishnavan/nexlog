import React, { useContext, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { themeContext } from '@/context/themeProvider';

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { setTheme} = useContext(themeContext)

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        setTheme(isDarkMode ? 'dark':'light');
    };

    return (
        <div>
            <nav className='flex justify-between px-12 py-2 shadow-md w-full max-[628px]:px-3 dark:bg-[#373737] dark:rounded-md'>
                <div>
                    <h1 className='text-2xl font-semibold first-letter:text-3xl'>N<span className='text-[22px]'><sup>e</sup></span>x<span className='text-[22px]'><sub>o</sub></span>lg</h1>
                </div>
                <div>
                    <button
                        className="dark:bg-gray-800 p-2 right-[15px] rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-600 transition-colors duration-300"
                        onClick={toggleDarkMode}
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <SunIcon className="w-8 h-8 text-[#FDB813]" /> : <MoonIcon className="w-8 h-8 text-[#F6F1D5]" />}
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar