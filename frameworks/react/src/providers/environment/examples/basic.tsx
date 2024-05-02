import Frame from 'react-frame-component'
import { Environment, useEnvironmentContext } from '../'

export const Basic = () => {
  return (
    <Frame title="IFrame Context" width="100%" height="300px">
      <Environment>
        <PrintEnvironment />
      </Environment>
    </Frame>
  )
}

const PrintEnvironment = () => {
  const { getRootNode } = useEnvironmentContext()

  return <pre>{JSON.stringify(getRootNode(), null, 2)}</pre>
}
