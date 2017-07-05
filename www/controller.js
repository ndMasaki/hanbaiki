// This is a JavaScript file

myApp.controller('AppController', [ '$q', '$timeout', 'shouhinZaiko', 'moneyStock', function($q, $timeout, shouhinZaiko, moneyStock) {
  
  var self = this;
  var tmp = '';
  var allMoneyStock = [];
  
  // 商品名と価格
  this.kakaku = {'Cola' : '',
                 'Tea' : '',
                 'MonsterEnergy' : '',
                 'CalorieMate' : '',
                 'Ramen' : '',
                 'Tsuyahime' : ''};
  
  this.kounyuuSrc = '';
  
  // 商品データ取得サービス
  shouhinZaiko.getAllShouhinData().then(function(results) {
    
    // 購入ボタンの初期表示を設定
    for(var i = 0; i < results.data.length; i++) {
      
      // 在庫数が 0 以下ならボタンの表示を売切に変更
      self.kakaku[results.data[i].name] = results.data[i].zaiko <= 0 ? '売切' : results.data[i].kakaku;
    }
    
  });
  
  moneyStock.getAllMoneyStock().then(function(results) {
    
    for(var i = 0; i < results.data.length; i++) {
      allMoneyStock[i] = results.data[i].stock;
    }
    
  });
  
  this.openHuta = function($event) {
    $event.target.classList.toggle('active');
  }
  
  // 商品購入
  this.buy = function(name) {
    
    // 売切のボタンが押されていたら終了
    if(self.kakaku[name] === '売切') {
      
      return;
    }
    
    self.fee = self.kakaku[name];
    
    tmp = name;
    
    // ダイアログを表示
    dialog.show();
    
    document.getElementsByClassName('nomimono')[0].classList.remove('anim');
    
  }
  
  var paymentValue = [0, 0, 0, 0, 0];
  
  this.fee = 0;
  
  this.pay = 0;
  
  this.money = function (value) {
    
    switch (value) {
      case 1000:
        paymentValue[4]++;
        break;
      case 500:
        paymentValue[3]++;
        break;
      case 100:
        paymentValue[2]++;
        break;
      case 50:
        paymentValue[1]++;
        break;
      case 10:
        paymentValue[0]++;
        break;
    }
    
    self.pay += value;
  }
  
  function calculationChange (fee, pay) {
    var payMoney = [1000, 500, 100, 50, 10],
        result = [],
        x = pay - fee,
        y,
        i;
    
    for(i = 0; i < payMoney.length; i++) {
      
      if(x > 0 && allMoneyStock[i] > 0) {
        
        y = Math.floor(x / payMoney[i]);
        
        result[i] = y;
        
        x = x - payMoney[i] * y;
      } else {
        result[i] = 0;
      }
    }
    
    return result.reverse();
  }
  
  this.payment = function () {
    
    dialog.hide({
      callback : function () {
        
        
        var otsuri = calculationChange(self.fee, self.pay);
        
        // 押された商品の在庫を減らす
        shouhinZaiko.setZaiko(tmp).then(function(results) {
          
          $q.all([
            moneyStock.setStock(10, otsuri[0] - paymentValue[0]),
            moneyStock.setStock(50, otsuri[1] - paymentValue[1]),
            moneyStock.setStock(100, otsuri[2] - paymentValue[2]),
            moneyStock.setStock(500, otsuri[3] - paymentValue[3]),
            moneyStock.setStock(1000, otsuri[4] - paymentValue[4]),
            moneyStock.getAllMoneyStock()
          ]).then(function(moneyResults) {
            
            paymentValue = [0, 0, 0, 0, 0];
            
            self.kounyuuSrc = 'images/' + tmp + '.PNG';
            
            document.getElementsByClassName('nomimono')[0].classList.add('anim');
            
            for(var i = 0; i < moneyResults[5].data.length; i++) {
              allMoneyStock[i] = moneyResults[5].data[i].stock;
            }
            
            alert(allMoneyStock);
            
            $timeout(function() {
              
              // 在庫数
              ons.notification.alert({
                message : '在庫 : ' + results.data,
                title : 'おつり : ' + (self.pay - self.fee) + '円'
              });
              
              self.pay = 0;
              
            }, 500);
            
            // 在庫数が 0 以下ならボタンの表示を売切に変更
            if(results.data <= 0) {
              
              self.kakaku[tmp] = '売切';
            }
            
            // 売切数
            var urikire = 0;
            
            // 売り切れた商品数を調査
            for(var key in self.kakaku) {
              
              urikire += self.kakaku[key] === '売切' ? 1 : 0;
            }
            
            // 3つ以上売り切れていたら全ての商品を補充
            if(urikire >= 3) {
              
              // 商品ごとに在庫を補充
              for(var key in self.kakaku) {
                
                // 在庫補充サービス
                shouhinZaiko.resetZaiko(key).then(function(resetResults) {
                  
                  // ボタンの表示を商品価格に変更
                  self.kakaku[resetResults.data.name] = resetResults.data.kakaku;
                });
              }
            }
          })
          
        });
      }
    });
  }
  
  this.dialogHide = function () {
    
    dialog.hide({
      callback : function () {
        self.pay = 0;
      }
    });
  }
  
}]);