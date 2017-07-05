

// 商品在庫取得サービス
myApp.service('shouhinZaiko', ['$q', function($q) {
  
  var ncmb = new NCMB('47abfae9fe668d81cfe4a42ddf24e3b3f8b7b4b54d233b0f4e1865633f062d4c', 'eadbb8e757da712c6dac9bb0b53dc5e48194a45800a9ebbdb326293b42d05308');
  
  // データストアのデータを取得
  var Shouhin = ncmb.DataStore('shouhin');
  
  // 商品在庫数を全て取得
  this.getAllShouhinData = function () {
    
    // プロミスの準備
    var deferred = $q.defer();
    
    Shouhin.fetchAll()
           .then(function(results){
             
             // プロミスにデータを登録
             deferred.resolve({
               data : results
             });
           })
           .catch(function(err){
             console.log(err);
           });
  
    // プロミスを返す
    return deferred.promise;
  }
  
  // 商品在庫数を取得
  function getShouhinData (name) {
    
    // プロミスの準備
    var deferred = $q.defer();
    
    Shouhin.equalTo('name', name)
           .fetchAll()
           .then(function(results){
             
             // プロミスにデータを登録
             deferred.resolve({
               data : results
             });
           })
           .catch(function(err){
             console.log(err);
           });
  
    // プロミスを返す
    return deferred.promise;
  }
  
  // 在庫数変更
  this.setZaiko = function (name) {
    
    // プロミスの準備
    var deferred = $q.defer();
    
    getShouhinData(name).then(function(results){
      
      Shouhin.equalTo('name', name)
             .fetchAll()
             .then(function(shouhin){
               
               shouhin[0].set('zaiko', results.data[0].zaiko - 1);
               
               return shouhin[0].update();
               
             })
             .then(function(shouhin) {
               
               // プロミスにデータを登録
               deferred.resolve({
                 data : shouhin.zaiko
               });
             })
             .catch(function(err){
               // エラー処理
             });
    });
    
    // プロミスを返す
    return deferred.promise;
  }
  
  // 在庫数リセット
  this.resetZaiko = function (name) {
    
    // プロミスの準備
    var deferred = $q.defer();
    
    Shouhin.equalTo('name', name)
           .fetchAll()
           .then(function(shouhin){
             
             shouhin[0].set('zaiko', shouhin[0].zaikoMax);
             
             return shouhin[0].update();
             
           })
           .then(function(shouhin) {
             
             // プロミスにデータを登録
             deferred.resolve({
               data : shouhin
             });
           })
           .catch(function(err){
             // エラー処理
           });
    
    // プロミスを返す
    return deferred.promise;
  }
  
}]);


// 商品在庫取得サービス
myApp.service('moneyStock', ['$q', function($q) {
  
  var ncmb = new NCMB('47abfae9fe668d81cfe4a42ddf24e3b3f8b7b4b54d233b0f4e1865633f062d4c', 'eadbb8e757da712c6dac9bb0b53dc5e48194a45800a9ebbdb326293b42d05308');
  
  var Monies = ncmb.DataStore('monies');
  
  // お金のストックを全て取得
  this.getAllMoneyStock = function () {
    
    // プロミスの準備
    var deferred = $q.defer();
    
    Monies.fetchAll()
           .then(function(results){
             
             // プロミスにデータを登録
             deferred.resolve({
               data : results
             });
           })
           .catch(function(err){
             console.log(err);
           });
  
    // プロミスを返す
    return deferred.promise;
  }
  
  // 商品在庫数を取得
  function getMoneyData (name) {
    
    // プロミスの準備
    var deferred = $q.defer();
    
    Monies.equalTo('name', name)
           .fetchAll()
           .then(function(results){
             
             // プロミスにデータを登録
             deferred.resolve({
               data : results
             });
           })
           .catch(function(err){
             console.log(err);
           });
  
    // プロミスを返す
    return deferred.promise;
  }
  
  // ストック数変更
  this.setStock = function (name, value) {
    
    // プロミスの準備
    var deferred = $q.defer();
    
    getMoneyData(name).then(function(results){
      
      Monies.equalTo('name', name)
             .fetchAll()
             .then(function(money){
               
               money[0].set('stock', results.data[0].stock - value);
               
               return money[0].update();
               
             })
             .then(function(money) {
               
               // プロミスにデータを登録
               deferred.resolve({
                 data : money.stock
               });
             })
             .catch(function(err){
               // エラー処理
             });
    });
    
    // プロミスを返す
    return deferred.promise;
  }
  
  // 在庫数リセット
  this.resetZaiko = function (name) {
    
    // プロミスの準備
    var deferred = $q.defer();
    
    Shouhin.equalTo('name', name)
           .fetchAll()
           .then(function(shouhin){
             
             shouhin[0].set('zaiko', shouhin[0].zaikoMax);
             
             return shouhin[0].update();
             
           })
           .then(function(shouhin) {
             
             // プロミスにデータを登録
             deferred.resolve({
               data : shouhin
             });
           })
           .catch(function(err){
             // エラー処理
           });
    
    // プロミスを返す
    return deferred.promise;
  }
  
}])