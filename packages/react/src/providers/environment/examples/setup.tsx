import Frame from 'react-frame-component'
import { Environment } from '../'

export const App = () => {
  return (
    <Frame title="IFrame Context">
      <Environment>{/* Your App */}</Environment>
    </Frame>
  )
}
