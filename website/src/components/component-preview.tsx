import { DemoPreview } from './demo-preview'
import { ExamplesPreview } from './examples-preview'

interface Props {
  id: string
}

export const ComponentPreview = (props: Props) => {
  const { id } = props
  return (
    <>
      <DemoPreview id={id} />
      <ExamplesPreview />
    </>
  )
}
