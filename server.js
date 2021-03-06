var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var ejs = require('ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());//this allows me to parse json data
app.use(bodyParser.urlencoded({ extended: true })); // this allows me to parse arrays an more types of data
var ShemaUsers = require('./models/user.js').users;
var ShemaItems = require('./models/user.js').items;
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session'); //express session allows to store sesions
var MongoStore = require('connect-mongo')(session);
var bcrypt = require('bcryptjs');
var nodemailer =  require('nodemailer');

app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        autoRemove: 'native',
    }),
    secret: 'codeMarketForSellingAndFurturing',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000 * 24 * 14 }, //session expires in 1 hour
    // cookie: { secure: true }
})); 

//make posible to render or sendFiles from server
app.engine('html', require('ejs').renderFile);
/*
Express.static allows me to render static files as css, imgs or js 
like localhost:3000/css/main.css 
*/
app.set('views', __dirname + '/views');
app.use(express.static('views'));
app.use(express.static('public'));

//now we can render our index file from the views folder
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// GET USER ID
app.post("/getUserID", function (req, res) {
    var data = req.session.userSession;
    res.send(data);
});


//AUTH STATUS FUNCTION
app.post("/authStatus", function (req, res) {

    if (!req.session.userSession) {

        console.log("This user is not authenticated");
        var authS = [{ auth: 'false' }];
        res.send(authS);
        // res.redirect("/Login");

    } else {

        // console.log("This user is authenticated");
        // console.log("session ID is: " + req.session.id);
        // console.log("User ID is: " + req.session.userSession._id);
        // console.log("User name is: " + req.session.userSession.username);
        // console.log("User email is: " + req.session.userSession.email);             
        // console.log("This user is : "+ req.session.userSession.username);

        ShemaUsers.findOne({ _id: req.session.userSession }, function (err, UserData) {

            if (UserData) {
                console.log("User is: " + UserData.username);
                var userObjArray = [];
                userObjArray.push(UserData);
                res.send(userObjArray);
                return;

            } else {
                console.log("User was not found on users db");
            }


        });

        // var userAuthData = {
        //     sessionMDBid: req.session.id,
        //     UsrSessionID: req.session.userSession._id,
        //     sessionUsrName: req.session.userSession.username,
        //     sessionUsrEmail: req.session.userSession.email
        // };

        // var userObjArray = [];
        // userObjArray.push(req.session.userSession);

        // res.send(userObjArray);

    }

});
//LOGOUT FUNCTION
app.post('/logOutUsr', function (req, res) {

    req.session.destroy();
    var status = [{ sess: 'destroyed' }];
    res.send(status);
});
// REGIST USERS FUNCTION
app.post('/registAUser', function (req, res) {


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var day = yyyy + '/' + mm + '/' + dd;

    userObj = {
        username: req.body.userName,
        email: req.body.userEmail,
        password: req.body.userPassword,
        fullname: "not specified",
        profession: "",
        phone: "not specified",
        about: "",
        facebook: "not specified",
        Twitter: "not specified",
        Dribbble: "not specified",
        GitHub: "not specified",
        Behance: "not specified",
        CodePen: "not specified",
        Instagram: "not specified",
        startSellingForm: "NotDoneYet",
        cartButcket: 0,
        enrollmentDay: day,
        followersList: "You have no followers yet",
        followersNumber: 0,
        followingList: "You are not following any author",
        followingNumber: 0,
        items: "You don't have published any item yet",
        itemsNumber: 0,
        collect: "There is not any collection added",
        collectNumber: 0,
        earnings: 0,
        sales: 0,
        downloads: 0,
        authorLikes: 0,
        avatarPicture: "https://firebasestorage.googleapis.com/v0/b/market-d9687.appspot.com/o/UserPicProfiles%2FDefaultUserPic%2FavartarDefaultPic.png?alt=media&token=8371ebfa-9b25-43ae-8705-bac72196805e",
    };

    ShemaUsers.findOne({ username: userObj.username }, function (err, UserData) {

        if (UserData) { //IF USER ALREADY EXIST NOT SAVE IT (IF USERDATA IS IQUAL TO NULL)
            var userMached = false;
            console.log("Username already exist...");
            res.send(userMached);
            // io.sockets.emit('newUserCallback', userMached);
            return;
        } else { //IF USER NOT EXIST THEN SAVE IT

            ShemaUsers.findOne({

                email: userObj.email

            }, function (err, UserData) {

                if (UserData) {

                    var userMached = false;
                    console.log("Email already exist...");
                    res.send(userMached);
                    // io.sockets.emit('newUserCallback', userMached);

                } else {

                    var pass = userObj.password;
                    //HASH PASSWORD
                    bcrypt.hash(pass, 10, function (err, Hpass) {

                        console.log("encripted pass: " + Hpass);

                        console.log("Data received from client: " + userObj.username);
                        //VALIDATE USER DATA WITH ShemaUsers

                        var securedUserD = {
                            username: userObj.username,
                            email: userObj.email,
                            password: Hpass,
                            fullname: "not specified",
                            profession: "",
                            phone: "not specified",
                            about: "",
                            facebook: "not specified",
                            Twitter: "not specified",
                            Dribbble: "not specified",
                            GitHub: "not specified",
                            Behance: "not specified",
                            CodePen: "not specified",
                            Instagram: "not specified",
                            startSellingForm: "Not done yet",
                            cartButcket: 0,
                            enrollmentDay: day,
                            followersList: "You have no followers yet",
                            followersNumber: 0,
                            followingList: "You are not following any author",
                            followingNumber: 0,
                            items: "You don't have published any item yet",
                            itemsNumber: 0,
                            collect: "There is not any collection added",
                            collectNumber: 0,
                            earnings: 0,
                            sales: 0,
                            downloads: 0,
                            authorLikes: 0,
                            avatarPicture: "https://firebasestorage.googleapis.com/v0/b/market-d9687.appspot.com/o/UserPicProfiles%2FDefaultUserPic%2FavartarDefaultPic.png?alt=media&token=8371ebfa-9b25-43ae-8705-bac72196805e",
                        };

                        var contentObj = new ShemaUsers(securedUserD);
                        //save user on mongoDB
                        contentObj.save().then(function (userD) {
                            console.log("User saved successfully on MongoDB");
                            console.log("User registed: " + userD.username);
                            var registCallback = true;
                            res.send(registCallback);
                            // io.sockets.emit('newUserCallback', registCallback);
                        }, function (err) {
                            console.log(String(err));
                        });
                        //  var newData =  [];
                        // newData.push(data);
                    });
                }
            }
            );
        }
    });

    // res.send({ data: 'Your message was received' });
});
//ADD NEW ITEM
app.post('/addNewItem', function (req, res) {

    ItemObject = {
        userId: req.body.userId,
        userItemPic: req.body.userItemPic,
        tittle: req.body.tittle,
        keyWords: req.body.keyWords,
        typeProduct: req.body.typeProduct,
        tools: req.body.tools,
        browers: req.body.browers,
        Compatible: req.body.Compatible,
        Files: req.body.Files,
        Layout: req.body.Layout,
        support: req.body.support,
        demoUrl: req.body.demoUrl,
        descriptionData: req.body.descriptionData,
        priceL: req.body.priceL,
        priceEx: req.body.priceEx,
        filesAdressID: req.body.filesAdressID,
        image1Url: req.body.image1Url,
        image2Url: req.body.image2Url,
        image3Url: req.body.image3Url,
        itemUrl: req.body.itemUrl,
        views: req.body.views,
        likes: req.body.likes,
        ItemDownloads: req.body.ItemDownloads,
        author: req.body.author,
        publishStatus: req.body.publishStatus
    };

    var contentObj = new ShemaItems(ItemObject);
    //save item on mongoDB
    contentObj.save().then(function (userItem) {
        console.log("Item saved successfully on MongoDB");
        console.log("Item registed: " + userItem.tittle);
        var registCallback = true;


        res.send(registCallback);
        // io.sockets.emit('newUserCallback', registCallback);
    }, function (err) {
        console.log(String(err));
    });
});
app.post('/UserItemsBuctket', function (req, res) {

    console.log("Searching items..");

    itemObjReq = {
        userIdReq: req.body.userId
    };

    console.log("User id for items: " + itemObjReq.userIdReq);

    ShemaItems.find({ userId: itemObjReq.userIdReq }, function (err, UserItemsData) {

        if (err) {
            res.send("errorFoundOnItemSearch");
            return;
        }

        if (!UserItemsData || !UserItemsData.length) {

            res.send(false);

        } else {

            res.send(UserItemsData);

        }

    });

});

