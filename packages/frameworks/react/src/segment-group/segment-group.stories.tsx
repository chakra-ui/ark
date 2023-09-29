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
//   <SegmentGroup.Root defaultValue="react">
//     <SegmentGroup.Indicator />
//     {options.map((option, id) => (
//       <SegmentGroup.Item key={id} value={option.id}>
//         <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
//         <SegmentGroup.ItemControl />
//       </SegmentGroup.Item>
//     ))}
//   </SegmentGroup.Root>
// )

// export const Controlled = () => {
//   const [value, setValue] = useState('react')
//   return (
//     <SegmentGroup.Root value={value} onValueChange={(e) => setValue(e.value)}>
//       <SegmentGroup.Indicator />
//       {options.map((option, id) => (
//         <SegmentGroup.Item key={id} value={option.id}>
//           <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
//           <SegmentGroup.ItemControl />
//         </SegmentGroup.Item>
//       ))}
//     </SegmentGroup.Root>
//   )
// }

// export const Disabled = () => (
//   <SegmentGroup.Root defaultValue="react">
//     <SegmentGroup.Indicator />
//     {options.map((option, id) => (
//       <SegmentGroup.Item key={id} value={option.id} disabled={option.id === 'svelte'}>
//         <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
//         <SegmentGroup.ItemControl />
//       </SegmentGroup.Item>
//     ))}
//   </SegmentGroup.Root>
// )
