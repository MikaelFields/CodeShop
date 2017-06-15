(function () {

    'use strict';

    angular.module('authApp').controller('SellProductsController', SellProductsController);


    function SellProductsController($http, $scope, $window) {

        $scope.productP = false;

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
        document.getElementById('preloader-stepper').style = "display: none";
        $('.chips-initial').material_chip({
            data: [{
                tag: 'Landing page',
            }, {
                tag: 'UX',
            }, {
                tag: 'Admin dashboard',
            }],
        });

        $('.chips-placeholder').material_chip({
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag',
        });

        $('select').material_select();

        // AUTHENTICATION
        authStatus();
        function authStatus() { //vefify user status

            $http.post('/authStatus').then(function (res) {

                //  console.log("Username is:" + Object.values(res.data));
                var result = res.data.map(function (a) { return a.username; });
                var result2 = res.data.map(function (a) { return a.auth; });

                if (result2 == "false") {

                    $window.location = "/#!/landing";

                } else { //get all the user data

                    $scope.authUser = result.toString();
                    $scope.UserID = res.data.map(function (a) { return a._id; }).toString();
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
        }

        //   LOGOUT
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

        $("#preloaderShown").show();
        $("#contentDataShown").hide();

        setTimeout(function () {

            console.log("triggered after 3 seconds!");

            $("#preloaderShown").hide();
            $("#contentDataShown").show();

        }, 1500);

        $scope.stepperOne = false;
        $scope.stepperTwo = true;
        $scope.stepperThree = true;
        document.getElementById('form-step-two').style = "display: none";
        document.getElementById('second-step-next').style = "display: none";
        document.getElementById('third-step-next').style = "display: none";
        document.getElementById('form-third-step').style = "display: none";
        document.getElementById('preloaderUpload').style = "display: none";


        //ZIP OR RAR  File Upload FUNCTION
        function ekUpload() {
            function Init() {

                console.log("Upload Initialised");

                var fileSelect = document.getElementById('file-upload'),
                    fileDrag = document.getElementById('file-drag'),
                    submitButton = document.getElementById('submit-button');

                fileSelect.addEventListener('change', fileSelectHandler, false);

                // Is XHR2 available?
                var xhr = new XMLHttpRequest();
                if (xhr.upload) {
                    // File Drop
                    fileDrag.addEventListener('dragover', fileDragHover, false);
                    fileDrag.addEventListener('dragleave', fileDragHover, false);
                    fileDrag.addEventListener('drop', fileSelectHandler, false);
                }
            }

            function fileDragHover(e) {
                var fileDrag = document.getElementById('file-drag');
                document.getElementById('messages2').innerHTML = "";
                document.getElementById('messages3').innerHTML = "";
                document.getElementById('fileV').innerHTML = "";

                e.stopPropagation();
                e.preventDefault();

                fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
            }

            function fileSelectHandler(e) {
                // Fetch FileList object
                var files = e.target.files || e.dataTransfer.files;

                // Cancel event and hover styling
                fileDragHover(e);

                // Process all File objects
                for (var i = 0, f; f = files[i]; i++) {
                    parseFile(f);
                    uploadFile(f);
                }
            }

            // Output
            function output(msg) {
                // Response
                var m = document.getElementById('messages');
                m.innerHTML = msg;
            }

            function parseFile(file) {

                console.log(file.name);
                output(
                    '<strong>' + encodeURI(file.name) + '</strong>'
                );

                // var fileType = file.type;
                // console.log(fileType);
                var imageName = file.name;

                var isGood = (/\.(?=rar|zip)/gi).test(imageName);
                if (isGood) {
                    document.getElementById('start').classList.add("hidden");
                    document.getElementById('response').classList.remove("hidden");
                    document.getElementById('notimage').classList.add("hidden");
                    // Thumbnail Preview
                    document.getElementById('file-image').classList.remove("hidden");
                    document.getElementById('file-image').src = URL.createObjectURL(file);
                }
                else {
                    document.getElementById('file-image').classList.add("hidden");
                    document.getElementById('notimage').classList.remove("hidden");
                    document.getElementById('start').classList.remove("hidden");
                    document.getElementById('response').classList.add("hidden");
                    document.getElementById("file-upload-form").reset();
                }

                //   VERIFY THE FILE SIZE ON READ
                var fsize = $('#file-upload')[0].files[0].size;

                if (fsize > 500000000 || fsize <= 0) /*No more than 500mb*/ {
                    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                    if (fsize == 0) return '0 Byte';
                    var i = parseInt(Math.floor(Math.log(fsize) / Math.log(1024)));
                    var fileSizeMB = Math.round(fsize / Math.pow(1024, i), 2) + ' ' + sizes[i];

                    console.log("the file name is: " + fileSizeMB);
                    document.getElementById('messages3').innerHTML = "File size: " + fileSizeMB;
                    console.log('File is too big, must be at least 1mb size');
                    document.getElementById('messages2').innerHTML = "File is too big, must be at least 1 Byte size and no more than 500mb";
                    document.getElementById('file-image').classList.add("hidden");
                    document.getElementById('notimage').classList.remove("hidden");
                    document.getElementById('start').classList.remove("hidden");
                    document.getElementById('response').classList.add("hidden");
                    document.getElementById("file-upload-form").reset();

                    return;
                }

                // CONVERT BYTES TO MB              
                var sizes2 = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (fsize == 0) return '0 Byte';
                var l = parseInt(Math.floor(Math.log(fsize) / Math.log(1024)));
                var fileSizeMB2 = Math.round(fsize / Math.pow(1024, l), 2) + ' ' + sizes2[l];

                console.log("the file name is: " + fileSizeMB2);
                document.getElementById('messages3').innerHTML = "File size: " + fileSizeMB2;

            }

            function setProgressMaxValue(e) {
                var pBar = document.getElementById('file-progress');

                if (e.lengthComputable) {
                    pBar.max = e.total;
                }
            }

            function updateFileProgress(e) {
                var pBar = document.getElementById('file-progress');

                if (e.lengthComputable) {
                    pBar.value = e.loaded;
                }
            }

            function uploadFile(file) {

                var xhr = new XMLHttpRequest(),
                    fileInput = document.getElementById('class-roster-file'),
                    pBar = document.getElementById('file-progress'),
                    fileSizeLimit = 1024; // In MB
                if (xhr.upload) {
                    // Check if file is less than x MB

                    // Progress bar
                    pBar.style.display = 'inline';
                    xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
                    xhr.upload.addEventListener('progress', updateFileProgress, false);

                    // File received / failed
                    xhr.onreadystatechange = function (e) {
                        if (xhr.readyState == 4) {
                            // Everything is good!

                            // progress.className = (xhr.status == 200 ? "success" : "failure");
                            // document.location.reload(true);
                        }
                    };
                    // Start upload
                    xhr.open('POST', document.getElementById('file-upload-form').action, true);
                    xhr.setRequestHeader('X-File-Name', file.name);
                    xhr.setRequestHeader('X-File-Size', file.size);
                    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                    xhr.send(file);

                }
            }

            // Check for the various File API support.
            if (window.File && window.FileList && window.FileReader) {
                Init();
            } else {
                document.getElementById('file-drag').style.display = 'none';
            }
        }
        ekUpload();

        // read imgage one
        $scope.triggerFileInp = function () {

            $("#fileReadImage").click();
            //PRE VISUALIZE IMG BEFORE UPLOADI IT (FIRST IMAGE)
            function readURL(input) {

                if (input.files && input.files[0]) {

                    var reader = new FileReader();
                    reader.onload = function (e) {

                        $('#readImage').attr('src', e.target.result);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }

            $("#fileReadImage").change(function () {
                readURL(this);
            });
        };
        //CLEAR SPECIFIC IMG SRC
        $scope.discardFileInp = function () {
            $('#readImage').removeAttr("src");
        };
        // read imgage two
        $scope.triggerFileInp2 = function () {

            $("#fileReadImage2").click();

            //PRE VISUALIZE IMG BEFORE UPLOADI IT (FIRST IMAGE)
            function readURL(input) {

                if (input.files && input.files[0]) {

                    var reader = new FileReader();
                    reader.onload = function (e) {

                        $('#readImage2').attr('src', e.target.result);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }

            $("#fileReadImage2").change(function () {
                readURL(this);
            });


        };
        //CLEAR SPECIFIC IMG SRC
        $scope.discardFileInp2 = function () {
            $('#readImage2').removeAttr("src");
        };
        // read imgage three
        $scope.triggerFileInp3 = function () {

            $("#fileReadImage3").click();

            //PRE VISUALIZE IMG BEFORE UPLOADI IT (FIRST IMAGE)
            function readURL(input) {

                if (input.files && input.files[0]) {

                    var reader = new FileReader();
                    reader.onload = function (e) {

                        $('#readImage3').attr('src', e.target.result);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }

            $("#fileReadImage3").change(function () {
                readURL(this);
            });

        };
        //CLEAR SPECIFIC IMG SRC
        $scope.discardFileInp3 = function () {
            $('#readImage3').removeAttr("src");

        };

        // VERYFY IMAGE SIZE image 1
        var _URL = window.URL || window.webkitURL;
        $("#fileReadImage").change(function (e) {
            var file, img;
            if ((file = this.files[0])) {
                document.getElementById('image1V').innerHTML = "";
                img = new Image();
                img.onload = function () {
                    console.log("height: " + this.height + " width: " + this.width);
                    if (this.width > 1375 && this.height > 913 || this.width < 1375 && this.height < 913) {
                        document.getElementById("fileReadImage").value = "";
                        $('#readImage').removeAttr('src');
                        $('#readImage').attr('src', '/img/2.gif');
                        document.getElementById('image1V').innerHTML = "image must be 1375 x 913 pixels*";
                        Materialize.toast('image must be 1375 x 913 pixels*', 4000);

                    }
                };
                img.src = _URL.createObjectURL(file);
            }
        });
        // VERYFY IMAGE SIZE image 2
        $("#fileReadImage2").change(function (e) {
            var file, img;
            if ((file = this.files[0])) {
                document.getElementById('image2V').innerHTML = "";
                img = new Image();
                img.onload = function () {
                    console.log("height: " + this.height + " width: " + this.width);
                    if (this.width > 1375 && this.height > 913 || this.width < 1375 && this.height < 913) {
                        document.getElementById("fileReadImage2").value = "";
                        $('#readImage2').removeAttr('src');
                        $('#readImage2').attr('src', '/img/2.gif');
                        document.getElementById('image2V').innerHTML = "image must be 1375 x 913 pixels*";
                        Materialize.toast('image must be 1375 x 913 pixels*', 4000);

                    }
                };
                img.src = _URL.createObjectURL(file);
            }
        });
        // VERYFY IMAGE SIZE image 3
        $("#fileReadImage3").change(function (e) {
            var file, img;
            if ((file = this.files[0])) {
                document.getElementById('image3V').innerHTML = "";
                img = new Image();
                img.onload = function () {
                    console.log("height: " + this.height + " width: " + this.width);
                    if (this.width > 1375 && this.height > 913 || this.width < 1375 && this.height < 913) {
                        document.getElementById("fileReadImage3").value = "";
                        $('#readImage3').removeAttr('src');
                        $('#readImage3').attr('src', '/img/2.gif');
                        Materialize.toast('image must be 1375 x 913 pixels*', 4000);
                        document.getElementById('image3V').innerHTML = "image must be 1375 x 913 pixels*";
                    }
                };
                img.src = _URL.createObjectURL(file);
            }
        });


        // FIST STEP
        $scope.next = function () {

            // Empty validators tags | alerts
            document.getElementById('tittleV').innerHTML = "";
            document.getElementById('demoUrlV').innerHTML = "";
            document.getElementById('descriptionV').innerHTML = "";
            document.getElementById('toolsV').innerHTML = "";
            document.getElementById('browersV').innerHTML = "";
            document.getElementById('CompatibleV').innerHTML = "";
            document.getElementById('FilesV').innerHTML = "";
            document.getElementById('LayoutV').innerHTML = "";
            document.getElementById('supportV').innerHTML = "";
            document.getElementById('chipsV').innerHTML = "";
            document.getElementById('typeProdctV').innerHTML = "";

            //   RUN VALIDATIONS  ---------------------------->

            if ($("#tittle").val().length <= 0 || $.trim($('#tittle').val()) == '') {
                Materialize.toast('The product tittle is empty*', 4000);
                document.getElementById('tittleV').innerHTML = " | The product tittle is empty*";
                $("#tittle").focus();
                return;
            }
            if ($("#demoUrl").val().length <= 0 || $.trim($('#demoUrl').val()) == '') {
                Materialize.toast('The product demo url is empty*', 4000);
                document.getElementById('demoUrlV').innerHTML = " | The product demo url is empty*";
                $("#demoUrl").focus();
                return;
            }
            if ($("#description").val().length <= 0 || $.trim($('#description').val()) == '') {
                Materialize.toast('The description product is empty*', 4000);
                document.getElementById('descriptionV').innerHTML = "The description product is empty*";
                $("#description").focus();
                return;
            }
            if ($('#keys').material_chip('data') == null || $('#keys').material_chip('data') == '') {
                Materialize.toast('Add at leat one key word*', 4000);
                document.getElementById('chipsV').innerHTML = " | Add at least one key word*";
                $("#keys").focus();
                return;
            }
            var ProdctOptions = $("#typeProdct");
            if (ProdctOptions.val() == null || ProdctOptions.val() == "") {
                Materialize.toast('Select the type of proyect*', 4000);
                document.getElementById('typeProdctV').innerHTML = "Select the type of proyect*";
                return;
            }
            var toolsOptions = $('#tools > option:selected');
            if (toolsOptions.length == 0) {
                Materialize.toast('Select the tools used on your proyect*', 4000);
                document.getElementById('toolsV').innerHTML = "Select the tools used on your proyect*";
                return;
            }
            var browersOptions = $('#browers > option:selected');
            if (browersOptions.length == 0) {
                Materialize.toast('Select the browers supported for your proyect*', 4000);
                document.getElementById('browersV').innerHTML = "Select the browers supported for your proyect*";
                return;
            }
            var CompatibleOptions = $('#Compatible > option:selected');
            if (CompatibleOptions.length == 0) {
                Materialize.toast('Select the Compatible technologies for your proyect*', 4000);
                document.getElementById('CompatibleV').innerHTML = "Select the Compatible technologies for your proyect*";
                return;
            }
            var FilesOptions = $('#Files > option:selected');
            if (FilesOptions.length == 0) {
                Materialize.toast('Select the Files included on your item product*', 4000);
                document.getElementById('FilesV').innerHTML = "Select the Files included on your item product*";
                return;
            }
            var LayoutOptions = $("#Layout");
            if (LayoutOptions.val() == null || LayoutOptions.val() == "") {
                Materialize.toast('Select the layout type of your product*', 4000);
                document.getElementById('LayoutV').innerHTML = "Select the layout type of your product*";
                return;
            }
            var supportOptions = $("#support");
            if (supportOptions.val() == null || supportOptions.val() == "") {
                Materialize.toast('Select the support status of your product*', 4000);
                document.getElementById('supportV').innerHTML = "Select the support status of your product*";
                return;
            }

            document.getElementById('form-step-one').style = "display: none";
            document.getElementById('preloader-stepper').style = "display: block";

            setTimeout(function () {

                document.getElementById('first-step-next').style = "display: none";
                document.getElementById('second-step-next').style = "display: none";
                document.getElementById('preloader-stepper').style = "display: none";
                document.getElementById('form-step-two').style = "display: block";
                document.getElementById('second-step-next').style = "display: block";
                document.getElementById('face1').style = "display: none";
                document.getElementById('face2').style = "display: none";


            }, 1500);

            // document.getElementById('form-step-one').style="display: none"; 
            //  document.getElementById('preloader-stepper').style="display: block";
            //  $('#step-two-btn').removeAttr('disabled');
            //   $('#step-one-btn').attr('disabled');

            $scope.stepperOne = true;
            $scope.stepperTwo = false;
            $scope.stepperThree = true;

            // END VALIDATIONS ------------------>

            // var itemaData = {
            //     tittle: tittle,
            //     keyWords: chipsArray,
            //     typeProduct: TypeOfProduct,
            //     tools: toolsArray,
            //     browers: browersArray,
            //     Compatible: CompatibleArray,
            //     Files: FilesArray,
            //     Layout: Layout,
            //     support: support,
            //     demoUrl: demoUrl,
            //     descriptionData: description
            // };


            // var dataArray = [{
            //     tittle: tittle,
            //     keyWords: chipsArray,
            //     tools: toolsArray,
            //     browers: browersArray,
            //     Compatible: CompatibleArray,
            //     Files: FilesArray,
            //     Layout: Layout,
            //     support: support,
            //     demoUrl: demoUrl,
            //     descriptionData: description
            // }];

            //get the object of arrays and make a repeat of it
            // render(dataArray);
            // function render(data) {
            //     var html = data.map(function (elem, index) {
            //         return (`<p>Tittle: ${elem.tittle}</p>
            //      <p>keyWords: ${elem.keyWords}</p>
            //         <p>Tools: ${elem.tools}</p>
            //            <p>Browers: ${elem.browers}</p>
            //               <p>Compatible: ${elem.Compatible}</p>
            //                  <p>Files: ${elem.Files}</p>
            //                    <p>Layout: ${elem.Layout}</p>
            //                     <p>Support: ${elem.support}</p>
            //                        <p>DemoUrl: ${elem.demoUrl}</p>
            //                           <p>Description: ${elem.descriptionData}</p>`);
            //     }).join(" ");
            //     //append the convertion
            //     document.getElementById('testContent').innerHTML = html;
            // }

            //GET TOOLS MULTI SELECT INTO OBJ
            // var obj = array.reduce(function(acc, cur, i) {
            //   acc[i] = cur;
            //   return acc;
            // }, {});

        };//end next function

        $scope.gainNl = 0;
        $scope.gainExt = 0;
        // SECOND STEP
        $scope.next2 = function () {

            var TypeOfProduct = $("#typeProdct").val();
            document.getElementById('typeTittleP').innerHTML = TypeOfProduct;

            switch (TypeOfProduct) {
                case 'Website template':
                    // code block
                    $scope.gainNl = 4;
                    $scope.gainExt = 200;
                    break;
                case 'Single HTML element template':
                    // code block
                    $scope.gainNl = 4;
                    $scope.gainExt = 200;
                    break;
                case 'eCommerce':
                    // code block
                    $scope.gainNl = 15;
                    $scope.gainExt = 750;
                    break;
                case 'WordPress':
                    // code block
                    $scope.gainNl = 12;
                    $scope.gainExt = 600;
                    break;
                case 'PSD templates':
                    // code block
                    $scope.gainNl = 2;
                    $scope.gainExt = 100;
                    break;
                default:
                // code block
            }

            document.getElementById('image1V').innerHTML = "";
            document.getElementById('image2V').innerHTML = "";
            document.getElementById('image3V').innerHTML = "";
            document.getElementById('fileV').innerHTML = "";


            if (document.getElementById("fileReadImage").files.length == 0) {
                console.log("no files selected image 1");
                document.getElementById('image1V').innerHTML = "You must select 3 images for your item. jpeg, Gif, png or jpg";
                return;
            }
            if (document.getElementById("fileReadImage2").files.length == 0) {
                document.getElementById('image2V').innerHTML = "You must select 3 images for your item. jpeg, Gif, png or jpg";
                console.log("no files selected image 2");
                return;
            }
            if (document.getElementById("fileReadImage3").files.length == 0) {
                document.getElementById('image3V').innerHTML = "You must select 3 images for your item. jpeg, Gif, png or jpg";
                console.log("no files selected image 3");
                return;
            }
            if (document.getElementById("file-upload").files.length == 0) {
                document.getElementById('fileV').innerHTML = "Select a file";
                console.log("no files selected zip file");
                return;
            }

            var imageName1 = $('#fileReadImage1').val();
            var imageName2 = $('#fileReadImage2').val();
            var imageName3 = $('#fileReadImage3').val();

            if (imageName1 == imageName2 ||
                imageName1 == imageName3 ||
                imageName2 == imageName1 ||
                imageName2 == imageName3 ||
                imageName3 == imageName1 ||
                imageName3 == imageName2) {

                Materialize.toast('<p>Check the name of your images, some of <br> them have been titled with the same name.*</p>', 5000);
                return;
            }

            // get the files name

            var img1 = $('#fileReadImage').val();
            var img2 = $('#fileReadImage2').val();
            var img3 = $('#fileReadImage3').val();
            var fileItm = $('#file-upload').val();

            // add the name files to load preloader description on (stepNuemberThree)

            document.getElementById('imageOne').innerHTML = img1;
            document.getElementById('imageTwo').innerHTML = img2;
            document.getElementById('imageThree').innerHTML = img3;
            document.getElementById('ItemFile').innerHTML = fileItm;

            document.getElementById('form-step-two').style = "display: none";
            document.getElementById('second-step-next').style = "display: none";
            document.getElementById('preloader-stepper').style = "display: block";

            $scope.stepperOne = true;
            $scope.stepperTwo = true;
            $scope.stepperThree = false;

            setTimeout(function () {

                document.getElementById('preloader-stepper').style = "display: none";
                document.getElementById('third-step-next').style = "display: block";
                document.getElementById('form-third-step').style = "display: block";

            }, 1500);


        };
        $scope.endUpload = false;
        // LAST STEP OR UPLOAD PRODUCT
        $scope.uploadProduct = function () {


            $scope.endUpload = true;

            //GET ALL THE DATA
            var tittle = $.trim($("#tittle").val());
            //get the chips values--------------------------------------->
            var keysChips = $('#keys').material_chip('data');
            // convert to chips to array of objects
            var arrayObjChips = Object.keys(keysChips).map(function (ChildNode) { return keysChips[ChildNode]; });
            //convert array of objects to simple array
            var chipsArray = arrayObjChips.map(function (obj) {
                return obj.tag;
            });

            //get multi select values into simple array -------------------------->
            var toolsArray = [];
            $('#tools :selected').each(function (i, selected) { //tools value
                toolsArray[i] = $(selected).text();
            });
            //get multi select values into simple array -------------------------->
            var browersArray = [];
            $('#browers :selected').each(function (i, selected) { //tools value
                browersArray[i] = $(selected).text();
            });
            //get multi select values into simple array -------------------------->
            var CompatibleArray = [];
            $('#Compatible :selected').each(function (i, selected) { //tools value
                CompatibleArray[i] = $(selected).text();
            });
            //get multi select values into simple array -------------------------->
            var FilesArray = [];
            $('#Files :selected').each(function (i, selected) { //tools value
                FilesArray[i] = $(selected).text();
            });
            //get multi select values into simple array -------------------------->
            var Layout = $("#Layout").val();
            var support = $("#support").val();
            var TypeOfProduct = $("#typeProdct").val();
            var demoUrl = $("#demoUrl").val();
            var description = $("#description").val();

            var normalPriceL = $scope.regularL.value;
            var normalPriceEx = $scope.exetendedL.value;

            if ($scope.productP) {

                normalPriceL = "free";
                normalPriceEx = "free";

            } else if (!normalPriceL || !normalPriceEx) {

                Materialize.toast('Setup your price! on both licenses*', 4000);
                $scope.endUpload = false;
                return;
            }


            document.getElementById('UploadButtons').style = "display: none";
            document.getElementById('preloaderUpload').style = "display: block";
            document.getElementById('face1').style = "display: block";


            // GENERATE UNIQUE ID FOR THE FILES
            var unicID = Math.random().toString(36).slice(2);

            var itemData = {
                userId: $scope.UserID,
                userItemPic:  $scope.avatarPicture,
                tittle: tittle,
                keyWords: chipsArray,
                typeProduct: TypeOfProduct,
                tools: toolsArray,
                browers: browersArray,
                Compatible: CompatibleArray,
                Files: FilesArray,
                Layout: Layout,
                support: support,
                demoUrl: demoUrl,
                descriptionData: description,
                priceL: normalPriceL,
                priceEx: normalPriceEx,
                filesAdressID: unicID,
                image1Url: "",
                image2Url: "",
                image3Url: "",
                itemUrl: "",
                views: 0,
                likes: [],
                ItemDownloads: 0,
                author:   $scope.authUser,
                publishStatus: "Pending"
            };

            //  GET THE FILE IMAGE 1 AND UPLOAD
            //check whether browser fully supports all File API
            if (window.File && window.FileReader && window.FileList && window.Blob) {

                var fileNameImg1 = $('#fileReadImage').val();
                console.log("the file name is: " + fileNameImg1);



                var fsizeImg1 = $('#fileReadImage')[0].files[0].size;
                console.log("the file img1 name is: " + fsizeImg1);

                //if the file is ok then trigger the upload function and the upload data 

                var img1Extensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];//Validation of the .ext 
                //Upload IMG

                var sFileNameImg1 = $("#fileReadImage").val();//Gets the Name by JQuery     

                console.log('Step 1. the value captured from the imput type file is: ' + sFileNameImg1);

                if (sFileNameImg1.length > 0) {
                    var blnValidImg1 = false;
                    for (var j = 0; j < img1Extensions.length; j++) {
                        var sCurExtensionImg1 = img1Extensions[j];
                        if (sFileNameImg1.substr(sFileNameImg1.length - sCurExtensionImg1.length, sCurExtensionImg1.length).toLowerCase() == sCurExtensionImg1.toLowerCase()) {

                            blnValidImg1 = true;

                            console.log('The extension file is valid!..proccesing...');

                            var filesSelectedImg1 = document.getElementById("fileReadImage").files;

                            if (filesSelectedImg1.length > 0) {

                                var fileToLoadImg1 = filesSelectedImg1[0];

                                var fileReaderImg1 = new FileReader();

                                fileReaderImg1.onload = function (fileLoadedEvent) {
                                    var textAreaFileContents = document.getElementById(
                                        "textAreaFileContents"
                                    );
                                    //var of the file value ready to be updated
                                    var EndfileNameImg1 = fileToLoadImg1;

                                    console.log('Step 2. The filtered by the fileReaderImg1() function is: ' + fileToLoadImg1);

                                    console.log('Now the file is ready to be uploaded to the firebase butcket');

                                    /*------------------------------firebase upload file---------------------------------*/

                                    // Create a root reference // firebase butcket refence..
                                    var storageRefImg1 = firebase.storage().ref();

                                    //this is the file path where is going to storaged then the put function will upload the image
                                    var uploadTaskImg1 = storageRefImg1.child('UsersFiles/' + $scope.authUser + '/' + unicID + '/' + EndfileNameImg1.name).put(EndfileNameImg1);
                                    // Register three observers:
                                    // 1. 'state_changed' observer, called any time the state changes
                                    // 2. Error observer, called on failure
                                    // 3. Completion observer, called on successful completion
                                    uploadTaskImg1.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                                        // Observe state change events such as progress, pause, and resume
                                        // See below for more detail
                                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

                                        var progressImg1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        var progressIntImg1 = parseInt(progressImg1);
                                        // console.log('Upload is ' + progressInt + '% done');

                                        document.getElementById('persentProgressImg1').innerHTML = progressIntImg1 + " %";
                                        document.getElementById('progressBarImg1').style = "width:" + progressIntImg1 + "%";
                                        var progElemImg1 = document.getElementById('persentProgressImg1').innerHTML;

                                        switch (snapshot.state) {

                                            case firebase.storage.TaskState.PAUSED: // or 'paused'

                                                console.log('Upload is paused');

                                                document.getElementById('messageUpFileErrImg1').innerHTML = "Upload is paused please wait a bit..";

                                                break;

                                            case firebase.storage.TaskState.RUNNING: // or 'running'

                                                console.log('Upload is running');

                                                document.getElementById('messageUpFileSuccImg1').innerHTML = "Uploading your file item...";
                                                break;
                                        }

                                    }, function (error) {

                                        switch (error.code) {

                                            case 'storage/unauthorized':

                                                document.getElementById('messageUpFileErrImg1').innerHTML = "Error, you do not have permissions to files";

                                                console.log('Error, you do not have permissions to files');

                                                // User doesn't have permission to access the object
                                                break;

                                            case 'storage/canceled':

                                                console.log('Upss,  user canceled the upload');

                                                document.getElementById('messageUpFileErrImg1').innerHTML = "Upss,  user canceled the upload";

                                                // User canceled the upload

                                                break;

                                            case 'storage/unknown':

                                                console.log(' Unknown error occurred, inspect error.serverResponse');

                                                document.getElementById('messageUpFileErrImg1').innerHTML = "Unknown error occurred, inspect error.serverResponse";

                                                // Unknown error occurred, inspect error.serverResponse

                                                break;
                                        }

                                        console.log('Error, upload file failure: ' + error);

                                    }, function () {
                                        // Upload completed successfully, now we can get the download URL
                                        var fileItemImg1Url = uploadTaskImg1.snapshot.downloadURL;
                                        document.getElementById('messageUpFileSuccImg1').innerHTML = "Your file has been successfully uploaded!";
                                        //addind value url into corresponding json child
                                        itemData['image1Url'] = fileItemImg1Url;
                                        console.log(itemData.image1Url);

                                    });

                                    /*-----------------------------------end------------------------------------*/
                                };// fileReader.onload function end

                                fileReaderImg1.readAsDataURL(fileToLoadImg1);

                            }
                            break;
                        }
                    }//End for
                    if (!blnValidImg1) {
                        console.log('File is not valid');
                        return;
                    }
                }

            } else {
                document.getElementById('messageUpFileErrImg1').innerHTML = "Please upgrade your browser, because your current browser lacks some new features we need!";
            }

            //  GET THE FILE IMAGE 2 AND UPLOAD
            //check whether browser fully supports all File API
            if (window.File && window.FileReader && window.FileList && window.Blob) {

                var fileNameImg2 = $('#fileReadImage2').val();
                console.log("the file name is: " + fileNameImg2);

                var fsizeImg2 = $('#fileReadImage2')[0].files[0].size;
                console.log("the file Img2 name is: " + fsizeImg2);

                //if the file is ok then trigger the upload function and the upload data 

                var Img2Extensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];//Validation of the .ext 
                //Upload IMG

                var sFileNameImg2 = $("#fileReadImage2").val();//Gets the Name by JQuery     

                console.log('Step 1. the value captured from the imput type file is: ' + sFileNameImg2);

                if (sFileNameImg2.length > 0) {
                    var blnValidImg2 = false;
                    for (var j = 0; j < Img2Extensions.length; j++) {
                        var sCurExtensionImg2 = Img2Extensions[j];
                        if (sFileNameImg2.substr(sFileNameImg2.length - sCurExtensionImg2.length, sCurExtensionImg2.length).toLowerCase() == sCurExtensionImg2.toLowerCase()) {

                            blnValidImg2 = true;

                            console.log('The extension file is valid!..proccesing...');

                            var filesSelectedImg2 = document.getElementById("fileReadImage2").files;

                            if (filesSelectedImg2.length > 0) {

                                var fileToLoadImg2 = filesSelectedImg2[0];

                                var fileReaderImg2 = new FileReader();

                                fileReaderImg2.onload = function (fileLoadedEvent) {
                                    var textAreaFileContents = document.getElementById(
                                        "textAreaFileContents"
                                    );
                                    //var of the file value ready to be updated
                                    var EndfileNameImg2 = fileToLoadImg2;

                                    console.log('Step 2. The filtered by the fileReaderImg2() function is: ' + fileToLoadImg2);

                                    console.log('Now the file is ready to be uploaded to the firebase butcket');

                                    /*------------------------------firebase upload file---------------------------------*/

                                    // Create a root reference // firebase butcket refence..
                                    var storageRefImg2 = firebase.storage().ref();
                                    //this is the file path where is going to storaged then the put function will upload the image
                                    var uploadTaskImg2 = storageRefImg2.child('UsersFiles/' + $scope.authUser + '/' + unicID + '/' + EndfileNameImg2.name).put(EndfileNameImg2);
                                    // Register three observers:
                                    // 1. 'state_changed' observer, called any time the state changes
                                    // 2. Error observer, called on failure
                                    // 3. Completion observer, called on successful completion
                                    uploadTaskImg2.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                                        // Observe state change events such as progress, pause, and resume
                                        // See below for more detail
                                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

                                        var progressImg2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        var progressIntImg2 = parseInt(progressImg2);
                                        // console.log('Upload is ' + progressInt + '% done');

                                        document.getElementById('persentProgressImg2').innerHTML = progressIntImg2 + " %";
                                        document.getElementById('progressBarImg2').style = "width:" + progressIntImg2 + "%";
                                        var progElemImg2 = document.getElementById('persentProgressImg2').innerHTML;

                                        switch (snapshot.state) {

                                            case firebase.storage.TaskState.PAUSED: // or 'paused'

                                                console.log('Upload is paused');

                                                document.getElementById('messageUpFileErrImg2').innerHTML = "Upload is paused please wait a bit..";

                                                break;

                                            case firebase.storage.TaskState.RUNNING: // or 'running'

                                                console.log('Upload is running');

                                                document.getElementById('messageUpFileSuccImg2').innerHTML = "Uploading your file item...";
                                                break;
                                        }

                                    }, function (error) {

                                        switch (error.code) {

                                            case 'storage/unauthorized':

                                                document.getElementById('messageUpFileErrImg2').innerHTML = "Error, you do not have permissions to files";

                                                console.log('Error, you do not have permissions to files');

                                                // User doesn't have permission to access the object
                                                break;

                                            case 'storage/canceled':

                                                console.log('Upss,  user canceled the upload');

                                                document.getElementById('messageUpFileErrImg2').innerHTML = "Upss,  user canceled the upload";

                                                // User canceled the upload

                                                break;

                                            case 'storage/unknown':

                                                console.log(' Unknown error occurred, inspect error.serverResponse');

                                                document.getElementById('messageUpFileErrImg2').innerHTML = "Unknown error occurred, inspect error.serverResponse";

                                                // Unknown error occurred, inspect error.serverResponse

                                                break;
                                        }

                                        console.log('Error, upload file failure: ' + error);

                                    }, function () {
                                        // Upload completed successfully, now we can get the download URL
                                        var fileItemImg2Url = uploadTaskImg2.snapshot.downloadURL;
                                        document.getElementById('messageUpFileSuccImg2').innerHTML = "Your file has been successfully uploaded!";
                                        //addind value url into corresponding json child
                                        itemData['image2Url'] = fileItemImg2Url;
                                        console.log(itemData.image1Url);

                                    });

                                    /*-----------------------------------end------------------------------------*/
                                };// fileReader.onload function end

                                fileReaderImg2.readAsDataURL(fileToLoadImg2);

                            }
                            break;
                        }
                    }//End for
                    if (!blnValidImg2) {
                        console.log('File is not valid');
                        return;
                    }
                }

            } else {
                document.getElementById('messageUpFileErrImg2').innerHTML = "Please upgrade your browser, because your current browser lacks some new features we need!";
            }

            //  GET THE FILE IMAGE 3 AND UPLOAD
            //check whether browser fully supports all File API
            if (window.File && window.FileReader && window.FileList && window.Blob) {

                var fileNameImg3 = $('#fileReadImage3').val();
                console.log("the file name is: " + fileNameImg3);

                var fsizeImg3 = $('#fileReadImage3')[0].files[0].size;
                console.log("the file Img3 name is: " + fsizeImg3);

                //if the file is ok then trigger the upload function and the upload data 

                var Img3Extensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];//Validation of the .ext 
                //Upload IMG

                var sFileNameImg3 = $("#fileReadImage3").val();//Gets the Name by JQuery     

                console.log('Step 1. the value captured from the imput type file is: ' + sFileNameImg3);

                if (sFileNameImg3.length > 0) {
                    var blnValidImg3 = false;
                    for (var j = 0; j < Img3Extensions.length; j++) {
                        var sCurExtensionImg3 = Img3Extensions[j];
                        if (sFileNameImg3.substr(sFileNameImg3.length - sCurExtensionImg3.length, sCurExtensionImg3.length).toLowerCase() == sCurExtensionImg3.toLowerCase()) {

                            blnValidImg3 = true;

                            console.log('The extension file is valid!..proccesing...');

                            var filesSelectedImg3 = document.getElementById("fileReadImage3").files;

                            if (filesSelectedImg3.length > 0) {

                                var fileToLoadImg3 = filesSelectedImg3[0];

                                var fileReaderImg3 = new FileReader();

                                fileReaderImg3.onload = function (fileLoadedEvent) {
                                    var textAreaFileContents = document.getElementById(
                                        "textAreaFileContents"
                                    );
                                    //var of the file value ready to be updated
                                    var EndfileNameImg3 = fileToLoadImg3;

                                    console.log('Step 2. The filtered by the fileReaderImg3() function is: ' + fileToLoadImg3);

                                    console.log('Now the file is ready to be uploaded to the firebase butcket');

                                    /*------------------------------firebase upload file---------------------------------*/

                                    // Create a root reference // firebase butcket refence..
                                    var storageRefImg3 = firebase.storage().ref();
                                    //this is the file path where is going to storaged then the put function will upload the image
                                    var uploadTaskImg3 = storageRefImg3.child('UsersFiles/' + $scope.authUser + '/' + unicID + '/' + EndfileNameImg3.name).put(EndfileNameImg3);
                                    // Register three observers:
                                    // 1. 'state_changed' observer, called any time the state changes
                                    // 2. Error observer, called on failure
                                    // 3. Completion observer, called on successful completion
                                    uploadTaskImg3.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                                        // Observe state change events such as progress, pause, and resume
                                        // See below for more detail
                                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

                                        var progressImg3 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        var progressIntImg3 = parseInt(progressImg3);
                                        // console.log('Upload is ' + progressInt + '% done');

                                        document.getElementById('persentProgressImg3').innerHTML = progressIntImg3 + " %";
                                        document.getElementById('progressBarImg3').style = "width:" + progressIntImg3 + "%";
                                        var progElemImg3 = document.getElementById('persentProgressImg3').innerHTML;

                                        switch (snapshot.state) {

                                            case firebase.storage.TaskState.PAUSED: // or 'paused'

                                                console.log('Upload is paused');

                                                document.getElementById('messageUpFileErrImg3').innerHTML = "Upload is paused please wait a bit..";

                                                break;

                                            case firebase.storage.TaskState.RUNNING: // or 'running'

                                                console.log('Upload is running');

                                                document.getElementById('messageUpFileSuccImg3').innerHTML = "Uploading your file item...";
                                                break;
                                        }

                                    }, function (error) {

                                        switch (error.code) {

                                            case 'storage/unauthorized':

                                                document.getElementById('messageUpFileErrImg3').innerHTML = "Error, you do not have permissions to files";

                                                console.log('Error, you do not have permissions to files');

                                                // User doesn't have permission to access the object
                                                break;

                                            case 'storage/canceled':

                                                console.log('Upss,  user canceled the upload');

                                                document.getElementById('messageUpFileErrImg3').innerHTML = "Upss,  user canceled the upload";

                                                // User canceled the upload

                                                break;

                                            case 'storage/unknown':

                                                console.log(' Unknown error occurred, inspect error.serverResponse');

                                                document.getElementById('messageUpFileErrImg3').innerHTML = "Unknown error occurred, inspect error.serverResponse";

                                                // Unknown error occurred, inspect error.serverResponse

                                                break;
                                        }

                                        console.log('Error, upload file failure: ' + error);

                                    }, function () {
                                        // Upload completed successfully, now we can get the download URL
                                        var fileItemImg3Url = uploadTaskImg3.snapshot.downloadURL;
                                        document.getElementById('messageUpFileSuccImg3').innerHTML = "Your file has been successfully uploaded!";
                                        //addind value url into corresponding json child
                                        itemData['image3Url'] = fileItemImg3Url;
                                        console.log(itemData.image1Url);

                                    });

                                    /*-----------------------------------end------------------------------------*/
                                };// fileReader.onload function end

                                fileReaderImg3.readAsDataURL(fileToLoadImg3);

                            }
                            break;
                        }
                    }//End for
                    if (!blnValidImg3) {
                        console.log('File is not valid');
                        return;
                    }
                }

            } else {
                document.getElementById('messageUpFileErrImg3').innerHTML = "Please upgrade your browser, because your current browser lacks some new features we need!";
            }

            //  GET THE FILE AND UPLOAD
            //check whether browser fully supports all File API
            if (window.File && window.FileReader && window.FileList && window.Blob) {

                var fileName = $('#file-upload').val();
                console.log("the file name is: " + fileName);

                var fsize = $('#file-upload')[0].files[0].size;
                console.log("the file name is: " + fsize);

                //if the file is ok then trigger the upload function and the upload data 

                var FileExtensions = [".zip", ".rar"];//Validation of the .ext 
                //Upload IMG

                var sFileName = $("#file-upload").val();//Gets the Name by JQuery     

                console.log('Step 1. the value captured from the imput type file is: ' + sFileName);

                if (sFileName.length > 0) {
                    var blnValid = false;
                    for (var j = 0; j < FileExtensions.length; j++) {
                        var sCurExtension = FileExtensions[j];
                        if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {

                            blnValid = true;

                            console.log('The extension file is valid!..proccesing...');

                            var filesSelected = document.getElementById("file-upload").files;

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
                                    var unicIDFile = Math.random().toString(36).slice(2);
                                    //this is the file path where is going to storaged then the put function will upload the image
                                    var uploadTask = storageRef.child('UsersFiles/' + $scope.authUser + '/' + unicID + '/' + fileName.name).put(fileName);
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
                                        // console.log('Upload is ' + progressInt + '% done');

                                        document.getElementById('persentProgress').innerHTML = progressInt + " %";
                                        document.getElementById('progressBar').style = "width:" + progressInt + "%";
                                        var progElem = document.getElementById('persentProgress').innerHTML;

                                        switch (snapshot.state) {

                                            case firebase.storage.TaskState.PAUSED: // or 'paused'

                                                console.log('Upload is paused');

                                                document.getElementById('messageUpFileErr').innerHTML = "Upload is paused please wait a bit..";

                                                break;

                                            case firebase.storage.TaskState.RUNNING: // or 'running'

                                                console.log('Upload is running');

                                                document.getElementById('messageUpFileSucc').innerHTML = "Uploading your file item...";
                                                break;
                                        }

                                    }, function (error) {

                                        switch (error.code) {

                                            case 'storage/unauthorized':

                                                document.getElementById('messageUpFileErr').innerHTML = "Error, you do not have permissions to files";

                                                console.log('Error, you do not have permissions to files');

                                                // User doesn't have permission to access the object
                                                break;

                                            case 'storage/canceled':

                                                console.log('Upss,  user canceled the upload');

                                                document.getElementById('messageUpFileErr').innerHTML = "Upss,  user canceled the upload";

                                                // User canceled the upload

                                                break;

                                            case 'storage/unknown':

                                                console.log(' Unknown error occurred, inspect error.serverResponse');

                                                document.getElementById('messageUpFileErr').innerHTML = "Unknown error occurred, inspect error.serverResponse";

                                                // Unknown error occurred, inspect error.serverResponse

                                                break;
                                        }

                                        console.log('Error, upload file failure: ' + error);

                                    }, function () {
                                        // Upload completed successfully, now we can get the download URL
                                        var fileItemUrl = uploadTask.snapshot.downloadURL;
                                        document.getElementById('messageUpFileSucc').innerHTML = "Your file has been successfully uploaded!";
                                        //addind value url into corresponding json child
                                        itemData['itemUrl'] = fileItemUrl;
                                        console.log(itemData.itemUrl);

                                        setTimeout(function () {

                                            document.getElementById('face1').style = "display: none";
                                            document.getElementById('face2').style = "display: block";

                                            $http.post('/addNewItem', itemData).then(function (res) {

                                                if (res.data === true) {

                                                    Materialize.toast('Item uploaded successfullly!', 1000, '', function () { $window.location.reload(); }); // 4000 is the duration of the toast

                                                } else {

                                                    Materialize.toast('Item upload error!', 1000); // 4000 is the duration of the toast      
                                                }

                                            });


                                        }, 2500);


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
                        return;
                    }
                }

            } else {
                document.getElementById('messageUpFileErr').innerHTML = "Please upgrade your browser, because your current browser lacks some new features we need!";
            }



        };//END OF THE FUNCTION

        // SLIDERS

        $scope.regularL = {
            value: 0,
            options: {
                floor: 0,
                ceil: 100,
                translate: function (value) {
                    return 'Price: $' + value;
                },
                showSelectionBar: true,
                selectionBarGradient: {
                    from: 'white',
                    to: '#FC0'
                }
            }
        };

        $scope.exetendedL = {
            value: 0,
            options: {
                floor: 0,
                ceil: 1500,
                translate: function (value) {
                    return 'Price: $' + value;
                },
                showSelectionBar: true,
                selectionBarGradient: {
                    from: 'white',
                    to: '#FC0'
                }
            }
        };






    }//END CONTROLLER

})();