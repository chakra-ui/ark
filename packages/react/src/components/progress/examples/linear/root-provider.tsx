import { Progress, useProgress } from '@ark-ui/react/progress'

export const RootProvider = () => {
  const progress = useProgress()

  return (
    <>
      <button onClick={() => progress.setToMax()}>Set to MAX</button>
      <Progress.RootProvider value={progress}>
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.RootProvider>
    </>
  )
}
