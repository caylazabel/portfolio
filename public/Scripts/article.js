'use strict';

// var articles = [];

function Article (works) {
  for (var key in works){
    this[key] = works[key];
  }
}

Article.all = [];

Article.prototype.toHtml = function(){
  let template =
Handlebars.compile($('#article-template').text());


this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
// this.body = marked(this.body);

return template(this);
};

Article.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  })

rawData.forEach(function(ele) {
  Article.all.push(new Article(ele));
})
}


 Article.fetchAll = function() {
   if (localStorage.rawData) {
     var parsedData = JSON.parse(localStorage.rawData);
     Article.loadAll(parsedData);
     worksViewed.initIndexPage();

   } else {

$.ajax({
  type: 'GET',
  url: '/data/works.json'
}).done(function(data) {
  localStorage.works = JSON.stringify(data);
  Article.loadAll(data);
  worksViewed.initIndexPage();
});
   }
 };