app.post('/PublicItems', function (req, res) {


    ShemaItems.find(function (err, UserItems) {

        if (err) {
            res.send("errorFoundOnItemSearch");
            return;
        }

        if (!UserItems.length) {

            res.send(false);

        } else {

            // console.log(UserItems);
            res.send(UserItems);

        }

    });

});
// LOGIN USERS FUNCTION
app.post('/logInSuser', function (req, res) {

    var userLogObj = {
        username: req.body.userName,
        password: req.body.userPassword
    };

    console.log("data received from client is " + userLogObj.username);
    var userObjLogMach = new ShemaUsers(userLogObj);

    ShemaUsers.findOne({ username: userLogObj.username }, function (err, userDataDB) {

        if (userDataDB) {

            console.log("Username: " + userDataDB.username + " hashedPassword: " + userDataDB.password);
            userObjLogMach.comparePassword(userLogObj.password, userDataDB.password, function (err, isMatch) {

                if (err) throw err;
                console.log(userLogObj.password, isMatch); // -> Password123: true

                if (isMatch === true) {
                    req.session.userSession = userDataDB._id;
                    // console.log("session ID is: " + req.session.id);
                    // console.log("User ID is: " + req.session.userSession._id);
                    // console.log("User name is: " + req.session.userSession.username);
                    // console.log("User email is: " + req.session.userSession.email);
                    console.log("User ID is: " + req.session.userSession);
                    res.send(isMatch);
                    // socket.emit('logUserCallback', isMatch);
                } else { res.send(isMatch); }


            });

        } else {
            console.log("Username does not exist!");
            res.send("Username does not exist!, please try another username or create an account");
        }
    });

});
//FIND AND UPDATE USER DATA
app.post('/saveMainData', function (req, res) {

    var newUsrDataObj = {
        userID: req.session.userSession, //adding the user id from the session
        fullname: req.body.fullname,
        username: req.body.username,
        profession: req.body.profession,
        email: req.body.email,
        phone: req.body.phone,
        about: req.body.about,
        facebook: req.body.facebook,
        Twitter: req.body.Twitter,
        Dribbble: req.body.Dribbble,
        GitHub: req.body.GitHub,
        Behance: req.body.Behance,
        CodePen: req.body.CodePen,
        Instagram: req.body.Instagram
    };

    //VALIDATE THE INPUT DATA TYPES
    var contentObj = new ShemaUsers(newUsrDataObj);

    //VARIFY IF THERE IS ANOTHER USER NAMED LIKE THIS USERNAME INPUT " username: req.body.username"
    ShemaUsers.findOne({ username: newUsrDataObj.username }, function (err, UserData) {

        if (UserData) {//if there is an existing user trigger the following valiations (like a filter)

            //if the username found from db iquals to the new username input and the user id found from db is iqual to this user id from the session then apply this changes 
            if (UserData.username == newUsrDataObj.username && UserData._id == req.session.userSession) {

                ShemaUsers.findOneAndUpdate(

                    {
                        /*condition, find all the users data in users collection where _id is iqual to 
                        req.session.userSession (in this case the user session is only storing the user id,
                         so the only value by default is _id)*/
                        _id: req.session.userSession

                    }, {

                        //new data
                        fullname: req.body.fullname,
                        username: req.body.username,
                        profession: req.body.profession,
                        email: req.body.email,
                        phone: req.body.phone,
                        about: req.body.about,
                        facebook: req.body.facebook,
                        Twitter: req.body.Twitter,
                        Dribbble: req.body.Dribbble,
                        GitHub: req.body.GitHub,
                        Behance: req.body.Behance,
                        CodePen: req.body.CodePen,
                        Instagram: req.body.Instagram

                    }, function (err, userDB) { //then callback

                        if (err) throw err;

                        if (userDB) {

                            var godResponse = true;
                            res.send(godResponse);

                        } else {

                            var badResponse = false;
                            res.send(badResponse);
                        }

                    });

                //if the username found from db iquals to the new username input and the user id found from db is not iqual to this user id from the session then don't apply this changes 
            } else if (UserData.username == newUsrDataObj.username && UserData._id != req.session.userSession) {


                res.send("Sorry try another username, " + newUsrDataObj.username + " already exist!");
                return;

            }


            //if there is not username conincidences on the users collections db then apply this changes
        } else {

            ShemaUsers.findOneAndUpdate(

                {
                    /*condition, find all the users data in users collection where _id is iqual to 
                    req.session.userSession (in this case the user session is only storing the user id,
                     so the only value by default is _id)*/

                    _id: req.session.userSession

                }, {
                    //new data

                    fullname: req.body.fullname,
                    username: req.body.username,
                    profession: req.body.profession,
                    email: req.body.email,
                    phone: req.body.phone,
                    about: req.body.about,
                    facebook: req.body.facebook,
                    Twitter: req.body.Twitter,
                    Dribbble: req.body.Dribbble,
                    GitHub: req.body.GitHub,
                    Behance: req.body.Behance,
                    CodePen: req.body.CodePen,
                    Instagram: req.body.Instagram


                }, function (err, userDB) { //then callback

                    if (err) throw err;

                    if (userDB) {

                        var godResponse = true;
                        res.send(godResponse);
                    } else {
                        var badResponse = false;
                        res.send(badResponse);
                    }

                });
        }
    });
});
//ADD NEW PROFILE PIC
app.post('/setNewProfilePic', function (req, res) {

    var ProfUsrDataObj = {
        avatarPicture: req.body.picUrl
    };

    var userIDSession = req.session.userSession; //adding the user id from the session

    //VALIDATE THE INPUT DATA TYPES
    var contentObj = new ShemaUsers(ProfUsrDataObj);

    ShemaUsers.findOneAndUpdate(

        {
            /*condition, find all the users data in users collection where _id is iqual to 
            req.session.userSession (in this case the user session is only storing the user id,
             so the only value by default is _id)*/

            _id: userIDSession

        }, {
            //new data

            avatarPicture: req.body.picUrl


        }, function (err, userDB) { //then callback

            if (err) throw err;

            if (userDB) {
                var godResponse = true;
                res.send(godResponse);
            } else {
                var badResponse = false;
                res.send(badResponse);
            }

        });

});

