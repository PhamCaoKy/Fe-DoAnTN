import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography
} from '@material-tailwind/react'
import { ResponseCompleteLesson } from 'src/pages/Profile/Profile'
interface Props {
  completeLesson: any
}
export default function TimeLine(props: Props) {
  const completeLesson = props.completeLesson

  return (
    <div className='w-[32rem]'>
      <Timeline>
        {completeLesson.map((value: ResponseCompleteLesson) => {
          return (
            <TimelineItem key={value.idUserResults}>
              <TimelineConnector />
              <TimelineHeader className='h-3'>
                <TimelineIcon />
                <Typography variant='h6' color='blue-gray' className='leading-none'>
                  {value.dateComplete}
                </Typography>
              </TimelineHeader>
              <TimelineBody className='pb-8'>
                <Typography variant='small' className='font-normal text-red-600'>
                  {`Hoàn thành ${value.lessonComplete} với điểm số ${value.point}`}
                </Typography>
              </TimelineBody>
            </TimelineItem>
          )
        })}
      </Timeline>
    </div>
  )
}
