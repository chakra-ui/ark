import { useEffect } from 'react'
import Frame from 'react-frame-component'
import { Environment, useEnvironmentContext } from '../'

const PrintEnvironment = () => {
  const { getRootNode } = useEnvironmentContext()
  useEffect(() => {
    const rootNode = getRootNode?.()
    console.log(rootNode)
  }, [getRootNode])

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
