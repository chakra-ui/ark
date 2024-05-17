import Frame from 'react-frame-component'
import { EnvironmentProvider } from '../'
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
