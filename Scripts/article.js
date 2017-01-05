'use strict';

var articles = [];

function Article (works) {
  this.author = works.author;
  this.category = works.category;
  // this.imageUrl = works.imageUrl;
  this.projectLink = works.projectLink;
  this.publishedOn = works.publishedOn;
  this.body = works.body;
  this.title = works.title;
}

Article.prototype.toHtml = function () {
  var $newArticle = $('article.template').clone();
  $newArticle.attr('data-category', this.category);
  $newArticle.find('a').html(this.author);
  $newArticle.find('a')
  $newArticle.find('h1 a')
              .html(this.title)
              .attr('href', this.projectLink);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time[pubdate]').attr('title',this.publishedOn);
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newArticle.removeAttr('class');

  return $newArticle;
};

projectsArray.sort(function(currentObject, nextObject){
  return(new Date(nextObject.publishedOn)) -(new Date(currentObject.publishedOn));
});

projectsArray.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
