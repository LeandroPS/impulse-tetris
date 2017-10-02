var points = 0;
var all = 0;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getDuration(level, fell){
  var seconds = fell? 750: 5000;
  
  var stackHeight = $("div.content."+level+" div.inner div.question.stuck").size()*75;
//  var frameHeight =  (new_height = Math.floor($(".content.play").outerHeight()/75)*75) + 50;
  
  var frameHeight =  575;
  
  var height = frameHeight - stackHeight;
  
  var duration = Math.ceil((seconds*height)/frameHeight);
  console.log("duration: "+duration);

  return duration;
}

function next(){
  var index = $("article.show").index() +1;
  $("article.show").removeClass("show").addClass("gone");
  //$("article").removeClass("show");
  $("article:nth-child("+(index+1)+")").addClass("show");
}

//function nextBasicAnimation(){
//  all++;
//  var height = $("div.content.basic div.inner div.question.stuck").size()*75;
//  if(height+75<$(".content.play").outerHeight()){
//    $("div.content.basic div.inner div.question:not(.stuck):not(.correct)").first().addClass("current").animate({bottom: height}, getDuration("basic", false), "linear", function(){
//      $(this).addClass("stuck");
//      nextBasicAnimation();
//    });
//  }else{
//    setTimeout(function(){
//      $("article.show").removeClass("show").addClass("gone");
//      $("article.oops-1").removeClass("gone").addClass("show");
//    }, 2500);
//  }
//  
//  if($("div.content.basic div.inner div.question:not(.stuck):not(.correct)").size()==0 && (height+75<$(".content.play").outerHeight())){
//    setTimeout(next, 2500);
//    
//  }
//}
//
//function nextMediumAnimation(){
//  all++;
//  var height = $("div.content.medium div.inner div.question.stuck").size()*75;
//  if(height+75<$(".content.play").outerHeight()){
//    $("div.content.medium div.inner div.question:not(.stuck):not(.correct)").first().addClass("current").animate({bottom: height}, getDuration("medium", false), "linear", function(){
//      $(this).addClass("stuck");
//      nextMediumAnimation();
//    });
//  }else{
//    setTimeout(function(){
//      $("article.show").removeClass("show").addClass("gone");
//      $("article.oops-2").removeClass("gone").addClass("show");
//    }, 2500);
//  }
//  
//  if($("div.content.medium div.inner div.question:not(.stuck):not(.correct)").size()==0 && (height+75<$(".content.play").outerHeight())){
//    setTimeout(next, 2500);
//    
//  }
//}
//
//function nextAdvancedAnimation(){
//  all++;
//  var height = $("div.content.advanced div.inner div.question.stuck").size()*75;
//  if(height+75<$(".content.play").outerHeight()){
//    $("div.content.advanced div.inner div.question:not(.stuck):not(.correct)").first().addClass("current").animate({bottom: height}, getDuration("advanced", false), "linear", function(){
//      $(this).addClass("stuck");
//      nextAdvancedAnimation();
//    });
//  }else{
//    setTimeout(function(){
//      $("article.show").removeClass("show").addClass("gone");
//      $("article.oops-3").removeClass("gone").addClass("show");
//    }, 2500);
//  }
//  
//  if($("div.content.advanced div.inner div.question:not(.stuck):not(.correct)").size()==0 && (height+75<$(".content.play").outerHeight())){
//    setTimeout(next, 2500);
//    
//  }
//}

function nextAnimation(levelName){
  all++;
  var height = $("div.content."+levelName+" div.inner div.question.stuck").size()*75;
  if(height+75<$(".content.play").outerHeight()){
    $("div.content."+levelName+" div.inner div.question:not(.stuck):not(.correct)").first().addClass("current").animate({bottom: height}, getDuration(levelName, false), "linear", function(){
      $(this).addClass("stuck");
      nextAnimation(levelName);
    });
  }else{
    setTimeout(function(){
      $("article.show").removeClass("show").addClass("gone");
      $("article.oops-"+levelName).removeClass("gone").addClass("show");
    }, 2500);
  }
  
  if($("div.content."+levelName+" div.inner div.question:not(.stuck):not(.correct)").size()==0 && (height+75<$(".content.play").outerHeight())){
    setTimeout(next, 2500);
    
  }
}

function increasePoints(){
  points = points+1;
  $("span.points").text(points);
}

