import { Environment } from './environment'
import { useEnvironment } from './use-environment'

const PrintEnvironment = () => {
  const environment = useEnvironment({})
  const rootNode = environment.getRootNode?.()
  return (
    <dl>
      <dt>rootNode</dt>
      <dd>
        <pre>{String(rootNode)}</pre>
      </dd>
    </dl>
  )
}

export const Basic = () => {
  return (
    <Environment>
      <PrintEnvironment />
    </Environment>
  )
}
