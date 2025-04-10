import { EnvironmentProvider } from '@ark-ui/react/environment'
import Frame from 'react-frame-component'
import { Usage } from './usage'

export const Basic = () => {
  return (
    <Frame title="IFrame Context" width="100%" height="300px">
      <EnvironmentProvider>
        <Usage />
      </EnvironmentProvider>
    </Frame>
  )
}
