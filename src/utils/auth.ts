export const saveAcessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const clearAcessTokenToLS = () => {
  localStorage.removeItem('access_token')
}
export const getAcessTokenToLS = () => localStorage.getItem('access_token') || ''

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getRoleFromLS = () => localStorage.getItem('role')
