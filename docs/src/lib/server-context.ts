import { cache } from 'react'

export interface ServerContext {
  framework: string
  component?: string
}

export const getServerContext: () => ServerContext = cache(() => ({
  framework: 'react',
}))
