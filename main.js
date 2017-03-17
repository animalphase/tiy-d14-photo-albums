

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




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Logic™, handled by event handlers
+++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


function clickAlbumsPageLink(e) {
  renderAlbumsPage(g_albumsUlString);
}


function clickAlbumLink(e) {
  e.preventDefault();
  g_currentAlbum = e.target.innerText;
  renderAlbum(g_currentAlbum);
}



/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Generic Component Construction
+++++++++++++++++++++++++++++++++++++++++++++++++++++++ */



function insertNavMenu($targetParent) {
  var $nav = $( '<nav>' +
                  '<a href="#" class="menu-link"><i class="fa fa-hand-o-left" aria-hidden="true"></i>&nbsp;&nbsp;Album Menu</a>' +
                  '<div class="nav-album-links">' +
                  '</div>' +
                '</nav>' );
  var $albumUl = $(g_albumsUlString);
  $nav.append($albumUl);

  // activate click events for all strings
  $targetParent.prepend($nav);
  $nav.find('.menu-link').on('click', clickAlbumsPageLink);
  $albumUl.find('a').on('click', clickAlbumLink);
}



function insertImageTopMenu() {
  var content = '<nav>' +
                '<a href="#" class="menu-link"><i class="fa fa-hand-o-left" aria-hidden="true"></i>&nbsp;&nbsp;' +
                g_currentAlbum +
                '</a>' +
                '</nav>';
  $g_mainContainer.prepend(content);
  $('.menu-link').on('click', function(){
    renderAlbum(g_currentAlbum);
  });
}





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




function renderAlbum(albumName) {

  // generate content as jQuery elements
  var $content = $('<div class="content-container"><h2 class="album-header"></h2></div>');
  $content.find('.album-header').append(
    '<i class="fa fa-clone" aria-hidden="true"></i>&nbsp;&nbsp;' +
    g_currentAlbum);

    // TODO: do this first and this pass in
  // filter to only images in this album
  var imagesInAlbum = images.filter(function(image, i, array){
    return image.album === albumName;
  });

  // go through each image in this album and put it into the dom
  imagesInAlbum.forEach(function(image, i, array) {
    $content.append('<div class="image-thumbnail"><a href="#"><img src="'+ g_imagesPath + image.filename + '"></a></div>');
  });

  $g_mainContainer.html('');
  $g_mainContainer.append($content);
  $g_mainContainer.removeClass(); //remove all classes
  $g_mainContainer.addClass('album-page');
  $('.image-thumbnail a').on('click', renderImage);
  insertNavMenu($g_mainContainer);
}

function renderImage(e) {
  var imagePath = e.target.src;
  console.log('displaying image: ' + imagePath);
  $g_mainContainer.html('');
  var content = '<div class="content-container">' +
                '<img src="' +
                imagePath +
                '"></div>';
  $g_mainContainer.append(content);
  $g_mainContainer.removeClass(); //remove all classes
  $g_mainContainer.addClass('image-page');
  insertImageTopMenu();
}




// do the jQuery
$(document).ready(function(){


  renderAlbumsPage(g_albumsUlString);
  // insertAllImages();
  // renderAlbum('Album 1');

});
