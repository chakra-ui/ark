import { EnvironmentProvider } from '@ark-ui/solid/environment'
import { Usage } from './usage.tsx'

export const Basic = () => (
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
)
