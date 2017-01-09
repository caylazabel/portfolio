'use strict';

var articles = [];

function Article (works) {
  for (var key in works){
    this[key] = works[key];
  }
}

Article.prototype.toHtml = function(){
var source = $('#article-template').html();
var templateRender = Handlebars.compile(source);



this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

return templateRender(this);
};

projectsArray.sort(function(a,b) {
  return(new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectsArray.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
