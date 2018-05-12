/**
 * Created by tkasa on 11/05/2018.
 */
document.getElementById('myForm').addEventListener('submit', saveBookmark);
function saveBookmark(e) {

  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  var bookmark= {
      name: siteName,
      url: siteURL
  };
/*
    localStorage.setItem('test', 'Hello my dear!');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
*/

  if(localStorage.getItem('bookmarks') === null){
      var bookmarks = [];
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }else{
       bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //add to array
      bookmarks.push(bookmark);
      //reset it back to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
    fetchBookmarks();

   e.preventDefault();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i= 0; i<bookmarks.length; i++){
    if(bookmarks[i].url == url){
        bookmarks.splice(i,1);
    }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output
    var bookmarkResults = document.getElementById('bookmarkResults');
        bookmarkResults.innerHTML = '';
        for(var i=0; i<bookmarks.length; i++){
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
            bookmarkResults.innerHTML +=
                '<div class="well">'+
                '<h3>' + name +
                ' <a class="btn btn-default" target="_blank" href=" ' +url+ '"> Visit</a> ' +
                '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="">Delete</a> ' +
                '</h3>' +
                '</div>';
        }

}