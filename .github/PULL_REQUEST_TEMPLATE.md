# 작업 내용\_개발한 기능으로 변경하기

## PR 타입

- [ ] 기능 추가
- [ ] 기능 삭제
- [ ] 버그 수정
- [ ] 코드 리팩토링

## 반영 브랜치

feat/#1-signup -> develop

## 변경 사항

- 주요 변경 사항을 작성하거나 PR하는 커밋들의 커밋 메세지를 요약해서 작성할 수 있다.
- Example :
  - 기존 username만 따로 가져가던 형태에서 관계를 매핑하여 User 객체를 통째로 참조하도록 변경
  - 게시글, 댓글 모두 수정/삭제 시 username과 일치하는게 아닌 userId와 일치하는 값을 조회

## 테스트 결과

테스트를 진행한 경우 관련 내용을 적어줍니다.

- Example : Postman 테스트 결과 이상 없습니다.
