import { Button, ButtonGroup } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import { getLesson } from 'src/apis/auth.api'
interface Prop {
  icon: any
  course: string
  decription: string
}
interface Lesson {
  course: string
}
export default function Product(props: Prop) {
  const navigate = useNavigate()
  const lessonMutation = useMutation({
    mutationFn: (body: Lesson) => getLesson(body)
  })
  const handleLesson = (data: Lesson) => {
    lessonMutation.mutate(data, {
      onSuccess: (data2) => {
        navigate('/lesson', { state: data2.data.data?.lesson })
      }
    })
  }
  return (
    <div className='w-full rounded-lg bg-cyan-200 px-4 pt-6 text-center hover:bg-cyan-500 md:w-4/12'>
      <div className='relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg'>
        <div className='flex-auto px-4 py-5'>
          <div className='mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-400 p-3 text-center text-white shadow-lg'>
            {props.icon}
          </div>
          <h6 className='text-xl font-semibold'>{props.course}</h6>
          <p className='mb-4 mt-2 text-gray-600'>{props.decription}</p>
          <ButtonGroup fullWidth={true}>
            <Button onClick={() => handleLesson({ course: props.course })}>Học nào</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}
