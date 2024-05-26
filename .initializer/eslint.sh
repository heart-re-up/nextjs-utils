# ##################################################
# 변수 선언
# ##################################################
echo "(step1) Define variables..."
ESLINT="eslint eslint-config-next"
PRETTIER="prettier eslint-config-prettier eslint-plugin-prettier"
AIRBNB="eslint-config-airbnb eslint-config-airbnb-typescript"
PACKAGES="$ESLINT $PRETTIER $AIRBNB"
CONFIG_FILE=.eslintrc.json
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

echo '{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
  "extends": [
    "prettier",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint",
    "react",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "import/extensions": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
' > "$CONFIG_FILE"
