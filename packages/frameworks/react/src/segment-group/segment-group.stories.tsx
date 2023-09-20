import type { Meta } from '@storybook/react'
import { SegmentGroup } from './'
import './segment-group.css'

type SegmentGroupType = typeof SegmentGroup

const meta: Meta<SegmentGroupType> = {
  title: 'SegmentGroup',
  component: SegmentGroup,
}

export default meta

export const Basic = () => {
  const frameworks = ['React', 'Solid', 'Vue']
  return (
    <SegmentGroup.Root>
      <SegmentGroup.Indicator />
      {frameworks.map((framework) => (
        <SegmentGroup.Item key={framework} value={framework}>
          <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  )
}

// export const InitialValue = () => (
//   <SegmentGroup defaultValue="react">
//     <SegmentGroupIndicator />
//     {options.map((option, id) => (
//       <Segment key={id} value={option.id}>
//         <SegmentLabel>{option.label}</SegmentLabel>
//         <SegmentControl />
//       </Segment>
//     ))}
//   </SegmentGroup>
// )

// export const Controlled = () => {
//   const [value, setValue] = useState('react')
//   return (
//     <SegmentGroup value={value} onValueChange={(e) => setValue(e.value)}>
//       <SegmentGroupIndicator />
//       {options.map((option, id) => (
//         <Segment key={id} value={option.id}>
//           <SegmentLabel>{option.label}</SegmentLabel>
//           <SegmentControl />
//         </Segment>
//       ))}
//     </SegmentGroup>
//   )
// }

// export const Disabled = () => (
//   <SegmentGroup defaultValue="react">
//     <SegmentGroupIndicator />
//     {options.map((option, id) => (
//       <Segment key={id} value={option.id} disabled={option.id === 'svelte'}>
//         <SegmentLabel>{option.label}</SegmentLabel>
//         <SegmentControl />
//       </Segment>
//     ))}
//   </SegmentGroup>
// )
