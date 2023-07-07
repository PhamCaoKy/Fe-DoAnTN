import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react'
import Product from '../../components/Product'

export default function ProductList() {
  return (
    <section className=''>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap'>
          <Product
            course='Tiếng Việt'
            decription='Giúp bé đọc và viết được bảng chữ cái Tiếng Việt,các vần. Biết được cách ghép vần có nghĩa'
            icon={
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
                  d='M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802'
                ></path>
              </svg>
            }
          />
          <Product
            course='Toán'
            decription=' Giúp bé biết đếm số, biết các dấu trong toán học , làm các bài toán cơ bản'
            icon={
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
                  d='M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z'
                ></path>
              </svg>
            }
          />
          <Product
            course='Tự nhiên xã hội'
            decription='Tự nhiên xã hội tích hợp các kiến thức về tự nhiên, xã hội về cơ thể sức khỏe của con người'
            icon={
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
                  d='M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25'
                ></path>
              </svg>
            }
          />
        </div>
        <div className='mt-10 ml-80'>
          <Card className='w-full max-w-[48rem] flex-row'>
            <CardHeader shadow={false} floated={false} className='m-0 w-2/5 shrink-0 rounded-r-none'>
              <img
                src='https://tuyensinh.tvu.edu.vn/uploads/news/2018_08/kiem-tra-dinh-ki-hgls.jpg'
                alt='image'
                className='h-full w-full object-cover'
              />
            </CardHeader>
            <CardBody>
              <Typography variant='h6' color='blue' className='mb-4 uppercase'>
                Kiểm tra online
              </Typography>
              <Typography color='gray' className='mb-8 font-normal'>
                Gồm những bài kiểm tra sinh động, trực quan về những chủ đề xung quanh bé
              </Typography>
              <a href='/testlist' className='inline-block'>
                <Button variant='text' className='flex items-center gap-2'>
                  Bài kiểm tra
                  <ArrowLongRightIcon strokeWidth={2} className='h-4 w-4' />
                </Button>
              </a>
            </CardBody>
          </Card>
        </div>
        <div className='mt-32 flex flex-wrap items-center'>
          <div className='ml-auto mr-auto w-full px-4 md:w-5/12'>
            <h3 className='mb-2 text-3xl font-semibold leading-normal'>Về nội dung trang web</h3>
            <p className='mb-4 mt-4 text-lg font-light leading-relaxed text-gray-700'>
              Ngày nay với sự phát triển mạnh mẽ của Internet, việc học tập với những công nghệ mới ngày càng được sử
              dụng nhiều.
            </p>
            <p className='mb-4 mt-0 text-lg font-light leading-relaxed text-gray-700'>
              Chính vì thế website này được sinh ra giúp cha mẹ cùng bé có thể dễ dàng học tập, rèn luyện từ đó nắm vững
              các kiến thức cơ bản.
            </p>
          </div>
          <div className='ml-auto mr-auto w-full px-4 md:w-4/12'>
            <div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-pink-600 shadow-lg'>
              <img
                alt='...'
                src='https://images2.thanhnien.vn/Uploaded/anhdh/2022_03_10/anhbaichinh11-3-5825.jpg'
                className='w-full rounded-t-lg align-middle'
              />
              <blockquote className='relative mb-4 p-8'>
                <svg
                  preserveAspectRatio='none'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 583 95'
                  className='absolute left-0 block w-full'
                  style={{ height: 95, top: '-94px' }}
                >
                  <polygon points='-30,95 583,95 583,65' className='fill-current text-pink-600' />
                </svg>
                <h4 className='text-xl font-bold text-white'>Cùng học</h4>
                <p className='text-md mt-2 font-light text-white'>
                  Website học tập trực tuyến, cung cấp các bài học trực quan dễ hiểu,sinh động với lứa tuổi thiếu nhi
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
