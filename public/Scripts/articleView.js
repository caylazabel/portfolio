'use strict';

(function(module){
 worksViewed = {};

worksViewed.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

worksViewed.initNewArticlePage = function() {
  $('.tab-content').show();
  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });

  $('#new-form').on('change', 'input, textarea', worksViewed.create);
};

worksViewed.create = function() {
  let article;
  $('#projects').empty();

article: new Article({
  title: $('#article-title').val(),
  author: $('#article-author').val(),
  projectLink: $('#project-url').val(),
  category: $('#article-categoty').val(),
  body: $('#article-body').val(),
  publishedOn: $('#article-published:checked').length ? new Date() : null
});

$('#projects').append(article.toHtml());
// $('pre code').each(function(i, block) {
//   hljs.highlightBlock(block);
// });

$('#export-field').show();
$('#article-json').val(`${JSON.stringify(article)},`);
};

worksViewed.initIndexPage = function() {
  Article.all.forEach(function(a) {
    $('#projects').append(a.toHtml())
  });

  worksViewed.handleMainNav();
};

module.worksViewed = worksViewed;
})(window); 
