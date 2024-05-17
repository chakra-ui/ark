import Frame from 'react-frame-component'
import { EnvironmentProvider } from '../'

export const App = () => {
  return (
    <Frame title="IFrame Context">
      <EnvironmentProvider>{/* Your App */}</EnvironmentProvider>
    </Frame>
  )
}
