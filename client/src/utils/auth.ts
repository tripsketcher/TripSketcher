const continuousInfo: string[] = []
// keyboard 각 라인에 대한 정보(lowercase + uppercase)
const keyboardLineList = [
  // lowercase
  '`1234567890-=',
  'qwertyuiop[]',
  'asdfghjkl;\'"',
  'zxcvbnm,./',
  // uppercase
  '~!@#$%^&*()_+',
  'QWERTYUIOP{}',
  'ASDFGHJKL:"',
  'ZXCVBNM<>?',
]

// 3단어씩 잘라서 continuousInput에 넣어줘야 한다.
keyboardLineList.forEach((line: string) => {
  for (let i = 0; i < line.length - 2; i += 1) {
    continuousInfo.push(line.substring(i, i + 3))
  }

  for (let i = 0; i < line.length - 2; i += 1) {
    const reversedLine = line.split('').reverse().join('')
    continuousInfo.push(reversedLine.substring(i, i + 3))
  }
})

export const checkContinuousInput = (input: string): boolean => {
  return continuousInfo.some((info) => input.includes(info))
}
