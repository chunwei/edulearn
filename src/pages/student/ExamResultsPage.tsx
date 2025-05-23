import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2, XCircle, AlertTriangle, ArrowLeft, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { mockExams, mockExamResults, mockCourses } from '@/data/mockData'
import { useAuth } from '@/contexts/AuthContext'

/**
 * 考试结果页面
 * 显示学生考试的详细结果，包括得分、正确答案和反馈
 */
export function ExamResultsPage() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [exam, setExam] = useState<any>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (examId) {
      // 获取考试信息
      const foundExam = mockExams.find(e => e.id === examId)
      
      if (foundExam) {
        setExam(foundExam)
        
        // 获取考试结果 (在实际应用中，这里会根据学生ID和考试ID获取)
        const foundResult = mockExamResults.find(
          r => r.examId === examId && r.studentId === '1' // 假设当前学生ID为1
        )
        
        if (foundResult) {
          setResult(foundResult)
        }
      }
      
      setLoading(false)
    }
  }, [examId])

  // 获取课程信息
  const getCourseInfo = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId)
    return course ? course.title : '未知课程'
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN')
  }

  // 计算得分百分比
  const calculatePercentage = () => {
    if (!exam || !result) return 0
    return Math.round((result.score / exam.totalPoints) * 100)
  }

  // 获取成绩等级
  const getGrade = () => {
    const percentage = calculatePercentage()
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600' }
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600' }
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600' }
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-600' }
    return { grade: 'F', color: 'text-red-600' }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">加载考试结果...</p>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">考试未找到</h2>
            <p className="text-muted-foreground mb-4">无法加载请求的考试结果</p>
            <Button onClick={() => navigate('/student/exams')}>
              返回考试列表
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">结果未找到</h2>
            <p className="text-muted-foreground mb-4">您尚未完成此考试或结果正在处理中</p>
            <Button onClick={() => navigate('/student/exams')}>
              返回考试列表
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const percentage = calculatePercentage()
  const { grade, color } = getGrade()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/student/exams')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回考试列表
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{exam.title}</CardTitle>
              <CardDescription>
                {getCourseInfo(exam.courseId)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">提交时间</p>
                    <p>{formatDate(result.submissionTime)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">总分</p>
                    <p>
                      {result.score} / {exam.totalPoints} 分
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>得分百分比</span>
                    <span className={color}>{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">答题详情</h3>
                  {exam.questions.map((question: any, index: number) => {
                    const studentAnswer = result.answers[question.id]
                    const isCorrect = 
                      question.type === 'essay' || question.type === 'short-answer'
                        ? true // 简答题和论述题不自动判断正确性
                        : studentAnswer === question.correctAnswer

                    return (
                      <div key={question.id} className="mb-6 p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">
                            问题 {index + 1} ({question.points}分)
                          </h4>
                          {question.type !== 'essay' && question.type !== 'short-answer' && (
                            isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )
                          )}
                        </div>
                        
                        <p className="mb-3">{question.content}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground">您的答案:</p>
                            <p className="p-2 bg-muted rounded">{studentAnswer || '未作答'}</p>
                          </div>
                          
                          {(question.type !== 'essay' && question.type !== 'short-answer') && (
                            <div>
                              <p className="text-sm text-muted-foreground">正确答案:</p>
                              <p className="p-2 bg-muted rounded">{question.correctAnswer}</p>
                            </div>
                          )}
                          
                          {result.feedback && result.feedback[question.id] && (
                            <div>
                              <p className="text-sm text-muted-foreground">教师反馈:</p>
                              <p className="p-2 bg-blue-50 rounded">{result.feedback[question.id]}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>成绩摘要</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className={`text-6xl font-bold ${color}`}>{grade}</div>
                <p className="text-xl mt-2">{percentage}%</p>
                <p className="text-muted-foreground mt-1">
                  {result.score} / {exam.totalPoints} 分
                </p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> 下载成绩单
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" /> 分享结果
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>相关资源</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link to={`/courses/${exam.courseId}`} className="text-blue-600 hover:underline">
                    查看课程材料
                  </Link>
                </li>
                <li>
                  <Link to="/student/progress" className="text-blue-600 hover:underline">
                    查看学习进度
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}