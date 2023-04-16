import { useEffect } from 'react'
import Frame from 'react-frame-component'
import { Environment } from './environment'
import { useEnvironmentContext } from './environment-context'

import type { Meta } from '@storybook/react'

type EnvironmentType = typeof Environment

const meta: Meta<EnvironmentType> = {
  title: 'Environment',
  component: Environment,
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
