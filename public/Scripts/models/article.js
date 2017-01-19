'use strict';


(fuction(contents) {
function Article (works) {

  Object.keys(works).forEach(e => this[e] = works[e]);

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

Article.loadAll = rows  => {
  rows.sort((a,b)) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
  Article.all = rows.map(ele => new Article(ele));
};


// Article.loadAll = function(rawData) {
//   rawData.sort(function(a,b) {
//     return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
//   })
//
// rawData.forEach(function(ele) {
//   Article.all.push(new Article(ele));

Article.fetchAll = callback => {
  $.get('/articles/all')
  .then(
    results => {
      if (results.rows.length) {
        Article.loadAll(results.rows);
        callback();
      } else {
        $.getJSON('./data/works.json')
        .then(rawData => {
          rawData.forEach(item => {
            let article = new Article(item);
            article.insertRecord();
          })
        })
        .then(() => Article.fetchAll(callback))
        .catch(console.error);
      }
    }
  )
};


//chained together  map and a reduce call to get a rough count of all the words in all the articles.
Article.numberWordsAll = () => {
  return Article.all.map(function(article){
    return article.body.split(' ').length;}).reduce(function(a,b){
      return a + b;
    });
};

//chained together map and reduce call to produce an array of unique author names.
Article.allAuthors = () => {
  return Article.all.map(function(article){
    return article.author;
  }).reduce(function(a, b) {
    if(!a.includes(b)){
      a.push(b);
    }
    return a;
  }, []);
};

Article.numberWordsByAuthor = () => {
  return Article.allAuthors().map(author => {
    return {
      name: author,
      numberWords: Article.all.filter(function(article){
        return article.author === author;
      }).map(function(article){
        return article.body.split(' ').length;}).reduce((function(a, b){
          return a + b;
        })
      })
    })
  };

  Article.stats = () => {
    return {
      numArticles: Article.all.length,
      numWords: Article.numberWordsAll(),
      Authors: Article.allAuthors(),
    }
  };

  Article.truncateTable = callback => {
    $.ajax({
      url: '/articles/truncate',
      method: 'DELETE',
    })
    .then(console.log)
    .then(callback);
  };

  Article.prototype.insertRecord = function(callback){
    $.post('/article/inser', {author: this.author, projectLink: this.projectLink, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
    .then(console.log)
    .then(callback);
  };

  Article.prototype.deleteRecord = function(callback){
    $.ajax({
      url: '/articles/delete',
      method: 'DELETE',
      data: {id: this.article_id}
    })
    .then(console.log)
    .then(callback);
  };
//
Article.prototype.updateRecord = funciton(callback) {
  $.ajax({
    url: '/articles/delete',
    method: 'DELETE',
    data: {
      author: this.author,
      projectLink: this.projectLink,
      body: this.body,
      category: this.category,
      publishedOn: this.publishedOn,
      title: this.title,
      id: this.article_id}
  })
  .then(console.log)
  .then(callback);
};
//  Article.fetchAll = function() {
//    if (localStorage.rawData) {
//      var parsedData = JSON.parse(localStorage.rawData);
//      Article.loadAll(parsedData);
//      worksViewed.initIndexPage();
//
//    } else {
//
// $.ajax({
//   type: 'GET',
//   url: '/data/works.json'
// }).done(function(data) {
//   localStorage.works = JSON.stringify(data);
//   Article.loadAll(data);
//   worksViewed.initIndexPage();
// });
//    }
//  };
//
contents.Article = Article;
})(window)
