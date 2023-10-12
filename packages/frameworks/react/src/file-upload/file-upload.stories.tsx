import type { Meta } from '@storybook/react'
import { FileUpload } from './'
import './file-upload.css'

type FileUploadType = typeof FileUpload

const meta: Meta<FileUploadType> = {
  title: 'FileUpload',
  component: FileUpload,
}

export default meta

export const Basic = () => (
  <FileUpload.Root>
    <FileUpload.Dropzone>
      <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
    </FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    {/* <FileUpload.ItemGroup>
      <FileUpload.Item>
        <FileUpload.ItemName>File name</FileUpload.ItemName>
        {/* <FileUpload.ItemSize>File size</FileUpload.ItemSize>}
        <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
      </FileUpload.Item>
    </FileUpload.ItemGroup> */}
  </FileUpload.Root>
)

// export const Controlled = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   return (
//     <>
//       <button onClick={() => setIsOpen(true)}>Open FileUpload</button>
//       <FileUpload.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
//         <Portal>
//           <FileUpload.Backdrop />
//           <FileUpload.Container>
//             <FileUpload.Content>
//               <FileUpload.Title>FileUpload Title</FileUpload.Title>
//               <FileUpload.Description>FileUpload Description</FileUpload.Description>
//               <FileUpload.CloseTrigger>Close</FileUpload.CloseTrigger>
//             </FileUpload.Content>
//           </FileUpload.Container>
//         </Portal>
//       </FileUpload.Root>
//     </>
//   )
// }

// export const LazyMount = () => (
//   <FileUpload.Root>
//     <FileUpload.Trigger>Open FileUpload</FileUpload.Trigger>
//     <Portal>
//       <FileUpload.Backdrop />
//       <FileUpload.Container>
//         <FileUpload.Content lazyMount unmountOnExit>
//           <FileUpload.Title>FileUpload Title</FileUpload.Title>
//           <FileUpload.Description>FileUpload Description</FileUpload.Description>
//           <FileUpload.CloseTrigger>Close</FileUpload.CloseTrigger>
//         </FileUpload.Content>
//       </FileUpload.Container>
//     </Portal>
//   </FileUpload.Root>
// )

// export const RenderFn = () => (
//   <FileUpload.Root>
//     {({ isOpen }) => (
//       <>
//         <FileUpload.Trigger>Open FileUpload</FileUpload.Trigger>
//         <Portal>
//           <FileUpload.Backdrop />
//           <FileUpload.Container>
//             <FileUpload.Content>
//               <FileUpload.Title>FileUpload Title</FileUpload.Title>
//               <FileUpload.Description>FileUpload Description</FileUpload.Description>
//               <FileUpload.CloseTrigger>Close</FileUpload.CloseTrigger>
//             </FileUpload.Content>
//           </FileUpload.Container>
//         </Portal>
//         <p>FileUpload is {isOpen ? 'open' : 'closed'}</p>
//       </>
//     )}
//   </FileUpload.Root>
// )
