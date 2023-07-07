import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import './styles.css'
interface Props {
  propsFlashCard: any
  handleIsFront: (isFront: boolean) => void
  isFront: boolean
}
export default function FlashCard(props: Props) {
  const { back, front, voice } = props.propsFlashCard
  const handleBack = () => {
    var msg = new SpeechSynthesisUtterance()
    msg.lang = 'vi-VN'
    msg.text = back
    speechSynthesis.speak(msg)
  }
  const handleVoice = () => {
    var msg = new SpeechSynthesisUtterance()
    msg.lang = 'vi-VN'
    msg.text = voice
    speechSynthesis.speak(msg)
  }
  return (
    <Card className='ml-56 mr-56 mt-10'>
      <CardBody className=' content-center '>
        {props.isFront ? (
          <div className='flex'>
            <img className='ml-52 h-96 w-96 rounded-lg' src={front} alt='nature image ' />
            {voice ? <Button color='green' className='w-56 h-40 mt-36 ml-40' onClick={handleVoice}>Nghe cách phát âm</Button> : ''}
          </div>
        ) : (
          <div className=' flex'>
            <Typography variant='h5' className='mr-5'>
              {back}
            </Typography>
            <Button
              onClick={handleBack}
              className='ease group relative z-30 box-border inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-8 py-3 text-sm font-bold text-white ring-1 ring-indigo-300 ring-offset-2 ring-offset-indigo-200 transition-all duration-300 hover:ring-offset-indigo-500 focus:outline-none'
            >
              <span className='absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0' />
              <span className='absolute left-0 top-0 -ml-12 -mt-1 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0' />
              <span className='relative z-20 flex items-center text-sm'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  stroke-width='1.5'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z'
                  ></path>
                </svg>
                Nghe đáp án
              </span>
            </Button>
          </div>
        )}
      </CardBody>
      <CardFooter className='pt-6'>
        <Button
          ripple={false}
          fullWidth={true}
          onClick={() => props.handleIsFront(props.isFront)}
          className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
        >
          Đảo thẻ
        </Button>
      </CardFooter>
    </Card>
  )
}
