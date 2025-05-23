import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockExams, mockCourses } from '@/data/mockData'
import { useAuth } from '@/contexts/AuthContext'

/**
 * 学生考试列表页面
 * 显示即将到来的和过去的考试，允许学生进入考试或查看结果
 */
export function ExamsListPage() {
  const { user } = useAuth()
  const [upcomingExams, setUpcomingExams] = useState<any[]>([])
  const [pastExams, setPastExams] = useState<any[]>([])

  useEffect(() => {
    // 在实际应用中，这里会根据学生ID获取相关考试
    const now = new Date()
    
    // 过滤出学生已注册课程的考试
    const studentExams = mockExams.filter(exam => {
      // 这里假设学生注册了ID为1和2的课程
      return exam.courseId === '1' || exam.courseId === '2'
    })
    
    // 分类为即将到来和已过期的考试
    setUpcomingExams(
      studentExams.filter(exam => new Date(exam.endTime) > now)
    )
    setPastExams(
      studentExams.filter(exam => new Date(exam.endTime) <= now)
    )
  }, [])

  // 获取考试关联的课程信息
  const getCourseInfo = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId)
    return course ? course.title : '未知课程'
  }

  // 格式化日期时间
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 检查考试是否正在进行
  const isExamActive = (exam: any) => {
    const now = new Date()
    const startTime = new Date(exam.startTime)
    const endTime = new Date(exam.endTime)
    return now >= startTime && now <= endTime
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">我的考试</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">即将到来的考试</TabsTrigger>
          <TabsTrigger value="past">已完成的考试</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingExams.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">没有即将到来的考试</h3>
              <p className="text-muted-foreground">当有新的考试安排时，会显示在这里</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingExams.map(exam => {
                const isActive = isExamActive(exam)
                
                return (
                  <Card key={exam.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{exam.title}</CardTitle>
                      <CardDescription>{getCourseInfo(exam.courseId)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">
                            开始: {formatDateTime(exam.startTime)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">时长: {exam.duration} 分钟</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">总分: {exam.totalPoints} 分</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {isActive ? (
                        <Button asChild className="w-full">
                          <Link to={`/student/exams/${exam.id}`}>
                            开始考试 <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <div className="w-full flex justify-between items-center">
                          <Badge variant="outline">
                            {new Date(exam.startTime) > new Date() ? '未开始' : '已结束'}
                          </Badge>
                          <Button variant="outline" asChild>
                            <Link to={`/student/exams/${exam.id}`}>查看详情</Link>
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastExams.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">没有历史考试记录</h3>
              <p className="text-muted-foreground">完成考试后，记录将显示在这里</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastExams.map(exam => (
                <Card key={exam.id}>
                  <CardHeader>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription>{getCourseInfo(exam.courseId)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          结束: {formatDateTime(exam.endTime)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">总分: {exam.totalPoints} 分</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/student/exams/results/${exam.id}`}>
                        查看结果 <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}