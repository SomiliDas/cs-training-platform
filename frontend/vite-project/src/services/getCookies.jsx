import {jwtDecode} from 'jwt-decode'

const getUserRoleFromCookie = ()=> {
  const cookieString = document.cookie
  const token = cookieString
    .split('; ')
    .find(row => row.startsWith('token='))  
    ?.split('=')[1]

  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return decoded.role 
  } catch (err) {
    console.error("Invalid token", err)
    return null
  }
}

export default getUserRoleFromCookie
