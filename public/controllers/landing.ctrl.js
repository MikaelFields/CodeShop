(function () {

  'use strict';

  angular.module('authApp').controller('landingController', landingController)

  function landingController($http, $scope, socketio) {

//  var socket = io.connect('http://localhost:3000', { 'forceNew': true });
    
    $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: false // Choose whether you can drag to open on touch screens
    });

    $(".button-collapse-notif").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: false // Choose whether you can drag to open on touch screens
    });

    $('.collapsible').collapsible();

    $scope.OpenMenu = function () {
      $('.button-collapse').sideNav('show');
      console.log("trigger sidenav");
    };

     $scope.OpenNotif = function () {
      $('.button-collapse-notif').sideNav('show');
      console.log("trigger sidenav");
    };
      
      $scope.likeBtn = false;
      //vefify user status
      $http.post('/authStatus').then(function (res) {

        //  console.log("Username is:" + Object.values(res.data));
        var result = res.data.map(function (a) { return a.username; });
        var result2 = res.data.map(function (a) { return a.auth; });

        if (result2 == "false") {
          
          document.getElementById('userName').style = "display:none";
          document.getElementById('notifBar').style = "display:none";
          document.getElementById('signUp').style = "display:block";
          document.getElementById('signIn').style = "display:block";
      
        } else { //get all the user data
          
          document.getElementById('notifBar').style = "display:block";
          document.getElementById('userName').style = "display:block";
          document.getElementById('signUp').style = "display:none";
          document.getElementById('signIn').style = "display:none";
          $scope.likeBtn = true;
         
          $scope.authUser = result.toString();
          $scope.userIdAuth = res.data.map(function (a) { return a._id; }).toString();
          $scope.email = res.data.map(function (a) { return a.email; }).toString();
          $scope.cartButcket = res.data.map(function (a) { return a.cartButcket; }).toString();
          $scope.collectNumber = res.data.map(function (a) { return a.collectNumber; }).toString();
          $scope.itemsNumber = res.data.map(function (a) { return a.itemsNumber; }).toString();
          $scope.followersNumber = res.data.map(function (a) { return a.followersNumber; }).toString();
          $scope.followingNumber = res.data.map(function (a) { return a.followingNumber; }).toString();
          $scope.earnings = res.data.map(function (a) { return a.earnings; }).toString();
          $scope.sales = res.data.map(function (a) { return a.sales; }).toString();
          $scope.authorLikes = res.data.map(function (a) { return a.authorLikes; }).toString();
          $scope.avatarPicture = res.data.map(function (a) { return a.avatarPicture; }).toString();
          // $scope.startSellingForm = res.data.map(function (a) { return a.startSellingForm; }).toString();
          
        }

      });

//ADD LIKES BTN
$scope.btnLike = false;
$scope.ThumbUp = function(itemId, index, counter){
    // $scope.items[index].likes.length =+1;
    //  console.log($scope.items[index].likes.length =+1);

   $scope.btnLike = true;
    document.getElementById(index).style= "display: none";
 
    socketio.emit('ThumbUpSocket', {

      newThumbUp: $scope.userIdAuth,
      itemId: itemId,
      indexId: index
      
    });

    console.log(itemId);
      console.log(index);

};

 //SOCKET LISENING THUMBUPS CHANGES FROM SERVER
    socketio.on('listeningThumbsDecrease', function (IndexId, likes) {
          
           $scope.btnLike = false;
           document.getElementById(IndexId).style= "display: block";
           console.log("Decrease");
           console.log("index: "+IndexId);
             console.log("Likes"+likes);
          var Count = likes - 1;
          //  $scope.items[IndexId].likes.length = dataRes;
           $scope.items[IndexId].likes.length = Count;
        
           //  $scope.items = dataRes;           
          //  console.log("Index from server:" + index);
         //  $scope.items[index].likes = dataRes.likes;
        //  console.log(data);
    });
  
   //SOCKET LISENING THUMBUPS CHANGES FROM SERVER
    socketio.on('listeningThumbsIncrease', function (IndexId, likes) {
         
         
         $scope.btnLike = false;
            document.getElementById(IndexId).style= "display: block";
           console.log("Increase");
             console.log("index: "+IndexId);
             console.log("Likes"+likes);
         var Count = likes + 1;
          //  $scope.items[IndexId].likes.length = dataRes;
           $scope.items[IndexId].likes.length =  Count;
           //  $scope.items = dataRes;           
          //  console.log("Index from server:" + index);
         //  $scope.items[index].likes = dataRes.likes;
        //  console.log(data);
    });

