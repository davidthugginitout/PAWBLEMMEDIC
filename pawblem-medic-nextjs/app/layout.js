import './globals.css'

export const metadata = {
  title: 'Pawblem Medic',
  description: 'Premium post-op care execution.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
