import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Clock,
  AlertTriangle,
  Save,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { mockExams } from '@/data/mockData'

/**
 * Student Exam Page Component
 * Provides online exam functionality, supports multiple question types, timing and auto-save
 */
export function ExamPage() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()
  const [exam, setExam] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load exam data
  useEffect(() => {
    if (examId) {
      const foundExam = mockExams.find((e) => e.id === examId)
      if (foundExam) {
        setExam(foundExam)
        setTimeRemaining(foundExam.duration * 60) // Convert to seconds
        // Initialize answers object
        const initialAnswers: Record<string, any> = {}
        foundExam.questions.forEach((q) => {
          initialAnswers[q.id] = ''
        })
        setAnswers(initialAnswers)
      }
    }
  }, [examId])

  // Timer
  useEffect(() => {
    if (!exam || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [exam, timeRemaining])

  // Auto save
  useEffect(() => {
    if (!exam) return

    const autoSaveInterval = setInterval(() => {
      handleSave()
    }, 30000) // Auto save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [exam, answers])

  // Format remaining time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  // Save answers
  const handleSave = () => {
    // In a real application, this would call an API to save answers
    toast('Progress Saved', {
      description: 'Your answers have been automatically saved',
      duration: 2000
    })
  }

  // Submit exam
  const handleSubmit = () => {
    setIsSubmitting(true)
    // In a real application, this would call an API to submit answers
    setTimeout(() => {
      setIsSubmitting(false)
      toast('Exam Submitted', {
        description: 'Your answers have been successfully submitted'
      })
      navigate('/student/exams/results/' + examId)
    }, 1500)
  }

  // Update answer
  const updateAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }))
  }

  // Next question
  const nextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  // Previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Exam Not Found</h2>
            <p className="text-muted-foreground mb-4">
              Unable to load the requested exam
            </p>
            <Button onClick={() => navigate('/student/exams')}>
              Return to Exam List
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = exam.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <p className="text-muted-foreground">{exam.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-md flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span className="font-mono">{formatTime(timeRemaining)}</span>
          </div>
          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Exam'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>
                  Question {currentQuestionIndex + 1} / {exam.questions.length}
                </span>
                <span className="text-muted-foreground">
                  {currentQuestion.points} points
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">
                  {currentQuestion.content}
                </h3>

                {currentQuestion.type === 'multiple-choice' && (
                  <RadioGroup
                    value={answers[currentQuestion.id]}
                    onValueChange={(value) =>
                      updateAnswer(currentQuestion.id, value)
                    }
                  >
                    {currentQuestion.options.map(
                      (option: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}`}
                          />
                          <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                )}

                {currentQuestion.type === 'true-false' && (
                  <RadioGroup
                    value={answers[currentQuestion.id]}
                    onValueChange={(value) =>
                      updateAnswer(currentQuestion.id, value)
                    }
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="true" id="true" />
                      <Label htmlFor="true">True</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="false" />
                      <Label htmlFor="false">False</Label>
                    </div>
                  </RadioGroup>
                )}

                {(currentQuestion.type === 'short-answer' ||
                  currentQuestion.type === 'essay') && (
                  <Textarea
                    value={answers[currentQuestion.id]}
                    onChange={(e) =>
                      updateAnswer(currentQuestion.id, e.target.value)
                    }
                    placeholder="Enter your answer here..."
                    className={
                      currentQuestion.type === 'essay'
                        ? 'min-h-[200px]'
                        : 'min-h-[100px]'
                    }
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === exam.questions.length - 1}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((_: string, index: number) => {
                  const isAnswered = !!answers[exam.questions[index].id]
                  const isCurrent = index === currentQuestionIndex

                  return (
                    <Button
                      key={index}
                      variant={
                        isCurrent
                          ? 'default'
                          : isAnswered
                          ? 'secondary'
                          : 'outline'
                      }
                      className="h-10 w-10 p-0"
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
