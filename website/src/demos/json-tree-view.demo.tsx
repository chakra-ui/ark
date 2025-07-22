'use client'
import { ChevronRightIcon } from 'lucide-react'
import { JsonTreeView } from '~/components/ui/json-tree-view'

const data = {
  // String values
  name: 'John Doe',
  email: 'john.doe@example.com',

  // Numbers
  age: 30,
  balance: 1234.56,
  score: -42,

  // Booleans
  isActive: true,
  isVerified: false,

  // Null and undefined
  avatar: null,
  description: undefined,

  // Date objects
  createdAt: new Date('2024-01-15T14:22:00Z'),
  lastLogin: new Date(),

  // Arrays
  tags: ['user', 'premium', 'verified'],
  scores: [95, 87, 92, 78, 100],

  // Nested objects
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: 12345,
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },

  // Functions
  greet: (name: string) => `Hello, ${name}!`,

  // Regular expression
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Error object
  lastError: new Error('Something went wrong'),

  // Map and Set
  preferences: new Map([
    ['theme', 'dark'],
    ['language', 'en'],
    ['notifications', 'enabled'],
  ]),

  visitedPages: new Set(['/home', '/profile', '/settings']),

  // Mixed array with different types
  mixedData: ['string', 42, true, null, { nested: 'object' }, [1, 2, 3], new Date()],
}

export const Demo = () => {
  return (
    <JsonTreeView.Root data={data} defaultExpandedDepth={1}>
      <JsonTreeView.Tree arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
