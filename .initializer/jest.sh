# ##################################################
# 변수 선언
# ##################################################
echo "(step1) Define variables..."
PACKAGES="jest ts-jest @types/jest"
CONFIG_FILE=jest.config.js
DATE=$(date +%Y%m%d-%H%M%S)

# ##################################################
# 먼저 의존성 모듈을 설치합니다.
# ##################################################
echo "(step2) Install $PACKAGES..."
echo "pnpm add -D $PACKAGES"
pnpm add -D $PACKAGES

##################################################
# 설정이 구성되어 있지 않은 경우 설정을 구성합니다.
##################################################
echo "(step3) Set a config file. $CONFIG_FILE..."
if [ -f "$CONFIG_FILE" ] ;then
  NEW_FILE_NAME="$CONFIG_FILE.$DATE"
  echo "이미 존재하는 $CONFIG_FILE 파일이 발견되어 $NEW_FILE_NAME 으로 백업합니다."
  cp "$CONFIG_FILE" "$NEW_FILE_NAME"
fi

echo 'module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper:{
        "^@/(.*)$": "<rootDir>/src/$1"
    },
}
' > "$CONFIG_FILE"

##################################################
# 테스트 디렉토리를 생성합니다.
##################################################
echo "(step4) Finalize the task..."
mkdir tests