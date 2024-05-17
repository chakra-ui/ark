import { EnvironmentProvider } from '../..'
import { Usage } from './usage'

export const Basic = () => (
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
)
