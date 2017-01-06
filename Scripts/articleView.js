'use strict';

var worksViewed = {};

worksViewed.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = `<option value="${val}">${val}</option>`;
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = `<option value ="${val}">${val}</option>`;
      $(`#category-filter option[value="${val}"']`).length === 0
       {
        $('#category-filter').append(optionTag);
    }
   }
 });
 };

 worksViewed.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

worksViewed.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

worksViewed.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};


  worksViewed.populateFilters();
  worksViewed.handleCategoryFilter();
  worksViewed.handleAuthorFilter();
  worksViewed.handleMainNav();
