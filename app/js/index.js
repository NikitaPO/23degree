$(function() {
  const showSlides = 7;
  const scrollSlides = 5;
  const allSlides = $(".slider__item").length;
  const slider = $(".slider__items");

  slider.slick({
    infinite: false,
    slidesToShow: showSlides,
    slidesToScroll: scrollSlides,
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
  //   var amount = slick.slideCount;
  //   $(".slider__range").attr('max',amount);
  // })
  //
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

});
