import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Console } from 'console'
type FormData = Schema
export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        window.localStorage.setItem('iduser', JSON.stringify(data.data.data?.data.idUser))
        console.log(data.data.data?.data.idUser)
        window.localStorage.setItem('name', JSON.stringify(data.data.data?.data.name))
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          setError('email', { message: 'Email đã tồn tại', type: 'Server' })
        }
      }
    })
  })

  return (
    <div className=''>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng ký</div>
              <hr color='red' />
              <Input
                name='email'
                register={register}
                type={'email'}
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='name'
                register={register}
                type={'name'}
                className='mt-2'
                placeholder='Name'
                errorMessage={errors.name?.message}
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
              <Input
                name='confirm_password'
                register={register}
                type={'password'}
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                autoComplete='on'
              />

              <div className='mt-3'>
                <button className='w-full bg-pink-400 px-2 py-4 text-center text-sm uppercase text-white hover:bg-pink-500'>
                  Đăng ký
                </button>
              </div>

              <div className='mt-8 flex items-center justify-center'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='ml-1 text-pink-400'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
