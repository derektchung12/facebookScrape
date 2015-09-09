facebookDB = new Mongo.Collection("facebookDB");

if (Meteor.isClient) {
  Meteor.startup(function () {
    // code to run on server at startup

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1626691117585937',
        xfbml      : true,
        version    : 'v2.4'
      });

      // FB.getLoginStatus(function (response) {
      //       if (response.authResponse) {
      //           //$('#AccessToken').val(response.authResponse.accessToken);
      //           console.log(response.authResponse.accessToken);
      //       } else {
      //           // do something...maybe show a login prompt

      //           console.log("access token error");
      //       }
      //   });
    };



    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  });//Meteor.startup


  Template.body.helpers({
    pages: function () {
        return facebookDB.find({});
    }
  });


  // Template.body.helpers({
  //   tasks: function () {
  //       return Tasks.find({}, {sort: {createdAt: -1}});
  //     }
  //   },
  //   hideCompleted: function () {
  //     return Session.get("hideCompleted");
  //   }
  // });


  Template.body.events({

    //when "new-task" form is called.
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var page_identifier = event.target.text.value;

      // Meteor.call("getAccessToken", function(error, accessToken){
      //   console.log(accessToken);
      // })

      //console.log(FB.getAuthResponse()['accessToken']);

      //  FB.getLoginStatus(function (response) {
      //   if (response.status === 'connected') {
      //       var accessToken = response.authResponse.accessToken;
      //   }
      // });

      var access_token = 'CAACEdEose0cBAGzziDjxhHPhOCQJbUZBuNjI8OYOgvH1F6mxpc80IuZBEkicFjYqan6PhDCS5L51zkto3xThoRRA6znQy1DEJXmAG7UeJ8jeU1y6pG2yzVIzsDsU3TXdlxSoFzuk36lZCVuT8ozASatZAaHdbHFqUEvvsVqOl1E1WAcEVhTp3fMUDZAMuyG91EIospcoSzwZDZD';
      var get_command = '/' + page_identifier + "?fields=name,posts{comments,message}&access_token=" + access_token;

      console.log("Something is happenning");

      FB.api(
        //GET_command + "&access_token=" + "access_token"
        //"/PepsiUS?fields=name,about&access_token=CAACEdEose0cBABkfqUpiAB1xSHh645rCr2dpsrt6bss3JJTc3KVZA5rUWgWeNrQxCoTHRDPh7tChvKe6uxBfKiiCAJEacbPAnBN8hxrJRl9HTS3UZAV8X7v8P5avcsyJQ5q4OQZAZAMEGBB1Bq0kyNjG8oqeDy7p6hDSLZCJLMFzzBIRZA8LTZAcFV5Cxg51vhZCATcFCW0UYAZDZD",

        get_command,

        function (response) { 
          if (response && !response.error) {
            console.log(response);
            
            // JSON.stringify(response);
            // page_data = JSON.parse(response);

            console.log(response.posts.data[0].message);

            facebookDB.insert(response);




            return response;
          }

          else{
            return response.error;
          }
        }
      );


//       obj = JSON.parse(text);
// document.getElementById("demo").innerHTML =
// obj.employees[1].firstName + " " + obj.employees[1].lastName;

//       page_data = JSON.parse()

      // facebookDB.insert({
      //   text: text,
      //   createdAt: new Date(), // current time
      // });



      // Meteor.call('sendLogMessage', page_identifier, function(err,response) {
      //   //console.log(response.constructor);
      //   if(err) {
      //     console.log("error");
      //     return;
      //   }
      //   console.log(response);
      // });

      // console.log(response);
 
      // Clear form
      event.target.text.value = "";
    }
  });

  Template.fb_page.events({
    "click .delete": function () {
      facebookDB.remove(this._id);
    }
  });

  // Meteor.methods({
  //   'sendLogMessage': function(page_identifier){

  //     //return "test_check";
  //     // var access_token = 'CAACEdEose0cBAB9gZBdZBhWmZCTmGhB2mneDyMZAZBTPab2NZAhLJbKORxXWZB6nuz3w7OJmLDqHtl1Ea0oUrndcGJZASIdn2QNbSWp5mP15acaZApyZCbg9uYOYkSBmXjmLYIN5t1wKLsjXTH7w9r6crkp7wWsjyglX2q7PtmzZCFpBcVa1E0POjZB9CGz36HMEh8oWmTMbJbtd3wZDZD';
  //     // var get_command = '/' + page_identifier + "?fields=name,about&access_token=" + access_token;

  //     // FB.api(
  //     //   //GET_command + "&access_token=" + "access_token"
  //     //   //"/PepsiUS?fields=name,about&access_token=CAACEdEose0cBABkfqUpiAB1xSHh645rCr2dpsrt6bss3JJTc3KVZA5rUWgWeNrQxCoTHRDPh7tChvKe6uxBfKiiCAJEacbPAnBN8hxrJRl9HTS3UZAV8X7v8P5avcsyJQ5q4OQZAZAMEGBB1Bq0kyNjG8oqeDy7p6hDSLZCJLMFzzBIRZA8LTZAcFV5Cxg51vhZCATcFCW0UYAZDZD",

  //     //   get_command,

  //     //   function (response) { 
  //     //     if (response && !response.error) {
  //     //       console.log(response);
  //     //       return response;
  //     //     }

  //     //     else{
  //     //       return response.error;
  //     //     }
  //     //   }
  //     // );
  //   }//sendLogMessage
  // });//Meteor.methods

  //console.log(result);
  // window.fbAsyncInit = function() {
  //       FB.init({
  //         appId      : '1626691117585937',
  //         xfbml      : true,
  //         version    : 'v2.4'
  //       });


  //       var access_token = "CAACEdEose0cBAJuDGSA24o4BOM40Q5KhIHbA9u6YE84FfRM26UhYTq32s0ysKK4ZChVJTWhsuIHvusrlF9uJuGkQbZATr0TiAyB941oHR2aHdDHIIhEJ697ZCFxbd3qg9Mi0aBYz9KT7gDo7vZAKfq944ycKVcVbwAGNmt4Kq4DbhJFLwDqwaQpgaO1T3MtE49ZB7ZBlZA4LwZDZD";
  //       var get_command = "/PepsiUS" + "?fields=name,about&access_token=" + access_token; 

  //       //console.log(get_command);




  //       FB.api(
  //         //GET_command + "&access_token=" + "access_token"
  //         //"/PepsiUS?fields=name,about&access_token=CAACEdEose0cBAJuDGSA24o4BOM40Q5KhIHbA9u6YE84FfRM26UhYTq32s0ysKK4ZChVJTWhsuIHvusrlF9uJuGkQbZATr0TiAyB941oHR2aHdDHIIhEJ697ZCFxbd3qg9Mi0aBYz9KT7gDo7vZAKfq944ycKVcVbwAGNmt4Kq4DbhJFLwDqwaQpgaO1T3MtE49ZB7ZBlZA4LwZDZD",
          
  //         get_command,

  //         function (response) { 
  //           if (response && !response.error) {
  //             console.log(response); 

  //           }

  //           else{
  //             console.log(response.error);
  //           }
  //         }
  //       );

  //     };

  //     (function(d, s, id){
  //        var js, fjs = d.getElementsByTagName(s)[0];
  //        if (d.getElementById(id)) {return;}
  //        js = d.createElement(s); js.id = id;
  //        js.src = "//connect.facebook.net/en_US/sdk.js";
  //        fjs.parentNode.insertBefore(js, fjs);
  //      }(document, 'script', 'facebook-jssdk'));

  // meteor.methods({
  //   'scrapeFacebookPage': function()


  // });

}