//GET OR RETREAVE ALL THE ITEMS
 $http.post('/PublicItems').then(function (ItemsList){


  var likesObj = ItemsList.data.map(function (a) { return a.likes; });

//   for (var index = 0; index < likesObj.length; index++) {  

//     try {

//    if(Object.values(ItemsList.data[index].likes[index])[index] == $scope.userIdAuth){
          
//                 ItemsList.data[index].color = "indigo-text text-darken-4";
//                console.log("Match on index: " + index);
//               //  console.log(ItemsList.data[index].likes);
//                console.log( Object.values(ItemsList.data[index].likes[index])[index]);
    
//      } 
  
//    } catch (error) {

//     console.log("No Matches on index: " + index);
// }
   
     
    
//   }
  
 
  $scope.items = ItemsList.data;
 
// console.log( Object.values(ItemsList.data[1].likes[1])[0]);
// console.log( ItemsList.data[0].color = "indigo darken-4");
// console.log( ItemsList.data);

 });



  
  
    $scope.signOutF = function () {
      $http.post('/logOutUsr').then(function (res) {

        var result = res.data.map(function (a) { return a.sess; });

        if (result === "destroyed") {

          document.getElementById('name').innerHTML = "";
          document.getElementById('userName').style = "display:none";
          document.getElementById('signUp').style = "display:block";
          document.getElementById('signIn').style = "display:block";


        } else {

          return;
        }

      });

    };

    $(document).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function (position, feedback) {
          $(this).css(position);
          $("<div>")
            .addClass("arrow")
            .addClass(feedback.vertical)
            .addClass(feedback.horizontal)
            .appendTo(this);
        }
      }
    });

    $scope.Newest = {
      value: 0,
      options: {
        showSelectionBar: true,
        showTicks: true,
        stepsArray: [
          { value: "false" },
          { value: "true" }
        ],
        selectionBarGradient: {
          from: 'white',
          to: '#FC0'
        }
      }
    };

    $scope.Rated = {
      value: 0,
      options: {
        showSelectionBar: true,
        showTicks: true,
        stepsArray: [
          { value: "false" },
          { value: "true" }
        ],
        selectionBarGradient: {
          from: 'white',
          to: '#FC0'
        }
      }
    };

    $scope.Seller = {
      value: 0,
      options: {
        showSelectionBar: true,
        showTicks: true,
        stepsArray: [
          { value: "false" },
          { value: "true" }
        ],
        selectionBarGradient: {
          from: 'white',
          to: '#FC0'
        }
      }
    };

    $scope.LowTo = {
      value: 0,
      options: {
        showSelectionBar: true,
        showTicks: true,
        hideLimitLabels: true,
        stepsArray: [
          { value: "false" },
          { value: "Low to high" },
          { value: "High to low" }
        ],
        selectionBarGradient: {
          from: 'white',
          to: '#FC0'
        }
      }
    };

    $scope.Trending = {
      value: 0,
      options: {
        showSelectionBar: true,
        showTicks: true,
        stepsArray: [
          { value: "false" },
          { value: "true" }
        ],
        selectionBarGradient: {
          from: 'white',
          to: '#FC0'
        }
      }
    };

    $scope.products = [
      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },


      {
        tittle: "My code to sell",
        author: "Michael Fields",
        price: "33",
        likes: "851",
        views: "1533"
      },

    ];

$("#preloaderShown").show();
$("#contentDataShown").hide();

setTimeout(function() {
console.log("triggered after 3 seconds!");
$("#preloaderShown").hide();
$("#contentDataShown").show();
}, 1500);
  
}//END CONTROLLER

})();