// 이메일 검사 정규 표현식
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// 영문 숫자 조합 8자리 이상 특수문자 두개 이상 넣어라
const PWD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

export { EMAIL_REGEX, PWD_REGEX };
