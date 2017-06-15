(function () {

  'use strict';

  angular.module('authApp').controller('profileController', profileController);

  function profileController($http, $scope, $window, $timeout, $compile, socketio) {

    // var socket = io.connect('http://localhost:3000', { 'forceNew': true });

    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'edit');
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
    );

    $('.modal').modal({
      dismissible: false,
      inDuration: 100, // Transition in duration
      outDuration: 100, // Transition out duration
    });

    $scope.openProfPic = function () {

      $('#modalProfPic').modal('open');

    };

    $scope.OpenNotif = function () {
      $('.button-collapse-notif').sideNav('show');
      console.log("trigger sidenav");
    };

    $scope.dataImgPath = "select a file";
    $scope.triggerFileInp = function () {
      $("#nameImg").click();
    };

    // SHOW SOCIAL SETTIGS VARIABLE
    $scope.showStt = false;

    //SAVING... PRELOADER VARIABLE
    $scope.Spreloader = false;

    //AUTHENTICATION STATUS FUNCTION
    $http.post('/authStatus').then(function (res) {

      //  console.log("Username is:" + Object.values(res.data));
      var result = res.data.map(function (a) { return a.username; });
      var result2 = res.data.map(function (a) { return a.auth; });

      console.log("username: " + result);

      if (result2 == "false") {

        $window.location = "/#!/landing";

      } else {

        $scope.authUser = result.toString();
        $scope.usernamePic = res.data.map(function (a) { return a.username; }).toString();
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
        $scope.fullname = res.data.map(function (a) { return a.fullname; }).toString();
        $scope.profession = res.data.map(function (a) { return a.profession; }).toString();
        $scope.phone = res.data.map(function (a) { return a.phone; }).toString();
        $scope.about = res.data.map(function (a) { return a.about; }).toString();
        $scope.facebook = res.data.map(function (a) { return a.facebook; }).toString();
        $scope.Twitter = res.data.map(function (a) { return a.Twitter; }).toString();
        $scope.Dribbble = res.data.map(function (a) { return a.Dribbble; }).toString();
        $scope.GitHub = res.data.map(function (a) { return a.GitHub; }).toString();
        $scope.Behance = res.data.map(function (a) { return a.Behance; }).toString();
        $scope.CodePen = res.data.map(function (a) { return a.CodePen; }).toString();
        $scope.Instagram = res.data.map(function (a) { return a.Instagram; }).toString();


        //  IF SOME DATA IS IQUAL TO NOT SPECIFIED THEN HIDE SOME ELEMENTS
        if ($scope.facebook == "" || $scope.facebook == "not specified") {
          console.log("facebook social data not added");
        } else {
          $(".social").append(
            `<li class="social-child">
              <a href="${$scope.facebook}" target="_blank"><i class="fa fa-facebook-official grey-text" aria-hidden="true"></i></a>
            </li>`);

        }
        if ($scope.Twitter == "" || $scope.Twitter == "not specified") {
          console.log("Twitter social data not added");
        } else {
          $(".social").append(
            `<li class="social-child">
              <a href="${$scope.Twitter}" target="_blank"><i class="fa fa-twitter grey-text" aria-hidden="true"></i></a>
            </li>`);
        }
        if ($scope.Dribbble == "" || $scope.Dribbble == "not specified") {
          console.log("Dribbble social data not added");
        } else {
          $(".social").append(
            `<li class="social-child">
              <a href="${$scope.Dribbble}" target="_blank"><i class="fa fa-dribbble grey-text" aria-hidden="true"></i></a>
            </li>`);
        }
        if ($scope.GitHub == "" || $scope.GitHub == "not specified") {
          console.log("GitHub social data not added");
        } else {
          $(".social").append(
            `<li class="social-child">
              <a href="${$scope.GitHub}"  target="_blank"><i class="fa fa-github grey-text" aria-hidden="true"></i></a>
            </li>`);
        }
        if ($scope.Behance == "" || $scope.Behance == "not specified") {
          console.log("Behance social data not added");
        } else {
          $(".social").append(
            `<li class="social-child">
              <a href="${$scope.Behance}" target="_blank"><i class="fa fa-behance-square grey-text" aria-hidden="true"></i></a>
            </li>`);
        }
        if ($scope.CodePen == "" || $scope.CodePen == "not specified") {
          console.log("CodePen social data not added");
        } else {
          $(".social").append(
            `<li class="social-child facebook">
              <a href="${$scope.CodePen}"  target="_blank"><i class="fa fa-codepen grey-text" aria-hidden="true"></i></a>
            </li>`);
        }
        if ($scope.Instagram == "" || $scope.Instagram == "not specified") {
          console.log("Instagram social data not added");
        } else {
          $(".social").append(
            `<li class="social-child facebook">
              <a href="${$scope.Instagram}" target="_blank"><i class="fa fa-instagram grey-text" aria-hidden="true"></i></a>
            </li>`);
        }
      }
    });

 $scope.seeItem = function(ItemId){

    window.location.assign("#!item" + '?checkItem=' + ItemId);

 };

  //GET OR RETREAVE ALL THE ITEMS
 $http.post('/getUserID').then(function (UserSessionId){

   var userIdA = UserSessionId.data;
      
   var userIdObj = {
     userId: userIdA
   };
     
   $http.post('/UserItemsBuctket', userIdObj).then(function (res) {

     if (res.data === false) {

       console.log("Data could not be found: " + res);

     } else {

       $scope.items = res.data;
       var item = res.data;
       console.log(item);
       // var files = res.data.map(function (a) { return a.Files; }).toString();
       // var array = files.split(',');
       // console.log(array);
       // $scope.ItemFiles = files.split(',');
     }
   });

 });

 //ADD LIKES BTN
$scope.btnLike = false;

    // TRIGGER TOOLTIP
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

    //PRELOARDER FUNCTION
    $("#preloaderShown").show();
    $("#contentDataShown").hide();
      setTimeout(function () {
      console.log("triggered after 3 seconds!");
      $("#preloaderShown").hide();
      $("#contentDataShown").show();

    }, 1000);


    //PRE VISUALIZE IMG BEFORE UPLOADI IT
    function readURL(input) {
      if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {

          $('#blah').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    $("#nameImg").change(function () {
      readURL(this);
    });

    //CLEAR SPECIFIC IMG SRC
    $scope.clear = function () {
      $('#blah').removeAttr("src");
    };

    // FUNCTIONAL SECOND METHOD FOR POSTING IMG ON BUTCKET B.---------------------------------------------->
    // UPLOAD IMG ON BUCKET
    $scope.protectedBtn = false;
    //set the progress bar widh to 0% 
    document.getElementById('progressBar').style = "width: 0%";
    //hide image preloader
    $('#UploadPreloader').hide();
    document.getElementById('messageProgress').innerHTML = "";
    $scope.post = function () {


      $scope.protectedBtn = true;
      //hide presualize image
      $('#previsualizeImg').hide();
      $('#UploadPreloader').show();

      document.getElementById('messagePic').innerHTML = "";
      //check whether browser fully supports all File API
      if (window.File && window.FileReader && window.FileList && window.Blob) {

        var fsize = $('#nameImg').val();
        console.log("the file name is: " + fsize);

        if (!fsize) {
          //hide presualize image
          $('#previsualizeImg').show();
          $('#UploadPreloader').hide();

          console.log('Select a file');
          document.getElementById('messagePic').innerHTML = "You must select a file";
          $scope.protectedBtn = false;
          return;
        }

        //get the file size and file type from file input field
        var fsize = $('#nameImg')[0].files[0].size;

        if (fsize > 1092034 || fsize <= 0) //do something if file size more than 1 mb (1048576) 1092034
        {
          //hide presualize image
          $('#previsualizeImg').show();
          $('#UploadPreloader').hide();

          console.log('File is too big, must be at least 1mb size');
          document.getElementById('messagePic').innerHTML = "File is too big, must be at least 1mb size";
          $scope.protectedBtn = false;
          return;
        }

        else {  //if the file is ok then trigger the upload function and the upload data 

          var imgExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];//Validation of the .ext 
          //Upload IMG

          var sFileName = $("#nameImg").val();//Gets the Name by JQuery     

          console.log('Step 1. the value captured from the imput type file is: ' + sFileName);

          if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < imgExtensions.length; j++) {
              var sCurExtension = imgExtensions[j];
              if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;

                console.log('The extension file is valid!..proccesing...');

                var filesSelected = document.getElementById("nameImg").files;

                if (filesSelected.length > 0) {

                  var fileToLoad = filesSelected[0];

                  var fileReader = new FileReader();

                  fileReader.onload = function (fileLoadedEvent) {
                    var textAreaFileContents = document.getElementById(
                      "textAreaFileContents"
                    );
                    //var of the file value ready to be updated
                    var fileName = fileToLoad;

                    console.log('Step 2. The filtered by the fileReader() function is: ' + fileToLoad);

                    console.log('Now the file is ready to be uploaded to the firebase butcket');

                    /*------------------------------firebase upload file---------------------------------*/

                    // Create a root reference // firebase butcket refence..
                    var storageRef = firebase.storage().ref();

                    //this is the file path where is going to storaged then the put function will upload the image
                    var uploadTask = storageRef.child('UserPicProfiles/' + $scope.usernamePic + '/' + fileName.name).put(fileName);

                    // Register three observers:
                    // 1. 'state_changed' observer, called any time the state changes
                    // 2. Error observer, called on failure
                    // 3. Completion observer, called on successful completion
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                      // Observe state change events such as progress, pause, and resume
                      // See below for more detail
                      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

                      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      var progressInt = parseInt(progress);
                      console.log('Upload is ' + progressInt + '% done');

                      document.getElementById('persentProgress').innerHTML = progressInt + " %";
                      document.getElementById('progressBar').style = "width:" + progressInt + "%";
                      var progElem = document.getElementById('persentProgress').innerHTML;

                      switch (snapshot.state) {

                        case firebase.storage.TaskState.PAUSED: // or 'paused'

                          console.log('Upload is paused');

                          //hide presualize image
                          $('previsualizeImg').show();
                          $('UploadPreloader').hide();
                          document.getElementById('messagePic').innerHTML = "Upload is paused please wait a bit..";

                          break;

                        case firebase.storage.TaskState.RUNNING: // or 'running'

                          console.log('Upload is running');
                          //hide presualize image
                          $('#previsualizeImg').hide();
                          $('#UploadPreloader').show();
                          document.getElementById('messageProgress').innerHTML = "Uploading your image...";
                          break;
                      }

                    }, function (error) {

                      switch (error.code) {

                        case 'storage/unauthorized':
                          //hide presualize image
                          $('#previsualizeImg').show();
                          $('#UploadPreloader').hide();
                          document.getElementById('messagePic').innerHTML = "Error, you do not have permissions to files";
                          console.log('Error, you do not have permissions to files');
                          $scope.protectedBtn = false;

                          // User doesn't have permission to access the object
                          break;

                        case 'storage/canceled':

                          console.log('Upss,  user canceled the upload');
                          $('#previsualizeImg').show();
                          $('#UploadPreloader').hide();
                          document.getElementById('messagePic').innerHTML = "Upss,  user canceled the upload";
                          $scope.protectedBtn = false;
                          // User canceled the upload
                          break;

                        case 'storage/unknown':

                          console.log(' Unknown error occurred, inspect error.serverResponse');
                          $('#previsualizeImg').show();
                          $('#UploadPreloader').hide();
                          document.getElementById('messagePic').innerHTML = "Unknown error occurred, inspect error.serverResponse";
                          $scope.protectedBtn = false;
                          // Unknown error occurred, inspect error.serverResponse
                          break;
                      }

                      console.log('Error, upload file failure: ' + error);

                    }, function () {
                      // Upload completed successfully, now we can get the download URL
                      var downloadURL = uploadTask.snapshot.downloadURL;
                      document.getElementById('messageProgress').innerHTML = "Your image has been uploaded successfully!";
                      console.log("URL: " + downloadURL);

                      var URL = {
                        picUrl: downloadURL.toString()
                      };

                      $http.post('/setNewProfilePic', URL).then(function (res) {
                        console.log("User profile pic result: " + res.data);
                        if (res.data === true) {
                          $window.location.reload();
                          return;
                        } else {
                          document.getElementById('messageProgress').innerHTML = "YSomething was run on the server, please refresh the page and try ii again!, probably your session has expired, authenticate then try it again!";
                          $scope.protectedBtn = false;
                        }

                      });




                    });

                    /*-----------------------------------end------------------------------------*/
                  };// fileReader.onload function end

                  fileReader.readAsDataURL(fileToLoad);

                }
                break;
              }
            }//End for
            if (!blnValid) {
              console.log('File is not valid');
              $('#previsualizeImg').show();
              $('#UploadPreloader').hide();
              document.getElementById('messagePic').innerHTML = "File is not valid, only jpeg, jpg, png or gif allowed";
              return;
            }
          }
          return true;
        }//end else 

      } else {
        $('#previsualizeImg').show();
        $('#UploadPreloader').hide();
        document.getElementById('messagePic').innerHTML = "Please upgrade your browser, because your current browser lacks some new features we need!";
      }

    };//end post function


    $scope.validateUp = function () {

      var fsize = $('#nameImg').val();

      if (!fsize) {

        console.log('Select a file');
        document.getElementById('messagePic').innerHTML = "You must select a file";
        $scope.protectedBtn = false;
        return;
      }

      document.getElementById('messagePic').innerHTML = "";

      var imageV = document.getElementById('nameImg');

      window.URL = window.URL || window.webkitURL;

      var file, img;

      file = imageV.files && imageV.files[0];

      img = new Image();

      img.src = window.URL.createObjectURL(file);

      img.onload = function () {

        var With = img.naturalWidth,
          height = img.naturalHeight;

        if (With == 400 && height == 400) {

          console.log("Valid size from child function");

          $scope.post();

        } else {

          document.getElementById('messagePic').innerHTML = "Your image: " + "width: " + With + " x height: " + height + " pixels" + ", please select an image with 400 x 400 pixels dimensions";
          return;
        }
      };
    };


    //UPDATE PROFILE
    $scope.saveMainData = function () {

      document.getElementById('errMessg').innerHTML = "";

      //SAVING... PRELOADER VARIABLE
      $scope.Spreloader = true;

      var newUserData = {
        fullname: $scope.fullname,
        username: $scope.authUser,
        profession: $scope.profession,
        email: $scope.email,
        phone: $scope.phone,
        about: $scope.about,
        facebook: $scope.facebook,
        Twitter: $scope.Twitter,
        Dribbble: $scope.Dribbble,
        GitHub: $scope.GitHub,
        Behance: $scope.Behance,
        CodePen: $scope.CodePen,
        Instagram: $scope.Instagram

      };

      console.log("data: " + newUserData.fullname);

      $http.post('/saveMainData', newUserData).then(function (res) {

        if (res.data === true) {

          Materialize.toast('Profile updated successfullly!', 1000, '', function () { $window.location.reload(); }); // 4000 is the duration of the toast
          console.log("data saved successfullly");

        } else {

          //SAVING... PRELOADER VARIABLE
          $scope.Spreloader = false;
          document.getElementById('errMessg').innerHTML = res.data;

        }

      });

    };

    //LOGOUT
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




  }//controller function ends

})();