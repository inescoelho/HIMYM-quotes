$(document).ready(function() {
  //get quote (from url or random)
  getQuote(getUrlVars()["q"]);
    
  // Removes focus of the button on click
  $(".mybtn").click(function(event) {
    $(this).blur();
  });
});

//get quote from index on random
function getQuote(index) {
  //get json files with quotes
  $.getJSON("https://gist.githubusercontent.com/inescoelho/4a2e848480d2026121f8d5c600ee3c66/raw/f2d2d3dab0d5aded5686b462dcfad7028116e693/HIMYM_quotes.json", function(json) {
    //get array of quotes
    var array = json.quotes;
    
    //get quote index
    var index = (index? index : Math.floor(Math.random()*(array.length+1)));
      
    //update text and author
    $(".quoteText").html(array[index].text);
    $(".quoteAuthor").html(array[index].name);
    //update tweet button
    setTweetText(array[index].text, array[index].name, index);
    });
}

//create new tweet button with quote information
function setTweetText(text, name, index) {
  var txt = name + ": " + text;
  if(txt.length > 116)
    txt = txt.slice(0, 113)+ "...";
  
    // Remove existing iframe
    $('#tshare iframe').remove();
    // Generate new markup
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
    //    .attr('data-url', 'http://www.inescoelho.info/HIMYM-quotes?q=' + index)
		.attr('data-url', 'http://www.inescoelho.info/HIMYM-quotes')
        .attr('data-size', 'large') 
        .attr('data-text', txt);
    $('#tshare').append(tweetBtn);
    twttr.widgets.load();
}

//get url query parameters
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  
  return vars;
}