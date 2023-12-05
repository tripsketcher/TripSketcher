type ROLE_USER = 'user'
type ROLE_ADMIN = 'admin'

export const UserRole: ROLE_USER = 'user'
export const AdminRole: ROLE_ADMIN = 'admin'

export type UserRole = ROLE_ADMIN | ROLE_USER

interface UserInfo {
  phone: string
  profileImage?: string
  roles?: UserRole[]
}
export interface UserBasic {
  id: number // pk
  email: string
  password?: string
}
export type User = UserBasic & UserInfo
