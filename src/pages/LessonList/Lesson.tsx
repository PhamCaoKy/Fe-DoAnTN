import { Button, Card, Chip, List, ListItem, ListItemSuffix } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { getCompleteLesson, getFlashCard, getQuiz } from 'src/apis/auth.api'
import CourseCarousel from 'src/components/CourseCarousel'
import { ResponseCompleteLesson } from '../Profile/Profile'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import ChartProgress from 'src/components/ProgressLesson'

interface IDUSER {
  idUser_FK: number
}
interface Lesson {
  idLesson: number
  course: string
  nameLesson: string
  created_on: string
}
interface IdLesson {
  idLesson_FK: number
}
const initialResponseCompleteLesson = {
  dateComplete: '',
  idLesson_FK: 0,
  idUserResults: 0,
  lessonComplete: '',
  point: 0,
  idUser_FK: 0
}
export default function Lesson() {
  const navivgate = useNavigate()
  const location = useLocation()
  const Lesson = location.state
  const [completeLesson, setCompleteLesson] = useState<[ResponseCompleteLesson]>([initialResponseCompleteLesson])
  const idUser = Number(window.localStorage.getItem('iduser'))
  let count = 0
  const course = Lesson.map((value: any) => {
    return value.course
  })

  const FlashCardMutation = useMutation({
    mutationFn: (body: IdLesson) => getFlashCard(body)
  })
  const QuizMutaion = useMutation({
    mutationFn: (body: IdLesson) => getQuiz(body)
  })
  const handleFlashCard = (data: IdLesson) => {
    FlashCardMutation.mutate(data, {
      onSuccess: (data2) => {
        navivgate(`/lesson/flashcard/${data.idLesson_FK}`, { state: data2.data.data?.flashcard })
      }
    })
  }
  const getCompleteLessonMutation = useMutation({
    mutationFn: (body: IDUSER) => getCompleteLesson(body)
  })
  const handlegetCompleteLessonMutation = (data: IDUSER) => {
    getCompleteLessonMutation.mutate(data, {
      onSuccess: (data: any) => {
        setCompleteLesson(data.data.data?.userResult)
      }
    })
  }
  useEffect(() => {
    handlegetCompleteLessonMutation({
      idUser_FK: idUser
    })
  }, [])
  const handleQuiz = (data: IdLesson) => {
    QuizMutaion.mutate(data, {
      onSuccess: (data2) => {
        navivgate(`/lesson/quiz/${data.idLesson_FK}`, {
          state: { data: data2.data.data?.quiz, course: Lesson[1].course, idFK: data.idLesson_FK }
        })
      }
    })
  }
  const filteredResults: any = []
  const lessonSet = new Set()
  if (completeLesson[0].idUserResults) {
    for (const result of completeLesson) {
      const lesson = result.lessonComplete
      if (!lessonSet.has(lesson)) {
        filteredResults.push(result)
        lessonSet.add(lesson)
      }
    }
  }

  filteredResults.map((value: any) => {
    if (value.course === Lesson[0].course) {
      count += 1
    }
  })

  return (
    <div className='space-y-2'>
      <div className='text-center '>
        <CourseCarousel props={course[0]}></CourseCarousel>
        <ChartProgress percent={count / Lesson.length}></ChartProgress>
      </div>

      <div className='grid grid-cols-2 gap-4 p-4'>
        {Lesson.map((value: Lesson) => {
          return (
            <Card className='w-full ' key={value.idLesson}>
              <List className='p-0'>
                <ListItem ripple={false} className='p-2'>
                  {value.nameLesson}
                  {filteredResults
                    ? filteredResults.map((value1: any) => {
                        return value1.lessonComplete === value.nameLesson ? (
                          <div className='ml-16 flex gap-2'>
                            <Chip value='Hoàn thành' variant='ghost' color='green' icon={<CheckCircleIcon />} />
                          </div>
                        ) : (
                          ''
                        )
                      })
                    : ''}
                  <ListItemSuffix>
                    <Button
                      color='blue'
                      onClick={() => {
                        handleFlashCard({ idLesson_FK: value.idLesson })
                      }}
                    >
                      Học bài
                    </Button>
                    <Button
                      color='red'
                      className='mt-2'
                      onClick={() => {
                        handleQuiz({ idLesson_FK: value.idLesson })
                      }}
                    >
                      Làm kiểm tra
                    </Button>
                  </ListItemSuffix>
                </ListItem>
              </List>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
