export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <h1>layout</h1>
        {children}
      </body>
    </html>
  )
}
