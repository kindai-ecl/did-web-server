# did-web-server

https://did.lcyou.org

### setup
忘れないようメモ程度です🙇

* api
  * pm2を使用してdemon化している（サーバー依存）
  * dotenvを取り込むためにpm2.config.jsで設定しているため`pm2 start pm2.config.js`でまとめてあげること
 
* sample
  * 今の所package.jsonの通り
 
* 公開用のゼロトラストトンネル
  * cloudflare tunnelを使用中
  * 原因わからんけどupgrade timerの起動するタイミングでredになりがちなので対策必要？
