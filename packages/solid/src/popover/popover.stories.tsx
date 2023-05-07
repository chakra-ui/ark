import { createSignal } from 'solid-js'
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
} from './'

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
        <PopoverCloseTrigger>
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
            <PopoverCloseTrigger>
              <button>close</button>
            </PopoverCloseTrigger>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </>
  )
}
