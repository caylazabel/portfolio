(function() {
  const adminView = {
    
    initAdminPage : () => {
      let template = Handlebars.compile($('#author-template').text());
      Article.numberWordsByAuthor().forEach(stat => {
        $('.author-stats').append(template(stat));
      });
      $('#blog-stats .articles').text(Article.all.length);
      $('#blog-stats .words').text(Article.numberWordsAll());
    }
  };

  Article.fetchAll(adminView.initAdminPage);
})();
