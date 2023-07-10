import { Spinner } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import './style.css'
import { getAllUser, getAllUserResult } from 'src/apis/auth.api'

export default function DatePicker() {
  const { data: dataR } = useQuery(['useresult'], getAllUserResult)
  const { data } = useQuery(['alluser'], getAllUser)
  const allUserResult = dataR?.data.data?.userResult
  const allUser = data?.data.data?.data
  const aggregatedScores: { [key: string]: string } = {}

  allUserResult?.forEach((result: any) => {
    const userId = result.idUser_FK
    const score = result.point
    // If the user ID already exists in the aggregatedScores object,
    // add the score to the existing total. Otherwise, initialize
    // the total score for the user.
    if (aggregatedScores.hasOwnProperty(userId)) {
      aggregatedScores[userId] += score
    } else {
      aggregatedScores[userId] = score
    }
  })
  allUser?.forEach((value) => {
    if (aggregatedScores.hasOwnProperty(value.idUser)) {
      aggregatedScores[value.idUser] += value.name
    }
  })

  const result: { name: string; point: number }[] = Object.entries(aggregatedScores).map(([_, value]) => {
    const name: string = value.toString().replace(/[0-9]/, '').trim()
    const point: number = parseInt(value.toString().replace(/[^\d]/, ''))
    return { name, point }
  })
  result.sort((a, b) => b.point - a.point)

  return (
    <div>
      {allUserResult && allUser ? (
        <div>
          <div className='flex items-center justify-center '>
            <div className='mt-10 items-center'>
              <p className='text-center'>{result[1].name}</p>
              <div className='h-32 w-32'>
                <svg
                  viewBox='0 0 120 120'
                  id='Layer_1'
                  version='1.1'
                  xmlSpace='preserve'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  fill='#000000'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                  <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <style
                      type='text/css'
                      dangerouslySetInnerHTML={{
                        __html: ' .st0{fill:#FFBF4B;} .st1{fill:#EDEDED;} .st2{fill:#BCBCBC;} .st3{fill:#FFFFFF;} '
                      }}
                    />{' '}
                    <g>
                      {' '}
                      <polygon
                        className='st0'
                        points='79.7,45.6 60,55.5 40.3,45.6 15.9,94.3 31.1,92.8 38.9,105.9 60,63.9 81.1,105.9 88.9,92.8 104.1,94.3 '
                      />{' '}
                      <circle className='st1' cx={60} cy='46.4' r='32.2' />{' '}
                      <circle className='st2' cx={60} cy='46.4' r='25.3' />{' '}
                      <path
                        className='st3'
                        d='M61.2,31.2l4.2,8.4c0.2,0.4,0.6,0.7,1,0.8l9.3,1.4c1.1,0.2,1.6,1.5,0.8,2.3l-6.7,6.6c-0.3,0.3-0.5,0.8-0.4,1.2 l1.6,9.3c0.2,1.1-1,2-2,1.4l-8.3-4.4c-0.4-0.2-0.9-0.2-1.3,0L51,62.6c-1,0.5-2.2-0.3-2-1.4l1.6-9.3c0.1-0.4-0.1-0.9-0.4-1.2 l-6.7-6.6c-0.8-0.8-0.4-2.2,0.8-2.3l9.3-1.4c0.4-0.1,0.8-0.3,1-0.8l4.2-8.4C59.3,30.2,60.7,30.2,61.2,31.2z'
                      />{' '}
                    </g>{' '}
                  </g>
                </svg>
              </div>
              <div className='h-20  w-full bg-blue-gray-200'></div>
            </div>
            <div className='items-center'>
              <p className='text-center'>{result[0].name}</p>
              <div className='h-32 w-32'>
                <svg
                  viewBox='0 0 120 120'
                  id='Layerdsadas_1'
                  version='1.1'
                  xmlSpace='preserve'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  fill='#000000'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                  <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <style
                      type='text/css'
                      dangerouslySetInnerHTML={{
                        __html: ' .st4{fill:#E24255;} .st5{fill:#FFC54D;} .st6{fill:#E8B04B;} .st7{fill:#FFFFFF;} '
                      }}
                    />{' '}
                    <g>
                      {' '}
                      <polygon
                        className='st4'
                        points='79.7,45.6 60,55.5 40.3,45.6 15.9,94.3 31.1,92.8 38.9,105.9 60,63.9 81.1,105.9 88.9,92.8 104.1,94.3 '
                      />{' '}
                      <circle className='st5' cx={60} cy='46.4' r='32.2' />{' '}
                      <circle className='st6' cx={60} cy='46.4' r='25.3' />{' '}
                      <path
                        className='st7'
                        d='M61.2,31.2l4.2,8.4c0.2,0.4,0.6,0.7,1,0.8l9.3,1.4c1.1,0.2,1.6,1.5,0.8,2.3l-6.7,6.6c-0.3,0.3-0.5,0.8-0.4,1.2 l1.6,9.3c0.2,1.1-1,2-2,1.4l-8.3-4.4c-0.4-0.2-0.9-0.2-1.3,0L51,62.6c-1,0.5-2.2-0.3-2-1.4l1.6-9.3c0.1-0.4-0.1-0.9-0.4-1.2 l-6.7-6.6c-0.8-0.8-0.4-2.2,0.8-2.3l9.3-1.4c0.4-0.1,0.8-0.3,1-0.8l4.2-8.4C59.3,30.2,60.7,30.2,61.2,31.2z'
                      />{' '}
                    </g>{' '}
                  </g>
                </svg>
              </div>
              <div className='mb-2 h-32 w-full bg-yellow-800'></div>
            </div>
            <div className='mt-14 items-center'>
              <p className='text-center'>{result[2]?.name}</p>
              <div className=' h-32 w-32'>
                <svg
                  viewBox='0 0 120 120'
                  id='Layer_1'
                  version='1.1'
                  xmlSpace='preserve'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  fill='#000000'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                  <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <style
                      type='text/css'
                      dangerouslySetInnerHTML={{
                        __html: ' .st8{fill:#C4C4C4;} .st9{fill:#E5B97F;} .st10{fill:#C19A6B;} .st11{fill:#FFFFFF;} '
                      }}
                    />
                    <g>
                      <polygon
                        className='st8'
                        points='79.7,45.6 60,55.5 40.3,45.6 15.9,94.3 31.1,92.8 38.9,105.9 60,63.9 81.1,105.9 88.9,92.8 104.1,94.3 '
                      />{' '}
                      <circle className='st9' cx={60} cy='46.4' r='32.2' />{' '}
                      <circle className='st10' cx={60} cy='46.4' r='25.3' />{' '}
                      <path
                        className='st11'
                        d='M61.2,31.2l4.2,8.4c0.2,0.4,0.6,0.7,1,0.8l9.3,1.4c1.1,0.2,1.6,1.5,0.8,2.3l-6.7,6.6c-0.3,0.3-0.5,0.8-0.4,1.2 l1.6,9.3c0.2,1.1-1,2-2,1.4l-8.3-4.4c-0.4-0.2-0.9-0.2-1.3,0L51,62.6c-1,0.5-2.2-0.3-2-1.4l1.6-9.3c0.1-0.4-0.1-0.9-0.4-1.2 l-6.7-6.6c-0.8-0.8-0.4-2.2,0.8-2.3l9.3-1.4c0.4-0.1,0.8-0.3,1-0.8l4.2-8.4C59.3,30.2,60.7,30.2,61.2,31.2z'
                      />{' '}
                    </g>{' '}
                  </g>
                </svg>
              </div>
              <div className=' h-16 w-full bg-brown-600'></div>
            </div>
          </div>
          <div>
            <h1>Ranking List</h1>
            <ol className='ol1'>
              {result.map((value, index) => (
                <li className='li1' key={index}>
                  <span className='rank'>{index + 1}</span>
                  <span className='name'>{`Bạn ${value.name} với tổng điểm số ${value.point}`}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <Spinner className='h-12 w-12' />
      )}
    </div>
  )
}
