'use strict';

var articles = [];

function Article (works) {
  for(var key in works){
    this[key] = works[key];
  }
}

Article.prototype.toHtml = function(){
var source = $('#article-template').html();
var templateRender = Handlebars.compile(source);
var content = articles;
return templateRender(this);
}

this.daysAgo = parseInt((new Date() - new Data(this.publishedOn))/60/60/24/1000);
this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';


projectsArray.sort(function(nextObject,currentObject) {
  return(new Date(nextObject.publishedOn)) - (new Date(currentObject.publishedOn));
});

projectsArray.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
