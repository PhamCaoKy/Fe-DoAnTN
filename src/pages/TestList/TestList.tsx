import { Card, List, ListItem, ListItemSuffix } from '@material-tailwind/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getAllTopic, getTestOnline } from 'src/apis/auth.api'

export default function TestList() {
  const { data } = useQuery(['allTopic'], getAllTopic)
  const allTopic = data?.data.data?.topicOnline
  const navigate = useNavigate()

  const testMutation = useMutation({
    mutationFn: (body: { idTopic: number }) => getTestOnline(body)
  })
  const handleTopic = (id: { idTopic: number }) => {
    testMutation.mutate(id, {
      onSuccess: (res) => {
        navigate('/writing', { state: res.data.data?.testOnline })
      }
    })
  }
  return (
    <div className='ml-20 mt-10 w-4/5 items-center gap-2'>
      {allTopic?.map((value, index) => (
        <Card className='mt-5 w-full ' key={index}>
          <List className='p-0'>
            <ListItem ripple={false} className='p-2'>
              {value.topic}
              <ListItemSuffix>
                <button
                  onClick={() => {
                    handleTopic({ idTopic: value.idTestTopic })
                  }}
                  className='group relative inline-flex h-10 w-96 items-center justify-center overflow-hidden rounded-full border-2 border-purple-500 p-4 px-6 py-3 font-medium text-indigo-600 shadow-md transition duration-300 ease-out'
                >
                  <span className='ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-purple-500 text-white duration-300 group-hover:translate-x-0'>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                    </svg>
                  </span>
                  <span className='ease absolute flex h-full w-full transform items-center justify-center text-purple-500 transition-all duration-300 group-hover:translate-x-full'>
                    Làm kiểm tra
                  </span>
                  <span className='invisible relative'>Làm kiểm tra</span>
                </button>
              </ListItemSuffix>
            </ListItem>
          </List>
        </Card>
      ))}
    </div>
  )
}
