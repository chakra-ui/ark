export const imageCropperExampleStyles = `
  :host {
    display: block;
    max-width: 420px;
  }

  [data-scope='image-cropper'][data-part='root'] {
    display: grid;
    gap: 12px;
  }

  [data-scope='image-cropper'][data-part='viewport'] {
    width: min(100%, 420px);
    aspect-ratio: 4 / 3;
    background: #0f172a;
    border-radius: 8px;
  }

  [data-scope='image-cropper'][data-part='image'] {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  [data-scope='image-cropper'][data-part='selection'] {
    border: 2px solid #f8fafc;
    box-shadow: 0 0 0 9999px rgb(15 23 42 / 55%);
  }

  [data-scope='image-cropper'][data-part='selection'][data-shape='circle'] {
    border-radius: 999px;
  }

  [data-scope='image-cropper'][data-part='handle'] {
    width: 12px;
    height: 12px;
    background: #f8fafc;
    border: 1px solid #0f172a;
  }

  [data-scope='image-cropper'][data-part='grid'] {
    border-color: rgb(248 250 252 / 70%);
    border-style: solid;
  }

  [data-scope='image-cropper'][data-part='grid'][data-axis='horizontal'] {
    border-width: 1px 0;
  }

  [data-scope='image-cropper'][data-part='grid'][data-axis='vertical'] {
    border-width: 0 1px;
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  button {
    border: 1px solid #94a3b8;
    border-radius: 6px;
    background: #ffffff;
    color: #0f172a;
    padding: 6px 10px;
  }
`
