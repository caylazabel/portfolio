'use strict';

var articleViews = {};

articleViews.handleMainNav = function (){
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    var clickedTab = $(this).attr('data-content');
    $('section[id="' + clickedTab + '"]').fadeIn();
  });
  $('.main-nav .tab:first').click();
}
