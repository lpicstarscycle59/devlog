export type Mood = 'happy' | 'curious' | 'frustrated' | 'neutral'

export interface Entry {
  id: number
  title: string
  summary: string
  mood: Mood
  tags: string[]
  createdAt: string   // full ISO timestamp
}
const entries: Entry[] = [
{
  id: 1,
  title: 'Set up my DevLog project',
  summary: 'Scaffolded a Vite + React + TypeScript app...',
  mood: 'happy',
  tags: ['setup', 'vite'],
  createdAt: '2025-06-01T09:00:00.000Z',
},

{
  id: 1,
  title: 'Set up my DevLog project',
  summary: 'Scaffolded a Vite + React + TypeScript app...',
  mood: 'curious',
  tags: ['setup', 'vite'],
  createdAt: '2025-06-01T09:00:00.000Z',
},

{
  id: 1,
  title: 'Set up my DevLog project',
  summary: 'Scaffolded a Vite + React + TypeScript app...',
  mood: 'frustrated',
  tags: ['setup', 'vite'],
  createdAt: '2025-06-01T09:00:00.000Z',
},

{
  id: 1,
  title: 'Set up my DevLog project',
  summary: 'Scaffolded a Vite + React + TypeScript app...',
  mood: 'neutral',
  tags: ['setup', 'vite'],
  createdAt: '2025-06-01T09:00:00.000Z',
},
]


export default entries