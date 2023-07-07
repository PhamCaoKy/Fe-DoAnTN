import { Alert, Button, ListItem, ListItemPrefix, Radio, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'

import { Quiz } from 'src/pages/Quiz/Quiz'
import MathCard from '../MathCard'

interface Props {
  propsQuiz: Quiz
  handlePoint: () => void
  goToNext: () => void
}
interface ActiveValue {
  value1: string
  value2: string
  value3: string
  value4: string
}
const initialActiveValue = {
  value1: '',
  value2: '',
  value3: '',
  value4: ''
}
export default function AnswerCard(props: Props) {
  const { value1, value2, value3, value4, question, correctValue, imageQuestion, typeQuiz } = props.propsQuiz
  const [endvalue, setEndValue] = useState('')
  const [activeValue, setActiveValue] = useState<ActiveValue>(initialActiveValue)
  const [isOpenAlert, setIsOpenAlert] = useState({ open: false, isCorrect: false })
  const arrayValue = Object.values(activeValue)
  const value = arrayValue.find((item) => {
    if (item !== '') return item
  })
  const handleVoice = (text: string) => {
    var msg = new SpeechSynthesisUtterance()
    msg.lang = 'vi-VN'
    msg.text = text
    speechSynthesis.speak(msg)
  }
  const handleSubmit = () => {
    if (endvalue === correctValue) {
      setIsOpenAlert({ open: true, isCorrect: true })
      setActiveValue(initialActiveValue)

      props.handlePoint()
    } else {
      setIsOpenAlert({ open: true, isCorrect: false })
      setActiveValue(initialActiveValue)
    }
  }
  const handleSetActiveValue = (endvalue: string) => {
    setEndValue(endvalue)
  }

  useEffect(() => {
    setEndValue(value)
  }, [value])
  return (
    <div className='flex flex-wrap'>
      {typeQuiz ? (
        <MathCard
          propsQuiz={props.propsQuiz}
          handleSubmit={handleSubmit}
          setActiveValue={handleSetActiveValue}
        ></MathCard>
      ) : (
        <div className='w-1/2 pt-6 md:w-4/5 '>
          <Typography variant='h4'>{question}</Typography>
          {imageQuestion ? <img className='h-52 w-96 rounded-lg' src={`${imageQuestion}`} alt='nature image' /> : ''}
          {value1 ? (
            <ListItem className='p-0' id='listItem'>
              <label htmlFor={value1} className='flex w-full cursor-pointer items-center px-3 py-2'>
                <ListItemPrefix className='mr-3'>
                  <Radio
                    name='vertical-list'
                    id={value1}
                    ripple={false}
                    checked={Boolean(activeValue.value1)}
                    onClick={() => {
                      setActiveValue({ value1: value1, value2: '', value3: '', value4: '' })
                      handleVoice(value1)
                    }}
                    className='hover:before:opacity-0'
                    containerProps={{
                      className: 'p-0'
                    }}
                  />
                </ListItemPrefix>
                <Typography color='blue-gray' className='font-medium'>
                  {value1}
                </Typography>
              </label>
            </ListItem>
          ) : (
            ''
          )}
          {value2 ? (
            <ListItem className='p-0'>
              <label htmlFor={value2} className='flex w-full cursor-pointer items-center px-3 py-2'>
                <ListItemPrefix className='mr-3'>
                  <Radio
                    name='vertical-list'
                    id={value2}
                    ripple={false}
                    checked={Boolean(activeValue.value2)}
                    onClick={() => {
                      setActiveValue({ value1: '', value2: value2, value3: '', value4: '' })
                      handleVoice(value2)
                    }}
                    className='hover:before:opacity-0'
                    containerProps={{
                      className: 'p-0'
                    }}
                  />
                </ListItemPrefix>
                <Typography color='blue-gray' className='font-medium'>
                  {value2}
                </Typography>
              </label>
            </ListItem>
          ) : (
            ''
          )}
          {value3 ? (
            <ListItem className='p-0'>
              <label htmlFor={value3} className='flex w-full cursor-pointer items-center px-3 py-2'>
                <ListItemPrefix className='mr-3'>
                  <Radio
                    name='vertical-list'
                    id={value3}
                    ripple={false}
                    checked={Boolean(activeValue.value3)}
                    onClick={() => {
                      setActiveValue({ value1: '', value2: '', value3: value3, value4: '' })
                      handleVoice(value3)
                    }}
                    className='hover:before:opacity-0'
                    containerProps={{
                      className: 'p-0'
                    }}
                  />
                </ListItemPrefix>
                <Typography color='blue-gray' className='font-medium'>
                  {value3}
                </Typography>
              </label>
            </ListItem>
          ) : (
            ''
          )}
          {value4 ? (
            <ListItem className='p-0'>
              <label htmlFor={value4} className='flex w-full cursor-pointer items-center px-3 py-2'>
                <ListItemPrefix className='mr-3'>
                  <Radio
                    name='vertical-list'
                    id={value4}
                    ripple={false}
                    checked={Boolean(activeValue.value4)}
                    onClick={() => {
                      setActiveValue({ value1: '', value2: '', value3: '', value4: value4 })
                      handleVoice(value4)
                    }}
                    className='hover:before:opacity-0'
                    containerProps={{
                      className: 'p-0'
                    }}
                  />
                </ListItemPrefix>
                <Typography color='blue-gray' className='font-medium'>
                  {value4}
                </Typography>
              </label>
            </ListItem>
          ) : (
            ''
          )}

          <Button
            onClick={() => handleSubmit()}
            className='group relative inline-flex items-center justify-start overflow-hidden rounded-xl bg-red-500 px-6 py-3 text-center font-medium transition-all'
          >
            <span className='absolute right-0 top-0 inline-block h-4 w-4 rounded bg-red-700 transition-all duration-500 ease-in-out group-hover:-mr-4 group-hover:-mt-4'>
              <span className='absolute right-0 top-0 h-5 w-5 -translate-y-1/2 translate-x-1/2 rotate-45 bg-white' />
            </span>
            <span className='absolute bottom-0 left-0 h-full w-full -translate-x-full translate-y-full rounded-2xl bg-red-600 transition-all delay-200 duration-500 ease-in-out group-hover:mb-12 group-hover:translate-x-0' />
            <span className='relative w-full text-white transition-colors duration-200 ease-in-out group-hover:text-white'>
              Xem đáp án
            </span>
          </Button>
        </div>
      )}
      {isOpenAlert.open === true && isOpenAlert.isCorrect === false ? (
        <Alert
          open={isOpenAlert.open}
          color='red'
          className='mt-2 max-w-screen-md md:w-4/5'
          onClose={() => {
            setIsOpenAlert({ open: false, isCorrect: false })
            props.goToNext()
          }}
        >
          <Typography variant='h5' color='white'>
            Sai rồi, cố lên bé nhé 😓
          </Typography>
          <Typography color='white' className='mt-2 font-normal'>
            {`Đáp án phải là ${correctValue} nhé!!!`}
          </Typography>
        </Alert>
      ) : isOpenAlert.open === true && isOpenAlert.isCorrect === true ? (
        <Alert
          open={isOpenAlert.open}
          color='green'
          className='mt-2 max-w-screen-md'
          onClose={() => {
            setIsOpenAlert({ open: false, isCorrect: false })
            props.goToNext()
          }}
        >
          <Typography variant='h5' color='white'>
            Đúng rồi, bé giỏi quá 😊
          </Typography>
        </Alert>
      ) : (
        ''
      )}
    </div>
  )
}