if (Meteor.isServer) {
  
  Meteor.methods({

    // getAccessToken : function() {
    //   try {
    //     console.log("getAccessToken called");
    //     console.log(Meteor.user().services.facebook.accessToken);
    //     return Meteor.user().services.facebook.accessToken;
    //   } catch(e) {
    //     console.log("exception caught");
    //     return null;
    //   }
    //}
  //   'sendLogMessage': function(parameter_1){
  //       FB.api(
  //       //GET_command + "&access_token=" + "access_token"
  //       "/PepsiUS?fields=name,about&access_token=CAACEdEose0cBABkfqUpiAB1xSHh645rCr2dpsrt6bss3JJTc3KVZA5rUWgWeNrQxCoTHRDPh7tChvKe6uxBfKiiCAJEacbPAnBN8hxrJRl9HTS3UZAV8X7v8P5avcsyJQ5q4OQZAZAMEGBB1Bq0kyNjG8oqeDy7p6hDSLZCJLMFzzBIRZA8LTZAcFV5Cxg51vhZCATcFCW0UYAZDZD",

  //       get_command,

  //       function (response) { 
  //         if (response && !response.error) {
  //           console.log(response); 
  //         }

  //         else{
  //           console.log(response.error);
  //         }
  //       }
  //     );
  //   }//sendLogMessage
  });//Meteor.methods
}//Meteor.isServer