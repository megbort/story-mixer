import { Link } from '@tanstack/react-router'

import { useState, useEffect, useRef } from 'react'
import { BookOpen, Home, Menu, X } from 'lucide-react'
import { Button } from './ui'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  return (
    <>
      <header className="p-4 flex items-center bg-storymixer-primary text-storymixer-white shadow-lg">
        <Button
          onClick={() => setIsOpen(true)}
          variant="ghost"
          size="icon"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </Button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dm1yyjg7i/image/upload/v1769899646/storymixer/story-mixer-logo-white_iztoix.png"
              alt="Story Mixer"
              className="h-8"
            />
            <span>StoryMixer</span>
          </Link>
        </h1>
      </header>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 bg-storymixer-primary-dark text-storymixer-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-storymixer-primary">
          <h2 className="text-xl font-bold">Navigation</h2>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </Button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link to="/" onClick={() => setIsOpen(false)} className="nav-link">
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/my-stories"
            onClick={() => setIsOpen(false)}
            className="nav-link"
          >
            <BookOpen size={20} />
            <span className="font-medium">My Stories</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
