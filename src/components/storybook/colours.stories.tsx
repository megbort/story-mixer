import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Colors',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const colors = [
  { name: 'Primary Dark', bg: 'bg-storymixer-primary-dark' },
  { name: 'Primary', bg: 'bg-storymixer-primary' },
  { name: 'Primary Light', bg: 'bg-storymixer-primary-light' },
  { name: 'Accent', bg: 'bg-storymixer-accent' },
  { name: 'Black', bg: 'bg-storymixer-black' },
  { name: 'White', bg: 'bg-storymixer-white border border-black' },
  { name: 'Grey', bg: 'bg-storymixer-grey' },
  { name: 'Grey Alt', bg: 'bg-storymixer-grey-alt' },
  { name: 'Error', bg: 'bg-storymixer-error' },
  { name: 'Error Alt', bg: 'bg-storymixer-error-alt' },
]

export const ColorPalette: Story = {
  render: () => (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Color Palette</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {colors.map((color) => (
          <div key={color.name} className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded ${color.bg}`} />
            <p className="text-sm font-medium text-center">{color.name}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}