//FIND ITEM FOR CHECKING FEATURES
app.post('/CheckItemsFeatures', function (req, res) {

    console.log("Searching item..");

   var itemObjReq = {
        ItemId: req.body.itemId
    };

    console.log("User id for items: " + itemObjReq.ItemId);

    ShemaItems.find({ _id: itemObjReq.ItemId }, function (err, ItemDb) {

        if (err) {
            res.send("errorFoundOnItemSearch");
            return;
        }

        if (!ItemDb || !ItemDb.length) {

            res.send(false);

        } else {

            res.send(ItemDb);

        }

    });

});
io.on('connection', function (socket) {

    socket.on('ThumbUpSocket', function (data) {

        var NewThumnObj = {
            SelectedItem: data.itemId,
            UserThumbUp: data.newThumbUp,
            indexId: data.indexId
        };

        ShemaItems.find({ _id: NewThumnObj.SelectedItem, likes: { ThumbUp: NewThumnObj.UserThumbUp } }, function (err, ItemDB) {
            // ShemaItems.findOne({ $text: { $search: "NewThumnObj.SelectedItem NewThumnObj.UserThumbUp" } }, function (err, ItemDB) {

            if (err) throw err;

            console.log("Results founded: " + ItemDB);

            if (!ItemDB || !ItemDB.length) {

                ShemaItems.findOneAndUpdate({ _id: NewThumnObj.SelectedItem }, { $push: { likes: { ThumbUp: NewThumnObj.UserThumbUp } } }, 'likes', function (err, res) {
                    console.log("like added");
                    if (err) throw err;
                    console.log(res.likes);
                    io.emit('listeningThumbsIncrease', NewThumnObj.indexId, res.likes.length);
                });

                //    ShemaItems.findOneAndUpdate({ _id: NewThumnObj.SelectedItem }, { $set: { colorLike: "indigo-text text-darken-4" } },'colorLike', function(err,res){
                //        io.emit('LikedColor', NewThumnObj.indexId, res.colorLike);
                //    });

            }

            else if (ItemDB) {

                ShemaItems.findOneAndUpdate({ _id: NewThumnObj.SelectedItem }, { $pull: { likes: { ThumbUp: NewThumnObj.UserThumbUp } } }, 'likes', function (err, res) {
                    console.log("like removed");
                    if (err) throw err;
                    console.log(res.likes);
                    io.emit('listeningThumbsDecrease', NewThumnObj.indexId, res.likes.length);
                });

                //    ShemaItems.findOneAndUpdate({ _id: NewThumnObj.SelectedItem }, { $set: { colorLike: "blue-grey-text text-lighten-4" } },'colorLike', function(err,res){
                //        io.emit('UnLikedColor', NewThumnObj.indexId, res.colorLike);
                //    });


                // ShemaItems.findByIdAndUpdate(
                //     NewThumnObj.SelectedItem, //find all elements with this id
                //     { $push: { likes: { ThumbUp: NewThumnObj.UserThumbUp } } }, //then set a new like value with the user id as an arry of objects
                //     function (err, newData) {

                //         if (err) throw err;

                //             ShemaItems.find(function (err, ItemDB) {
                //                 if (err) throw err;
                //                   console.log("like added");
                //                     io.emit('listeningThumbs', ItemDB);
                //                     //  res.send(ItemDB);
                //             });

                //     });

            }//end if

        });

    });
});




server.listen(3000, function () {
    console.log("Servidor corriendo en puerto 3000");
});