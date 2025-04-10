import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation on component mount
    setIsVisible(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-4">
      <div 
        className={`bg-white rounded-xl shadow-2xl p-8 text-center transition-all duration-500 transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-700">دوسي هنا ي سلمي ي متوحده</h2>
        
        <div 
          className={`relative inline-block transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link 
            to='/HomePage' 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full inline-block hover:shadow-lg transition-all duration-300"
          >
            Click Here
          </Link>
          {isHovered && (
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-400 rounded animate-pulse"></span>
          )}
        </div>
      </div>
    </div>
  )
}