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

/* Convenience function to generate an image URL */
function generateThumbnailUrl(youtubeId) {
  return 'http://i3.ytimg.com/vi/' + youtubeId + '/default.jpg';
}

/* Convenience function to generate the embed URL
  that we can put in an iframe. */
function generateEmbedUrl(youtubeId) {
   return 'http://www.youtube.com/embed/' + youtubeId;
}

/* Adds a video to the list */
function addVideoToList(video) {
  var videoLink = $('<a>');
  videoLink.append(video.title);
  var linkUrl = videoLink.attr('href');
  var thumbnailUrl = generateThumbnailUrl(video.youtubeId);
  var thumbnailImg = $('<img>');
  thumbnailImg.attr('src', thumbnailUrl);
  videoLink.append(thumbnailImg);

  /* On click, we'll make a modal with the title and video iframe */
  videoLink.on('click', function(e) {
      e.preventDefault();

      var videoTitle = $('<h2>');
      videoTitle.html(video.title + ' <small>' + video.author + '</small>');
      var videoEmbed = $('<iframe></iframe>');
      videoEmbed.attr('src', generateEmbedUrl(video.youtubeId));
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

  for (var i = 0; i < videosJSON.length; i++) {
    addVideoToList(videosJSON[i]);
  }
});