import { EnvironmentProvider } from '@ark-ui/react/environment'
import Frame from 'react-frame-component'

export const App = () => {
  return (
    <Frame title="IFrame Context">
      <EnvironmentProvider>{/* Your App */}</EnvironmentProvider>
    </Frame>
  )
}
