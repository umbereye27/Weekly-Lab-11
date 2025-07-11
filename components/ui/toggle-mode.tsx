"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark"
    console.log("Switching theme from", resolvedTheme, "to", newTheme)
    setTheme(newTheme)
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300
        ${isDark ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white flex items-center justify-center text-xs text-black shadow-md transition-all duration-300
          ${isDark ? "translate-x-6" : "translate-x-0"}`}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </div>
    </button>
  )
}
