import { cache } from 'react'
import type { Framework } from './frameworks'

export interface ServerContext {
  component?: string
  framework?: Framework
}

export const getServerContext: () => ServerContext = cache(() => ({}))
