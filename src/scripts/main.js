$.fn.toggleText = function(t1, t2){
  if (this.text() == t1) this.text(t2);
  else                   this.text(t1);
  return this;
};
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

  $(document).on('click', '.supaSlider-insideSlider_chainHead .slick-current .supaSlider-insideSlider__item-content:not(.supaSlider-insideSlider__item-content_back) .children-supa__btn', function(e){
    e.preventDefault();
    $(this).closest('.slick-current').addClass('rotate')
  })

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
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        }
      }]
    });
  }

  if($('.SL6-SLIDER').length){

    $('.SL6-SLIDER').owlCarousel({
      items: 1,
      nav: true,
      center:true,
      loop:true,
    })
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
      
      if($(event.target).hasClass('supaSlider-insideSlider_chainHead')){
        $('.supaSlider-insideSlider_chain').slick('slickGoTo', nextSlide);
      }
    })
    .on('afterChange', function(event, slick, currentSlide){
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
    $(".supaSlider-insideSlider").each(function(){
      if($(this).hasClass('supaSlider-insideSlider_chainHead')){
        $(this).slick({
          speed: 1000,
          arrows: false,
          dots: false,
          lazyLoad: 'ondemand',
          infinite: true,
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0',
          draggable: false,
          responsive: [{
            breakpoint: 767,
            settings: {
              dots: true
            }
          }],
          customPaging: function(slider, i) {
            return '';
          },
        });
      }
      $(this).slick({
        speed: 1000,
        arrows: false,
        dots: false,
        lazyLoad: 'ondemand',
        //prevArrow: $('.supaSlider-insideSliderBlock__prev'),
        //nextArrow: $('.supaSlider-insideSliderBlock__next'),
        infinite: true,
        centerMode: true,
        /*slidesPerRow: 1,*/
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '0',
        /*swipe: true,*/
        draggable: false,
        /*asNavFor: $(this).closest('.supaFitnes').length ? $(this).closest('.supaFitnes').find('.supaSlider-insideSlider_chain') : null,*/
        customPaging: function(slider, i) {
          return '';
        },
      });
    })



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

  if($(".slick-active").length){
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

  }


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

  if($('.group-slider').length){
    $('.group-slider').owlCarousel({
      items: 1,
      nav : true,
      pagination : false,
      mouseDrag: false
    })

    $('.group-slider-item-galery-slider1').each(function(){
      $(this).slick({
        slidesToShow: 1,
        arrows: false,
        asNavFor: $(this).closest('.group-slider-item').find('.group-slider-item-galery-slider2'),
      })
    })
    $('.group-slider-item-galery-slider2').each(function(){
      $(this).slick({
        slidesToShow: 3,
        arrows: false,
        focusOnSelect: true,
        asNavFor: $(this).closest('.group-slider-item').find('.group-slider-item-galery-slider1'),
      })
    })
  }


  if(screen.width < 768 && $('.team-wrap').length){
    $('.team-wrap').slick({
      slidesToShow: 2,
      dots: true,
      responsive: [{
        breakpoint: 450,
        settings: {
          slidesToShow: 1
        }
      }]
    })
  }

  $(document).on('click', '.shedule-tabs__tab:not(.active)', function(e){
    e.preventDefault();
    var curTab = $(this).attr('href');
    curTab = curTab.slice(1);
    var html = $(this).html();

    $('.shedule-tabs__tab.active').removeClass('active');
    $('.shedule-main-item.active').removeClass('active');

    $(this).addClass('active');
    $('.shedule-main-item#' + curTab).addClass('active');
    
    $(this).closest('.shedule-wrap').find('.shedule__placeholder').html(html);
  })


  $(document).on('click', '.shedule-arr__next', function(){
    if($(this).closest('.shedule').find('.shedule-tabs__tab.active').next().length){
      $(this).closest('.shedule').find('.shedule-tabs__tab.active').next().click();
    }
  })
  $(document).on('click', '.shedule-arr__prev', function(){
    if($(this).closest('.shedule').find('.shedule-tabs__tab.active').prev().length){
      $(this).closest('.shedule').find('.shedule-tabs__tab.active').prev().click();
    }
  })

  if($('.newYear-row').length && screen.width < 1024){
    $('.newYear-row').owlCarousel({
      items: 1,
      nav : true,
      pagination : false,
      mouseDrag: false
    })
  }

  $(document).on('click', '.team-item__btn', function(){
    $(this).toggleText('Подробнее', 'Назад');
    $(this).prev('.team-item-content').toggleClass('opacity1');
  })
});
