$("#submit").click(function(e) {
  e.preventDefault();
  var term = document.getElementById('term').value;

  getArticleList(term);
});

function getArticleList(term) {
  var html = "";
  var wikilink = "https://en.wikipedia.org/?curid="
  var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&format=json&exsentences=1&exintro=&explaintext=&generator=search&gsrlimit=10&gsrsearch=" + term;
  $.ajax({
    url: url,
    type: "get",
    dataType: "JSONP",
    success: function(data) {
      var results = data.query.pages;
      var pgs = Object.keys(results);
      pgs.forEach(function(page) {
        var title = results[page].title;
        var text = results[page].extract;
        var pagelink = wikilink + results[page].pageid;

        html += '<a href="' + pagelink + '" class="btn btn-default" id="result-button" target="_blank">' + '<h3 id="title">' + title + '</h3><br>' + '<p id="text">' + text + '</p>' + '</a><br> ';
      });

      $('#display').html(html);
    }
  });
}