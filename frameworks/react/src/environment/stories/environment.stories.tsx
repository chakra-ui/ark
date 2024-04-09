import type { Meta } from '@storybook/react'
import { useEffect } from 'react'
import Frame from 'react-frame-component'
import { Environment, useEnvironmentContext } from '../'

const meta: Meta = {
  title: 'Components / Environment',
}

export default meta

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
