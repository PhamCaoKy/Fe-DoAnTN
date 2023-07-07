import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { Quiz } from 'src/pages/Quiz/Quiz'
interface Props {
  propsQuiz: Quiz
  handleSubmit: () => void
  setActiveValue: (value: string) => void
}
const initialFormValue = {
  vl1: '',
  vl2: ''
}
export default function MathCard(props: Props) {
  const { value1, value3, question, imageQuestion, value4 } = props.propsQuiz
  const [formValue, setFormValue] = useState(initialFormValue)
  const handleSubmit = props.handleSubmit
  const setActiveValue = props.setActiveValue
  let data = ''
  useEffect(() => {
    if (value4) {
      data = formValue.vl1 + ',' + formValue.vl2
    } else {
      data = formValue.vl1
    }
    setActiveValue(data)
  }, [formValue])

  return (
    <div>
      <Typography variant='h5' color='blue-gray' className='break-keep'>
        {question}
      </Typography>
     
        <Card className='mt-6 w-96'>
          {imageQuestion ? (
            <CardHeader color='blue-gray' className='relative '>
              <img src={imageQuestion} alt='img-blur-shadow' className='h-52 w-96 rounded-lg' />
            </CardHeader>
          ) : (
            ''
          )}

          <CardBody>
            <div className='relative ml-28 flex h-12 w-1 min-w-[200px] max-w-[500px]'>
              <Typography variant='' color='blue-gray' className='mr-3 mt-2 text-2xl '>
                {value1}
              </Typography>
              <input
                className='peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-2xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-pink-500  focus:outline-0 disabled:border-0 '
                placeholder=' '
                value={formValue.vl1}
                onChange={(event) => {
                  setFormValue((prev) => ({ vl1: event.target.value, vl2: prev.vl2 }))
                }}
              
              />
              {value3 ? (
                <Typography variant='' color='blue-gray' className='ml-3 mr-3 mt-2 text-clip text-2xl '>
                  {value3}
                </Typography>
              ) : (
                <div className='ml-3 mr-3 mt-2' />
              )}

              {value4 ? (
                <input
                  className='peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-2xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-pink-500  focus:outline-0 disabled:border-0 '
                  placeholder=' '
                  value={formValue.vl2}
                  onChange={(event) => {
                    setFormValue((prev) => ({ vl1: prev.vl1, vl2: event.target.value }))
                  }}
                />
              ) : (
                <div className='peer h-full w-full '></div>
              )}
            </div>
          </CardBody>
          <CardFooter className='pt-0'>
            <Button 
              onClick={() => {
                handleSubmit()
                setFormValue(initialFormValue)
           
              }}
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
          </CardFooter>
        </Card>
    
    </div>
  )
}
