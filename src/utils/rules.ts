import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: { value: true, message: 'Email là bắt buộc' },
//     pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email không đúng định dạng' },
//     maxLength: { value: 160, message: 'Độ dài từ 5-160 kí tự' },
//     minLength: { value: 5, message: 'Độ dài từ 5-160 kí tự' }
//   },
//   password: {
//     required: { value: true, message: 'Password là bắt buộc' },
//     maxLength: { value: 160, message: 'Độ dài từ 5-160 kí tự' },
//     minLength: { value: 6, message: 'Độ dài từ 5-160 kí tự' }
//   },
//   confirm_password: {
//     required: { value: true, message: 'Nhập lại password là bắt buộc' },
//     maxLength: { value: 160, message: 'Độ dài từ 5-160 kí tự' },
//     minLength: { value: 6, message: 'Độ dài từ 5-160 kí tự' },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => {
//             if (value === getValues('password')) {
//               return true
//             }
//             return 'Nhập lại password không khớp'
//           }
//         : undefined
//   }
// })

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 kí tự')
    .max(160, 'Độ dài từ 5-160 kí tự'),
  name: yup.string().required('Name là bắt buộc').min(5, 'Độ dài từ 5-160 kí tự').max(160, 'Độ dài từ 5-160 kí tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 5-160 kí tự')
    .max(160, 'Độ dài từ 5-160 kí tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 5-160 kí tự')
    .max(160, 'Độ dài từ 5-160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})
const loginSchema = schema.omit(['confirm_password'])
type LoginShema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
