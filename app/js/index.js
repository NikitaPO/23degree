$(function() {
  const showSlides = 7;
  const scrollSlides = 3;
  const slidersCount = $(".slider__item").length;
  const slider = $(".slider__items");

  slider.slick({
    infinite: true,
    slidesToShow: showSlides,
    slidesToScroll: scrollSlides,
    autoplay: true,
    autoplaySpeed: 1500,
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
      $('.header__nav-wrapper').addClass('not-active');
    }, 500);
  });

  $('.header__menu-burger').click(() => {
    $('.header__nav-wrapper').removeClass('not-active');
    $('.header__nav').animate({
      'right': '0'
    }, 500);
  });

  $('.price__box-btn').click( function() {
    $('.price__box-btn').removeClass('active');
    $(this).addClass('active')
  });

  $('.price__box-btns .def__btn').click( function() {
    $('.price__box-btns .def__btn').removeClass('active');
    $(this).addClass('active')
  });

//расчет стоимости
  $('.price__box-btn, .price__box-btns .def__btn').click( function() {
    let activePackage = $('.price__box-btns .def__btn.active').text();
    let areaPrice = document.querySelector('.price__box-btn.active').className;
    areaPrice = 1000 * areaPrice.match(/\d+/g);
    let metersCost;

    if (activePackage === "Light") {
      metersCost = 100;
    } else if (activePackage === "Medium") {
      metersCost = 250;
    } else if (activePackage === "Full") {
      metersCost = 400;
    };

    let objectCost = metersCost * areaPrice;

    $('.price__area').text(addSpaces(areaPrice));
    $('.price__meters-cost').text(addSpaces(metersCost));
    $('.price__object-cost').text(addSpaces(objectCost));
  });

  function addSpaces(string) {
    string = String(string).split('').reverse().join('');
    string = string.replace(/(\d{3})(?=\S)/g, '$1 ');
    return string.split('').reverse().join('')
  };

  $('.portfolio__category').click( function(e) {
    let category = $(this).attr('category');

    if (category) {
      $('.portfolio__item').fadeOut(300);
      setTimeout( () => {
        $(`.portfolio__item[category=${category}]`).fadeIn(300);
      }, 300 );
    } else {
      $('.portfolio__item').fadeIn(300);
    }

    console.log(category);
  });


});
