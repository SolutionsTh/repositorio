//(function(){
//  if (window.innerWidth > 768) {
//    $(".flex-slide").each(function(){
//      $(this).hover(function(){
//        $(this).find('.flex-title').css({
//          transform: 'rotate(0deg)',
//          top: '25%',
//          left: '0%'
//        });
//        $(this).find('.flex-title').addClass('no-after');
//        $(this).find('.flex-about').css({
//          opacity: '1'
//        });
//      }, function(){
//        // Caso padrão
//        $(this).find('.flex-title').css({
//          transform: 'rotate(-90deg)',
//          top: '50%',
//          left: '-32%'
//        });
//
//        // Caso específico para estudo de caso
//        if ($(this).hasClass('img-estudo-de-caso')) {
//          $(this).find('.flex-title').css({
//            transform: 'rotate(-90deg)',
//            top: '45%',
//            left: '-22%'
//          });
//        }
//
//        $(this).find('.flex-about').css({
//          opacity: '0'
//        });
//        $(this).find('.flex-title').removeClass('no-after');
//      });
//    });
//  }
//})();


$(document).ready(function () {
  // Comportamento de hover apenas para telas maiores
  if (window.innerWidth > 768) {
    $(".flex-slide").each(function () {
      $(this).hover(function () {

        $(this).find('.flex-title').css({
          transform: 'rotate(0deg)',
          top: '25%',
          left: '0%'
        });

        $(this).find('.flex-title').addClass('no-after');
        $(this).find('.flex-about').css({
          display: 'block'
        });

      }, function () {
        if ($(this).hasClass('img-aplicando')) {
          $(this).find('.flex-title').css({
            transform: 'rotate(-90deg)',
            top: '51.5%',
            left: '-32%'
          });
        } else {
          $(this).find('.flex-title').css({
            transform: 'rotate(-90deg)',
            top: '50%',
            left: '-32%'
          });
        }

        $(this).find('.flex-about').css({
          display: 'none'
        });
        $(this).find('.flex-title').removeClass('no-after');
      });
    });
  }
});
