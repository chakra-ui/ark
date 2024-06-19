import { EnvironmentProvider } from '../..'

export const App = () => {
  return (
    <iframe title="IFrame Context">
      <EnvironmentProvider>{/* Your App */}</EnvironmentProvider>
    </iframe>
  )
}
