import { cache } from 'react'

export interface ServerContext {
  component?: string
}

export const getServerContext: () => ServerContext = cache(() => ({}))
