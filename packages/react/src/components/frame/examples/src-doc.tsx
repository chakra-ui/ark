import { Frame } from '@ark-ui/react/frame'

const srcDoc = `<html><head>
<link href="//use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css" />
<base target=_blank>
</head><body style='overflow: hidden'><div></div></body></html>`

export const SrcDoc = () => {
  return (
    <Frame
      title="Custom Frame"
      style={{ border: '1px solid #ccc', maxWidth: '800px', width: '100%' }}
      srcDoc={srcDoc}
    >
      <h1 style={{ fontFamily: 'Open Sans, sans-serif' }}>Hello from inside the frame!</h1>
      <p>This content is rendered within our custom frame component using a Portal.</p>
      <p>The frame has custom initial content, including Font Awesome and Open Sans font.</p>
    </Frame>
  )
}
