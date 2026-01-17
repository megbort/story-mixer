import React from 'react'

interface PageWrapperProps {
  children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <div className="h-[calc(100vh-5rem)] overflow-auto">{children}</div>
}
