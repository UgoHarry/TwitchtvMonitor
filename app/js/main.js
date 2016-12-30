
var profiles = ["freecodecamp", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster 404"];

$(function() {

  //ON FIRST LOAD
  $(window).one('load',function () {  //TODO: CHANGE EVENT TO 'ONE' INSTEAD OF 'ON', SO IT ONLY FIRES ON THE FIRST LOAD
     for (var i = 0; i < profiles.length; i++) {
       //API CALL TO LIST USER DETAILS
      $.getJSON("https://api.twitch.tv/kraken/channels/"+profiles[i]+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", profiles, function allChannels(data) {
        listBuild(data);  //USING GENERIC LIST BUILDER

        //API CALL TO ADD FURTHER DETAILS EG. STREAMING
       $.getJSON("https://api.twitch.tv/kraken/streams/"+data.name+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", function(info) {
         if (info.stream) { //IF USER ACCOUNT IS CURRENTLY STREAMING
           $(".tw-channel-info #"+data.name)
             .empty()
             .addClass("streamy")
             .append("Streaming "+info.stream.game);
         }
       });
      });
    }
  });

  //ON CLICKING 'ONLINE' TAB
  $("#stream-online").click(function() {
    $(".tw-status ul li a").removeClass("active");
    $(this).addClass("active");
    $(".tw-channels ul").empty();  //CLEAR OUT THE LIST
    for (var i=0; i < profiles.length; i++) {
      $.getJSON("https://api.twitch.tv/kraken/streams/"+profiles[i]+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", function (data) {
        if (data.stream) {
          listBuild(data);
          //MODIFY GENERIC BUILD TO DISPLAY RECEIVED DATA
          $(".tw-channel-link").attr("href", data.stream.channel.url);
          $(".tw-channel-logo").css("background-image", "url("+data.stream.channel.logo+")");
          $(".tw-channel-info h3").empty().append(data.stream.channel.name);
          $(".tw-channel-info p").empty().removeClass().addClass("streamy").append("Streaming "+data.stream.channel.game);

        }
      });
    }
  });

  //ON CLICKING THE 'ALL' TAB
  $("#stream-all").click(function () {
    $(".tw-status ul li a").removeClass("active");
    $(this).addClass("active");
    $(".tw-channels ul").empty();  //CLEAR OUT THE LIST
     for (var i = 0; i < profiles.length; i++) {
       //API CALL TO LIST USER DETAILS
      $.getJSON("https://api.twitch.tv/kraken/channels/"+profiles[i]+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", profiles, function allChannels(data) {
        listBuild(data);

        //API CALL TO ADD STREAMING DETAILS
       $.getJSON("https://api.twitch.tv/kraken/streams/"+data.name+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", function(info) {
         if (info.stream) {
           $(".tw-channel-info #"+data.name)
             .empty()
             .addClass("streamy")
             .append("Streaming "+info.stream.game);
         }
       });
      });
    }
  });


  //ON CLICKING THE 'OFFLINE' TAB
  $("#stream-offline").click(function () {
    $(".tw-status ul li a").removeClass("active");
    $(this).addClass("active");
    $(".tw-channels ul").empty();  //CLEAR OUT THE LIST
     for (var i = 0; i < profiles.length; i++) {
       //API CALL TO LIST USER DETAILS
      $.getJSON("https://api.twitch.tv/kraken/channels/"+profiles[i]+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", function (data) {
        listBuild(data);
        //console.log(data);

        //API CALL TO DETERMINE CURRENTLY STREAMING CHANNELS
         $.getJSON("https://api.twitch.tv/kraken/streams/"+data.name+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", function(info) {
           console.log (info);
           if(info.stream) {  // IF CHANNEL IS STREAMING, REMOVE FROM LIST
             $(".tw-channel-info #"+info.stream.channel.name).parents("li").remove();
           }

         });
      });
    }
  });



  //ON USING THE SEARCH BAR
  $(".tw-search-form").submit(function (e) {
    e.preventDefault();
    $(".tw-channels ul").empty();
    var $userVal = $(".search-box").val(); //GET USERNAME FROM SEARCH BAR
    $.getJSON("https://api.twitch.tv/kraken/channels/"+$userVal+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", function (data){
      console.log(data);
      listBuild(data);
      $.getJSON("https://api.twitch.tv/kraken/streams/"+data.name+"?client_id=oida5subsidggrybymbnrjn8rrhmyn&callback=?", function(info) {
        console.log(info);
        if (info.stream) {
          $(".tw-channel-info #"+data.name)
            .empty()
            .addClass("streamy")
            .append("Streaming "+info.stream.game);
         }
      });
    });

  });




  //GENERIC LIST BUILDER FUNCTION
  function listBuild(data) {
    var $list = $("<li>");
    var $link = $("<a class='tw-channel-link'>");
    var $logo = $("<div class='tw-channel-logo'>");
    var $streamStatus = $("<p>").attr("id", data.name).append("Offline");
    var $noStream = $("<p class ='warning'>Account may have been closed.</p> ");
    if (data.name) {
      var $nameStat = $("<div class='tw-channel-info'>").append($("<h3>").append(data.name)).append($streamStatus);
    } else {
      var $nameStat = $("<div class='tw-channel-info'>").append($("<h3>").append("Channel does not exist")).append($noStream);

    }
    var $status = $("<div class='tw-channel-status'>");
    $logo.css("background-image", "url("+data.logo+")");
    $link.attr("href", data.url);
    $link
      .append($logo)
      .append($nameStat)
      .append($status);
    $list.append($link);

    $(".tw-channels ul").append($list);
  }



});
