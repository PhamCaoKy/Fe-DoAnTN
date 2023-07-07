import { Button, Typography, Drawer } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLesson, newCompleteLesson } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'

interface Lesson {
  course: string
}
interface Props {
  complete: boolean
  point: number
  handleReturn: () => void
  course: string
  infoLesson: any
}
export interface LessonComplete {
  lessonComplete: string
  dateComplete: string
  point: number
  course : string
  idLesson_FK: number
  idUser_FK: number
}
var today = new Date()

var date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear()
export default function DrawerFinish(props: Props) {
  const idUser = Number(window.localStorage.getItem('iduser'))
  const isComplete = props.complete
  const navigate = useNavigate()
  const infolesson = props.infoLesson
  const idLesson = infolesson.idLesson
  const nameLesson = infolesson.nameLesson
  const course = infolesson.course
  const { isAuthenticated } = useContext(AppContext)
  const isPass = (point: number) => {
    if (point > 80) {
      return true
    } else {
      return false
    }
  }
  const lessonCompleteMutation = useMutation({
    mutationFn: (body: LessonComplete) => newCompleteLesson(body)
  })
  const handleLessonComplete = (data: LessonComplete) => {
    if (isComplete && isPass(props.point) && isAuthenticated) {
      lessonCompleteMutation.mutate(data)
    }
  }
  const quizMutation = useMutation({
    mutationFn: (body: Lesson) => getLesson(body)
  })
  const handleLesson = (data: Lesson) => {
    quizMutation.mutate(data, {
      onSuccess: (data2) => {
        navigate('/lesson', { state: data2.data.data?.lesson })
      }
    })
  }

  useEffect(() => {
    handleLessonComplete({
      lessonComplete: nameLesson,
      dateComplete: date,
      point: props.point,
      course: course,
      idLesson_FK: idLesson,
      idUser_FK: idUser
    })
  }, [isComplete])

  return (
    <Drawer open={isComplete} className='p-4'>
      <div className='mb-6 flex items-center justify-between'>
        {isPass(props.point) ? (
          <Typography variant='h5' color='green'>
            Chúc mừng bé vượt qua bài kiểm tra nhé 😊
          </Typography>
        ) : (
          <Typography variant='h5' color='red'>
            Tiếc quá, bé chưa vượt qua bài kiểm tra, hãy cố gắng ở lần sau nhé 😓
          </Typography>
        )}
      </div>
      <Typography color='blue' className='font-mono mb-8 pr-4'>
        Hãy luyện tập thật nhiều để có thể hiểu bài hơn
      </Typography>

      <div className='flex gap-2'>
        <Button
          onClick={props.handleReturn}
          className='group relative overflow-hidden rounded bg-green-500 px-5 py-2.5 text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-green-400 hover:ring-offset-2'
        >
          <span className='ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40' />
          <span className='relative'>Làm lại</span>
        </Button>

        <Button
          onClick={() => {
            handleLesson({ course: props.course })
          }}
          className='group relative  ml-10 overflow-hidden rounded bg-green-500 px-5 py-2.5 text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-green-400 hover:ring-offset-2'
        >
          <span className='ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40' />
          <span className='relative'>Học tiếp</span>
        </Button>
      </div>
    </Drawer>
  )
}
