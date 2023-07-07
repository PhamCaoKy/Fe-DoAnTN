import { useState, useRef, useEffect } from 'react'

import { Stage, Layer, Line, Rect } from 'react-konva'
import html2canvas from 'html2canvas'
import trimCanvas from 'trim-canvas'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Drawer,
  Typography
} from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { postWriting } from 'src/apis/auth.api'
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom'

interface Test {
  idTestOnline: number
  question: string
  imageQuestion: string
  correctValue: string
  idTestTopic_FK: number
}
const MyCanvasDraw = () => {
  const Location = useLocation()

  const [lines, setLines] = useState<any>([])
  const isDrawing = useRef(false)
  const [res, setRes] = useState<Array<string>>([])
  const [curCardId, setCurCardId] = useState(1)
  const [point, setPoint] = useState(0)
  const [complete, setComplete] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<Boolean>()
  const [testData, setTestData] = useState<Test>()
  const allTest = Location.state
  const [openAlert, setOpenAlert] = useState(false)

  const totalTest = allTest.length
  const pointPlus = Number(((1 / totalTest) * 100).toFixed())
  let goToNext = () => {
    if (isValidId(curCardId + 1)) {
      setCurCardId(curCardId + 1)
    } else {
      setComplete(true)
    }
  }
  function isValidId(id: number) {
    return id <= totalTest && id >= 1
  }

  useEffect(() => {
    setTestData(allTest.find((_: Test, index: number) => index + 1 === curCardId))
  }, [curCardId])

  const handleMouseDown = (event: any) => {
    isDrawing.current = true
    const { offsetX, offsetY } = event.evt
    setLines([...lines, { points: [{ x: offsetX, y: offsetY }] }])
  }

  const handleMouseMove = (event: any) => {
    if (!isDrawing.current) return
    const { offsetX, offsetY } = event.evt
    const updatedLines = [...lines]
    const lastLine = updatedLines[updatedLines.length - 1]
    lastLine.points = [...lastLine.points, { x: offsetX, y: offsetY }]
    setLines(updatedLines)
  }

  const handleMouseUp = () => {
    isDrawing.current = false
    // handleExportImage()
  }

  const handleTouchStart = (event: any) => {
    const stage = event.target.getStage()
    const position = stage.getPointerPosition()
    setLines([...lines, { points: [position] }])
  }

  const handleTouchMove = (event: any) => {
    const stage = event.target.getStage()
    const position = stage.getPointerPosition()
    const updatedLines = [...lines]
    const lastLine = updatedLines[updatedLines.length - 1]
    lastLine.points = [...lastLine.points, position]
    setLines(updatedLines)
  }

  const handleUndo = async () => {
    setLines(lines.slice(0, -1))
  }

  const handleClear = () => {
    setLines([])
    setRes([])
  }

  const handleExportImage = async () => {
    const dataURL = await html2canvas(document.getElementById('drawing-board') as any)

    setTimeout(async () => {
      const trimmedCanvas = (trimCanvas as any)(dataURL)
      const blob = await new Promise((resolve) => {
        trimmedCanvas.toBlob((blob: any) => {
          resolve(blob)
        }, 'image/png')
      })

      const formData = new FormData()
      formData.append('file', blob as Blob, 'img_transformer.png')

      handleReceive(formData)
    }, 100)
  }

  const handleSubmit = (correct: string) => {
    if (res[0]) {
      if (correct.toLowerCase() === (res[0] as string).toLowerCase()) {
        setIsCorrect(true)
        setOpenAlert(true)
        setPoint((prev) => prev + pointPlus)
        var msg1 = new SpeechSynthesisUtterance()
        msg1.lang = 'vi-VN'
        msg1.text = "Đúng rồi bé giỏi quá"
        speechSynthesis.speak(msg1)
      } else {
        setIsCorrect(false)
        setOpenAlert(true)
        var msg1 = new SpeechSynthesisUtterance()
        msg1.lang = 'vi-VN'
        msg1.text = "Sai rồi cố lên bé nhé"
        speechSynthesis.speak(msg1)
      }
    }
  }
  const WrittingMutation = useMutation({
    mutationFn: (body: any) => postWriting(body)
  })

  const handleReceive = (data: any) => {
    WrittingMutation.mutate(data, {
      onSuccess: (data2) => {
        setRes(data2.data)
      }
    })
  }
  const handleReturn = () => {
    setPoint(0)

    setComplete(false)
    setCurCardId(1)
  }
  useEffect(() => {
    if (testData?.question) {
      var msg = new SpeechSynthesisUtterance()
      msg.lang = 'vi-VN'
      msg.text = testData?.question as string
      speechSynthesis.speak(msg)
    }
  }, [testData])

  return (
    <div className='container mt-10 flex columns-2 gap-2'>
      <div className=' ml-20 '>
        <Stage
          id='drawing-board'
          width={700}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseLeave={handleExportImage}
        >
          <Layer>
            <Rect height={500} width={700} fill={'black'} />
            {lines.map((line: any, index: any) => (
              <Line
                key={index}
                points={line.points.flatMap((point: any) => [point.x, point.y])}
                stroke='white'
                strokeWidth={10}
                tension={0.5}
                lineCap='round'
                lineJoin='round'
              />
            ))}
          </Layer>
        </Stage>
        <div className='mt-4'>
          <Button onClick={handleUndo} className='ml-5'>
            Quay lại
          </Button>
          <Button onClick={handleClear} className='ml-20'>
            Xóa hết
          </Button>
        </div>
      </div>

      <div className='ml-10 h-96 w-96'>
        <Card className='w-96'>
          <CardHeader shadow={false} floated={false} className='h-96'>
            <img src={testData?.imageQuestion} className='h-full w-full object-cover' />
          </CardHeader>
          <CardBody>
            <div className='mb-2 flex items-center justify-between'></div>
            <Typography variant='small' color='gray' className='font-normal opacity-75'>
              {testData?.question}
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            {!openAlert ? (
              <Button
                ripple={false}
                onClick={() => handleSubmit(testData?.correctValue as string)}
                fullWidth={true}
                className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
              >
                Xem kết quả
              </Button>
            ) : isCorrect ? (
              <Alert
                variant='gradient'
                color='green'
                open={openAlert}
                action={
                  <Button
                    variant='text'
                    color='white'
                    size='sm'
                    className='!absolute right-3 top-3'
                    onClick={() => {
                      setOpenAlert(false)
                      goToNext()
                      handleClear()
                    }}
                  >
                    Câu tiếp theo
                  </Button>
                }
              >
                {` Đúng rồi là ${testData?.correctValue ? testData.correctValue : ''} 😊`}
              </Alert>
            ) : (
              <Alert
                variant='gradient'
                color='red'
                open={openAlert}
                action={
                  <Button
                    variant='text'
                    color='white'
                    size='sm'
                    className='!absolute right-3 top-3'
                    onClick={() => {
                      setOpenAlert(false)
                      goToNext()
                      handleClear()
                    }}
                  >
                    Câu tiếp theo
                  </Button>
                }
              >
                {`Sai rồi không phải ${res[0]} 😓`}
              </Alert>
            )}
          </CardFooter>
        </Card>
      </div>
      <div className='bg_btclass_right '>
        <div id='number_ques'>
          <div className='txt'>Câu hỏi số</div>
          <p className='text-center text-2xl text-red-500'> {`${curCardId}/${totalTest}`}</p>
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
      <DrawerTest isOpen={complete} point={point} handleReturn={handleReturn}></DrawerTest>
    </div>
  )
}
interface PropsDrawer {
  isOpen: boolean
  point: number
  handleReturn: () => void
}
function DrawerTest(props: PropsDrawer) {
  const { isOpen, point, handleReturn } = props
  const navigate = useNavigate()
  const isPass = 100 / point < 2

  return (
    <Drawer open={isOpen} className='p-4'>
      <div className='mb-6 flex items-center justify-between'>
        {isPass ? (
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
        <Button size='sm' onClick={handleReturn}>
          Làm lại
        </Button>
        <Button
          size='sm'
          variant='outlined'
          onClick={() => {
            navigate('/testlist')
          }}
        >
          Học tiếp
        </Button>
      </div>
    </Drawer>
  )
}
export default MyCanvasDraw
