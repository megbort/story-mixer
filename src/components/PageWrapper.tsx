import React from 'react'

interface PageWrapperProps {
  children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="h-[calc(100vh-5rem)] overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
