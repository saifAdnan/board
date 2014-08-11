/*
    
  This file contains Javascript for Homepage.
      
  In comments:
  < /> means "end of"
  @author: Ashraf Samhouri <ashrafperformance@gmail.com> - skype: ashrafsamhouri
    
  In this file, you will find: (copy title and search for it if you want to quickly reach it)
  - Homepage Agencies Slider 
  - Homepage Destinations Slider
  - Return To Different Location Checkbox
  - Add/Remove City Via Links
  - Search Panel Tabs
  - Homepage Reviews Fading Slider
  - Mailing List Field Placeholder Disappearal On Focus
  - Car + Driver Handle Trip Type Change
  - Pick Up and Drop Off Locations Typeahead
  - Homepage Typeahead: Pick Up and Drop Off
      
*/
    
$(document).ready(function() {
      $("select").selectpicker({style: 'btn btn-white', menuStyle: 'dropdown-inverse'});
      
      /* Homepage Agencies Slider */
      if ($('.agencies-slider ul').length > 0) {
        var agenciesSlider = $('.agencies-slider ul').bxSlider({
          responsive: true,
          minSlides: 1,
          maxSlides: 8,
          slideWidth: 140,
          slideMargin: 15,
          controls: false,
          pager: false,
          auto: true,
          touchEnabled: false
        });
        
        $('.agencies-slider .slider-left-arrow a').click(function() {
          agenciesSlider.goToPrevSlide();
          return false;
        });
        
        $('.agencies-slider .slider-right-arrow a').click(function() {
          agenciesSlider.goToNextSlide();
          return false;
        });
      }
      /* < /> Homepage Agencies Slider */
      
      
      /* Homepage Destinations Slider */
      if ($('.destinations-slider ul').length > 0) {
        var destinationsSlider = $('.destinations-slider ul').bxSlider({
          responsive: true,
          minSlides: 1,
          maxSlides: 4,
          slideWidth: 200,
          slideMargin: 15,
          controls: false,
          pager: false
        });      
        
        $('.destinations-slider .slider-left-arrow a').click(function() {
          destinationsSlider.goToPrevSlide();
          return false;
        });
        
        $('.destinations-slider .slider-right-arrow a').click(function() {
          destinationsSlider.goToNextSlide();
          return false;
        });
      }
      /* < /> Homepage Destinations Slider */
      
      
      /* Return To Different Location Checkbox */
      $('#return-different').on('toggle', function() {
        if ($(this).is(':checked')) {
          $('.drop-off-location-row').show();
        } else {
          $('.drop-off-location-row').hide().find('.form-control').val('');
        }
      });
      /* < /> Return To Different Location Checkbox */
      
      
      /* Add/Remove City Via Links */
      $('.add-city-via').click(function() {
        lastCityVia = $('.city-via-model').prev();
        if (lastCityVia.length > 0 && lastCityVia.hasClass('city-via')) {
          var via = parseInt(lastCityVia.attr('data-via')) + 1;
        } else {
          var via = 1;
        }
        
        cityViaModel = $('.city-via-model').clone(true);
        cityViaModel.removeClass('city-via-model').attr('data-via', via).find('.via-num').text(via);
        cityViaModel.find('.form-control').typeahead(null, {
          name: 'pick-up-location',
          displayKey: 'value',
          source: citiesList.ttAdapter(),
          templates: { suggestion: typeaheadSuggestion }
        });
        
        $('.city-via-model').before(cityViaModel);
        $('.remove-city-via-container').show();
        return false;
      });
      
      $('.remove-city-via').click(function() {
        lastCityVia = $('.city-via-model').prev();
        if (lastCityVia.length > 0 && lastCityVia.hasClass('city-via')) {
          lastCityVia.remove();
        }
        if ($('.city-via').length == 1) $('.remove-city-via-container').hide();
        return false;
      });
      /* < /> Add/Remove City Via Links */
      
      
      /* Search Panel Tabs */
      $('.search-tabs .car-rental-tab a').click(function() {
        $('.search-tabs li').removeClass('active');
        $(this).parent().addClass('active');
        $('.car-and-driver').fadeOut('medium', function() {
          $('.car-rental').fadeIn('medium');
        });
        return false;
      });      
      
      $('.search-tabs .car-and-driver-tab a').click(function() {
        $('.search-tabs li').removeClass('active');
        $(this).parent().addClass('active');
        $('.car-rental').fadeOut('medium', function() {
          $('.car-and-driver').fadeIn('medium');
        });
        return false;
      });
      /* < /> Search Panel Tabs */
      
      /* Homepage Reviews Fading Slider */
      function nextReview() {
        review = reviews.shift();
        reviews.push(review);
        $('.recommendations .agency img').fadeOut('medium', function() {
          $(this).attr('src', review.logo).fadeIn('medium');
        });
        
        $('.recommendations .agency .city').fadeOut('medium', function() {
          $(this).text(review.city).fadeIn('medium');
        });
        
        $('.recommendations .review').fadeOut('medium', function() {
          $(this).text(review.review).fadeIn('medium');
        });
        
        $('.recommendations .reviewer').fadeOut('medium', function() {
          $(this).text(review.reviewer).fadeIn('medium');
        });
        
        $('.recommendations .rating .stars > div').removeClass('stars-1').removeClass('stars-2').removeClass('stars-3').removeClass('stars-4').removeClass('stars-5');
        $('.recommendations .rating .stars > div').addClass('stars-'+ review.stars);
        
        setTimeout(function() {
          nextReview();
        }, 5000);
      }
      
      function firstReview() {
        review = reviews.shift();
        reviews.push(review);
        $('.recommendations .agency img').attr('src', review.logo);
        $('.recommendations .agency .city').text(review.city);
        $('.recommendations .review').text(review.review);
        $('.recommendations .reviewer').text(review.reviewer);
        $('.recommendations .rating .stars > div').removeClass('stars-1').removeClass('stars-2').removeClass('stars-3').removeClass('stars-4').removeClass('stars-5');
        $('.recommendations .rating .stars > div').addClass('stars-'+ review.stars);
        
        setTimeout(function() {
          nextReview();
        }, 5000);
      }
      
      firstReview();
      /* < /> Homepage Reviews Fading Slider */
      
      
      /* Mailing List Field Placeholder Disappearal On Focus */
      $('.mailing-list .form-control').focus(function() {
        $(this).attr('placeholder', '');
      }).blur(function() {
        $(this).attr('placeholder', 'Enter your e-mail to get more offers');
      });
      /* < /> Mailing List Field Placeholder Disappearal On Focus */
      
      
      /* Pick Up and Drop Off Locations Typeahead */
      if($('#pick-up-location').length > 0) {
        $('#pick-up-location').typeahead(null, {
          name: 'pick-up-location',
          displayKey: 'value',
          source: airportsAndCities.ttAdapter(),
          templates: { suggestion: typeaheadSuggestion }
        });
      }    
      
      if($('#pick-up-location-2').length > 0) {
        $('#pick-up-location-2').typeahead(null, {
          name: 'pick-up-location-2',
          displayKey: 'value',
          source: airportsAndCities.ttAdapter(),
          templates: { suggestion: typeaheadSuggestion }
        });
      }    
      
      if($('#drop-off-location').length > 0) {
        $('#drop-off-location').typeahead(null, {
          name: 'drop-off-location',
          displayKey: 'value',
          source: airportsAndCities.ttAdapter(),
          templates: { suggestion: typeaheadSuggestion }
        });
      }    
      
      if($('#drop-off-location-2').length > 0) {
        $('#drop-off-location-2').typeahead(null, {
          name: 'drop-off-location-2',
          displayKey: 'value',
          source: airportsAndCities.ttAdapter(),
          templates: { suggestion: typeaheadSuggestion }
        });
      }
      /* < /> Pick Up and Drop Off Locations Typeahead */
      
      
      /* Car + Driver Handle Trip Type Change */
      $('#trip-type-select').on('change', function() {
        if ($(this).val() == 1) {
          $('.car-and-driver .duration-col').fadeOut('medium', function() {
            $('.car-and-driver .passengers-col').removeClass('col-xs-6').addClass('col-xs-12');
          });
          $('.car-and-driver .remove-add-city-via-col').fadeOut('medium');
          $('.car-and-driver .return-trip-col').fadeOut('medium');
          $('#pick-up-location-2').attr('placeholder', 'Enter Airport or City');
          $('#drop-off-location-2').attr('placeholder', 'Enter Airport or City');
          $('.city-via').fadeOut('medium');
          
          $('#pick-up-location-2').typeahead('destroy');
          $('#pick-up-location-2').typeahead(null, {
            name: 'pick-up-location-2',
            displayKey: 'value',
            source: airportsAndCities.ttAdapter(),
            templates: { suggestion: typeaheadSuggestion }
          });
          
          $('#drop-off-location-2').typeahead('destroy');
          $('#drop-off-location-2').typeahead(null, {
            name: 'drop-off-location-2',
            displayKey: 'value',
            source: airportsAndCities.ttAdapter(),
            templates: { suggestion: typeaheadSuggestion }
          });
        } else if ($(this).val() == 2) {
          $('.car-and-driver .passengers-col').addClass('col-xs-6').removeClass('col-xs-12');
          $('.car-and-driver .duration-col').fadeIn('medium');
          $('.car-and-driver .remove-add-city-via-col').fadeOut('medium');
          $('.car-and-driver .return-trip-col').fadeOut('medium');
          $('#pick-up-location-2').attr('placeholder', 'Enter City');
          $('#drop-off-location-2').attr('placeholder', 'Enter City (Optional)');
          $('.city-via').fadeOut('medium');
          
          $('#pick-up-location-2').typeahead('destroy');
          $('#pick-up-location-2').typeahead(null, {
            name: 'pick-up-location-2-cities',
            displayKey: 'value',
            source: citiesList.ttAdapter(),
            templates: { suggestion: typeaheadSuggestion }
          });
          
          $('#drop-off-location-2').typeahead('destroy');
          $('#drop-off-location-2').typeahead(null, {
            name: 'drop-off-location-2-cities',
            displayKey: 'value',
            source: citiesList.ttAdapter(),
            templates: { suggestion: typeaheadSuggestion }
          });
        } else if ($(this).val() == 3) {
          $('.car-and-driver .passengers-col').addClass('col-xs-6').removeClass('col-xs-12');
          $('.car-and-driver .duration-col').fadeIn('medium');
          $('.car-and-driver .remove-add-city-via-col').fadeIn('medium');
          $('.car-and-driver .return-trip-col').fadeIn('medium');
          $('#pick-up-location-2').attr('placeholder', 'Enter Airport or City');
          $('#drop-off-location-2').attr('placeholder', 'Enter Airport or City');
          $('.city-via').fadeIn('medium');
          
          $('#pick-up-location-2').typeahead('destroy');
          $('#pick-up-location-2').typeahead(null, {
            name: 'pick-up-location-2',
            displayKey: 'value',
            source: airportsAndCities.ttAdapter(),
            templates: { suggestion: typeaheadSuggestion }
          });
          
          $('#drop-off-location-2').typeahead('destroy');
          $('#drop-off-location-2').typeahead(null, {
            name: 'drop-off-location-2',
            displayKey: 'value',
            source: airportsAndCities.ttAdapter(),
            templates: { suggestion: typeaheadSuggestion }
          });
        } else if ($(this).val() == 4) {
          $('.car-and-driver .passengers-col').addClass('col-xs-6').removeClass('col-xs-12');
          $('.car-and-driver .duration-col').fadeIn('medium');
          $('.car-and-driver .remove-add-city-via-col').fadeOut('medium');
          $('.car-and-driver .return-trip-col').fadeOut('medium');
          $('#pick-up-location-2').attr('placeholder', 'Enter Airport or City');
          $('#drop-off-location-2').attr('placeholder', 'Enter Airport or City');
          $('.city-via').fadeOut('medium');
          
          $('#pick-up-location-2').typeahead('destroy');
          $('#pick-up-location-2').typeahead(null, {
            name: 'pick-up-location-2',
            displayKey: 'value',
            source: airportsAndCities.ttAdapter(),
            templates: { suggestion: typeaheadSuggestion }
          });
          
          $('#drop-off-location-2').typeahead('destroy');
          $('#drop-off-location-2').typeahead(null, {
            name: 'drop-off-location-2',
            displayKey: 'value',
            source: airportsAndCities.ttAdapter(),
            templates: { suggestion: typeaheadSuggestion }
          });
        }
        
        $('.car-and-driver .duration-col .select').hide();
        $('.car-and-driver .duration-col .select.trip-type-'+ $('#trip-type-select').val()).css('display', 'inline-block');
      });
      
      $('#trip-type-select').val('1').trigger('change');
      /* < /> Car + Driver Handle Trip Type Change */
            
    });