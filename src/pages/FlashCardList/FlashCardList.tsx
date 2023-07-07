import { Button, Step, Stepper } from '@material-tailwind/react'

import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import FlashCard from 'src/components/FlashCard'
import Paragraph from '../Paragraph'

interface FlashCard {
  idFlashCard: number
  front: string
  back: string
}
export default function FlashCardList() {
  const [curCardId, setCurCardId] = useState(1)
  const Location = useLocation()
  const [isLastStep, setIsLastStep] = useState(false)
  const [isFirstStep, setIsFirstStep] = useState(false)
  const [isFront, setIsFront] = useState(true)

  const allCards = Location.state

  const totalCards = allCards.length as number

  let goToPrev = () => {
    if (isValidId(curCardId - 1)) {
      setCurCardId(curCardId - 1)
      setIsFront(true)
    } else {
      setCurCardId(totalCards)
      setIsFront(true)
    }
  }

  let goToNext = () => {
    if (isValidId(curCardId + 1)) {
      setCurCardId(curCardId + 1)
      setIsFront(true)
    } else {
      setCurCardId(1)
      setIsFront(true)
    }
  }
  const handleIsFront = (isFront: boolean) => {
    isFront ? setIsFront(false) : setIsFront(true)
  }
  function isValidId(id: number) {
    return id <= totalCards && id >= 1
  }

  return (
    <div>
      {allCards[0].typeFlashCard==='' ? (
        <div className='w-full px-8 py-4'>
          <FlashCard
            propsFlashCard={allCards.find((_: FlashCard, index: number) => index + 1 === curCardId)}
            handleIsFront={handleIsFront}
            isFront={isFront}
          ></FlashCard>

          <div className='w-full px-8 py-4 '>
            <Stepper
              activeStep={curCardId - 1}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              {allCards.map((_: any, index: any) => {
                return (
                  <Step
                    key={index}
                    className='hover:bg-pink-100'
                    onClick={() => {
                      setIsFront(true)
                      setCurCardId(index + 1)
                    }}
                  >
                    {index + 1}
                  </Step>
                )
              })}
            </Stepper>
            <div className='mt-16 flex justify-between'>
              <Button onClick={goToPrev} disabled={isFirstStep} className='hover:text-pink-200'>
                Thẻ trước đó
              </Button>
              <Button onClick={goToNext} disabled={isLastStep} className='hover:text-pink-200'>
                Thẻ tiếp theo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Paragraph props={allCards}></Paragraph>
      )}
    </div>
  )
}
