'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import LogoLight from '@/data/logo.svg'
import LogoDark from '@/data/logodark.svg'

const Logo = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? <LogoLight /> : <LogoDark />}
    </div>
  )
}

export default Logo
