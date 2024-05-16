import { Environment } from '../..'

export const App = () => {
  return (
    <iframe title="IFrame Context">
      <Environment>{/* Your App */}</Environment>
    </iframe>
  )
}
