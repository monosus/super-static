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

### アイコン(svg)

アイコンはsvg spriteを使用する。ministaのIconコンポーネントは以下の点でデメリットがある。

- 複数色を使用しているヴェクターイメージを期待通りに扱えない
- css背景画像で使用できない

アイコン自体はテキスト等でラベリングがない場合以外はAOMに挿入されないようにしたほうが良い。プレゼンテーションとしてのアイコンは`aria-hidden="true"`とするか背景画像としてcssで表示させることが望ましい。マークアップしてからわざわざaria-hidden属性を付与するのも避けたいため、基本的にはbefore/after疑似要素の背景画像として設置する。
ライブラリとして[svg-sprite](https://github.com/svg-sprite/svg-sprite)を使用する。

アイコンは`src/assets/icons`内に格納する。

以下コマンドを用意

svg sprite作成

```bash
npm run generate:svg-sprite
```

一覧をローカルサーバーで確認

```bash
npm run view-svg-sprite
```

#### 使用例

（やはりアクセシビリティツリーからは除外したほうが管理し易い）

```html
<svg aria-label="plus icon">
  <title>icon title</title>
  <use href="/assets/icons/sprite.svg#plus" />
</svg>
```

**推奨**

```css
.icon-plus::before {
  /* ... */
  background: url('/assets/icons/sprite.svg#plus') no-repeat;
  content: '';
}
```

svg-spriteを使用する場合cssでfillをコントロールすることが難しいため単色のアイコンの色を変更したい場合はministaのIconコンポーネントを使用する。

## Git issue branch Pull-Request

### 概要

[.github/workflows/auto_create_branch.yml]

issueを作成し担当者のアサインと`enhancement,bug,documentation`のいずれかのラベルを付与するとbranchがされドラフトでPRが作成されます。
branchでの作業が終わったらPRのドラフトを外しレビュー担当者を指定してください。

## コーディングガイドライン

[pages内でのコーディング方針](/page-coding-guidelines.md)
