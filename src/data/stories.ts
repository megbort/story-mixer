import { Story } from '@/types/story'

export const STORIES: Story[] = [
  {
    id: 'zoo',
    title: 'A Day at the Zoo',
    description: 'A wild and hilarious adventure at the zoo.',
    image: 'https://placehold.co/400x225?text=A+Day+at+the+Zoo',
    inputs: [
      { id: 'adjective1', label: 'Adjective', type: 'adjective' },
      { id: 'noun1', label: 'Noun', type: 'noun' },
      { id: 'verb1', label: 'Verb', type: 'verb' },
    ],
    template: [
      'Today I went to the zoo and saw a ',
      { inputId: 'adjective1' },
      ' ',
      { inputId: 'noun1' },
      ' ',
      { inputId: 'verb1' },
      '!',
    ],
  },
  {
    id: 'pirate',
    title: 'Pirate Adventure',
    description: 'Sail the seas and create chaos with your own words!',
    image: 'https://placehold.co/400x225?text=Pirate+Adventure',
    inputs: [
      { id: 'noun1', label: 'Noun', type: 'noun' },
      { id: 'verb1', label: 'Verb', type: 'verb' },
      { id: 'adjective1', label: 'Adjective', type: 'adjective' },
    ],
    template: [
      'The pirate grabbed a ',
      { inputId: 'noun1' },
      ' and began to ',
      { inputId: 'verb1' },
      ' it in a ',
      { inputId: 'adjective1' },
      ' way!',
    ],
  },
]
