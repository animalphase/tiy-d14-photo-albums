

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Global Config
+++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

var $g_mainContainer = $('#mainContainer');
var g_imagesPath = 'images/';
var g_currentAlbum; // "track state" kinda

var g_albums = images.reduce(function(acc, image){
  if(acc.indexOf(image.album) >= 0) {}
  else {
    acc.push(image.album);
  }
  return acc;
}, []);




function generateAblumLinksListString () {
  var content =   '<ul class="album-list">';
  g_albums.forEach(function(albumLink, i, arr) {
      content += '<li><a class="album-link" href="#">' +  albumLink + '</a></li>';
  });
      content += '</ul>';
  return content;
}
var g_albumsUlString = generateAblumLinksListString();


function returnImagesInAlbum(ablumToDisplay) {
  return images.filter(function(image, i, array){
    return image.album === ablumToDisplay;
  });
}




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Logic™, handled by event handlers
+++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


function clickAlbumsPageLink(e) {
  e.preventDefault();
  renderAlbumsPage(g_albumsUlString);
}


function clickAlbumLink(e) {
  e.preventDefault();
  g_currentAlbum = e.target.innerText;
  console.log(g_currentAlbum);

  renderAlbum(g_currentAlbum,
    g_currentAlbum,
    returnImagesInAlbum(g_currentAlbum),
    g_albumsUlString);
}


function clickImageLink(e) {
  e.preventDefault();
  var imagePath = e.target.src;
  renderImagePage(imagePath, g_currentAlbum);
}







/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Rendering Pages
+++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


function renderAlbumsPage(albumsUl) {

  // make the elements as jquery elements
  var $header = $('<header class="albums-header"><h1>My Albums</h1></header>');
  var $albumsUl = $(albumsUl);

  // put those into the dom
  $g_mainContainer.html('');
  $g_mainContainer.append($header);
  $g_mainContainer.append($albumsUl);
  $g_mainContainer.removeClass(); //remove all classes
  $g_mainContainer.addClass('albums-page');

  // after everything is in place, activate their event listeners
  $albumsUl.find('a').on('click', clickAlbumLink);
}



function renderAlbum(albumName, currentAlbum, albumImages, albumsUl) {

  var $nav = $(     '<nav>' +
                      '<a href="#" class="menu-link">Album Menu</a>' +
                      '<div class="nav-album-links">' +
                      '</div>' +
                    '</nav>' );
  var $albumsUL = $(albumsUl);
  $nav.append($albumsUL);


  var $content = $( '<div class="content-container"><h2 class="album-header"></h2></div>');
  $content.find('.album-header').append(
                    '<i class="fa fa-clone" aria-hidden="true"></i>&nbsp;&nbsp;' +
                    currentAlbum);

  // go through each image in this album and put it into the dom
  albumImages.forEach(function(image, i, array) {
    $content.append('<div class="image-thumbnail"><a href="#"><img src="'+ g_imagesPath + image.filename + '"></a></div>');
  });

  // reset page cotainer
  $g_mainContainer.html('');
  $g_mainContainer.removeClass(); //remove all classes

  // add the new
  $g_mainContainer.addClass('album-page');
  $g_mainContainer.prepend($nav);
  $g_mainContainer.append($content);





  // activate click events for all elements inserted by this module
  $nav.find('.menu-link').on('click', clickAlbumsPageLink);
  $albumsUL.find('a').on('click', clickAlbumLink);
  $('.image-thumbnail a').on('click', clickImageLink);
}






function renderImagePage(targetImage, _currentAlbum) {

  var $imageNav = $( '<nav>' +
                '<a href="#" class="menu-link">' +
                _currentAlbum +
                '</a>' +
                '</nav>' );

  var content = '<div class="content-container">' +
                '<img class="current-image" src="' +
                targetImage +
                '"></div>';

  $g_mainContainer.html('');
  $g_mainContainer.prepend($imageNav);
  $g_mainContainer.append(content);
  $g_mainContainer.removeClass(); //remove all classes
  $g_mainContainer.addClass('image-page');

  // activate click events for all elements inserted by this module
  $imageNav.find('.menu-link').on('click', clickAlbumLink);
}




// do the jQuery
$(document).ready(function(){

  renderAlbumsPage(g_albumsUlString);

});
