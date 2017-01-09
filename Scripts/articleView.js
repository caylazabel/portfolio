'use strict';

var worksViewed = {};

worksViewed.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

$(document).ready(function() {
  worksViewed.handleMainNav();
});
