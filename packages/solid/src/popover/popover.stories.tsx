import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '.'

const meta: Meta = {
  title: 'Popover',
}

export default meta

export const Basic = () => (
  <Popover>
    <PopoverTrigger asChild>
      <button>click me</button>
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverArrow>
          <PopoverArrowTip />
        </PopoverArrow>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description</PopoverDescription>
        <input type="text" />
        <PopoverCloseTrigger asChild>
          <button>close</button>
        </PopoverCloseTrigger>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  return (
    <>
      <button onClick={() => setIsOpen((prev) => !prev)}>click me</button>
      <Popover open={isOpen()}>
        <PopoverAnchor>
          <span>anchor</span>
        </PopoverAnchor>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverArrow>
              <PopoverArrowTip />
            </PopoverArrow>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
            <input type="text" />
            <PopoverCloseTrigger asChild>
              <button>close</button>
            </PopoverCloseTrigger>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </>
  )
}
