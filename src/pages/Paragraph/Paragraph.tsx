import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/20/solid'
import { Button, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'

interface Props {
  props: [
    {
      back: string
      front: string
      voice: string
    }
  ]
}
export default function Paragraph(props: Props) {
  console.log(props.props)
  const data = props.props[0]
  const back = data.back
  const [isSpeaking, setIsSpeaking] = useState(false)
  const paragraphs = back
    .split('.')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const handleVoice = (text: string) => {
    const msg = new SpeechSynthesisUtterance()
    msg.lang = 'vi-VN'
    msg.text = text
    msg.onend = () => setIsSpeaking(false)
    speechSynthesis.speak(msg)
    setIsSpeaking(true)
  }
  const stopSpeech = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }
  useEffect(() => {
    if (isSpeaking) {
      // Add an event listener to handle cases where speech is interrupted externally
      window.addEventListener('beforeunload', stopSpeech)

      return () => {
        window.removeEventListener('beforeunload', stopSpeech)
      }
    }
  }, [isSpeaking])
  return (
    <div>
      <div className='mt-10'>
        <div className='mb-5 ml-10'>
          {!isSpeaking ? (
            <button
              className='ease group relative box-border inline-flex w-64 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-8 py-3 font-bold text-white ring-1 ring-indigo-300 ring-offset-2 ring-offset-indigo-200 transition-all duration-300 hover:ring-offset-indigo-500 focus:outline-none'
              onClick={() => {
                handleVoice(back)
              }}
            >
              <span className='absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0' />
              <span className='absolute left-0 top-0 -ml-12 -mt-1 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0' />
              <span className='w-30 relative flex-col-reverse items-center text-ellipsis'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  stroke-width='1.5'
                  viewBox='0 0 50 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z'
                  ></path>
                </svg>
                Nghe bài văn
              </span>
            </button>
          ) : (
            <button
              className='ease group relative box-border inline-flex w-64 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-red-400 px-8 py-3 font-bold text-white ring-1 ring-indigo-300 ring-offset-2 ring-offset-indigo-200 transition-all duration-300 hover:ring-offset-indigo-500 focus:outline-none'
              onClick={stopSpeech}
            >
              <span className='absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0' />
              <span className='absolute left-0 top-0 -ml-12 -mt-1 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0' />
              <span className='w-30 relative flex-col-reverse items-center text-ellipsis'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  stroke-width='1.5'
                  viewBox='0 0 50 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z'
                  ></path>
                </svg>
                Dừng nghe
              </span>
            </button>
          )}
        </div>

        <figure className='bg-slate-100 dark:bg-slate-800 rounded-xl p-8 md:flex md:p-0'>
          <img
            className='ml-40 h-96 w-96 scroll-ml-6 scroll-mr-6 rounded-full md:h-auto md:w-auto md:rounded-none'
            src={data.front}
            width={384}
            height={512}
          />
          <div className='space-y-4 pt-6 text-center md:p-8 md:text-left'>
            <blockquote>
              {paragraphs.map((value, index) => (
                <div key={index} className='mt-2 flex'>
                  <Typography variant='lead' className='mt-2'>
                    {value}.
                  </Typography>
                  {!isSpeaking ? (
                    <Button
                      variant='outlined'
                      className='ml-5 items-center '
                      onClick={() => {
                        handleVoice(value)
                      }}
                    >
                      <SpeakerWaveIcon strokeWidth={2} className='h-5 w-5' />
                    </Button>
                  ) : (
                    <Button variant='outlined' className='ml-5 items-center ' onClick={stopSpeech}>
                      <SpeakerXMarkIcon className='h-5 w-5 text-gray-500' />
                    </Button>
                  )}
                </div>
              ))}
            </blockquote>
          </div>
        </figure>
      </div>
    </div>
  )
}
