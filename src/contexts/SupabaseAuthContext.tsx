import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { User } from '../types'
import { createClient } from '@/lib/supabase/client'

interface SupabaseAuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
  updateUser: (updatedUserData: Partial<User>) => Promise<void>
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(
  undefined
)

/**
 * Supabase 认证提供者组件
 * 提供与现有 AuthContext 兼容的接口，但使用 Supabase 实现认证功能
 */
export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const navigate = useNavigate()
  const location = useLocation()

  // 在 useEffect 中添加重定向逻辑
  useEffect(() => {
    // 如果不在登录页面且未加载中且用户未认证，重定向到登录页面
    if (
      !isLoading &&
      !user &&
      !['/login', '/sign-up', '/forgot-password', '/update-password'].includes(
        location.pathname
      )
    ) {
      navigate('/login')
    }
  }, [user, isLoading, location.pathname, navigate])

  // 初始化时获取当前用户
  useEffect(() => {
    async function getUser() {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
          setUser(null)
        } else if (data?.user) {
          // 将 Supabase 用户数据转换为应用的 User 类型
          // 这里需要根据实际情况调整字段映射
          const appUser: User = {
            id: data.user.id,
            name:
              data.user.user_metadata.name ||
              data.user.email?.split('@')[0] ||
              '',
            email: data.user.email || '',
            role: data.user.user_metadata.role || 'student'
            // 其他必要字段...
          }
          setUser(appUser)
        }
      } catch (error) {
        console.error('Unexpected error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // 监听认证状态变化
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // 同样转换用户数据
        const appUser: User = {
          id: session.user.id,
          name:
            session.user.user_metadata.name ||
            session.user.email?.split('@')[0] ||
            '',
          email: session.user.email || '',
          role: session.user.user_metadata.role || 'student'
          // 其他必要字段...
        }
        setUser(appUser)
      } else {
        setUser(null)
      }
    })

    getUser()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // 登录方法
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Login error:', error)
        return false
      }

      return !!data.user
    } catch (error) {
      console.error('Unexpected login error:', error)
      return false
    }
  }

  // 登出方法
  const logout = async () => {
    await supabase.auth.signOut()
  }

  // 更新用户信息
  const updateUser = async (updatedUserData: Partial<User>) => {
    try {
      // 更新 Supabase 用户元数据
      const { error } = await supabase.auth.updateUser({
        data: updatedUserData
      })

      if (error) {
        console.error('Error updating user:', error)
        return
      }

      // 更新本地状态
      if (user) {
        setUser({ ...user, ...updatedUserData })
      }
    } catch (error) {
      console.error('Unexpected error updating user:', error)
    }
  }

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updateUser
      }}
    >
      {!isLoading && children}
    </SupabaseAuthContext.Provider>
  )
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext)
  if (context === undefined) {
    throw new Error(
      'useSupabaseAuth must be used within a SupabaseAuthProvider'
    )
  }
  return context
}
