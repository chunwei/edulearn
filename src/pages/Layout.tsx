import React, { ReactNode } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { AppSidebar } from '../components/layout/AppSidebar'
import { useAuth } from '../contexts/AuthContext'
import {
  SidebarProvider,
  SidebarInset
  // SidebarTrigger
} from '../components/ui/sidebar'
// import { Separator } from '@/components/ui/separator'
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator
// } from '@/components/ui/breadcrumb'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

/**
 * 应用程序的主布局组件
 * 包含顶部导航栏和侧边栏
 * 使用shadcn-ui的sidebar组件进行构建
 */
export function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // 检查当前路径是否为认证相关页面
  const isAuthPage = [
    '/login',
    '/sign-up',
    '/forgot-password',
    '/update-password'
  ].includes(location.pathname)

  // 如果是认证页面，直接渲染子组件（由 AuthLayout 处理布局）
  if (isAuthPage) {
    return <>{children}</>
  }

  // 如果未认证且不是认证页面，也直接渲染子组件（应该是重定向到登录页面）
  if (!isAuthenticated) {
    return <>{children}</>
  }

  // 已认证的应用页面使用完整布局
  return (
    <div className="relative min-h-svh flex flex-col">
      {/* 顶部导航栏 */}
      <Navbar />

      {/* 主内容区域 - 使用剩余高度 */}
      <div className="flex-1 flex overflow-hidden">
        <div className="container-wrapper">
          <div className="container">
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                  <div className="flex items-center gap-2 px-3">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="#">
                            Building Your Application
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header> */}
                <main className="flex-1 overflow-y-auto bg-background">
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </div>
        </div>
      </div>
    </div>
  )
}