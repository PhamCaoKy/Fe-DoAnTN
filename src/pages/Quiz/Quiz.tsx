import { Card, List, Progress } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Quiz.css'
import AnswerCard from 'src/components/AnswerCard'
import DrawerFinish from '../DrawerFinish'
import { getInfoLesson } from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'

export interface Quiz {
  idQuiz: number
  question: string
  value1: string
  value2: string
  value3: string
  value4: string
  imageQuestion: string
  correctValue: string
  typeQuiz: string
}
interface IDLESSON {
  idLesson: number
}
interface INFOLesson {
  idLesson: number
  course: string
  nameLesson: string
  created_on: string
}
const initalInfoLesson = { idLesson: 0, course: '', nameLesson: 'string', created_on: '' }
export default function Quiz() {
  const Location = useLocation()
  const [curCardId, setCurCardId] = useState(1)
  const [point, setPoint] = useState(0)
  const [complete, setComplete] = useState(false)
  const allQuiz = Location.state.data
  const totalCards = allQuiz.length
  const percentComplete = Number(((1 / totalCards) * 100).toFixed(1))
  const [pointComplete, setPointComplete] = useState(percentComplete)
  const [infoLesson, setInfoLesson] = useState<INFOLesson>(initalInfoLesson)

  let goToNext = () => {
    if (isValidId(curCardId + 1)) {
      setCurCardId(curCardId + 1)
      setPointComplete((prev) => prev + percentComplete)
    } else {
      setComplete(true)
    }
  }
  function isValidId(id: number) {
    return id <= totalCards && id >= 1
  }
  const hanlePoint = () => {
    setPoint((prev) => prev + percentComplete)
  }
  const handleReturn = () => {
    setPoint(0)
    setPointComplete(percentComplete)
    setComplete(false)
    setCurCardId(1)
  }
  const lessonCompleteMutation = useMutation({ mutationFn: (body: IDLESSON) => getInfoLesson(body) })
  const handleLessonComplete = (data: IDLESSON) => {
    lessonCompleteMutation.mutate(data, {
      onSuccess: (data2: any) => {
        setInfoLesson(data2.data.data?.lesson[0] as INFOLesson)
      }
    })
  }

  useEffect(() => {
    handleLessonComplete({
      idLesson: allQuiz[0].idLesson_FK
    })
  }, [complete])

  return (
    <div className='divto '>
      <div className='pl-16 container flex pt-7 pb-16 w-full'>
      <img
      className=" rounded-lg"
      src="https://i.pinimg.com/originals/75/af/43/75af431c7b39a3cf17a5e6b01152bb63.gif"
     
    />
        <Card className='col-span-6 ml-14 mt-2 py-4 pl-5 md:w-5/12'>
          <List>
            <AnswerCard
              propsQuiz={allQuiz.find((_: Quiz, index: number) => index + 1 === curCardId)}
              handlePoint={hanlePoint}
              goToNext={goToNext}
            ></AnswerCard>
          </List>
          <Progress className='md:w-11/12' value={pointComplete} size='lg' label='' />
        </Card>
        <div className='bg_btclass_right '>
          <div id='number_ques'>
            <div className='txt'>Câu hỏi số</div>
            <p className='text-center text-2xl text-red-500'> {`${curCardId}/${totalCards}`}</p>
          </div>
          <div className='point_ques'>
            <span className='_top'>Điểm: </span>
            <span className='_point_plus'>+5</span>
            <span className='t_scr' id='score_curr'>
              {`${point}`}
            </span>
            <div className='total_point'>
              trên tổng số
              <span>100</span>
            </div>
          </div>
        </div>
     
        <img
      className="rounded-lg  "
      src="https://i.pinimg.com/originals/c3/df/44/c3df447d1f6fce069347be96bc811a59.gif"
     
    />
      </div>
      <DrawerFinish
        complete={complete}
        point={point}
        handleReturn={handleReturn}
        course={Location.state.course}
        infoLesson={infoLesson}
      ></DrawerFinish>
      
    </div>
  )
}
