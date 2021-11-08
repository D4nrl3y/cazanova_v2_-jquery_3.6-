(function ($) {
  var galleryTop, galleryNav, galleryFixed;

    var product = {
      storeId: function () {
        return $('html').attr('data-store');
      },
      createSlide: function () {
        var total = $('.gallery-preview .swiper-slide').length;

        galleryNav = new Swiper('.nav-gallery .swiper-container', {
          loop: false,
          speed: 200,
          slidesPerView: 4,
          watchSlidesVisibility: true,
          lazy: {
            loadNext: false,
          },
          spaceBetween: 6,
          direction: 'vertical',
          navigation: {
            nextEl: '.nav-gallery .next',
            prevEl: '.nav-gallery .prev',
          },
        });  

        galleryTop = new Swiper('.gallery-preview .featured-swiper', {
          loop: total > 1,
          speed: 300,
          slidesPerView: 1,
          loopedSlides: 1,
          navigation: {
            nextEl: '.gallery-preview .next',
            prevEl: '.gallery-preview .prev',
          },
          pagination: {
            clickable: true,
            el: document.querySelector('.gallery-preview .swiper-pagination')
          },
          lazy: {
            loadPrevNext: false
          },
          thumbs: {
            swiper: galleryNav,
          },
        });       
  
        var img = $('.featured-swiper .swiper-slide:first img');
        // product.removeZoom();
  
        // $(img).elevateZoom({constrainType: "height", constrainSize: 290, zoomType: "lens", containLensZoom: true, gallery: 'gal1', cursor: 'pointer', galleryActiveClass: "active"});
  
        // galleryTop.on('slideChange', function () {
  
        //   setTimeout(function () {
        //     img = $('.featured-swiper .swiper-slide-active img');
        //     product.removeZoom();
  
        //     $(img).elevateZoom({constrainType: "height", constrainSize: 290, zoomType: "lens", containLensZoom: true, gallery: 'gal1', cursor: 'pointer', galleryActiveClass: "active"});
        //   }, 50);
        // });  
  
        galleryFixed = new Swiper('.slide-fixed', {
          loop: false,
          speed: 0,
          effect: 'fade',
          loopedSlides: 1,
          lazy: {
            loadNext: false,
          },
          navigation: {
            nextEl: '.slide-fixed .next',
            prevEl: '.slide-fixed .prev',
          },
          thumbs: {
            swiper: galleryTop,
          },
        });
  
        document.querySelectorAll('.featured-swiper .swiper-slide').forEach(function (eleme, index) {
          eleme.addEventListener('click', function () {
            document.querySelector('.fixed-modal').classList.add('active');
           
          }, false);
        });
  
      },
      resetSlider: function (images) {
        if (galleryNav !== undefined) {
          galleryTop.destroy(true, true);
          galleryNav.destroy(true, true);
          galleryFixed.destroy(true, true);
  
          document.querySelectorAll('.gallery-preview .swiper-slide,.fixed-modal .swiper-slide, .nav-gallery .swiper-slide').forEach(function (slide) {
            slide.remove();
          });
          document.querySelectorAll('.featured-swiper .swiper-wrapper').forEach(function (slide) {
            var list = '';
  
            images.forEach(function (image) {
              list += '<div class="swiper-slide"><img class="swiper-lazy" data-src="' + image.https + '" alt="image"></div>';
            });
  
            slide.innerHTML = list
          });
          document.querySelectorAll('.fixed-modal .swiper-wrapper').forEach(function (slide) {
            var list = '';
  
            images.forEach(function (image) {
              list += '<div class="swiper-slide"><img class="swiper-lazy" data-src="' + image.https + '" alt="image"></div>';
            });
  
            slide.innerHTML = list
          });
          document.querySelectorAll('.nav-gallery .swiper-wrapper').forEach(function (slide) {
            var list = '';
            images.forEach(function (image) {
              list += '<div class="swiper-slide"><img class="swiper-lazy" data-src="' + image.https + '" alt="image"></div>';
            });
  
            slide.innerHTML = list
          });
  
          setTimeout(function () {
            product.createSlide();
  
            $('.fixed-product img').attr('src', images[0].https);
          }, 50);
        }
      },
      removeZoom: function () {
        $('.zoomContainer').remove();
      },
      fixedModal: function () {
        document.querySelectorAll('.fixed-modal .exit,.fixed-modal .shad').forEach(function (element) {
          element.addEventListener('click', function () {
            document.querySelector('.fixed-modal').classList.remove('active');
          }, false);
        });
  
      },
      variantImage: function (url) {
        $.ajax({
          method: 'GET',
          url: url,
          success: function (response) {
            console.log(response)
  
            if (response.Variant.VariantImage && response.Variant.VariantImage.length) {
              // if (response.Variant.VariantImage[0].https.indexOf('variacao_') === -1) return;
              product.resetSlider(response.Variant.VariantImage);
            }  
  
          }
        });
      },
      shipping: function () {
        $('.crazy_cep').mask('00000-000');
  
        var quantidade = 1;
  
        $('.new-frete').on('submit', function (e) {
          e.preventDefault();
  
          if ($('#quant:visible').is(':visible')) {
            quantidade = $('#quant:visible').val();
          }

          if (jQuery('#new-quant').length){
            quantidade = jQuery('#new-quant').val();            
          }  
  
          var url2 = $('#shippingSimulatorButton').attr('data-url');
  
          var cep = $(this).find('input').val().split('-');
          var variant = $('#product-container').find('#selectedVariant').val() ? $('#product-container').find('#selectedVariant').val() : 0;
  
          url2 = url2.replace('cep1=%s', 'cep1=' + cep[0])
            .replace('cep2=%s', 'cep2=' + cep[1])
            .replace('acao=%s', 'acao=' + variant)
            .replace('dade=%s', 'dade=' + quantidade);
  
          if ($('#selectedVariant').val() !== '') {
            $('.box-frete .result').html('<div class="load-css"><div class="icon"></div></div>');
  
            $.ajax({
              method: 'GET',
              url: url2,
              success: function (response) {
                $('.box-frete .result').html(response);
  
                $('.box-frete .result').find('table:first, p').remove();
                $('.box-frete .result').find('img').parent().remove();
  
                $('.box-frete .result').find('th:last').text('Prazo:');
  
                $('.box-frete .result').find('th[colspan="2"]').removeAttr('colspan');
                $('.box-frete .result').find('[width]').removeAttr('width');
  
                if ($('.box-frete .result').find('tr').length == 1) {
                  $('.box-frete .result').find('tr').after('<tr><td colspan="3">Não foi encontrado formas de envio para o CEP</td></tr>');
                  $('.box-frete .result').find('tr:first').remove();
                }
              }
            });
          } else {
            $('.box-frete .result').html('Escolha uma variação');
          }
  
        });
      },

      pisoQuantidade:function(){

        if(jQuery('.block-metro').is(':visible')){

            if(jQuery('.col-info').attr('data-category') == 'metro-category'){ 

                document.getElementsByClassName("comprimento").required = false;
                document.getElementsByClassName("largura").required = false;
                document.getElementById("ref-quant").required = false;
                var metroQuadrado = jQuery('.metro-quadrado-value').val();

                // Ver com Matheus o if abaixo
                if(!jQuery('.metro-quadrado-value').val()){
                    var metroQuadrado = 4.45;
                }            

                jQuery('.block-metro #ref-quant').val(metroQuadrado);
                jQuery('.block-metro .metro').text(metroQuadrado);
                jQuery('.block-metro .metro-final').text(metroQuadrado); 
              
                jQuery('body').on('click', '.block-metro .block-ref .plus', function(){

                    //console.log('plus'); 
                    var currentValue = jQuery('#new-quant').val();
                    var currentValueNumber = parseInt(currentValue);
                    //console.log('currentValueNumber',currentValueNumber); 

                    var maxStock = jQuery('#quantidade #quant').attr('data-max');
                    var maxStockNumber = parseInt(maxStock);
                    //console.log('maxStockNumber',maxStockNumber); 

                    if (currentValueNumber < maxStockNumber){

                        currentValue++;
                        jQuery('#new-quant').val(currentValue);
                        jQuery('#quantidade #quant').attr('value',currentValue);

                        var newM = metroQuadrado * currentValue;
                        //console.log('newM',newM)

                        jQuery('.block-metro .ref-quant').text(currentValue);
                        jQuery('.block-metro .block-ref input').val(newM.toFixed(2));
                        jQuery('.block-metro .metro-final').text(newM.toFixed(2));

                    } else {
                        alert("Quantidade máxima em estoque "+ maxStock + "!");
                    }

                });            

                jQuery('body').on('click', '.block-metro .block-ref .minus', function(){

                     //console.log('minus');                     
                     var currentValue = jQuery('#new-quant').val();
                     //console.log('currentValue',currentValue); 

                    if(currentValue > 1){
                       
                       // currentValue = currentValue - 1; 
                       currentValue--;
                       jQuery('#new-quant').val(currentValue);

                       var newM = metroQuadrado * currentValue;
                       //console.log('newM',newM); 

                       jQuery('.block-metro .ref-quant').text(currentValue);
                       jQuery('.block-metro .block-ref input').val(newM.toFixed(2));
                       jQuery('.block-metro .metro-final').text(newM.toFixed(2));

                    }   

                    jQuery('#quantidade #quant').attr('value',currentValue);          
     
                });

                jQuery('body').on('change', '.block-metro .block-ref input', function(){

                    var inputText = jQuery(this).val();
                    var totalCaixa = inputText / metroQuadrado; 
                    //console.log('totalCaixa',Math.ceil(totalCaixa));

                    var somaMargemSeg = totalCaixa * 0.1;
                    //console.log('somaMargemSeg',somaMargemSeg);

                    var resultCaixa = totalCaixa + somaMargemSeg;
                    //console.log('resultCaixa',Math.ceil(resultCaixa));

                    jQuery('.block-metro .ref-quant').text(Math.ceil(resultCaixa));
                    jQuery('.block-metro #new-quant').val(Math.ceil(resultCaixa));

                    var maxStock = jQuery('#quantidade #quant').attr('data-max');
                    if (Math.ceil(resultCaixa) < maxStock ){
                        jQuery('#quantidade #quant').attr('value',Math.ceil(resultCaixa));
                    } else {
                        alert("Quantidade máxima em estoque "+ maxStock + "!");
                        jQuery('#quantidade #quant').attr('value',maxStock);
                    }

                    finalMetro = Math.ceil(resultCaixa) * metroQuadrado;
                    //console.log('finalMetro',finalMetro);

                    jQuery(this).val(finalMetro.toFixed(2));               
                    jQuery('.block-metro .metro-final').text(finalMetro.toFixed(2));               

                });

            }

        }

      },

      calculadora:function(){

        if(jQuery('.block-calculadora').is(':visible')){

          var valorMetro = jQuery('.metro-quadrado-value').attr('value');
          var valorCaixa = jQuery('.metro-quadrado #preco_atual').attr('value');
          var calculoValores = (valorCaixa / valorMetro);
          var total = calculoValores.toFixed(2).replace('.',',');
          
          jQuery('.section-price .metro-quadrado').prepend(jQuery('<span class="preco-metro">R$ '+total+' /m²</span>'));

          document.getElementById("ref-quant").required = false;

          jQuery('.block-calculadora .line-double-input .button-calc').on('click', function(e){
              e.preventDefault();

              var comprimento = jQuery('.block-calculadora .line-double-input .comprimento').val().replace(',','.');
              var largura  = jQuery('.block-calculadora .line-double-input .largura').val().replace(',','.');

              var result = comprimento * largura ;

              jQuery('.block-calculadora .line-input.result .text b').text(result);

              jQuery('.block-calculadora .line-input.result').addClass('active');

              jQuery('.block-metro .block-ref input').val(result);
              jQuery('.block-metro .block-ref input').trigger('change');
          });
        }

      },

      productVariant: function () {

        $('.tray-kit-unity').each(function(){
          $(this).appendTo($(this).prev());
        });

        $('.bar-fixed').on('click', '.item-ver-mais', function(){
            $('#showPaymentMethods').trigger('click');
        }); 

        $('.section-price').on('click', '#showPaymentMethods', function(e){
 
          e.preventDefault();
          var productId = jQuery('#form_comprar').data('id');
          var price = jQuery('#preco_atual').val();

          var link = '/mvc/store/product/payment_options_details?loja='+product.storeId()+'&IdProd='+productId+'&preco='+price;
          jQuery('.modal-theme.payment').addClass('active');

          jQuery('.modal-theme.payment .append-payment').html('<div class="load-css"><div class="icon"></div></div>');

          $.ajax({
              method: 'GET',
              url: link,
              success: function(response){
                  jQuery('.modal-theme.payment .append-payment').html(response).find('.tablePage').wrap('<div class="overflow-payment"></div>');
                  product.cssPayment(jQuery('.modal-theme.payment .append-payment'));
              }
          });
        });
        $('.button-down').on('click', function(){
          $(this).prev().toggleClass('active');
        })
        $('#quant').attr('data-max', $('.increment-page').attr('data-stock'));

        // var shippingFree = Number($('.shipping[data-value]').attr('data-value'));

        // if (shippingFree){

        //   $('.compreJunto > li').each(function(){
        //     var price = Number($(this).find('.PrecoPrincipal:first').text().replace(/[R\$ .]/g, '').replace(',', '.'));
        //     console.log('price compre:', price);

        //     if(price && price > shippingFree) $(this).find('.precoCompreJunto').append('<div class="flex align-center shipping-msg"><span class="icon icon-shipping"></span>Levando este kit o FRETE É GRÁTIS!</div>');
        //   });
          
        // }       
  
        $('.compreJunto form .fotosCompreJunto').append('<div class="plus color to">=</div>');

        if($(".compreJunto").is(':visible')){

          setTimeout(function(){   
              // $('.fotosCompreJunto .produto').each(function() {
              //     $(this).find('img').attr('src').replace('/735632/90_','/735632/180_');
              // });

                var count = jQuery('.fotosCompreJunto .produto').length;
                // $( "div" ).length;
                jQuery('.precoCompreJunto > div:first-child strong:first-child').html('COMPRE OS '+count+' PRODUTOS');
                jQuery('.precoCompreJunto > div:first-child .PrecoPrincipal').before($('.comprejuto_preco span'));

             }, 2000);  
        }

        $('#form_comprar').on('click', '.lista_cor_variacao li[data-id]', function () {
          var url = "/web_api/variants/" + $(this).data('id');
          product.variantImage(url);
        });
  
        $('#form_comprar').on('click', '.lista-radios-input', function () {
          var url = "/web_api/variants/" + $(this).find('input').val();
  
          product.variantImage(url);
        });
  
        $('#form_comprar').on('change', 'select', function () {
          var url = "/web_api/variants/" + $(this).val();
          product.variantImage(url);
        });
  
        $('.produto img').each(function () {
          $(this).attr('src', $(this).attr('src').replace('/90_', '/'));
  
          var href = '';
          if ($(this).parent().attr('href') !== '') {
            href = 'href="' + $(this).parent().attr('href') + '"';
            if(!href) href = window.location.href;
          }
  
          $(this).parents('span').after('<a ' + href + ' class="product-name">' + $(this).attr('alt') + '</a>');
        });
  
        /*$('#form_comprar').bind('submit', function () {
  
          setTimeout(function () {
  
            if ($('body').hasClass('modal-open')) {
  
              $('#loading-product-container').show();
  
              var interval = setInterval(function () {
                if ($('.cart-preview-loading-modal').hasClass('tray-hide')) {
                  $('[data-js="open_cart"]').trigger('click');
                  $('#loading-product-container').hide();
                  $('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
                  clearInterval(interval);
                }
              }, 50);
            }
          }, 100);
  
        });*/
        $('#form_comprar').on('submit',function(){

            if (!$('.labelMultiVariacao').length) {

                if($('#selectedVariant').length && !$('#selectedVariant').val()){
                    $("#span_erro_carrinho").css("display","block");
                    return false;
                }
            }

            $('#loading-product-container').show();    
            
            $('body').removeClass('modal-open').removeAttr('style');
            $('body').find('.modal-backdrop').remove();
            var interval = setInterval(function(){
                $('body').find('.modal-backdrop').remove();
                if($('.cart-preview-loading-modal').hasClass('tray-hide')){
                    cart.showCart(); 
                    $('#loading-product-container').hide();
                    $('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
                    clearInterval(interval);
                }
            },50);    

        });

        $('#button-buy').on('click', function(){

            if($('#selectedVariant').length && !$('#selectedVariant').val()){
                $("#span_erro_carrinho").css("display","block");
                return false;                
            }

        });
  
        $('.compreJunto form').on('submit.botao-compre-junto',function(){

            var form = $(this);

            if(!form.find('.blocoAlerta').is(':visible')){
                $('#loading-product-comprejunto').show();
                $('body').removeClass('modal-open').removeAttr('style');
                $('body').find('.modal-backdrop').remove();

                var interval = setInterval(function(){
                    if($('.cart-preview-loading-modal').hasClass('tray-hide')){
                        cart.showCart();
                        $('#loading-product-comprejunto').hide();
                        $('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
                        clearInterval(interval);
                    }
                },50);        
            }        
        }); 
  
        var secondSelect = $('#variation_second_select').prev();
        var firstSelct = $('[data-tray-tst="variation_first_select"]');
  
        if (secondSelect.is(':visible') && !firstSelct.val()) {
          secondSelect.hide();
        }
  
        firstSelct.on('change', function () {
          secondSelect.show();
        });
      },
      tabs: function () {

        jQuery('body').on('click', '.title-section-product', function(){
            jQuery(this).toggleClass('active');
        }); 

        // jQuery('.title-section-product').on('click', function(){
        //     jQuery(this).toggleClass('active');
        // });

        $('.button-desc').on('click', function(){
          //console.log('des: ',$(this).index())
          $('.modal-desc:eq('+$(this).index()+')').addClass('active');
          // $(this).next().addClass('active');
        });

        $('.modal-desc .icon-close').on('click', function(){
          $('.modal-desc').removeClass('active');
        });

        
        $('.line-desc').on('click', function(){
          $('body,html').animate({
            scrollTop: $('.section-desc').offset().top - 80
          });
        });

        $('.compreJunto > li').each(function() {
          var produto = $(this).find('.produto').length;
          $(this).attr('style', '--qnt: "comprar os '+ produto + " produtos");

          $(this).find('[data-tray-tst="buy_together_it_has_variation"]').parents('.fotosCompreJunto').addClass('variant-true')
        });
  
          jQuery('.produto img').each(function(i){
          
            var ele = jQuery(this);
            // console.log(this)

            if(i == 0){
              jQuery.ajax({
                method: 'get',
                url: '/pricing/445337/1/'+$('#form_comprar').attr('data-id')+'/?snippet=snippets/price',
                success: function(res) {

                  //console.log("rest: ", res)
                    ele.parents('.produto').append(res);
                }
              });
            }
  
            jQuery(this).attr('src').replace(/(\d+)_\d+_\d+?\./g, function(reg, select){
               
                jQuery.ajax({
                    method: 'get',
                    url: '/pricing/445337/1/'+select+'/?snippet=snippets/price',
                    success: function(res) {
  
                      //console.log(res)
                        ele.parents('.produto').append(res);
                    }
                });
            });
        });

        $('.show-props').on('click', function(){
          $('.add-list-props').toggleClass('active');
        });

        setTimeout(function () {
          jQuery('.shares-product a[data-href]').on('click', function (e) {
            e.preventDefault();
            var height = jQuery(window).height() >= 600 ? 600 : jQuery(window).height()
            var width = jQuery(window).width() >= 600 ? 600 : jQuery(window).width()
            window.open(jQuery(this).attr('data-href'), "Compartilhar", "height=" + height + ",width=" + width + ",left=200,top=200,menubar=0");
          });
        }, 300);

        $('.list-star').on('click', function () {
          $('body, html').animate({
            scrollTop: $('.section-reviews').offset().top - $('.header').height()
          })
        });
  
        $('.ranking .rating').each(function () {
          var av = Number($(this).attr('class').replace(/[^0-9]/g, ''));
  
          for (i = 1; i <= 5; i++) {
            if (i <= av) {
              $(this).append('<div class="icon active"></div>');
            } else {
              $(this).append('<div class="icon"></div>');
            }
          }
        });
        
        $('.button-comment').on('click', function(){
          $('#comentario_cliente').removeClass('tray-hide');
        });

        $('.raking-area .avalie').on('click', function(){  
            var topoPg = $('.section-reviews').offset().top - 90;    
            $("body, html").animate({
                scrollTop: topoPg 
            }, 1000);
        });
        
      },
      incrementPage: function incrementPage() {
        this.templateIncrement();
        $('.tabs a').on('click', function (e) {
          e.preventDefault();
          $(this).siblings().removeClass('active');
          $(this).addClass('active');
  
          $('.area-content > *').removeClass('active');
  
          $('.area-content > *').eq($(this).index()).addClass('active');
        });
  
      },
      templateIncrement: function () {
        var quant = $('#form_comprar').attr('data-stock');

        if (!$('#product-form-box [name="quant"]').length) {
          $('#product-form-box').prepend('<div data-app="product.quantity" id="quantidade">\
              <label class="color">\
              Quantidade: \
              <input id="quant" name="quant" data-max="'+quant+'" class="text" size="1" type="text" value="1" maxlength="5" onkeyup="mascara(this,numeros,event);">\
              </label>\
              <span id="estoque_variacao">&nbsp;</span>\
          </div>');
        }

        $('.submit-area').on('change', '#quant', function(){
            if($(this).val() == ''){
                $(this).val('1');
            }
        });

        //console.log('qunat max:', quant);
        $('#quant, .input-qnt').attr('data-max', quant);
        
        $('.submit-area [data-js="decrement"]').on('click', function () {
          var input = $('.input-qnt');
          var soma = parseInt(input.val()) == 1 ? 1 : parseInt(input.val()) - 1;
          input.val(soma);
          $('#form_comprar #quant').val(soma);
        
          if(input.val() == 1){
            $('.submit-area [data-js="decrement"]').addClass('dec')
          }else{
            $('.submit-area [data-js="decrement"]').removeClass('dec')
          }
        });
  
        $('.submit-area [data-js="increment"]').on('click', function () {
          var input = $('#form_comprar #quant');
          if (Number(input.attr('data-max')) > input.val() || !input.attr('data-max')) {
            var soma = parseInt(input.val()) + 1
            input.val(soma);
            $('.input-qnt').val(soma);

            $('.submit-area [data-js="decrement"]').removeClass('dec')
          }
  
        });

        $('[data-js="decrement-bar"]').on('click', function () {
          var input = $('.input-qnt');
          var soma = parseInt(input.val()) == 1 ? 1 : parseInt(input.val()) - 1;
          input.val(soma);
           $('#form_comprar #quant').val(soma);
        
          if(input.val() == 1){
            $('[data-js="decrement-bar"]').addClass('dec')
          }else{
            $('[data-js="decrement-bar"]').removeClass('dec')
          }
        });

        $('[data-js="increment-bar"]').on('click', function () {
          var input = $('.input-qnt');
          if (Number(input.attr('data-max')) > input.val() || !input.attr('data-max')) {
            var soma = parseInt(input.val()) + 1
            input.val(soma);
            $('#form_comprar #quant').val(soma);
          
            $('[data-js="decrement-bar"]').removeClass('dec')
          }
  
        });
      },
      related: function related() {
  
        var total = $('.list-related .swiper-slide').length;
        var paginate = total > 1 ? {
          clickable: true,
          el: '.related-area .pagination-related'
        } : false;
  
        new Swiper('.list-related', {
          speed: 300,
          lazy: {
            loadNext: false
          },
          navigation: {
            nextEl: '.related-next',
            prevEl: '.related-prev'
          },
          loop: total > 1,
          pagination: paginate,
          autoplay: {
            delay: 5000
          }
        });
  
        jQuery(".list-related.swiper-container").on('mouseenter', function () {
          (this).swiper.autoplay.stop();
        }).on('mouseleave', function () {
          (this).swiper.autoplay.start();
        });
      },
      
      loadTabs: function () {
        jQuery('.video-area a').on('click', function(e){
          e.preventDefault();
          jQuery('.video-modal').addClass('active');
          var codeVideo = $(this).attr('href');
          jQuery('.append-video').html('<iframe width="560" height="315" src="'+codeVideo+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        });

        jQuery('.video-modal .icon-close, .video-modal .shadow').on('click', function(){
          jQuery('.append-video').html('');
        });

        
      },
      cssPayment: function (element) {
        var list = $(element);
  
        list.find('[colspan="3"]').each(function () {
          if ($(this).text().indexOf('Pagamento') !== -1 || $(this).text().indexOf('Parcela M') !== -1) {
            $(this).remove();
          } else if ($(this).text().indexOf('Desconto') !== -1) {
            var text = $(this).text();
            $(this).parents('tr').prev().prev().find('.precoparc').after('<span class="desconto">' + text + '</span>')
            $(this).remove();
          }
        });
        list.find('span.txt-forma-pagto').each(function () {
          $(this).parents('tr').addClass('bg-css');
        });
        list.find('strong.precoparc').each(function () {
          $(this).parents('tr').addClass('payment-name');
        });
      },
      loadTab2Visited: function () {
        if($('#NavVisitados').length){
          //console.log('true');
          var time = setInterval(function() {
            if($('.paginacao_ajax_prod').length){

              //console.log('true');

              function slide() {
                $('#produtos > ul').wrapAll('<div class="swiper-container"><div class="swiper-wrapper"></div></div>');

                $('#produtos ul:nth-child(n+5)').remove();
                $('#produtos ul').wrap('<div class="swiper-slide"></div>');

                $('#produtos').append('<div class="swiper-pagination"></div>')

                new Swiper(document.querySelector('#produtos .swiper-container'), {
                  preloadImages: false,
                  lazy: {
                    loadPrevNext: false,
                  },
                  loop: false,
                  slidesPerView: 'auto',
                  watchSlidesVisibility: true,
                  pagination: {
                    clickable: true,
                    el: '#produtos .swiper-pagination'
                  },
                });
              }

              if($('#pag2').length){
                var url = '';
                $('#pag2').attr('onclick').replace(/(\/loja.+)?"/g,function(reg,v){
                  //console.log('alert:', v);
                  url = v;
                  
                });

                $.ajax({
                  method: 'GET',
                  url: url,
                  success: function(val) {
                    $('#produtos').append(val);

                    slide();
                  }
                })
              }else {
                slide();
              }
              clearInterval(time);
            }
          },500);
        }
       
        // 
      },
      barFixed: function(){

        $('[data-item-tab]').each(function(index){
          var loop = index == 0 ? ' active':'';
          $('.bar-fixed .info-bar .list').append('<div tabindex="0" role="button" class="info-link'+loop+'">'+$(this).attr('data-item-tab')+'</div>');
        });

        $('.bar-fixed .button').on('click', function(){
          $('.botao-commerce.botao-comprar').trigger('click');
        });

        $('.bar-fixed .info-bar .info-link').on('click', function() {
          // $(this).addClass('active').siblings().removeClass('active');
          
          $('body,html').animate({
            scrollTop: $('[data-item-tab]:eq('+$(this).index()+')').offset().top - 100
          });
      
        });

        $(window).on('scroll', function(){
          var scroll = $(window).scrollTop();
         
          var loop = true;
          $('[data-item-tab]').each(function(index){
            var index = index;
            if(loop && $(this).offset().top > scroll){
              loop = false;
              $('.bar-fixed .info-bar .info-link:eq('+index+')').addClass('active').siblings().removeClass('active');
            }
          });

          var area = $('.submit-area');
          if(scroll > (area.offset().top + area.outerHeight())
          && $('.footer').offset().top > $('.bar-fixed').offset().top && area.is(':visible')){
            $('.bar-fixed').addClass('active');
          } else{
            $('.bar-fixed').removeClass('active');
          }
        });
      },
      alterQuant: function(){
        jQuery('#form_comprar #quantidade').prepend(jQuery('<span class="minus">-</span>'));
        jQuery('#form_comprar #quantidade').append(jQuery('<span class="plus">+</span>'));

        jQuery('#form_comprar').on('click', '#quantidade .plus', function(){

            var currentValue = jQuery('#quant').val();
            var currentValueNumber = parseInt(currentValue);
            //console.log('currentValue',currentValue); 
            //console.log('currentValueNumber',currentValueNumber); 
            
            var maxStock = jQuery('#quantidade #quant').attr('data-max');
            var maxStockNumber = parseInt(maxStock);    
            //console.log('maxStock',maxStock); 
            //console.log('maxStockNumber',maxStockNumber); 

            if (currentValueNumber < maxStockNumber){

                currentValue++;
                jQuery('#quantidade #quant').attr('value',currentValue);

            } else {
                alert("Quantidade máxima em estoque "+ maxStock + "!");
            }

        });            

        jQuery('#form_comprar').on('click', '#quantidade  .minus', function(){
                           
            var currentValue = jQuery('#quant').val();
            //console.log('currentValue',currentValue); 

            if(currentValue > 1){
                
               currentValue--;
               jQuery('#quant').val(currentValue);
               jQuery('#quantidade #quant').attr('value',currentValue);       

            }            

        });
      }
    }
    
    product.shipping();
    product.createSlide();
    product.productVariant();
    product.fixedModal();
    product.calculadora();
    product.pisoQuantidade();
    product.incrementPage();
    product.related();
    product.loadTabs();
    
    product.tabs();
    product.barFixed();
    product.alterQuant();

    if( jQuery(window).width() > 499){ 
        product.loadTab2Visited();    
    }   

})(jQuery);  