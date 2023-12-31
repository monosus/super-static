# boiler plate: minista and linting

** いい感じに開発しながら品質の高い納品を目指す。 **

## pre-commit

コード規約を守るため
npm install後に以下を実施して下さい。
`npx lefthook add pre-commit`

commit時に自動でtype check eslint markup-lint prettierで整形とチェックをします。

## npm scripts

`npm install` : インストール

`npm run dev` : ローカルサーバーでの開発

`npm run build` : ビルド

`npm run generate:components-export-list` : コンポーネントリスト生成。src/components/index.ts,recipes.tsから一括インポートできるようにするため

`npm run watch:components-export-list` : コンポーネント追加時にサーバーを止めたくないので監視

`npm run generate-component` : scaffdogで必要ファイルを生成

`npm run check` : tsc,biome,markuplint,stylelint,prettierを実行する

## コーディング方針

### マインド

- 複雑にしない
- 少なければ少ないほどいい
- 書くことより読まれることを意識する、適宜コメントで補足する
- 自分の知っている方法ではなく世の中で良いとされている方法を採用する

### 具体的に

- markuplintのエラーがでないように
- 画像についてはministaのImage,Pictureを採用する
- sp-onlyなどのクラスによる表示出し分けは可能な限り回避する。必要となった場合はチーム内で協議する
- マークアップにプレゼンテーションを露出させる必要がないためユーティリティクラスは避ける→
- 以下のプロパティはcss変数を用いる
  - font-size
  - font-weight
  - font-family
  - color
  - background-color
  - border-radius
  - margin
  - max-width

### 独自コンポーネント

#### InsertHtml

- ajaxでhtmlファイルを非同期で読み込む
- 開発時は`pages/inc`内から参照する
- 初期表示に関係のないフッターなどに用いてレンダリングコストを削減する目的で使用する

#### HtmlAppendedLink

- 本番環境で`.html`を追加する。
- aタグのかわりに使用する（予定)

## Git issue branch Pull-Request

### 概要

[.github/workflows/auto_create_branch.yml]

issueを作成し担当者のアサインと`enhancement,bug,documentation`のいずれかのラベルを付与するとbranchがされドラフトでPRが作成されます。
branchでの作業が終わったらPRのドラフトを外しレビュー担当者を指定してください。

## コーディングガイドライン

[pages内でのコーディング方針](/page-coding-guidelines.md)
