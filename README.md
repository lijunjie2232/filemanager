# クラウドストレージプロジェクト

このプロジェクトは、**Vue.js** と **Vuetify** を使用して構築されたシンプルなクラウドストレージアプリケーションです。ユーザーはファイルをアップロードし、ダウンロードすることができます。

バックエンドのソースコードはこちら：[hello-servlet2](https://github.com/lijunjie2232/java_web_study/tree/master/servlet/hello-servlet2)

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
- [ ] directory create and delete
- [ ] file preview
- [ ] right click
- [ ] search
- [ ] other file options like sort, copy ...
- [ ] file tree at side bar

## 免責事項

このプロジェクトは、JavaサーブレットとWeb開発のフロントエンド関連技術を学ぶことを目的としている、ゆえに実装方法は専門的ではなく、コーディングもあまり標準化されていません。自由に使用・修正・配布できますが、使用による損害については責任を負いません。
