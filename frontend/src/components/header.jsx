import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="w-full bg-white border-b-4 border-yellow-500 shadow-sm">
      {/* Top thin bar */}
      <div className="bg-gray-100 text-xs py-1 px-4 flex justify-between text-gray-600">
        <span>Government of India</span>
        <span>Ministry of Law and Justice</span>
      </div>

      {/* Main Header Area */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16">
            <img src="/image.png" alt="Emblem" className="h-full w-full object-contain" />
          </div>

          <div className="flex flex-col">

            <h1 className="text-md font-semibold text-yellow-600 uppercase tracking-wider">
              E-Malkhana Management System
            </h1>

            <h4 className="text-xs font-semibold text-black uppercase tracking-wider">
              Department of Justice
            </h4>

          </div>
        </div>

        {/* Right Side - Emblems & Navigation */}
        <div className="flex items-center gap-6">
          {/*G20*/}
          <div className="h-12">
            <img src="/image copy.png" alt="G20" className="h-full object-contain" />
          </div>

          <div className="h-8 w-px bg-gray-300 mx-2 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/case-entry" className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors">
              Add Case
            </Link>
            <Link to="/movement-entry" className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors">
              Movement Entry
            </Link>

          </div>
        </div>
      </div>
    </header>
  )
}
