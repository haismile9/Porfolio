import { ClassicShell } from '@/components/classic/ClassicShell'
import { ClassicSidebar } from '@/components/classic/ClassicSidebar'

// All pages share the classic, text-focused shell
export default function ClassicLayout({ children }: { children: React.ReactNode }) {
  return <ClassicShell sidebar={<ClassicSidebar />}>{children}</ClassicShell>
}
