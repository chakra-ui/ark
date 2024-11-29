import { EnvironmentProvider } from '@ark-ui/solid/environment'
import { Usage } from './usage'

export const Basic = () => (
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
)
