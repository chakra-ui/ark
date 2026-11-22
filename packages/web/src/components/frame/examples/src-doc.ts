import '@ark-ui/web/frame'

const srcdoc = `<html><head>
<link href="//use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css" />
<base target=_blank>
</head><body style='overflow: hidden'><div></div></body></html>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-frame>
      <iframe title="Custom Frame" style="border: 1px solid #ccc; max-width: 800px; width: 100%"></iframe>
      <h1 style="font-family: 'Open Sans', sans-serif">Hello from inside the frame!</h1>
      <p>This content is rendered within our custom frame component.</p>
      <p>The frame has custom initial content, including Font Awesome and Open Sans font.</p>
    </ark-frame>`

  root.querySelector('ark-frame')!.srcdoc = srcdoc
}
