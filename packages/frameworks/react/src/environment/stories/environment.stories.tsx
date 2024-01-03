import type { Meta } from '@storybook/react'
import { useEffect } from 'react'
import Frame from 'react-frame-component'
import { Environment, useEnvironmentContext } from '../'

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
      <Environment.Root>
        <PrintEnvironment />
      </Environment.Root>
    </Frame>
  )
}
