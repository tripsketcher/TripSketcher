type ROLE_USER = 'user'
type ROLE_ADMIN = 'admin'

export const UserRole: ROLE_USER = 'user'
export const AdminRole: ROLE_ADMIN = 'admin'

export type UserRole = ROLE_ADMIN | ROLE_USER

// 사용자 정보 -> 나중에 필요한 정보에 맞게 수정하기
interface UserInfo {
  userNick: string
  userEmail: string
  userPhone: string
  userNation: string
  userProfileImage?: string
  roles?: UserRole[]
}
export interface UserBasic {
  id: number // pk
  userLogId: string
  password?: string
}
export type User = UserBasic & UserInfo

export interface PwInfoChangeSubmit {
  currentPw: boolean
  newPw: boolean
  newPwConfirm: boolean
}
