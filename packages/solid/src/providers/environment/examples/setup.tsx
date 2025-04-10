import { EnvironmentProvider } from '@ark-ui/solid/environment'

export const App = () => {
  return (
    <iframe title="IFrame Context">
      <EnvironmentProvider>{/* Your App */}</EnvironmentProvider>
    </iframe>
  )
}
