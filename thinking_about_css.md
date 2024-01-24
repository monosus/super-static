# CSSについて考える

## 読み込み(エクスペリメンタル)

### 今まで

#### 静的に設置
sass/scssやpostCssを使用して一枚のcssファイルを作成

デメリット：
- 静的に設置するため、運用時にsass環境を維持できないタイミングが発生する。
- キャッシュされるのが1ファイルなので更新の度に既存ユーザーへの表示速度に影響がある
- sassファイル構成がゆるいcss設計となっているが、後続の参入者と認識や文脈が合わない
- sassに依存することでモダンcssの取り込みが遅れる
- sass記法はWEBスタンダードではないものが多い
- 命名規則のcss設計になりがち、クラス名のprefixは認識を揃える面で不利

メリット
- スタイルを更新しない運用時に運用が楽


#### フレームワークを使用する
css in js,tailwindCSS,cssModule

デメリット

css in js:
- パフォーマンスを考慮する必要がある
- DXがマシンスペックに依存することがある
  - 修正ごとにコンパイルが走るため

tailwindCSS:
- スタイルのためのdiv,spanが生成される土壌が出来やすく、マークアップが汚染される
- マルチクラスを採用した場合にスケーラビリティの問題がでる
  - tailwindcssはチーム開発にはまだ早い思想と思われる（知識のレベルで出てくるものが大きく変わる）

cssModule:
- ハッシュ値を用いた場合にプロジェクト構造やビルドシステムの変更などで不要なキャッシュクリアが発生する

メリット
- 書き味の部分ではDXは高い
  - SFCなどは場合によっては管理しやすい

### これから

#### スタイルはbundleせずに全てhtml内にcssファイルとして読み込む　　
注 HTTP/2で読み込むことが前提

デメリット
- htmlファイルを直接触るような運用をしている場合に`<head>`内の行数が長すぎてつらい
- @layerの優先順位について読み込み順をコントロールする必要がある
- HTTP/2の許容範囲を超える数のファイル数になった場合に問題がありそう。。

メリット
- CSSなのでいつでもWEBスタンダード
- キャッシュを有効活用可能
- 一つの巨大なファイルより複数の小さなファイルを読み込む方がサーバーからのダウンロードが有利なためパフォーマンスが高い
- 一つのcssファイルに対してどの様に記述するかをを定義しやすくなることでコーディングルールの認識が合わせやすい→レビューが簡単になる
- そのページに対して不要なスタイルを除去しやすくなる
- ビルドシステムと切り離した場合でも運用可能（やりやすいかは別）


## ファイルの粒度
*ファイルは可能な限り細かく、可能な限り少なく、可能な限り短く*
- できる限り一つのファイルは一つのスタイルについて記述する
- できる限り1~200行程度
- 親ブラケット(一番最初に出てくる`{}`)は原則一つ、あっても２つ


## 記述

*目指すのは崩れにくいスタイルではなくすぐに書き換えられるスタイル*

以下を使用することが必須
- :where()
- @layer

以下を使用することを強く推奨
- :has()
- css custom property(css変数)
- css nesting

### :where()
:where()擬似クラスを使用することで詳細度を低く保つことが可能になる。
ランドマーク的要素やページ内で一意な要素はid属性にスタイリングすることが今後は推奨される。

### @layer
@layer(カスケーディングレイヤー)を使用することでcssのカスケーディング順序によるスタイル崩れはおきなくなる。
ただし@layerの優先順位を最初に明示しないと期待通りの順番にカスケーディングされない

### :has()
:has()擬似クラスは子要素の内容から親要素のスタイルを定義できる。
これによりjavaScriptが大幅に不要になる。
*難しいことはcssにまかせる。きっかけとどうでもいいことにjavascriptを使用する*

```css
body:has(dialog[open]) {
	overflow: hidden;
}
```

firefoxも対応したので積極的に使用する。

### css custom property(css変数)
css変数は再代入によって力を発揮する。
再代入については`:root`内で行うか、コンポーネントクラス内で行うかケースバイケースで対応が必要
変数となるため命名規則をしっかり設ける
変数名に具体的なスタイルが推測できる名前をつけない
悪い例： --color-white,--max-w-1200

css変数は現代のマークアップ担当者の一番の腕の見せ所となる

### css nesting
なくても問題ないがあると便利。しっかり使うことで使うことでファイル粒度もコントロール可能

```css
.card {
	@layer ui {
		@layer base {
			background-color:var(--card-skin);
			...
			> footer {
				border-top:var(--basic-border);
			}
		}
		@layer state {
			transition: filter .3s ease;
			@media (hover:hover) {
				filter: contrast(1.3);
				...
			}
		}
	}
}
```
↑これをみてめんどくさいと思うのであれば、雛形の自動生成などを検討する。

## cssファイルの考え方

### at-layer.css

@layerの優先順位のみ記載する。html上で一番最初に読み込む。各ページ（またはサイト）で一つだけ使用する。

```css
/* at-layer.css */
@layer reset,token,base,ui,landmark,layout,page,hotfix

/*
layerについて
reset reset css
token css変数を記述
base htmlやbodyなどにreset後に設定する基本スタイル
ui コンポーネントのそれぞれのスタイル
landmark header,footer,navigationなどサイト共通の大きいコンポーネント
layout containerなど
page page固有のスタイル
hotfix 記述しない、運用時の迅速な対応用
*/
```


### reset.css

よほどのことが無い限り1プロジェクトに対し一つ。選定は好みで良い
おすすめは
https://github.com/mayank99/reset.css/blob/main/package/index.css
（`color-scheme: dark light;`だけプロジェクトによって外す判断をする)

@layer reset {}で囲むことを忘れずに

### token.css
複数あっても問題ない原則`:root`にたいするcss変数を記述する。そのままデザインシステムとなる。
可能であればデザイナーと協議し先にcss tokenを作成してからデザインに移る。（「ここだけline-height1.4なんだ。。」みたいな無意味なデザインの揺れを抑止するため）

```css
@layer token {
	:root {
		/* text-sizing */
		--text-size-base: 1rem;
		--text-scale: 1.15;
		--text-size-lg: calc(var(--text-size-base) * var(--text-scale))
		....
	}
}
```

### base.css
そこまで複雑な記述は無いため１ファイルで対応する。
想定している内容は
- font-family
- imgのあれこれ
- any-link,visitedなどの初期設定
- visually-hidden クラス
- 全称セレクタのあれこれ

などなど
