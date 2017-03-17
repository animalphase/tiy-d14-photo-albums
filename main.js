
// global config
var $mainContainer = $('#mainContainer');
var targetAlbum;

var albums = images.reduce(function(acc, image){
  if(acc.indexOf(image.album) >= 0) {

  } else {
    acc.push(image.album);
  }
  return acc;
}, []);


console.log(albums);

var albumLinks = albums.map(function(album, i, arry){
  return '<a class="album-link" href="#">' + album + '</a>';
});


var albumLinksString = albumLinks.join('');


function generateAblumLinksListString () {
  var content =   '<ul class="album-list">';
  albumLinks.forEach(function(albumLink, i, arr) {
      content += '<li>' +  albumLink + '</li>';
  });
      content += '</ul>';
  return content;
}

var ablumLinksListString = generateAblumLinksListString();



function setAlbumClickEvents() {
  $('.album-link').on('click', function(e) {
    targetAlbum = e.target.innerText;
    renderAlbum(targetAlbum);
  });
}



function insertNavMenu() {
  // build nav dom string
  var content =   '<nav>' +
                    '<a href="#" class="menu-link"><i class="fa fa-hand-o-left" aria-hidden="true"></i>&nbsp;&nbsp;Menu</a>' +
                    '<div class="nav-album-links">';
  // albumLinks.forEach(function(item){
  //     content += item; });
      content +=      ablumLinksListString;
      content +=    '</div>' +
                  '</nav>';

  // activate click events for all strings
  $mainContainer.prepend(content);
  $('.menu-link').on('click', function(){
    renderAlbumsPage($mainContainer);
  });
  setAlbumClickEvents();
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





function renderAlbumsPage() {
  console.log('inserting albums');
  var content =   '<header class="albums-header"><h1>My Albums</h1></header>' +
                  ablumLinksListString +
                  '</ul>';
  // make the elements as jquery elements
  // put those into the dom
  $mainContainer.html(content);
  $mainContainer.removeClass(); //remove all classes
  $mainContainer.addClass('albums-page');
  // after albums are in place, activate their event listeners
  setAlbumClickEvents();
  // register the event listener here, but refernce the callback elsewhere
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
  $mainContainer.removeClass(); //remove all classes
  $mainContainer.addClass('album-page');
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
  $mainContainer.removeClass(); //remove all classes
  $mainContainer.addClass('image-page');
  insertImageTopMenu();
}




// do the jQuery
$(document).ready(function(){


  renderAlbumsPage($mainContainer);
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
