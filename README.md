# クラウドストレージプロジェクト

このプロジェクトは、**Vue.js** と **Vuetify** を使用して構築されたシンプルなクラウドストレージアプリケーションです。ユーザーはファイルをアップロードし、ダウンロードすることができます。

## 環境構築

### 必要なソフトウェア

- Node.js (use v20.16.0 at dev)
- pnpm ``` npm install -g pnpm ```

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/lijunjie2232/filemanager
   cd filemanager
   ```

2. copy ```.env.example``` to ```.env.local``` and modify ```VITE_APP_API_BASE_URL``` to backend api url

3. 依存関係をインストールします。

   ```bash
   pnpm install
   ```

## Development

   ```bash
   pnpm dev
   ```

ブラウザで `http://localhost:3000` にアクセスします。

## Deployment

   ```bash
   pnpm build
   pnpm preview
   ```
ブラウザで `http://localhost:3000` にアクセスします。

## Dev Plan

- [x] base ui
- [x] upload and download
- [ ] path front & back
- [ ] path link
- [ ] page and limit
- [ ] file delete
- [ ] file preview
- [ ] right click
- [ ] search
- [ ] other options like sort
- [ ] file tree at side bar
