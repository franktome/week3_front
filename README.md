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

![KakaoTalk_20240110_183534719_011](https://github.com/franktome/madcamp_week2/assets/102137004/6cd840a2-fd16-439f-a96d-b56dd7ab07f7)

회원가입 화면
- 
- 가입자의 이름, 소속, 아이디, 비밀번호, 비밀번호 확인을 입력해줍니다.
- 아이디 중복확인 버튼을 클릭해야 회원등록을 할 수 있으며 입력한 아이디는 데이터베이스의 user table로 접근하여 이미 있는 아이디인지 확인합니다.
- 아이디 중복확인이 끝난뒤 등록 버튼을 누르면 회원등록이 완료됩니다.


Project dashboard 화면
- 
- 왼쪽 파티션은 본인이 진행하고 있는 프로젝트 목록이 떠 있고, 오른쪽 파티션은 본인의 일주일간 시간표와 일정 목록이 뜹니다.
- 프로젝트 추가 버튼을 누르고 프로젝트 명, 참가자 목록, 프로젝트 설명을 적고 추가 버튼을 클릭하면 프로젝트가 추가됩니다. 참가자를 추가할때는 회원가입할때와 비슷하게 이미 가입된 회원임을 확인하고 추가할 수 있습니다.
- 프로젝트를 클릭하면 프로젝트 세부화면으로 넘어갑니다. 이때 프로젝트를 만든 사람을 "팀장"이라고 하며 팀장은 프로젝트 세부화면에서 모든정보를 수정할 수 있고 팀장이 아닌 팀원은 수정이 불가하고 자료 열람만 가능합니다.
- 팀장은 프로젝트 별로 1명이며, 팀장은 자신의 권한을 다른사람에게 위임할 수 있고 위임하고자 하는 팀원 옆에 있는 "팀장 위임" 버튼을 클릭하면 팀장이 변경되고 본인은 팀장 프로젝트 세부페이지를 볼 수 없습니다.
- 이외에 "to-do-list"와 "appointment"를 추가할 수 있으며 checkbox 형식으로 되어 있어 일을 완료하면 팀장이 체크를 할 수 있고 체크된 상태가 데이터베이스에 저장됩니다.

![KakaoTalk_20240110_183534719_01](https://github.com/franktome/madcamp_week2/assets/102137004/10458acd-8c3d-494e-be84-7b3baf8f68a0) ![KakaoTalk_20240110_183534719_09](https://github.com/franktome/madcamp_week2/assets/102137004/989fe50c-76c2-4090-9dd7-194cba7b2c4c)


-오른쪽 파티션에서는 본인의 일주일간 시간표에 일정을 추가할 수 있습니다. 일정의 내용, 시간을 설정하고 "+" 버튼을 클릭하면 박스가 시간표 위에 뜨게 되고 박스를 drag and drop 방식으로 옯겨서 위치시킬 수 있습니다.
- 박스를 원하는 위치에 위치시키고 저장 버튼을 누르면 본인의 시간표 뿐만 아니라 프로젝트에 참가하는 인원의 모든 일정이 합쳐져서 프로젝트 세부페이지의 시간표에 표시됩니다.
- 해당시간표를 보고 바로 밑에 있는 appointment에 새로운 약속을 추가할 수 있습니다.

![KakaoTalk_20240110_183534719_08](https://github.com/franktome/madcamp_week2/assets/102137004/4aaef8cb-104b-4313-b9a3-20d0ca8eadc1) ![KakaoTalk_20240110_183534719_02](https://github.com/franktome/madcamp_week2/assets/102137004/5e897624-1c9a-4163-8057-14a3404482fb)

- 본인의 각 프로젝트에 작성된 약속들을 오른쪽 파티션의 "OOO의일정"이라는 타이틀로 볼 수 있습니다. 이 영역은 드래그로 설정하여 자신이 진행하는 모든 프로젝트의 약속들을 모아서 한번에 볼 수 있습니다.

![KakaoTalk_20240110_183534719_06](https://github.com/franktome/madcamp_week2/assets/102137004/79d9243a-3c43-400a-b2c2-6308c83a39bd) ![KakaoTalk_20240110_183534719_05](https://github.com/franktome/madcamp_week2/assets/102137004/1c621d69-e007-406d-a74b-5e8dc4bdee3c)



## 데이터베이스(MySQL)
- users 테이블 (사용자 ID, 사용자 닉네임)

![users_table](https://github.com/franktome/madcamp_week2/assets/154505487/7ab191c0-6ca5-4035-ad42-96adcb8d0fde)

-occupied_tablesA,B,C (사용자ID, 좌석 번호)

![occupied_seatsA,B,C](https://github.com/franktome/madcamp_week2/assets/154505487/40d25aed-95e0-4253-a6b8-689fb446dd23)

-occupied_users (사용자ID, 열람실 정보)

![occupied_users_tables](https://github.com/franktome/madcamp_week2/assets/154505487/f790c761-79fb-4e89-98c4-5b68f59dd172)




  
