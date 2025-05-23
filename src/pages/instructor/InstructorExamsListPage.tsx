import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusCircle, Edit, Eye, Trash2, FileText, Clock, Users } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { mockExams, mockCourses, mockUsers } from '@/data/mockData'
import { useAuth } from '@/contexts/AuthContext'
import { Exam } from '@/types'

/**
 * 教师考试列表页面
 * 显示教师创建的所有考试，包括未发布、进行中和已结束的考试
 */
export function InstructorExamsListPage() {
  const { user: authUser } = useAuth()
  const navigate = useNavigate()
  const [activeExams, setActiveExams] = useState<Exam[]>([])
  const [pastExams, setPastExams] = useState<Exam[]>([])
  const [draftExams, setDraftExams] = useState<Exam[]>([])

  // 获取当前用户
  const currentUser = useMemo(() => {
    if (!authUser) return null
    return mockUsers.find((u) => u.email === authUser.email)
  }, [authUser])

  useEffect(() => {
    if (authUser && currentUser && currentUser.role === 'instructor') {
      // 在实际应用中，这里会根据教师ID获取相关考试
      const now = new Date()
      
      // 过滤出教师创建的考试
      // 假设教师教授的课程ID为1和2
      const instructorExams = mockExams.filter(exam => {
        return exam.courseId === '1' || exam.courseId === '2'
      })
      
      // 分类考试
      setActiveExams(
        instructorExams.filter(exam => {
          const startTime = new Date(exam.startTime)
          const endTime = new Date(exam.endTime)
          return now >= startTime && now <= endTime
        })
      )
      
      setPastExams(
        instructorExams.filter(exam => {
          const endTime = new Date(exam.endTime)
          return now > endTime
        })
      )
      
      // 假设草稿考试是开始时间在未来的考试
      setDraftExams(
        instructorExams.filter(exam => {
          const startTime = new Date(exam.startTime)
          return now < startTime
        })
      )
    }
  }, [authUser, currentUser])

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

  // 获取考试状态
  const getExamStatus = (exam: Exam) => {
    const now = new Date()
    const startTime = new Date(exam.startTime)
    const endTime = new Date(exam.endTime)
    
    if (now < startTime) {
      return { status: 'draft', label: '未开始', color: 'bg-gray-500' }
    } else if (now >= startTime && now <= endTime) {
      return { status: 'active', label: '进行中', color: 'bg-green-500' }
    } else {
      return { status: 'ended', label: '已结束', color: 'bg-blue-500' }
    }
  }

  // 删除考试
  const deleteExam = (examId: string) => {
    // 在实际应用中，这里会调用API删除考试
    alert(`删除考试 ${examId}`)
  }

  // 创建考试卡片
  const renderExamCard = (exam: Exam) => {
    const { status, label, color } = getExamStatus(exam)
    
    return (
      <Card key={exam.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{exam.title}</CardTitle>
              <CardDescription>{exam.description}</CardDescription>
            </div>
            <Badge className={color}>{label}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{getCourseInfo(exam.courseId)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{exam.duration} 分钟</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">开始:</span>
              <span>{formatDateTime(exam.startTime)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">结束:</span>
              <span>{formatDateTime(exam.endTime)}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2">
          <div>
            {status === 'ended' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/instructor/exams/grade/${exam.id}`)}
              >
                <Users className="mr-2 h-4 w-4" />
                查看学生答案
              </Button>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/instructor/exams/edit/${exam.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                编辑考试
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/instructor/exams/preview/${exam.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                预览考试
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600" 
                onClick={() => deleteExam(exam.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                删除考试
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">我的考试</h1>
        <Button onClick={() => navigate('/instructor/exams/create')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          创建新考试
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="active">
            进行中 ({activeExams.length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            未开始 ({draftExams.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            已结束 ({pastExams.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeExams.length > 0 ? (
            activeExams.map(exam => renderExamCard(exam))
          ) : (
            <Card>
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-muted-foreground">当前没有进行中的考试</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="draft">
          {draftExams.length > 0 ? (
            draftExams.map(exam => renderExamCard(exam))
          ) : (
            <Card>
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-muted-foreground">当前没有未开始的考试</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastExams.length > 0 ? (
            pastExams.map(exam => renderExamCard(exam))
          ) : (
            <Card>
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-muted-foreground">当前没有已结束的考试</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}