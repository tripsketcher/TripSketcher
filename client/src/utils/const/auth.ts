import { MessageType, PwTypeInfo, InputColorInfo } from 'types/auth.d'

export const messageInfo: MessageType = {
  // email
  notEmailFormat: '올바르지 않은 이메일 형식입니다.',
  tooLongEmail: '이메일은 50자 이하로 작성해주세요.',
  duplicatedEmail: '이미 가입된 이메일입니다.',
  needToCertificate: '유효한 이메일 형식입니다. 인증을 진행해주세요.',
  certifiedEmail: '인증된 이메일입니다.',

  // password
  shortPw: '영문자, 숫자, 특수문자 중 2종류를 조합하여 8자 이상을 입력해주세요.',
  tooLongPw: '비밀 번호는 64자 이하로 작성해주세요',
  notMatchedPw: '비밀번호가 일치하지 않습니다.',
  singleKindPw: '2종류 이상의 문자를 조합하거나 16자리 이상 작성해주세요.',
  lowSafePw: '비밀 번호 등급 : 낮음',
  middleSafePw: '비밀 번호 등급 : 보통',
  highSafePw: '비밀 번호 등급 : 높음',
  validPw2: '비밀번호가 일치합니다.',

  // phone
  notPhoneFormat: '올바르지 않은 전화번호 형식입니다.',
  validPhone: '유효한 전화번호입니다.',

  // nickname
  duplicateNickname: '닉네임이 중복되었습니다.',
  validNickname: '유효한 닉네임 형식입니다.',

  // common
  unableChar: '유효하지 않은 문자가 입력되었습니다.',
}

export const inputColor: InputColorInfo = {
  focus: 'blue',
  error: 'red',
  dangerous: 'orange',
  normal: 'yellow',
  safe: 'green',
}

export const pwTypeInfo: PwTypeInfo = {
  currentPw: '현재 비밀번호',
  newPw: '신규 비밀번호',
  newPwConfirm: '신규 비밀번호 확인',
  pw1: '비밀번호',
  pw2: '비밀번호 확인',
}
