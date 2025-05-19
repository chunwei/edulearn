import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'

/**
 * 主题切换组件
 * 允许用户在浅色和深色主题之间切换
 */
export function ThemeSwitch() {
  // 使用 localStorage 存储主题偏好
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // 检查 localStorage 中是否有存储的主题偏好
    const savedTheme = localStorage.getItem('theme')
    // 检查系统偏好
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    // 如果有存储的主题偏好，使用它；否则使用系统偏好
    return savedTheme ? savedTheme === 'dark' : prefersDark
  })

  // 切换主题
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  // 当主题状态改变时，更新 document 的 class 和 localStorage
  useEffect(() => {
    // 更新 localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')

    // 更新 document 的 class
    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkTheme])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkTheme ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
