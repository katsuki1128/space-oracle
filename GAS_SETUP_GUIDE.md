# Google Apps Script セットアップガイド

## 手順

### 1. Google Apps Script プロジェクトの作成

1. [Google Apps Script](https://script.google.com/) にアクセス
2. 「新しいプロジェクト」をクリック
3. プロジェクト名を「Space Cowboy Contact Form」などに変更

### 2. スクリプトのコピー

1. `gas_email_script.gs` の内容をすべてコピー
2. Google Apps Script エディタの `コード.gs` に貼り付け
3. 保存（Ctrl+S または Cmd+S）

### 3. ウェブアプリとしてデプロイ

1. エディタ右上の「デプロイ」→「新しいデプロイ」をクリック
2. 歯車アイコンをクリックし、「ウェブアプリ」を選択
3. 以下の設定を行う：
   - 説明: 「Contact Form Handler v1」など
   - 次のユーザーとして実行: 「自分」
   - アクセスできるユーザー: 「全員」
4. 「デプロイ」をクリック
5. 承認画面が出たら、アカウントを選択して承認
6. 表示されるウェブアプリURLをコピー

### 4. contact.html の更新

1. `contact.html` の288行目を編集
2. `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` を、コピーしたウェブアプリURLに置き換え

例：
```javascript
const scriptURL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxx/exec';
```

### 5. テスト

1. ブラウザでcontact.htmlを開く
2. フォームに入力して送信
3. info@space-cowboy.jp にメールが届くことを確認

## トラブルシューティング

### メールが届かない場合

1. Google Apps Script エディタで「実行数」を確認
2. エラーが出ている場合は、ログを確認
3. Gmail の送信上限（1日500通）に達していないか確認

### CORS エラーが出る場合

- `mode: 'no-cors'` が設定されているか確認
- ローカル環境ではなく、実際のウェブサーバーでテスト

## セキュリティ考慮事項

- スパム対策として、reCAPTCHAの実装を検討
- レート制限の実装を検討
- バリデーションの強化を検討