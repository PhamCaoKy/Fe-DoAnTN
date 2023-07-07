import { ClipboardDocumentListIcon, CalendarDaysIcon } from '@heroicons/react/20/solid'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Typography } from '@material-tailwind/react'
import './Profile.css'
import React, { useEffect, useState } from 'react'
import DatePicker from 'src/components/Ranking'
import TimeLine from 'src/components/TimeLine'
import { useMutation } from '@tanstack/react-query'
import { getCompleteLesson } from 'src/apis/auth.api'
interface IDUSER {
  idUser_FK: number
}
export interface ResponseCompleteLesson {
  dateComplete: string
  idLesson_FK: number
  idUserResults: number
  lessonComplete: string
  point: number
  idUser_FK: number
}
const initialResponseCompleteLesson = {
  dateComplete: '',
  idLesson_FK: 0,
  idUserResults: 0,
  lessonComplete: '',
  point: 0,
  idUser_FK: 0
}
export default function Profile() {
  const idUser = Number(window.localStorage.getItem('iduser'))
  const name = localStorage.getItem('name')
  const nameUser = name?.split('"').join('')

  const [completeLesson, setCompleteLesson] = useState<[ResponseCompleteLesson]>([initialResponseCompleteLesson])
  const date = completeLesson.map((value) => {
    return value.dateComplete
  })

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
  return (
    <div className='pl-12'>
      <div className='flex items-center gap-4 pt-12'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>

        <div>
          <Typography variant='h6'>{nameUser}</Typography>
        </div>
      </div>
      <hr className='mr-12 mt-5' color='' />
      <Tabs value='dashboard' className='mr-12 pt-5'>
        <TabsHeader>
          <Tab value='dashboard'>
            <div className='flex items-center gap-2'>
              {React.createElement(CalendarDaysIcon, { className: 'w-5 h-5' })}
              Xếp hạng học tập
            </div>
          </Tab>
          <Tab value='profile'>
            <div className='flex items-center gap-2'>
              {React.createElement(ClipboardDocumentListIcon, { className: 'w-5 h-5' })}
              Học phần
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value='dashboard'>
            <DatePicker></DatePicker>
          </TabPanel>
        </TabsBody>
        <TabsBody>
          <TabPanel value='profile'>
            <TimeLine completeLesson={completeLesson}></TimeLine>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  )
}
