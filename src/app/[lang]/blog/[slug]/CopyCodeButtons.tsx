'use client'

import { useEffect } from 'react'

// Wires up the server-rendered "copy" buttons in code blocks (event delegation,
// so the article HTML itself stays static).
export function CopyCodeButtons({ containerId }: { containerId: string }) {
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const onClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button.copy-code')
      if (!button) return
      const code = button.closest('.code-block')?.querySelector('pre')?.innerText ?? ''
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'copied!'
        setTimeout(() => (button.textContent = 'copy'), 2000)
      })
    }

    container.addEventListener('click', onClick)
    return () => container.removeEventListener('click', onClick)
  }, [containerId])

  return null
}
