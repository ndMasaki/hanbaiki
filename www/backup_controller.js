        var self = this,
            payment = [],
            shouhinResult,
            moniesResult,
            shouhinOption = {
              index : 0,
              src : ''
            };
        
        this.openHuta = function($event) {
          $event.target.classList.toggle('active');
        }
        
        this.kounyuu = function(index) {
          if(self.kakaku[index] !== '売り切れ') {
            
            shouhinOption.index = index;
            
            self.fee = shouhinResult[index].kakaku;
            
            self.pay = 0;
            
            dialog.show();
            
            document.getElementsByClassName('nomimono')[0].classList.remove('anim');
          }
        }
        
        this.kounyuuSrc = '';
        
        this.money = function (index) {
          
//          moneyData.setData('stock', moniesResult[index].stock - 1, moniesResult[index].objectId)
//              .then(
//                function(value) {
//                  
//                  shouhinResult = value.data;
//                  
//                  payment[payment.length] = moniesResult[index].name;
//                  
//                  self.pay += moniesResult[index].name;
//                }
//              );
          
          payment[payment.length] = moniesResult[index].name;
          
          self.pay += moniesResult[index].name;
        }
        
        function calculationPay (payment) {
          var payMoney = [1000, 500, 100, 50, 10],
              result = [0,0,0,0,0],
              x,
              y,
              i;
          
          for(i = 0; i < payment.length; i++) {
            
            switch (payment[i]) {
              case 1000:
                result[4]++;
                break;
              case 500:
                result[3]++;
                break;
              case 100:
                result[2]++;
                break;
              case 50:
                result[1]++;
                break;
              case 10:
                result[0]++;
                break;
            }
          }
          
          return result;
        }
        
        function calculationChange (fee, pay) {
          var payMoney = [1000, 500, 100, 50, 10],
              result = [],
              x = pay - fee,
              y,
              i;
          
          for(i = 0; i < payMoney.length; i++) {
            
            if(x > 0) {
              
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
          dialog.hide();
          
          dialog.once('posthide', function() {
            
            var index = shouhinOption.index,
                resultPay = calculationPay(payment),
                resultChange = calculationChange(self.fee, self.pay);
            
            payment = [];
            
            for(var i = 0; i < moniesResult.length; i++) {
              console.log(resultPay[i]);
              moneyData.setData('stock', moniesResult[i].stock + resultPay[i] - resultChange[i], moniesResult[i].objectId)
                .then(
                  function(value) {
                    
                    moniesResult = value.data;
                    
                    var src = [],
                        i;
                    
                    for(i = 0; i < moniesResult.length; i++) {
                      src[i] = moniesResult[i].src;
                      
                      if(moniesResult[i].stock <= 0) {
                        self.aaa = true;
                      }
                    }
                    
                    self.monies = src;
                    
                  }
                )
            }
            
            shouhinData.setData('zaiko', shouhinResult[index].zaiko - 1, shouhinResult[index].objectId)
              .then(
                function(value) {
                  
                  shouhinResult = value.data;
            
                  self.kounyuuSrc = shouhinResult[index].src;
                  
                  ons.notification.alert({
                    message : '在庫 : ' + shouhinResult[index].zaiko,
                    title : 'おつり : ' + (self.pay - self.fee) + '円'
                  });
                  
                  var urikire = 0,
                      i;
                  
                  for(i = 0; i < shouhinResult.length; i++) {
                    if(shouhinResult[i].zaiko <= 0) {
                      
                      urikire++;
                      
                      self.kakaku[i] = '売り切れ';
                      
                    }
                    
                    if(urikire >= 2 && i === shouhinResult.length - 1) {
                      
                      var objectId = [],
                          zaikoMax = [],
                          y;
                      
                      for(y = 0; y < shouhinResult.length; y++) {
                        
                          shouhinData.setData('zaiko', shouhinResult[y].zaikoMax, shouhinResult[y].objectId)
                            .then(
                              function(value) {
                                
                                shouhinResult = value.data;
                                
                                var kakaku = [],
                                    src = [],
                                    i;
                                
                                for(i = 0; i < shouhinResult.length; i++) {
                                  kakaku[i] = shouhinResult[i].zaiko <= 0 ? '売り切れ' : shouhinResult[i].kakaku;
                                  src[i] = shouhinResult[i].src;
                                }
                                self.kakaku = kakaku;
                                self.src = src;
                                
                              }
                            )
                      }
                    }
                  }
                  
                  document.getElementsByClassName('nomimono')[0].classList.add('anim');
                }
              );
          });
        }
        
        this.fee = 0;
        
        this.pay = 0;
        
        shouhinData.getData()
          .then(
            function(value) {
              
              shouhinResult = value.data;
              
              var kakaku = [],
                  src = [],
                  i;
              
              for(i = 0; i < shouhinResult.length; i++) {
                kakaku[i] = shouhinResult[i].zaiko <= 0 ? '売り切れ' : shouhinResult[i].kakaku;
                src[i] = shouhinResult[i].src;
              }
              self.kakaku = kakaku;
              self.src = src;
              
            }
          );
        
        moneyData.getData()
          .then(
            function(value) {
              
              moniesResult = value.data;
              
              var src = [],
                  i;
              
              for(i = 0; i < moniesResult.length; i++) {
                src[i] = moniesResult[i].src;
              }
              
              self.monies = src;
              
            }
          );
        
        this.aaa = false;