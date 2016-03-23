
angular.module('angularfireSlackApp')
  .factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){
    var usersRef = new Firebase(FirebaseUrl+'users');
var connectedRef = new Firebase(FirebaseUrl+'.info/connected');
    var users = $firebaseArray(usersRef);

    var Users = {
      getGravatar: function(uid){
  return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
},
  getProfile: function(uid){
    return $firebaseObject(usersRef.child(uid));
  },
  setOnline: function(uid){
  var connected = $firebaseObject(connectedRef);
  var online = $firebaseArray(usersRef.child(uid+'/online'));

  connected.$watch(function (){
    if(connected.$value === true){
      online.$add(true).then(function(connectedRef){
        connectedRef.onDisconnect().remove();
      });
    }
  });
},
  getDisplayName: function(uid){
    return users.$getRecord(uid).displayName;
  },
  all: users
};

    return Users;
  });
