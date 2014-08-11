/*
    
  This file contains general Javascript for website.
      
  In comments:
  < /> means "end of"
  @author: Ashraf Samhouri <ashrafperformance@gmail.com> - skype: ashrafsamhouri
    
  In this file, you will find: (copy title and search for it if you want to quickly reach it)
  - Typeahead Suggestion Handler (Formatter)
  - Placeholders for input/textarea
  - Focus state for append/prepend inputs
  - Datepicker Activation
  - Typeahead Data Sources
  - Calendar Icon Activation
  
*/

/* Typeahead Suggestion Handler (Formatter) */
function typeaheadSuggestion(obj) {
  if (obj.type == 'sep') {
    return '<div class="tt-sep">'+ obj.value +'</div>';
  } else if (obj.type == 'airport') {
    return '<div class="tt-suggestion airport"><p><img src="'+ obj.flag +'" class="flag" alt="">'+ obj.value +'</p></div>';
  } else if (obj.type == 'city') {
    return '<div class="tt-suggestion city"><p><img src="'+ obj.flag +'" class="flag" alt="">'+ obj.value +'</p></div>';
  } else {
    return '<div class="tt-suggestion">'+ obj.value +'</div>';
  }
}
/* < /> Typeahead Suggestion Handler (Formatter) */

// Some Variables      
var citiesList, airportsAndCities;

$(document).ready(function() {
    /* Placeholders for input/textarea */
    $(":text, textarea").placeholder();
    /* < /> Placeholders for input/textarea */

    
    /* Focus state for append/prepend inputs */
    $('.input-group').on('focus', '.form-control', function () {
      $(this).closest('.input-group, .form-group').addClass('focus');
    }).on('blur', '.form-control', function () {
      $(this).closest('.input-group, .form-group').removeClass('focus');
    });
    /* < /> Focus state for append/prepend inputs */


    /* Datepicker Activation */
    var datepickerSelector = '.datepicker';
    $(datepickerSelector).datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      dateFormat: "d MM, yy",
      yearRange: '-1:+1',
      numberOfMonths: 2
    }).prev('.btn').on('click', function (e) {
      e && e.preventDefault();
      $(datepickerSelector).focus();
    });
    $.extend($.datepicker, {_checkOffset:function(inst,offset,isFixed){return offset}});

    $(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.input-group-btn').find('.btn').outerWidth()});
    /* < /> Datepicker Activation */

      
    /* Typeahead Data Sources */
    // Airports and Cities Data Source
    airportsAndCities = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: 'query-typeahead.json?'+ Math.round((new Date()).getTime() / 1000),
      limit: 8
    });
    airportsAndCities.initialize();
    
    // Cities Only Data Source  
    citiesList = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: 'query-typeahead-cities.json?'+ Math.round((new Date()).getTime() / 1000),
      limit: 8
    });   
    citiesList.initialize();
    /* < /> Typeahead Data Sources */
    
    /* Calendar Icon Activation */
    $('.fui-calendar').click(function() {
      $(this).parents('.input-group').find('.datepicker').focus();
      return false;
    });
    /* < /> Calendar Icon Activation */
});
