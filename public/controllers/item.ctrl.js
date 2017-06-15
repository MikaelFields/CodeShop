(function () {

  'use strict';

  angular.module('authApp').controller('itemController', itemController);

  function itemController($http, $scope) {

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

      $http.post('/authStatus').then(function (res) {

        var result = res.data.map(function (a) { return a.username; });
        $scope.cartButcket = res.data.map(function (a) { return a.cartButcket; }).toString();
        var result2 = res.data.map(function (a) { return a.auth; });


        console.log("Username is:" + result);
        console.log("reault is:" + result2);

        if (result2 == "false") {

          document.getElementById('userName').style = "display:none";
          document.getElementById('signUp').style = "display:block";
          document.getElementById('signIn').style = "display:block";
          document.getElementById('signOut').style = "display:none";


        } else {

          document.getElementById('name').innerHTML = result;
          document.getElementById('userName').style = "display:block";
          document.getElementById('signUp').style = "display:none";
          document.getElementById('signIn').style = "display:none";
          document.getElementById('signOut').style = "display:block";
          $scope.authUser = result.toString();

        }

      });



    function getUrlVars() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    }

    var itemId = getUrlVars()["checkItem"];
    console.log("Item id from url: ", itemId);

 var ItemObj = {
      itemId: itemId
    };

  
   $http.post('/CheckItemsFeatures', ItemObj).then(function (res) {

      if (!res.data) {

        console.log("Not found");

      } else {

        $scope.ItemData = res.data;
        $scope.userId = res.data.map(function (a) { return a.userId; }).toString();
        $scope.userItemPic = res.data.map(function (a) { return a.userItemPic; }).toString();
        $scope.keyWords = res.data.map(function (a) { return a.keyWords; }).toString();
        $scope.typeProduct = res.data.map(function (a) { return a.typeProduct; }).toString();
        $scope.tools = res.data.map(function (a) { return a.tools; }).toString();
        $scope.tittle = res.data.map(function (a) { return a.tittle; }).toString();
        $scope.browers = res.data.map(function (a) { return a.browers; }).toString();
        $scope.Compatible = res.data.map(function (a) { return a.Compatible; }).toString();
        $scope.Files = res.data.map(function (a) { return a.Files; }).toString();
        $scope.Layout = res.data.map(function (a) { return a.Layout; }).toString();
        $scope.support = res.data.map(function (a) { return a.support; }).toString();
        $scope.demoUrl = res.data.map(function (a) { return a.demoUrl; }).toString();
        $scope.descriptionData = res.data.map(function (a) { return a.descriptionData; }).toString();
        $scope.priceEx = res.data.map(function (a) { return a.priceEx; }).toString();
        $scope.priceL = res.data.map(function (a) { return a.priceL; }).toString();
        $scope.filesAdressID = res.data.map(function (a) { return a.filesAdressID; }).toString();
        $scope.image1Url = res.data.map(function (a) { return a.image1Url; }).toString();
        $scope.image2Url = res.data.map(function (a) { return a.image2Url; }).toString();
        $scope.image3Url = res.data.map(function (a) { return a.image3Url; }).toString();
        $scope.views = res.data.map(function (a) { return a.views; }).toString();
        $scope.ItemDownloads = res.data.map(function (a) { return a.ItemDownloads; }).toString();
        $scope.author = res.data.map(function (a) { return a.author; }).toString();
        $scope.likes = res.data.map(function (a) { return a.likes; });
        $scope.enrollmentDay = res.data.map(function (a) { return a.enrollmentDay; }).toString();
        var likes = res.data.map(function (a) { return a.likes; });
         console.log(likes[0]);
    

      }


    });

    $scope.signOutF = function () {
      $http.post('/logOutUsr').then(function (res) {

        var result = res.data.map(function (a) { return a.sess; });

        if (result === "destroyed") {

          document.getElementById('name').innerHTML = "";
          document.getElementById('userName').style = "display:none";
          document.getElementById('signUp').style = "display:block";
          document.getElementById('signIn').style = "display:block";
          document.getElementById('signOut').style = "display:none";


        } else {

          return;
        }

      }
      );
    };
    var data = [
      {
        Feature: "/img/cover-home2.jpg"
      },
      {
        Feature: "/img/cover-home4.jpg"
      },
      {
        Feature: "/img/cover-home3.jpg"
      },
    ];

    var html = data.map(function (elem, index) {
      return (
        `
          
            <div class="mySlides fade">  
            <div class="numbertext">Product type</div>
            <img src="${elem.Feature}" class="radius-img z-depth-2">
            <p class="text">Product tiitle 1</p>
            </div>            
            
             `
      );
    }).join(" ");

    document.getElementById('carouselC').innerHTML = html;

    // JS CAROUSEL SLIDER

    var slideIndex = 1;
    showSlides(slideIndex);

    $scope.plusSlides = function (n) {
      showSlides(slideIndex += n);
    };

    $scope.currentSlide = function (n) {
      showSlides(slideIndex = n);
    };

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" act", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " act";
    }


    $("#preloaderShown").show();
    $("#contentDataShown").hide();

    setTimeout(function () {

      console.log("triggered after 3 seconds!");

      $("#preloaderShown").hide();
      $("#contentDataShown").show();

    }, 1500);

  }

})();