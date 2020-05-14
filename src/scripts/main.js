function hiddenInput(form) {
  var arr = form.find(".select-dropDown");
  var fullStr = "";
  for (let i = 0; i < arr.length; i++) {
    fullStr += $(arr[i]).attr("data-value");
  }
  form.find(".hiddenInputForSelectors").attr("value", fullStr);
  //** функция записывает данные из псевдо-селекторов в скрытый инпут. при отправке данные с псевдо-селекторов отправятся в этом инпуте **/
}

$(document).ready(function () {
  $(document).on("click", ".select-controller", function () {
    $(this).next(".select-dropDown").fadeToggle();
    $(this).next(".select-dropDown").toggleClass("open");
  });

  $(document).on("click", ".select-dropDown__item", function () {
    var html = $(this).html();
    $(this).closest(".select-dropDown").fadeOut();
    $(this)
      .closest(".select-dropDown")
      .attr("data-value", html + "; ");

    $(this)
      .closest(".select-dropDown")
      .prev(".select-controller")
      .find(".label-view__placeholder")
      .hide();
    $(this)
      .closest(".select-dropDown")
      .prev(".select-controller")
      .find(".label-view__value")
      .show();
    $(this)
      .closest(".select-dropDown")
      .prev(".select-controller")
      .find(".label-view__value")
      .html(html);
    hiddenInput($(this).closest("form"));
  });

  $(document).mouseup(function (e) {
    var div = $(".select-dropDown.open");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      div.fadeOut();
      div.removeClass("open");
    }
  });

  if ($(".carousel-slider").length) {
    $(".carousel-slider:not(.carousel-slider_not)").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      adaptiveHeight: true,
      centerPadding: "0px",
      prevArrow:
        '<div class="carousel-slider__prev"><img style="transform: rotate(180deg);" src="assets/images/arrowSlider.png"></div>',
      nextArrow:
        '<div class="carousel-slider__next"><img src="assets/images/arrowSlider.png"></div>',
    });
  }


  if ($(".supaSlider-insideSlider").length) {
    $(".supaSlider-insideSlider").on("init", function (event, slick, currentSlide) {
      console.log(1);
      event.stopPropagation();
      
      var cur = $(slick.$slides[slick.currentSlide]),
        next = cur.next(),
        prev = cur.prev();
      prev.addClass("slick-sprev");
      next.addClass("slick-snext");
      cur.removeClass("slick-snext").removeClass("slick-sprev");
      slick.$prev = prev;
      slick.$next = next;
      var allSlides = $(event.target).find('.supaSlider-insideSlider__item:not(.slick-cloned)').length;
      if(allSlides.toString().length == 1){
        allSlides = '0' + allSlides;
      }
      $(event.target).closest('.supaSlider-item').find('.supaSlider-insideSliderBlock-num__all').html(allSlides);
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      event.stopPropagation();
      
      
      var cur = $(slick.$slides[nextSlide]);
      slick.$prev.removeClass("slick-sprev");
      slick.$next.removeClass("slick-snext");
      (next = cur.next()), (prev = cur.prev());
      prev.prev();
      prev.next();
      prev.addClass("slick-sprev");
      next.addClass("slick-snext");
      slick.$prev = prev;
      slick.$next = next;
      cur.removeClass("slick-next").removeClass("slick-sprev");
    })
    .on('afterChange', function(event, slick, currentSlide, nextSlide){
      event.stopPropagation();
      var curPlus = currentSlide + 1;
      var allSlides = $(event.target).find('.supaSlider-insideSlider__item:not(.slick-cloned)').length;
      if(currentSlide.toString().length == 1){
        var str = '0' + curPlus.toString();
      } else {
        var str = curPlus.toString();
      }
      $(event.target).closest('.supaSlider-item').find('.supaSlider-insideSliderBlock-num__current').html(str);
    });
    
    


    
    //**  **/
    
    /*$('.supaSlider').slick({
      slidesToScroll: 1,
      slidesToScroll: 1,
      infinite: false,
      selectOnFocus: false,
    })*/
    $(".supaSlider-insideSlider").slick({
      speed: 1000,
      arrows: false,
      dots: false,
      lazyLoad: 'ondemand',
      //prevArrow: $('.supaSlider-insideSliderBlock__prev'),
      //nextArrow: $('.supaSlider-insideSliderBlock__next'),
      infinite: true,
      centerMode: true,
      slidesPerRow: 1,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '0',
      /*swipe: true,*/
      customPaging: function(slider, i) {
        return '';
      },
    });

    $(document).on('click', '.supaSlider-insideSliderBlock__next', function(){
      $(this).closest('.supaSlider-item').find('.supaSlider-insideSlider').slick('slickNext');
    })
    $(document).on('click', '.supaSlider-insideSliderBlock__prev', function(){
      $(this).closest('.supaSlider-item').find('.supaSlider-insideSlider').slick('slickPrev');
    })

    $(".supaSlider").owlCarousel({
      items: 1,
      nav : true,
      pagination : false
    });
  }

  var elements = document.querySelectorAll(".slick-active"); // выбираем все элементы с нужным классом
  var first = elements[0]; // выбираем конкретно первый элемент (0) из массива
  first.classList.add("left-edge");
  $(".carousel-slider").on("afterChange", function (event,slick,currentSlide,nextSlide) {
    if ($(".left-edge").length) {
      $(".left-edge").removeClass("left-edge");
    }
    var elements = event.target.querySelectorAll(".slick-active"); // выбираем все элементы с нужным классом
    var first = elements[0]; // выбираем конкретно первый элемент (0) из массива
    first.classList.add("left-edge");
  }); // добавляем к нему класс


  $(document).on('click', '.tarifes-row-item:not(.tarifes-row-item_disabled)', function(){
    $(this).toggleClass('tarifes-row-item_active');
  })




  $(document).on('click', '.tarifes-list-item-row__minus', function(){
    var num = +$(this).next('.tarifes-list-item-row__item').html();
    if(num == 1){
      return false
    }
    num--;
    $(this).next('.tarifes-list-item-row__item').html(num.toString());
  });
  
  $(document).on('click', '.tarifes-list-item-row__plus', function(){
    var num = +$(this).prev('.tarifes-list-item-row__item').html();
    if(num == 20){
      return false
    }
    num++;
    $(this).prev('.tarifes-list-item-row__item').html(num.toString());
  });


  if($('.map').length){
    $('.map-main-baloon').each(function(){
      $(this).css('top', $(this).data('top') + '%');
      $(this).css('left', $(this).data('left') + '%');
      $(this).css('bottom', 'auto');
      $(this).css('right', 'auto');
    })
  }
});
