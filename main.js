console.log('hi');

// global config
var $mainContainer = $('#mainContainer');
var targetAlbum;







var albumLinks = albums.reduce(function(acc, item, i, array) {
  return acc += '<a href="#">' + item + '</a>';
}, '' );

function insertNavMenu() {
  var content = '<nav>' +
                '<a href="#" class="menu-link"><i class="fa fa-hand-o-left" aria-hidden="true"></i>&nbsp;&nbsp;Menu</a>' +
                '<div class="nav-album-links">' +
                albumLinks +
                '</div>' +
                '</nav>';
  $mainContainer.prepend(content);
  $('.menu-link').on('click', function(){
    renderAlbums($mainContainer);
  });
  $('.nav-album-links a').on('click', function(e) {
    targetAlbum = e.target.innerText;
    renderAlbum(targetAlbum);
  });
}



function insertImageTopMenu() {
  var content = '<nav>' +
                '<a href="#" class="menu-link"><i class="fa fa-hand-o-left" aria-hidden="true"></i>&nbsp;&nbsp;' +
                targetAlbum +
                '</a>' +
                '</nav>';
  $mainContainer.prepend(content);
  $('.menu-link').on('click', function(){
    renderAlbum(targetAlbum);
  });
}


function setAlbumClickEvents() {
  $('.album-link').on('click', function(e) {
    targetAlbum = e.target.innerText;
    renderAlbum(targetAlbum);
  });
}



function renderAlbums(targetElement) {
  console.log('inserting albums');
  var content = '<header class="albums-header"><h1>My Albums</h1></header>' +
                '<ul class="album-list">';
  for(var i = 0; i < albums.length; i++) {
    content += '<li><a class="album-link" href="#">'+ albums[i] +'</a></li>';
  }
  content += '</ul>';
  targetElement.html(content);
  // after albums are in place, activate their event listeners
  setAlbumClickEvents();
}




function renderAlbum(albumName) {
  console.log('inserting images in album: ' + albumName);
  var path = 'images/';
  var content = '<div class="content-container">' +
                '<h2><i class="fa fa-clone" aria-hidden="true"></i>&nbsp;&nbsp;' +
                targetAlbum + '</h2>';

  // filter to only images in this album
  var imagesInAlbum = images.filter(function(image, i, array){
    return image.album === albumName;
  });

  // go through each image in this album and put it into the dom
  imagesInAlbum.forEach(function(image, i, array) {
    content += '<div class="image-thumbnail"><a href="#"><img src="'+ path + image.filename + '"></a></div>';
  });
  content += '</div>';
  $mainContainer.html(content);
  $('.image-thumbnail a').on('click', renderImage);
  insertNavMenu();
}

function renderImage(e) {
  var imagePath = e.target.src;
  console.log('displaying image: ' + imagePath);
  $mainContainer.html('');
  var content = '<div class="content-container">' +
                '<img src="' +
                imagePath +
                '"></div>';
  $mainContainer.append(content);
  insertImageTopMenu();
}













// do the jQuery
$(document).ready(function(){


  renderAlbums($mainContainer);
  // insertAllImages();
  // renderAlbum('Album 1');



});




// function insertAllImages() {
//   console.log('inserting all images');
//   var path = 'images/';
//   var content = '<div class="image-thumbnail-container">';
//   images.forEach(function(image, i, array) {
//     content += '<div class="image-thumbnail"><img src="'+ path + image.filename + '"></div>';
//   });
//   content += '</div>';
//   $mainContainer.html(content);
// }
