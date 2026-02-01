import * as React from 'react'
import { Card, CardContent, CardTitle } from './card'

interface CardButtonProps {
  image: string
  title: string
  description: string
  onClick?: () => void
}

export const CardButton: React.FC<CardButtonProps> = ({
  image,
  title,
  description,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group p-0 cursor-pointer w-72"
    style={{ position: 'relative' }}
  >
    <Card className="overflow-hidden p-0 flex flex-col h-full relative">
      <div className="relative w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      </div>
      <CardContent className="flex-1 flex flex-col justify-center items-center pt-0 pb-4 px-0">
        <CardTitle className="text-lg font-semibold text-center">
          {title}
        </CardTitle>
      </CardContent>
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 rounded-xl pointer-events-none group-hover:opacity-100">
        <span className="text-white text-base px-4 text-center">
          {description}
        </span>
      </div>
    </Card>
  </button>
)
