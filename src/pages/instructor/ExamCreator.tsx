import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, Trash2, Save, Clock, FileText } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Textarea } from '../../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select'
import { Label } from '../../components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'

/**
 * 考试创建页面
 * 允许教师创建新的考试，添加不同类型的题目
 */
export function ExamCreator() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('basic')

  // 基本信息
  const [examTitle, setExamTitle] = useState('')
  const [examDescription, setExamDescription] = useState('')
  const [courseId, setCourseId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [totalPoints, setTotalPoints] = useState(100)

  // 题目列表
  const [questions, setQuestions] = useState([
    {
      id: '1',
      type: 'multiple-choice',
      content: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10
    }
  ])

  // 添加新题目
  const addQuestion = (type: string) => {
    const newQuestion = {
      id: `q-${Date.now()}`,
      type,
      content: '',
      options: type === 'multiple-choice' ? ['', '', '', ''] : [],
      correctAnswer: '',
      points: 10
    }

    setQuestions([...questions, newQuestion])
  }

  // 删除题目
  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(index, 1)
    setQuestions(updatedQuestions)
  }

  // 更新题目内容
  const updateQuestionContent = (index: number, content: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].content = content
    setQuestions(updatedQuestions)
  }

  // 更新选项
  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setQuestions(updatedQuestions)
  }

  // 设置正确答案
  const setCorrectAnswer = (questionIndex: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].correctAnswer = value
    setQuestions(updatedQuestions)
  }

  // 更新题目分值
  const updateQuestionPoints = (index: number, points: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].points = parseInt(points) || 0
    setQuestions(updatedQuestions)
  }

  // 保存考试
  const saveExam = () => {
    // 在实际应用中，这里会调用API保存考试数据
    console.log({
      title: examTitle,
      description: examDescription,
      courseId,
      startTime,
      endTime,
      totalPoints,
      questions
    })

    alert('考试已保存！')
    navigate('/instructor/exams')
  }

  // 模拟课程数据
  const mockCourses = [
    { id: '1', title: 'Web开发入门' },
    { id: '2', title: 'JavaScript高级编程' },
    { id: '3', title: '数据结构与算法' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">创建新考试</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="questions">题目管理</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>考试基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-title">考试标题</Label>
                  <Input
                    id="exam-title"
                    placeholder="输入考试标题"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exam-description">考试描述</Label>
                  <Textarea
                    id="exam-description"
                    placeholder="输入考试描述和要求"
                    value={examDescription}
                    onChange={(e) => setExamDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-select">选择课程</Label>
                  <Select value={courseId} onValueChange={setCourseId}>
                    <SelectTrigger id="course-select">
                      <SelectValue placeholder="选择关联课程" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">开始时间</Label>
                    <Input
                      id="start-time"
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-time">结束时间</Label>
                    <Input
                      id="end-time"
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-points">总分值</Label>
                  <Input
                    id="total-points"
                    type="number"
                    min="0"
                    value={totalPoints}
                    onChange={(e) =>
                      setTotalPoints(parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setActiveTab('questions')}
                  className="ml-auto"
                >
                  下一步：添加题目
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="mt-6">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">题目管理</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => addQuestion('multiple-choice')}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  添加选择题
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addQuestion('true-false')}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  添加判断题
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addQuestion('short-answer')}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  添加简答题
                </Button>
              </div>
            </div>

            {questions.map((question, index) => (
              <Card key={question.id} className="mb-6">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      题目 {index + 1}:
                      {question.type === 'multiple-choice'
                        ? '选择题'
                        : question.type === 'true-false'
                        ? '判断题'
                        : '简答题'}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQuestion(index)}
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>题目内容</Label>
                    <Textarea
                      placeholder="输入题目内容"
                      value={question.content}
                      onChange={(e) =>
                        updateQuestionContent(index, e.target.value)
                      }
                      rows={2}
                    />
                  </div>

                  {question.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      <Label>选项</Label>
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <RadioGroup
                            value={question.correctAnswer}
                            onValueChange={(value) =>
                              setCorrectAnswer(index, value)
                            }
                            className="flex items-center"
                          >
                            <RadioGroupItem
                              value={optIndex.toString()}
                              id={`q${index}-opt${optIndex}`}
                            />
                          </RadioGroup>
                          <Input
                            placeholder={`选项 ${optIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                              updateOption(index, optIndex, e.target.value)
                            }
                            className="flex-1"
                          />
                        </div>
                      ))}
                      <p className="text-sm text-muted-foreground">
                        选择正确答案的单选按钮
                      </p>
                    </div>
                  )}

                  {question.type === 'true-false' && (
                    <div className="space-y-2">
                      <Label>正确答案</Label>
                      <RadioGroup
                        value={question.correctAnswer}
                        onValueChange={(value) =>
                          setCorrectAnswer(index, value)
                        }
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id={`q${index}-true`} />
                          <Label htmlFor={`q${index}-true`}>正确</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="false"
                            id={`q${index}-false`}
                          />
                          <Label htmlFor={`q${index}-false`}>错误</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {question.type === 'short-answer' && (
                    <div className="space-y-2">
                      <Label>参考答案</Label>
                      <Textarea
                        placeholder="输入参考答案"
                        value={question.correctAnswer || ''}
                        onChange={(e) =>
                          setCorrectAnswer(index, e.target.value)
                        }
                        rows={2}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor={`points-${index}`}>分值</Label>
                    <Input
                      id={`points-${index}`}
                      type="number"
                      min="0"
                      value={question.points}
                      onChange={(e) =>
                        updateQuestionPoints(index, e.target.value)
                      }
                      className="w-24"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab('basic')}>
                返回基本信息
              </Button>
              <Button onClick={saveExam}>
                <Save className="mr-2 h-4 w-4" />
                保存考试
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
