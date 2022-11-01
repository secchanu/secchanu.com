# 制作物

## Spotify 壁紙

<img src="https://secchanu.com/app/spotify-wallpaper.png" width="560">

### 概要

[Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine/)上で動作する
Spotify で再生中の曲を表示する動く壁紙

操作は Spotify Premium ユーザーのみ可能

[Web 版デモ](https://secchanu.com/app/spotify/wallpaper)

※デモではカスタマイズ不可

### 詳細

再生中の情報を Spotify Web API から取得し、その情報から壁紙の表示を生成する

#### 背景

[Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine/)のワークショップにある Spotify に対応した壁紙は日本語非対応であることが多かったことが起点となった。また周りのフレンドも Spotify ユーザーが多く、自分で壁紙を作ってみたいという思いもあったので実行に移した。

#### 工夫点

- refresh_token の取得や access_token の更新などの処理に client_id や client_secret が必要になるが、これらを配布する壁紙に記述するわけにはいかないので、api として初期は Google App Script で現在はこの Web サイト上に実装した。
- 壁紙はデスクトップの背景になり、人によってショートカットなどの配置が異なるため、表示のカスタマイズを行えるようにした。
- 縦向きのモニターや Wallpaper Engine の画面分割機能などによる異なる解像度・アスペクト比での表示にも対応した。

### 開発環境

言語: TypeScript

ライブラリ: React

ビルド: Webpack + Babel

### 開発期間

ラフ・プロトタイプ作成 + Javascript での実装: 2 週間

TypeScript での修正 + デモ版の実装: 2 週間

### ソースコード

[https://github.com/secchanu/spotify-wallpaper](https://github.com/secchanu/spotify-wallpaper)

<br>

## KUS ドラフト杯

<iframe width="560" height="315" src="https://www.youtube.com/embed/dPXY_E8wQiA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 概要

大学のサークル内で開催したゲーム(Splatoon2)大会

事前に決めた各チームの主将が当日ドラフト形式でチーム決めを行い、
チーム名や編成の相談などを行った後にリーグ形式 → 上位 2 チームでの決勝戦で優勝を決める。

全 3 回で運営を担当し、第 2 回、第 3 回では運営放送も担当した。

### 詳細

#### 背景

副サークル長であり、Discord サーバーの管理(サーバー設定や通常時の Discord Bot の開発など)を担当していたので、Discord や Bot を上手く使って大会の進行などに貢献できないかと考えた。

運営の人数が限られており、イベント当日はとても忙しいため、負担を軽減するために自動化や簡易化を行うようになった。

せっかくサークルでのイベントを行うので配信に残して後で見返せるようにと、配信を作るようになった。

#### Discord Bot

ドラフト杯用の Bot を開発し、運営や参加者は Discord 上で Bot のコマンドや選択肢へのリアクションを行うだけで進行できるようにした。

##### コマンド一覧

- `!開会`: 運営が使用し、参加者の取得、各チームの VC や連絡用のチャンネルの生成、各チーム VC に主将の移動を行う。
- `!ドラフト`: 運営が使用し、各チームの主将にまだ選ばれてない参加者の一覧を送信し、主将は送られた一覧の中から選びたい参加者を指名する。全チームの指名が決まり次第、被りなしの指名は確定し、被りありの指名は抽選を行い 1 チームの指名に確定する。その後獲得できなかったチームだけで再度ドラフトを行い、全チーム確定するまで繰り返す。確定した参加者には対応するチームのロールを付与し、チーム VC に移動させる。
- `!選択`: 運営が使用し、選択したチームによるドラフト無しの直接指名を行う(チームバランスの調整に使用)。
- `!命名 〇〇`: 各チームが使用し、コマンドを使用したチームのチーム名を「〇〇」に変更する。
- `!試合`: 運営が使用し、チーム一覧から 2 チームを選択、ルールやステージを選択し、全体と試合を行うチームへのアナウンスを行う。
- `!集合`: 運営が使用し、アナウンスの後、全員を 1 つの VC に移動させる。
- `!閉会`: 運営が使用し、Bot を終了させる。

##### 工夫点

- 当時は Discord にスラッシュコマンドが無かったので、"!"を prefix として使用したが、全角の"！"と間違える人が多かったので、全角でも動作するようにした。
- 当時は Discord にセレクトメニューが無かったので、リアクションで同様の操作ができるようにした。
- リアクションの上限が 20 個までだったので、選択肢が 21 個以上ある場合はページネーションを行うように実装した。
- ゲームハードが Switch であることもあり、スマホから Discord を操作する人が多く、タップミスが起こりやすかったので、各種操作に確認状態を追加し、間違えた場合もキャンセルすることができるようにした。
- 他のチームの状況(特にドラフト中の選択状況など)がわかりにくいという意見があったので、Bot で全体にアナウンスするようにした。
- 後述の配信上の表示部分から Bot で取得や操作した情報を JSON 形式で利用できるようにした。

#### 配信

シーントランジションやリプレイなどを追加したり、
NodeCG というフレームワークを用いて、表示する文字や時間の変更、上述の Discord Bot で取得や操作した情報を配信上の表示に反映した。

当日はゲーム内カメラの操作と配信全般の操作を担当した。

##### 使用技術等

配信には [OBS studio](https://obsproject.com/ja) を使用し、
[Replay Source](https://obsproject.com/forum/resources/replay-source.686/)や[Advanced Scene Switcher](https://obsproject.com/forum/resources/advanced-scene-switcher.395/)、[Move transition](https://obsproject.com/forum/resources/move-transition.913/)などのプラグインを導入した。

NodeCG については投稿した記事: [NodeCG で配信を華やかに - Qiita](https://qiita.com/secchanu/items/f422f1e101cc85caf40a) に詳しく記載している。実際に使用したものは一部 Bot からの情報も利用しているため、操作部分は少なくなっている。

参加者にはランクやブキ、意気込みなどを申請時に提出してもらい、
それらを Google スプレッドシートにまとめておき、そのデータを Google App Script で API として利用できるようにし、Bot で取得した各チームメンバーの Discord の ID から取得し、チームごとにまとめて配信上で表示した。

また、開催する際に告知動画や[PV](https://youtu.be/GR8IdI4gKpw)などを作成し、配信上のシーン切替時のシーントランジションやその他オーバレイなども作成した。
作成には AviUtl や Adobe After Effects、Adobe Illustrator などを使用した。

##### 工夫点

- 限られた人数での運営であったため、当日の作業量軽減のために自動化、簡易化を進めた。
- 開催ごとに参加者や視聴者からアンケートを取り、意見を次回に取り入れるようにした。
- チーム決定から試合までの間などの空き時間に流すためのコンテンツも作成した。

### 開発環境

言語: JavaScript

フレームワーク: NodeCG

ライブラリ: Discord.js

### 開発期間

告知・PV 制作 + Bot 開発 + 配信制作 + etc: 開催ごとに 2 ヶ月程度

### ソースコード

Discord API の仕様変更により現在動作不可のため非公開

<br>

## KUeST-streaming

<iframe width="560" height="315" src="https://www.youtube.com/embed/5vVzDPwHQlU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Du3jJP6VtTw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 概要

大学のサークル内イベントで各ゲームでのカスタムゲームの様子を配信したもの

1 つ目の動画では配信を、2 つ目の動画ではゲーム内カメラを担当した。
特に配信制作では上述の KUS ドラフト杯と同様に NodeCG で使用するバンドルの作成を行い、最近では開発に興味がある後輩に教えながら開発している。

### 詳細

#### 背景

新興サークルでメンバーを増やす方法を話し合った際に、活動内容を知ってもらいたいという意見が出て、配信を通して活動内容を伝えることになり、以前にこういった配信制作を行っていた経験から、主に担当することとなった。

#### 工夫点

- 今までと違いチームでの開発が想定されるので、Git や Github を有効活用(Branch、Issue、PullRequest、Wiki など)するようにした。
- 開発メンバーの中には開発未経験の人も多かったため、使うツールや開発方法などの説明も行った。
- 複数人でコードを書くことになるため、フォーマッタ等を導入した。

### 開発環境

言語: TypeScript

フレームワーク: NodeCG

ライブラリ: React

ビルド: Webpack + Babel

フォーマッタ: ESLint + Prettier

### 開発期間

新規タイトル: 1 ヶ月半程度

### ソースコード

VALORANT 版: [https://github.com/KU-eSports/kuest-streaming/tree/prod/valorant](https://github.com/KU-eSports/kuest-streaming/tree/prod/valorant)

Splatoon3 版: [https://github.com/KU-eSports/kuest-streaming/tree/prod/splatoon3](https://github.com/KU-eSports/kuest-streaming/tree/prod/splatoon3)

<br>

## nodecg-valorant

<img src="https://secchanu.com/app/nodecg-valorant.webp" width="560">

### 概要

VALORANT 用の NodeCG バンドルで、
ゲームから試合結果を読み取り、良い感じに表示するもの

上述の KUeST-streaming の VALORANT 配信内でも使用した。

### 詳細

#### 背景

VALORANT の公式大会である [VALORANT Champions Tour (VCT)](https://valorantesports.com) などでの試合結果の表示がとてもかっこいいと感じたことから自分でも作ってみたいと思い、作成した。
はじめは公式のトレースを作成したが、実際に自分で使うのであればオリジナルのものを作りたいと思ったことからオリジナル版の開発に至った。

開発には [2021 年の State of JS (フロントエンドフレームワーク)](https://2021.stateofjs.com/ja-JP/libraries/front-end-frameworks/) で高い満足度を記録していた [Solid.js](https://www.solidjs.com/) を使ってみたかったので採用した。

#### 工夫点

- 観戦した試合はキャリアに試合データが残らないため、試合進行状況から試合 ID を取得し、そこから試合結果を表示するようにした。
- VCT と違って大会ロゴやチームロゴが無い分、ラウンド取得数やマップを表示する部分が疎になってしまうため、表示を上ではなく左に行うことにした。
- 勝利チームがわかりやすいように勝利チームが上に来るようにした。

### 開発環境

言語: TypeScript

フレームワーク: NodeCG

ライブラリ: Solid.js

ビルド: Vite

### 開発期間

公式のトレース: 2 週間程度

オリジナル版: 1 週間程度

### ソースコード

[https://github.com/secchanu/nodecg-valorant](https://github.com/secchanu/nodecg-valorant)



# その他

- [Github](https://github.com/secchanu)
- [Qiita](https://qiita.com/secchanu)
