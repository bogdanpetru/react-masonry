import { Logo } from '@/components/Logo'
import { loadFile } from '../../utils/loadFile'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