$(function(){
  
  //new_height = Math.floor($(".content.play").outerHeight()/$("div.inner div.question").first().outerHeight());
  new_height = Math.floor($(".content.play").outerHeight()/75)*75;
  
//  var levels = [basic_questions, medium_questions, advanced_questions];
//  
//  var levelNames = ["basic", "medium", "advanced"];
  
  var levels = [stage_1, stage_2, stage_3, stage_4, stage_5];
  
  var levelNames = ["stage-1", "stage-2", "stage-3", "stage-4", "stage-5"]; 
  
  $.each(levels, function( levelIndex, level) {
    $.each(level, function( index, question ) {
      var cont = jQuery("<div></div>").addClass("question");
      var statement = jQuery("<span></span>").html(question.statement).addClass("statement").appendTo(cont);

      var ul = jQuery("<ul></ul>").addClass("answers");
      
      var shuffled_options = shuffle(question.options);
      $.each(shuffled_options, function( index, option ) {
        var li = jQuery("<li></li>").addClass(option.correct? "correct": "wrong").text(option.text).appendTo(ul);
      });

      ul.appendTo(cont);

      //$("div.content.basic div.inner")
      cont.appendTo("div.content."+levelNames[levelIndex]+" div.inner");
    });
    
  });
  
  
  
  
  console.log($("span.advice").outerHeight());
  $(".content.play").height(new_height + 50);
  
  $("div.inner div.question").css("bottom", $(".content.play").outerHeight());
  
  $("button.start").click(function(){
    next();
    nextAnimation($(this).attr("data-stage"));
  });
  
//  $("button.start.basic").click(function(){
//    next();
//    nextBasicAnimation();
//  });
  
  $("div.inner div.question").css("bottom", $(".content.play").outerHeight());
  
//  $("button.start.medium").click(function(){
//    next();
//    nextMediumAnimation();
//  });
  
  $("div.inner div.question").css("bottom", $(".content.play").outerHeight());
  
//  $("button.start.advances").click(function(){
//    next();
//    nextAdvancedAnimation();
//  });
  
//  $("div.content.basic div.inner div.question:not(.stuck) ul li.correct").click(function(){
//    if(!$(this).parents(".question").hasClass("stuck")){
//      increasePoints();
//      $(this).parents("div.question").stop(true, false).addClass("correct");
//      nextBasicAnimation();
//    }
//  });
//  
//  $("div.content.medium  div.inner div.question:not(.stuck) ul li.correct").click(function(){
//    if(!$(this).parents(".question").hasClass("stuck")){
//      increasePoints();
//      $(this).parents("div.question").stop(true, false).addClass("correct");
//      nextMediumAnimation();
//    }
//  });
//  
//  $("div.content.advanced div.inner div.question:not(.stuck) ul li.correct").click(function(){
//    if(!$(this).parents(".question").hasClass("stuck")){
//      increasePoints();
//      $(this).parents("div.question").stop(true, false).addClass("correct");
//      nextAdvancedAnimation();
//    }
//  });
  
  $("div.content div.inner div.question:not(.stuck) ul li.correct").click(function(){
    var stage = $(this).parents("article").attr("data-stage");
    if(!$(this).parents(".question").hasClass("stuck")){
      increasePoints();
      $(this).parents("div.question").stop(true, false).addClass("correct");
      nextAnimation(stage);
    }
  });
  
//  $("div.question:not(.stuck) ul li:not(.correct)").click(function(){
//    if(!$(this).parents(".question").hasClass("stuck")){
//      $(this).parents(".question").addClass("stuck");
//      $(this).addClass("clicked");
//    }
//  });
  
//  $("div.content.basic div.inner div.question:not(.stuck) ul li:not(.correct)").click(function(){
//    console.log("gotcha");
//    if(!$(this).parents(".question").hasClass("stuck")){
//      var height = $("div.content.basic div.inner div.question.stuck").size()*75;
//      
//      $(this).parents(".question").addClass("stuck");
//      $(this).addClass("clicked");
//      
//      
//      $(this).parents(".question").stop(false, false).animate({bottom: height}, getDuration("basic", true), "linear", function(){
//        nextBasicAnimation();
//      });
//    }
//  });
//  
//  $("div.content.medium div.inner div.question:not(.stuck) ul li:not(.correct)").click(function(){
//    console.log("gotcha");
//    if(!$(this).parents(".question").hasClass("stuck")){
//      var height = $("div.content.medium div.inner div.question.stuck").size()*75;
//      
//      $(this).parents(".question").addClass("stuck");
//      $(this).addClass("clicked");
//      
//      
//      $(this).parents(".question").stop(false, false).animate({bottom: height}, getDuration("medium", true), "linear", function(){
//        nextBasicAnimation();
//      });
//    }
//  });
//  
//  $("div.content.advanced div.inner div.question:not(.stuck) ul li:not(.correct)").click(function(){
//    console.log("gotcha");
//    if(!$(this).parents(".question").hasClass("stuck")){
//      var height = $("div.content.advanced div.inner div.question.stuck").size()*75;
//      
//      $(this).parents(".question").addClass("stuck");
//      $(this).addClass("clicked");
//      
//      
//      $(this).parents(".question").stop(false, false).animate({bottom: height}, getDuration("advanced", true), "linear", function(){
//        nextBasicAnimation();
//      });
//    }
//  });
  
  $("div.content div.inner div.question:not(.stuck) ul li:not(.correct)").click(function(){
    console.log("gotcha");
    
    var stage = $(this).parents("article").attr("data-stage");
    if(!$(this).parents(".question").hasClass("stuck")){
      var height = $("div.content."+stage+" div.inner div.question.stuck").size()*75;
      
      $(this).parents(".question").addClass("stuck");
      $(this).addClass("clicked");
      
      
      $(this).parents(".question").stop(false, false).animate({bottom: height}, getDuration(stage, true), "linear", function(){
        nextAnimation(stage);
      });
    }
  });
  
  $("a.call").click(function(){
    $(this).text("(22) 2725-0872");
  });
  
  $("button.share-with-friends").click(function(){
    FB.ui({method: 'apprequests',
      message: 'Você consegue me superar?'
    }, function(response){
      console.log(response);
    });
  });
  
  $("button.messenger").click(function(){
    window.open('fb-messenger://share?link=' + encodeURIComponent("https://leandrops.github.io/impulse-tetris") + '&app_id=' + encodeURIComponent("1390117537752614"));
  });
});