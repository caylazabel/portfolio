'use strict';

(function(module) {
  const workController = {};

  workController.init = function(){

    Article.fetchAll(articleView.initIndexPage);
    $('.tab-content').hide();
    $('#articles').fadeIn();
  }

  module.workController = workController;
})(window);
