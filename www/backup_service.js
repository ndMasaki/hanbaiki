// This is a JavaScript file

myApp.service('shouhinData', [ '$q', function($q) {
        
        var ncmb = new NCMB('47abfae9fe668d81cfe4a42ddf24e3b3f8b7b4b54d233b0f4e1865633f062d4c', 'eadbb8e757da712c6dac9bb0b53dc5e48194a45800a9ebbdb326293b42d05308');
        
        var Shouhin = ncmb.DataStore('shouhin');
        
        var self = this;
        
        this.getData = function() {
          
          // プロミスの準備
          var deferred = $q.defer();
          
          var data = 0;
          
          Shouhin.fetchAll()
               .then(function(results){
                 
                 // プロミスにディレクトリと取得したデータのリストを登録
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
        
        this.setData = function(key, value, objectId) {
          
          // プロミスの準備
          var deferred = $q.defer();
          
          Shouhin.equalTo('objectId', objectId)
                 .fetchAll()
                 .then(function(shouhin){
                   
                   shouhin[0].set(key, value);
                   return shouhin[0].update();
                 })
                 .then(function(){
                   // 更新後の処理
                   
                   // プロミスにディレクトリと取得したデータのリストを登録
                   self.getData()
                     .then(
                       function(value) {
                         
                         // プロミスにディレクトリと取得したデータのリストを登録
                         deferred.resolve({
                           data : value.data
                         });
                       }
                    );
                   
                 })
                 .catch(function(err){
                   // エラー処理
                 });
        
          // プロミスを返す
          return deferred.promise;
        }
      }])
      .service('moneyData', [ '$q', function($q) {
        
        var ncmb = new NCMB('47abfae9fe668d81cfe4a42ddf24e3b3f8b7b4b54d233b0f4e1865633f062d4c', 'eadbb8e757da712c6dac9bb0b53dc5e48194a45800a9ebbdb326293b42d05308');
        
        var Monies = ncmb.DataStore('monies');
        
        var self = this;
        
        this.getData = function() {
          
          // プロミスの準備
          var deferred = $q.defer();
          
          var data = 0;
          
          Monies.fetchAll()
               .then(function(results){
                 
                 // プロミスにディレクトリと取得したデータのリストを登録
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
        
        this.setData = function(key, value, objectId) {
          
          // プロミスの準備
          var deferred = $q.defer();
          
          Monies.equalTo('objectId', objectId)
                 .fetchAll()
                 .then(function(monies){
                   
                   monies[0].set(key, value);
                   return monies[0].update();
                 })
                 .then(function(){
                   // 更新後の処理
                   
                   // プロミスにディレクトリと取得したデータのリストを登録
                   self.getData()
                     .then(
                       function(value) {
                         
                         // プロミスにディレクトリと取得したデータのリストを登録
                         deferred.resolve({
                           data : value.data
                         });
                       }
                    );
                   
                 })
                 .catch(function(err){
                   // エラー処理
                 });
        
          // プロミスを返す
          return deferred.promise;
        }
        
        this.hoju = function(stockMax, objectId) {
          
          // プロミスの準備
          var deferred = $q.defer();
          
          Shouhin.equalTo('objectId', objectId)
                 .fetchAll()
                 .then(function(monies){
                   
                   monies[0].set('stock', stockMax);
                   return monies[0].update();
                 })
                 .then(function(){
                   // 更新後の処理
                   
                   // プロミスにディレクトリと取得したデータのリストを登録
                   self.getData()
                     .then(
                       function(value) {
                         
                         // プロミスにディレクトリと取得したデータのリストを登録
                         deferred.resolve({
                           data : value.data
                         });
                       }
                    );
                   
                 })
                 .catch(function(err){
                   // エラー処理
                 });
        
          // プロミスを返す
          return deferred.promise;
        }
        
        
      }])