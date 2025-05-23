import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  CheckCircle,
  XCircle,
  User,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  mockExams,
  mockExamResults,
  mockUsers,
  mockCourses,
  ExamResult
} from '@/data/mockData'
import { useAuth } from '@/contexts/AuthContext'
import { Question } from '@/types'

/**
 * 教师考试评分页面
 * 允许教师查看学生的考试答案并进行评分和反馈
 */
export function InstructorExamGradePage() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [exam, setExam] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  )
  const [feedback, setFeedback] = useState<Record<string, string>>({})
  const [scores, setScores] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // 加载考试和学生答案数据
  useEffect(() => {
    if (examId) {
      // 获取考试信息
      const foundExam = mockExams.find((e) => e.id === examId)

      if (foundExam) {
        setExam(foundExam)

        // 获取所有学生的考试结果
        const examResults: ExamResult[] = mockExamResults.filter(
          (r) => r.examId === examId
        )
        setResults(examResults)

        // 默认选择第一个学生
        if (examResults.length > 0 && !selectedStudentId) {
          setSelectedStudentId(examResults[0].studentId)

          // 初始化反馈和分数
          const initialFeedback: Record<string, string> = {}
          const initialScores: Record<string, number> = {}

          foundExam.questions.forEach((q: Question) => {
            initialFeedback[q.id] =
              (examResults[0].feedback as Record<string, string>)?.[q.id] || ''

            // 对于简答题和论述题，需要教师评分
            if (q.type === 'short-answer' || q.type === 'essay') {
              initialScores[q.id] =
                (examResults[0].questionScores as Record<string, number>)?.[
                  q.id
                ] || 0
            }
          })

          setFeedback(initialFeedback)
          setScores(initialScores)
        }
      }

      setLoading(false)
    }
  }, [examId, selectedStudentId])

  // 获取学生信息
  const getStudentInfo = (studentId: string) => {
    const student = mockUsers.find((u) => u.id === studentId)
    return student || { name: '未知学生', email: '' }
  }

  // 获取课程信息
  const getCourseInfo = (courseId: string) => {
    const course = mockCourses.find((c) => c.id === courseId)
    return course ? course.title : '未知课程'
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN')
  }

  // 计算得分百分比
  const calculatePercentage = (result: any) => {
    if (!exam) return 0
    return Math.round((result.score / exam.totalPoints) * 100)
  }

  // 获取成绩等级
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600' }
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600' }
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600' }
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-600' }
    return { grade: 'F', color: 'text-red-600' }
  }

  // 更新反馈
  const updateFeedback = (questionId: string, value: string) => {
    setFeedback((prev) => ({
      ...prev,
      [questionId]: value
    }))
  }

  // 更新分数
  const updateScore = (questionId: string, value: string) => {
    const numValue = parseInt(value) || 0
    setScores((prev) => ({
      ...prev,
      [questionId]: numValue
    }))
  }

  // 保存评分和反馈
  const saveGrading = () => {
    setSaving(true)

    // 在实际应用中，这里会调用API保存评分和反馈
    setTimeout(() => {
      setSaving(false)
      toast.success('评分已保存', {
        description: '学生将能够查看您的反馈'
      })
    }, 1000)
  }

  // 选择学生
  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId)

    // 获取该学生的反馈和分数
    const studentResult = results.find((r) => r.studentId === studentId)

    if (studentResult && exam) {
      const initialFeedback: Record<string, string> = {}
      const initialScores: Record<string, number> = {}

      exam.questions.forEach((q: any) => {
        initialFeedback[q.id] = studentResult.feedback?.[q.id] || ''

        if (q.type === 'short-answer' || q.type === 'essay') {
          initialScores[q.id] = studentResult.questionScores?.[q.id] || 0
        }
      })

      setFeedback(initialFeedback)
      setScores(initialScores)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">加载考试数据...</p>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">考试未找到</h2>
            <p className="text-muted-foreground mb-4">无法加载请求的考试</p>
            <Button onClick={() => navigate('/instructor/exams')}>
              返回考试列表
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/instructor/exams')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回考试列表
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{exam.title}</CardTitle>
            <CardDescription>{getCourseInfo(exam.courseId)}</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="mb-4">
              <XCircle className="mx-auto h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">暂无学生提交</h2>
            <p className="text-muted-foreground">
              目前还没有学生提交此考试的答案
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedResult = results.find((r) => r.studentId === selectedStudentId)
  const percentage = selectedResult ? calculatePercentage(selectedResult) : 0
  const { grade, color } = getGrade(percentage)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/instructor/exams')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回考试列表
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>学生列表</CardTitle>
              <CardDescription>共 {results.length} 名学生提交</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {results.map((result) => {
                  const student = getStudentInfo(result.studentId)
                  const isSelected = result.studentId === selectedStudentId
                  const studentPercentage = calculatePercentage(result)
                  const studentGrade = getGrade(studentPercentage)

                  return (
                    <div
                      key={result.studentId}
                      className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                        isSelected ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleStudentSelect(result.studentId)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                        <div className={`font-bold ${studentGrade.color}`}>
                          {studentGrade.grade}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatDate(result.submissionTime)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {selectedResult && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{exam.title}</CardTitle>
                      <CardDescription>
                        {getCourseInfo(exam.courseId)}
                      </CardDescription>
                    </div>
                    <Button onClick={saveGrading} disabled={saving}>
                      <Save className="mr-2 h-4 w-4" />
                      {saving ? '保存中...' : '保存评分'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">学生</p>
                      <p className="font-medium">
                        {getStudentInfo(selectedResult.studentId).name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">提交时间</p>
                      <p>{formatDate(selectedResult.submissionTime)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">得分</p>
                      <p>
                        <span className="font-bold">
                          {selectedResult.score}
                        </span>{' '}
                        / {exam.totalPoints} 分
                        <span className={`ml-2 ${color} font-bold`}>
                          ({grade})
                        </span>
                      </p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">答题详情</h3>
                    {exam.questions.map((question: any, index: number) => {
                      const studentAnswer = selectedResult.answers[question.id]
                      const isCorrect =
                        question.type === 'essay' ||
                        question.type === 'short-answer'
                          ? null // 简答题和论述题不自动判断正确性
                          : studentAnswer === question.correctAnswer

                      return (
                        <div
                          key={question.id}
                          className="mb-6 p-4 border rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">
                              问题 {index + 1} ({question.points}分)
                            </h4>
                            {isCorrect !== null &&
                              (isCorrect ? (
                                <Badge className="bg-green-500">正确</Badge>
                              ) : (
                                <Badge className="bg-red-500">错误</Badge>
                              ))}
                          </div>

                          <p className="mb-3">{question.content}</p>

                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                学生答案:
                              </p>
                              <p className="p-2 bg-muted rounded">
                                {studentAnswer || '未作答'}
                              </p>
                            </div>

                            {question.type !== 'essay' &&
                              question.type !== 'short-answer' && (
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    正确答案:
                                  </p>
                                  <p className="p-2 bg-muted rounded">
                                    {question.correctAnswer}
                                  </p>
                                </div>
                              )}

                            {/* 教师评分区域 - 仅对简答题和论述题 */}
                            {(question.type === 'essay' ||
                              question.type === 'short-answer') && (
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <Label htmlFor={`score-${question.id}`}>
                                    评分:
                                  </Label>
                                  <div className="flex items-center">
                                    <Input
                                      id={`score-${question.id}`}
                                      type="number"
                                      min="0"
                                      max={question.points}
                                      value={scores[question.id] || 0}
                                      onChange={(e) =>
                                        updateScore(question.id, e.target.value)
                                      }
                                      className="w-20 mr-2"
                                    />
                                    <span>/ {question.points}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 教师反馈区域 */}
                            <div>
                              <Label
                                htmlFor={`feedback-${question.id}`}
                                className="mb-1 block"
                              >
                                反馈:
                              </Label>
                              <Textarea
                                id={`feedback-${question.id}`}
                                value={feedback[question.id] || ''}
                                onChange={(e) =>
                                  updateFeedback(question.id, e.target.value)
                                }
                                placeholder="为学生提供反馈..."
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div></div>
                  <Button onClick={saveGrading} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? '保存中...' : '保存评分'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
