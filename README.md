웹사이트 요약
=
-자신의 일정을 추가하고 다른 사람의 일정까지 고려한 시간표를 보고 모임 시간을 결정해보세요.
-프로젝트 진행 상황을 저장하고 다른 사람과 공유해보세요

앱 상세 설명
=
개발 스택
-
- 프론트앤드 : REACT
- 백앤드 : Flask
- 데이터베이스 : MySQL

로그인 화면
- 
- 진입 화면에 아이디와 비밀번호를 입력하는 화면이 있고 로그인과 회원가입 버튼이 있습니다.
- 로그인 버튼을 클릭하면 데이터베이스로 접근하여 가입된 아이디와 비밀번호가 일치하면 프로젝트 dashboard로 이동합니다.

![로그인](https://github.com/franktome/week3_front/assets/154505487/1f5c18bd-d4c1-4e9a-9612-1fdfdf8650f2)

회원가입 화면
- 
- 가입자의 이름, 소속, 아이디, 비밀번호, 비밀번호 확인을 입력해줍니다.
- 아이디 중복확인 버튼을 클릭해야 회원등록을 할 수 있으며 입력한 아이디는 데이터베이스의 user table로 접근하여 이미 있는 아이디인지 확인합니다.
- 아이디 중복확인이 끝난뒤 등록 버튼을 누르면 회원등록이 완료됩니다.
![회원가입](https://github.com/franktome/week3_front/assets/154505487/03f04dd6-6378-4cde-b176-76e6dcca17c9)


Project dashboard 화면
- 
- 왼쪽 파티션은 본인이 진행하고 있는 프로젝트 목록이 떠 있고, 오른쪽 파티션은 본인의 일주일간 시간표와 일정 목록이 뜹니다.
- 프로젝트 추가 버튼을 누르고 프로젝트 명, 참가자 목록, 프로젝트 설명을 적고 추가 버튼을 클릭하면 프로젝트가 추가됩니다. 참가자를 추가할때는 회원가입할때와 비슷하게 이미 가입된 회원임을 확인하고 추가할 수 있습니다.
![프로젝트 생성](https://github.com/franktome/week3_front/assets/154505487/a1fe018c-c443-41d4-bd4f-e69d50fe255f)
![dashboard화면](https://github.com/franktome/week3_front/assets/154505487/4ae5ff22-9b68-42f2-aa28-be3713bf1072)


- 프로젝트를 클릭하면 프로젝트 세부화면으로 넘어갑니다. 이때 프로젝트를 만든 사람을 "팀장"이라고 하며 팀장은 프로젝트 세부화면에서 모든정보를 수정할 수 있고 팀장이 아닌 팀원은 수정이 불가하고 자료 열람만 가능합니다.
- 팀장은 프로젝트 별로 1명이며, 팀장은 자신의 권한을 다른사람에게 위임할 수 있고 위임하고자 하는 팀원 옆에 있는 "팀장 위임" 버튼을 클릭하면 팀장이 변경되고 본인은 팀장 프로젝트 세부페이지를 볼 수 없습니다.
- 이외에 "to-do-list"와 "appointment"를 추가할 수 있으며 checkbox 형식으로 되어 있어 일을 완료하면 팀장이 체크를 할 수 있고 체크된 상태가 데이터베이스에 저장됩니다.

![dash_detail 화면](https://github.com/franktome/week3_front/assets/154505487/52fa9c3d-34e1-47e7-9556-49e9c76e6cf2)
![dash_detail화면2](https://github.com/franktome/week3_front/assets/154505487/39c046f6-1192-45b0-932c-e70059c4022a)

- 팀장 권한을 위임하고 다시 프로젝트 세부페이지로 넘아가면 수정할 수 없는 창이 뜹니다.
![noleader_detail](https://github.com/franktome/week3_front/assets/154505487/b122751b-234b-43b8-9131-03b277e70925)
![noleader_detail2](https://github.com/franktome/week3_front/assets/154505487/80bfb305-d8aa-4772-998b-40de5b1d9fe7)

-오른쪽 파티션에서는 본인의 일주일간 시간표에 일정을 추가할 수 있습니다. 일정의 내용, 시간을 설정하고 "+" 버튼을 클릭하면 박스가 시간표 위에 뜨게 되고 박스를 drag and drop 방식으로 옯겨서 위치시킬 수 있습니다.
- 박스를 원하는 위치에 위치시키고 저장 버튼을 누르면 본인의 시간표 뿐만 아니라 프로젝트에 참가하는 인원의 모든 일정이 합쳐져서 프로젝트 세부페이지의 시간표에 표시됩니다.
- 이때 색칠된 칸 위에 커서를 두면 그 시간대에 일정이 있는 사람이 누군지 ID값으로 알 수 있습니다.
- 해당시간표를 보고 바로 밑에 있는 appointment에 새로운 약속을 추가할 수 있습니다.
![시간표 비교](https://github.com/franktome/week3_front/assets/154505487/e9a4981b-34bf-4a36-b6ef-1e2642e54c1b)


- 본인의 각 프로젝트에 작성된 약속들을 오른쪽 파티션의 "OOO의일정"이라는 타이틀로 볼 수 있습니다. 이 영역은 드래그로 설정하여 자신이 진행하는 모든 프로젝트의 약속들을 모아서 한번에 볼 수 있습니다.
- 아래 사진의 오른쪽 파티션을 보면 추가된 약속이 뜨는 것을 확인할 수 있습니다.
![약속 추가, 팀장 변경](https://github.com/franktome/week3_front/assets/154505487/ac17b511-4352-46dd-88a4-a98f2d62bdea)





## 데이터베이스(MySQL)
- MySQL 테이블 관계도
- 
![데이터테이블 관계도](https://github.com/franktome/week3_front/assets/154505487/5287caeb-caf7-47b8-9f9b-c5fad7ee24ca)

- users 테이블
- 
  ![user_table](https://github.com/franktome/week3_front/assets/154505487/a1de6d4b-5aeb-428d-970d-a427cd338ec2)

- project 테이블
- 
  ![project_table](https://github.com/franktome/week3_front/assets/154505487/e1ee1e0e-52dd-401e-b65b-3e9ccc2912cb)

- project_belong 테이블
- 
  ![project_belong](https://github.com/franktome/week3_front/assets/154505487/5827ca93-6c61-44de-87a6-eb0c5cff0afe)

- schedule 테이블
- 
  ![schedule_project](https://github.com/franktome/week3_front/assets/154505487/23c3439e-777a-41c0-9103-f9325d2179fe)

- todo 테이블
- 
  ![todo_table](https://github.com/franktome/week3_front/assets/154505487/c040c6e6-99e4-40af-8078-e70d04e87004)

- appointment 테이블
- 
  ![appointment_table](https://github.com/franktome/week3_front/assets/154505487/96d45152-6eda-42e1-8c7c-74bfa2004f93)

        





  
