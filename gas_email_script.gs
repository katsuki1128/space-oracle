// Google Apps Script コード
// このコードをGoogle Apps Scriptエディタにコピーしてください

function doPost(e) {
  try {
    // POSTデータを取得
    const data = JSON.parse(e.postData.contents);
    
    // スパムチェック
    if (isSpam(data)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'error',
          'message': 'Invalid request'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // メール送信先
    const recipient = 'info@space-cowboy.jp';
    
    // メールの件名
    const subject = '【ウェブサイト】お問い合わせがありました';
    
    // メール本文を作成
    const body = `
ウェブサイトからお問い合わせがありました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お問い合わせ内容
━━━━━━━━━━━━━━━━━━━━━━━━━━━

【お名前】
${data.name}

【会社名・団体名】
${data.company || '未記入'}

【メールアドレス】
${data.email}

【電話番号】
${data.phone || '未記入'}

【お問い合わせ内容】
${data.message}

【送信日時】
${data.timestamp}

━━━━━━━━━━━━━━━━━━━━━━━━━━━

このメールは自動送信されています。
`;
    
    // メールを送信
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body,
      replyTo: data.email // 返信先を問い合わせ者のメールアドレスに設定
    });
    
    // 成功レスポンスを返す
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'メールが送信されました'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // エラーレスポンスを返す
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// テスト用のGET関数（ブラウザでアクセスして動作確認用）
function doGet() {
  return ContentService
    .createTextOutput('Google Apps Script is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// スパムチェック関数
function isSpam(data) {
  // 必須フィールドのチェック
  if (!data.name || !data.email || !data.message) {
    return true;
  }
  
  // メールアドレスの基本的な検証
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return true;
  }
  
  // 禁止ワードのチェック
  const spamWords = ['viagra', 'casino', 'lottery', 'winner', 'prize', 'click here', 'buy now'];
  const messageText = (data.message + ' ' + data.name).toLowerCase();
  
  for (const word of spamWords) {
    if (messageText.includes(word)) {
      return true;
    }
  }
  
  // URLの過度な使用をチェック（3つ以上のURLがある場合）
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = messageText.match(urlRegex) || [];
  if (urls.length > 3) {
    return true;
  }
  
  // 同じ文字の繰り返しをチェック
  if (/(.)\1{5,}/.test(data.message)) {
    return true;
  }
  
  return false;
}