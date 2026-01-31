import nicLogo from '@/assets/NIC.svg'
import swaasLogo from '@/assets/S3WaaS.svg'
import digitalIndiaLogo from '@/assets/Digital-India.svg'

export function Footer() {
    return (
        <footer className="bg-[#1b1b1b] text-white pt-8 pb-4 print:hidden">
            <div className="w-full px-6">
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 mb-6 gap-8 text-center md:text-left">

                    <div className="text-xs text-gray-400 space-y-1">
                        <p>Content Owned by DEPARTMENT OF JUSTICE, Ministry of Law and Justice, GOI</p>
                        <p>Developed and hosted by <a href="https://www.nic.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">National Informatics Centre</a>,</p>
                        <p><a href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ministry of Electronics & Information Technology</a>, Government of India</p>
                        <p className="mt-2 text-gray-500">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>

                    <div className="hidden md:block">
                    </div>

                    <div className="flex items-center gap-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <img src={swaasLogo} alt="S3WaaS" className="h-10" />
                        <img src={nicLogo} alt="National Informatics Centre" className="h-10" />
                        <img src={digitalIndiaLogo} alt="Digital India" className="h-10" />
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} E-Malkhana Management System. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
