// EXERCISE INSTRUCTIONS: http://gdichicago.com/classes/js205/exercises/1-models.html

/* We could also load this data in using AJAX from the server.*/
var videosJSON = [
  {"youtubeId": "TddFnTB_7IM",
    "title": "Trip through the 80s",
    "author": "meliberty"
  },
  {"youtubeId": "oOlDewpCfZQ",
   "title": "Four Chords",
   "author": "axisofawesome"
  },
  {"youtubeId": "il2IrgFHfsg",
    "title": "The Ooooh Cat",
    "author": "RnBTree"
  },
  {"youtubeId": "epUk3T2Kfno",
    "title": "Otters Holding Hands",
    "author": "cynthiaholmes"
  }
];


// MY MODELS AND COLLECITONS

// Model: videoModel
function VideoModel(video) {
  this.youtubeId = video.youtubeId;
  this.title = video.title;
  this.author = video.author;
  this.thumbnail = 'http://i3.ytimg.com/vi/' + video.youtubeId + '/default.jpg';
  this.url = 'http://www.youtube.com/embed/' + video.youtubeId;
}

// Collection: videoCollection
function VideoCollection(videos) {
  // define static scope for `each` method
  var self = this;
  this.items = [];

  // get fancy and use $.each instead of a for loop
  $.each( videos, function( index, key ) {
    // instantiate model for each item and push into items array
    self.items.push( new VideoModel( videos[index] ) );
    //console.log( new VideoModel( videos[index] ) );
  } );
}

/* Adds a video to the list */
function addVideoToList(video) {
  var videoLink = $('<a>');
  videoLink.append(video.title);
  var linkUrl = videoLink.attr('href');
  var thumbnailUrl = video.thumbnail;
  //var thumbnailUrl = generateThumbnailUrl(video.youtubeId);
  var thumbnailImg = $('<img>');
  thumbnailImg.attr('src', thumbnailUrl);
  videoLink.append(thumbnailImg);

  /* On click, we'll make a modal with the title and video iframe */
  videoLink.on('click', function(e) {
      e.preventDefault();

      var videoTitle = $('<h2>');
      videoTitle.html(video.title + ' <small>' + video.author + '</small>');
      var videoEmbed = $('<iframe></iframe>');
      // use the property created in the 
      //videoEmbed.attr('src', generateEmbedUrl(video.youtubeId));
      videoEmbed.attr( 'src', video.url );
      videoEmbed.attr('width', 560);
      videoEmbed.attr('height', 315);

      $('.video-modal').remove();
      var videoModal = $('<div class="video-modal">');
      videoModal.append(videoTitle);
      videoModal.append(videoEmbed);
      $('body').append(videoModal);
  });

  var videoItem = $('<li>');
  videoItem.append(videoLink);
  $('#videos-list').append(videoItem);
}


$(document).ready(function() {
  /* Sorts the list of videos by title */
  videosJSON.sort(function(videoA, videoB) {
    // String.localeCompare is a great way to compare two strings alphabetically
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    return videoA.title.localeCompare(videoB.title);
  });

  // Instantiate the Collection
  var videos = new VideoCollection(videosJSON);

  for( var j = 0; j < videos.items.length; j++ ) {
    //console.log( 'videos.items['+j+']: ', videos.items[j] );
    addVideoToList( videos.items[j] );
  }



});