import { DemoPreview } from './demo-preview'

interface Props {
  id: string
}

export const ComponentPreview = (props: Props) => {
  const { id } = props
  return <DemoPreview id={id} />
}
