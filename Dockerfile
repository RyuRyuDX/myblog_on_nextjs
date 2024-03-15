# ベースイメージを指定
FROM node:18.17.1

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピーし、依存関係をインストール
COPY src/package*.json ./
RUN npm install

# その他のファイルをコピー（必要に応じて）
COPY . .

# アプリケーションを実行するデフォルトコマンドを設定
CMD ["npm", "build", "start"]
