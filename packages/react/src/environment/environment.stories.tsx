import { useEffect } from 'react'
import Frame from 'react-frame-component'
import { Environment } from './environment'
import { useEnvironmentContext } from './environment-context'

const PrintEnvironment = () => {
  const getRootNode = useEnvironmentContext()
  useEffect(() => {
    const rootNode = getRootNode?.()
    console.log(rootNode)
  })

  return null
}

export const Basic = () => {
  return (
    <Frame>
      <Environment>
        <PrintEnvironment />
      </Environment>
    </Frame>
  )
}
