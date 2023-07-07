import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/apis/auth.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { useContext, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react'

type FormData = Omit<Schema, 'confirm_password' | 'name'>
const loginSchema = schema.omit(['confirm_password', 'name'])

export default function Login() {
  const { setIsAuthenticated, setIsAdmin } = useContext(AppContext)
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)
  const handleCancle = () => {
    handleOpen()
    localStorage.clear()
  }
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data1) => {
        window.localStorage.setItem('iduser', JSON.stringify(data1.data.data?.data.idUser))
        window.localStorage.setItem('name', JSON.stringify(data1.data.data?.data.name))
        if (data1.data.data?.data.role === 'admin') {
          window.localStorage.setItem('role', JSON.stringify(data1.data.data?.data.role))
          setIsAdmin(true)
          navigate('/admin')
        } else if (data1.data.data?.data.role === 'user' && data1.data.data?.data.isActive === 1) {
          setIsAuthenticated(true)
        } else if (data1.data.data?.data.role === 'user' && data1.data.data?.data.isActive === 0) {
          setOpen(true)
        }
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ResponseApi<FormData>>(error)) {
          setError('email', { message: 'Email đã tồn tại', type: 'Server' })
        }
        console.log(error)
      }
    })
  })

  return (
    <div className=''>
      <div className='container '>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type={'email'}
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type={'password'}
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <button className='w-full bg-pink-400 px-2 py-4 text-center text-sm uppercase text-white hover:bg-pink-500'>
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                <Link to='/register' className='ml-1 text-pink-400'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Cảnh báo</DialogHeader>
        <DialogBody divider>Tài khoản của bạn đã bị khóa, vui lòng liên hệ với Quản trị viên để mở khóa!!!</DialogBody>
        <DialogFooter>
          <Button variant='text' color='red' onClick={handleCancle} className='mr-1'>
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
