import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import { logout } from 'src/apis/auth.api'
import { Navbar, Typography, IconButton } from '@material-tailwind/react'
import React from 'react'

export default function Header() {
  const { isAuthenticated,isAdmin, setIsAuthenticated,setIsAdmin } = useContext(AppContext)
  const name = localStorage.getItem('name')
  const nameUser = name?.split('"').join('')

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
    window.localStorage.clear()
    setIsAdmin(false)
  }
  const [openNav, setOpenNav] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='/login' className='flex items-center'>
          Đăng nhập
        </a>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='/register' className='flex items-center'>
          Đăng kí
        </a>
      </Typography>
    </ul>
  )
  return (
    <Navbar
      className='sticky inset-0 z-10 h-max max-w-full rounded-none bg-pink-300 px-4 py-2 lg:px-8 lg:py-4 bg-opacity-100'  
    >
      <div className='flex items-center justify-between text-blue-gray-900'>
        <Link to='/' className='mr-4 cursor-pointer py-1.5 font-medium'>
          <div className=' '>
            <img id='slogan' src='https://cunghoc.vn/image2/slogan.png' className='h-full w-full'></img>
          </div>
        </Link>
        
        <div className='flex items-center gap-4'>
          {isAuthenticated || isAdmin ? (
            <div>
              <Popover
                renderPopover={
                  <div>
                    <Link
                      to='/profile'
                      className='hover:bg-slate-100 block bg-white px-3 py-2 text-cyan-200 hover:text-cyan-500'
                    >
                      Tài khoản của tôi
                    </Link>
                    <Link
                      to='/'
                      className='hover:bg-slate-100 block bg-white px-3 py-2 text-cyan-200 hover:text-cyan-500'
                    >
                      <button onClick={handleLogout}>Đăng xuất</button>
                    </Link>
                  </div>
                }
                className='bg z-40 flex cursor-pointer items-center py-1 hover:text-gray-300 '
              >
                <div className='mr-3 h-6 w-6 flex-shrink-0 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
                <div>{nameUser}</div>
              </Popover>
              <IconButton
                variant='text'
                className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    className='h-6 w-6'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                ) : (
                  ''
                )}
              </IconButton>
            </div>
          ) : (
            <div className='mr-4 hidden lg:block'>{navList}</div>
          )}
        </div>
      </div>
      {/* <Collapse open={openNav}>{navList}</Collapse> */}
    </Navbar>
  )
}
