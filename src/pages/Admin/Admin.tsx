import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

import { deleteUser, getAllUser, registerAccount, updateActiveUser } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { ResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'

export default function Admin() {
  const TABLE_HEAD = ['Id', 'Tên', 'Email', 'Thời gian tạo', 'Tình trạng', '', '']
  const [idChoice, setIdChoice] = useState<number>(0)
  const [isActiveUser, setIsActiveUser] = useState<number>(0)
  const { data, refetch } = useQuery(['alluser'], getAllUser)
  const list = data?.data.data?.data
  const listUser = list?.filter((vl) => vl.role === 'user')
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  const handleOpen = (id: number) => {
    setOpen(!open)
    setIdChoice(id)
  }
  const [openActive, setOpenActive] = useState(false)

  const handleOpenActive = (data: { id: number; isActive: number }) => {
    setOpenActive(!openActive)
    setIdChoice(data.id)
    setIsActiveUser(data.isActive)
  }
  const deleteUserMutation = useMutation({
    mutationFn: (body: { idUser: number }) => deleteUser(body)
  })

  const handleConfirmDelete = (data: { idUser: number }) => {
    deleteUserMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false)
        location.reload()
      }
    })
  }
  const updateActiveMutation = useMutation({
    mutationFn: (body: { isActive: number; idUser: number }) => updateActiveUser(body)
  })
  const handleUpdateActive = (data: { isActive: number; idUser: number }) => {
    updateActiveMutation.mutate(data, {
      onSuccess: () => {
        setOpenActive(false)
        location.reload()
      }
    })
  }

  return (
    <div>
      {!isOpenCreate ? (
        <div className='ml-10 mr-10 mt-10'>
          <Button onClick={() => setIsOpenCreate(true)}>Tạo tài khoản mới</Button>
          <Card className='h-full w-full overflow-scroll'>
            <table className='w-full min-w-max table-auto text-left'>
              <thead>
                <tr>
                  {TABLE_HEAD.map((head,index) => (
                    <th key={index} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                      <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listUser?.map((value, index) => {
                  const isLast = index === listUser.length - 1
                  const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {value.idUser}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {value.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {value.email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {value.created_on}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {value.isActive ? 'Đang mở khóa' : 'Đang khóa'}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Fragment>
                          <Button
                            onClick={() =>
                              handleOpenActive({ id: value.idUser, isActive: value.isActive === 1 ? 0 : 1 })
                            }
                            variant='gradient'
                            color='green'
                          >
                            {value.isActive ? 'Khóa thành viên' : 'Mở khóa thành viên'}
                          </Button>
                          <Dialog open={openActive} handler={handleOpenActive}>
                            <DialogHeader>
                              {value.isActive ? 'Bạn muốn khóa thành viên ?' : 'Bạn muốn mở khóa thành viên?'}
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant='text'
                                color='red'
                                onClick={() => handleOpenActive({ id: 0, isActive: 0 })}
                                className='mr-1'
                              >
                                <span>Cancel</span>
                              </Button>
                              <Button
                                variant='gradient'
                                color='green'
                                onClick={() => {
                                  handleUpdateActive({ isActive: isActiveUser, idUser: idChoice })
                                }}
                              >
                                <span>Confirm</span>
                              </Button>
                            </DialogFooter>
                          </Dialog>
                        </Fragment>
                      </td>
                      <td className={classes}>
                        <Fragment>
                          <Button onClick={() => handleOpen(value.idUser)} variant='gradient' color='red'>
                            Xóa thành viên
                          </Button>
                          <Dialog open={open} handler={handleOpen}>
                            <DialogHeader>Bạn có thật sự muốn xóa thành viên?</DialogHeader>
                            <DialogBody divider>Khi ấn Confirm, thành viên sẽ xóa vĩnh viễn khỏi hệ thống.</DialogBody>
                            <DialogFooter>
                              <Button variant='text' color='red' onClick={() => handleOpen(0)} className='mr-1'>
                                <span>Cancel</span>
                              </Button>
                              <Button
                                variant='gradient'
                                color='green'
                                onClick={() => {
                                  handleConfirmDelete({ idUser: idChoice })
                                  refetch
                                }}
                              >
                                <span>Confirm</span>
                              </Button>
                            </DialogFooter>
                          </Dialog>
                        </Fragment>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
        </div>
      ) : (
        <CreateUser setIsOpenCreate={setIsOpenCreate}></CreateUser>
      )}
    </div>
  )
}
interface Props {
  setIsOpenCreate: React.Dispatch<React.SetStateAction<boolean>>
}
type FormData = Schema
function CreateUser(props: Props) {
  const setIsOpenCreate = props.setIsOpenCreate
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
      onSuccess: () => {
        setIsOpenCreate(false)
        location.reload()
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
              <div className='text-2xl'>Tạo tài khoản</div>
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
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
