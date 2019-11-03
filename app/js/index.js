$(function() {
  const showSlides = 7;
  const scrollSlides = 5;
  const slidersCount = $(".slider__item").length;
  const slider = $(".slider__items");

  slider.slick({
    infinite: true,
    slidesToShow: showSlides,
    slidesToScroll: scrollSlides,
    autoplay: true,
    autoplaySpeed: 2000,
    appendArrows: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  })

  // $(slider).on('init reInit',function(event,slick){
  //   $(".slider__range").attr('max', slidersCount);
  // })
  // $(slider).on('afterChange',function(e,slick,currentSlide){
  //   $(".slider__range").val(currentSlide+1);
  // })
  //
  // $(".slider__range").on('input change',function(){
  //   $(slider).slick('slickGoTo',this.value-1);
  // });
  //
  // $(slider).slick({
  //   slidesToShow:2,
  //   arrows:false,
  //   dots:false
  // })

  $('a[href^="#"').click(function() {
    event.preventDefault();
    let target = $(this).attr('href');
    $('html').animate({
      scrollTop: $(target).offset().top
    }, 800)
  });

  $('.header__nav-wrapper, .header__menu-close-btn').click( () => {
    $('.header__nav').animate({
      'right': '-260px'
    }, 500);
    setTimeout( () => {
      $('.header__nav-wrapper').toggleClass('not-active');
    }, 500);
  });

  $('.header__menu-burger').click(() => {
    $('.header__nav-wrapper').toggleClass('not-active');
    $('.header__nav').animate({
      'right': '0'
    }, 500);
  })

});
