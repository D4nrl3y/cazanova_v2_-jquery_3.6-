function toReal(value, str_cifrao) {
    return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
}
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(d{3})(?=d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var theme = {
    header: function(){
        jQuery('.icon-search').on('click', function(){
            jQuery('.bar-top .search').addClass('active');
            setTimeout(function(){
                jQuery('.bar-top .input-search').trigger('focus');
            },250);
        });

        jQuery('.box-search .reset').on('click', function(){
            jQuery('.bar-top .search').removeClass('active');
            jQuery('.box-search input').val('');
        });

        jQuery('.footer .title').on('click', function(){
            jQuery(this).toggleClass('active');
        });

        jQuery('.text.rastreio span').on('click', function(){
            jQuery(this).next().toggleClass('active');
        });

        jQuery(document).on('click', function(event) {
            if (!jQuery(event.target).closest(".rastreio").length) {
                jQuery(".rastreio .modal-white").removeClass('active');
            }
        });

        jQuery('.list-nav > li .sub').on('click', function(e){
            e.preventDefault();
            jQuery(this).toggleClass('active');
            jQuery(this).next().toggleClass('active');
        });

        jQuery('.bar-top .bars').on('click', function(){
            jQuery('.nav-mobile').addClass('active');
        });

        jQuery('.sidebar-category .sub-filter').on('click', function(e){
            jQuery(this).toggleClass('active');
        });

        jQuery('.sidebar-category li.sub .sub-filter').on('click', function(e){
            e.preventDefault();
        });

        jQuery('.video-button').on('click', function(){
            jQuery('.video-modal').addClass('active').find('[data-src]').attr('data-src', jQuery(this).data('url'));
            var video = new LazyLoad({
                elements_selector: ".iframe-lazy",
            });
        });

        jQuery('.video-modal .close-icon,.video-modal .shadow').on('click', function(){
            jQuery('.video-modal .video iframe').removeAttr('src').removeAttr('data-was-processed').removeClass('loaded');
        });

        this.sidebar();
        
    },
    sidebar: function(){
        if(!jQuery('.hide-menu').is(':visible')){
            jQuery('.shadow-cart').before(jQuery('.box-fixed').parent().contents());
        }

        jQuery('.button-filter').on('click', function(){
            jQuery('.box-fixed').addClass('active');
        });
        
        jQuery('.filter__label').on('click', function(){
            setTimeout(function(){
                jQuery('.smart-filter').trigger('submit');
            },50)
        });
    },
    resets: function(){
        // busca avancada
        jQuery('.page-search #Vitrine input[type="image"]').after('<button type="submit" class="botao-commerce">BUSCAR</button>')
        jQuery('.page-search #Vitrine input[type="image"]').remove();
        jQuery('.advancedSearchFormBTimg').addClass('botao-commerce');

        // trocar senha
        jQuery('.page-central_senha input[type="image"]').after('<button type="submit" class="botao-commerce">CONTINUAR</button>').remove();

        // panel
        jQuery('.col-panel .tablePage, .page-extra .page-content table,.page-extras .page-content table, .board_htm table,.page-noticia table').wrap('<div class="table-overflow"></div>');
        jQuery('.caixa-cadastro #email_cadastro').attr('placeholder', 'Seu e-mail');

        // contact
        jQuery('.page-contact form input[type="image"]').after('<div class="flex justify-end"><button type="submit" class="botao-commerce">ENVIAR</button></div>').remove();
        
        jQuery('.txt-forma-pagamento').each(function(){
            jQuery(this).text(jQuery(this).text().replace(' - Yapay', ''));
        });
    },
    icPrev: '<div class="arrow prev"><svg class="icon" viewBox="0 0 451.847 451.847">\
        <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0   c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path>\
    </svg></div>',
    icNext: '<div class="arrow next"><svg class="icon"  viewBox="0 0 451.846 451.847">\
        <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744   L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284   c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path>\
    </svg></div>',
    bannerFull: function(){
        if(jQuery('.banner-full').length){
            var config = jQuery('.banner-full').data('config');

            jQuery('.banner-full .slick').slick({
                dots: true,
                arrows: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                fade: config.fade,
                autoplay: true,
                autoplaySpeed: config.time,
                useTransform: true,
                lazyLoad: 'ondemand'
            });
        }
    },
    bannerInfo: function(){
        if(jQuery('.banner-info').length){
            var config = jQuery('.banner-info').data('config');

            jQuery('.banner-info .slide').slick({
                dots: false,
                arrows: true,
                prevArrow: this.icPrev,
                nextArrow: this.icNext,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                fade: config.fade,
                autoplay: true,
                autoplaySpeed: config.time,
                useTransform: true,
            });
        }
    },
    slideProduct: function(){
        jQuery('.list-slide').on('init', function(){
            var lazySlide = new LazyLoad({
                elements_selector: ".lazySlide"
            }); 
        }).slick({
            dots: false,
            arrows: true,
            prevArrow: this.icPrev,
            nextArrow: this.icNext,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            useTransform: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                    {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });

        jQuery('.slide-category').on('init', function(){
            var lazySlide = new LazyLoad({
                elements_selector: ".lazySlide"
            });
        }).slick({
            dots: false,
            arrows: true,
            prevArrow: this.icPrev,
            nextArrow: this.icNext,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            useTransform: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                    {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        setTimeout(function(){
            jQuery('.slide-brand').on('init', function(){
                var firstBrand = new LazyLoad({
                    elements_selector: ".lazy-first-brand",
                    callback_load: function (element) {
                        var brand = new LazyLoad({
                            elements_selector: ".lazy-brand",
                            callback_load: function (element) {
                                
                            }
                        });
                    }
                });
            }).slick({
                dots: false,
                arrows: true,
                prevArrow: theme.icPrev,
                nextArrow: theme.icNext,
                false: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 1,
                useTransform: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2,
                        }
                    },
                        {
                        breakpoint: 650,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                        {
                        breakpoint: 450,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        },150)
        
        

        jQuery('#form-comments #bt-submit-comments').before('<button class="botao-commerce">Enviar</button>').remove();
    },
    image: function(value, element){
        typeof element == 'object' ? element = jQuery(element) : console.error('not type object');
        ;
        var result = ((element.height() - element.width()) / element.width()) * 100;
        (result > value) ? element.addClass('vertical') : element.addClass('horizontal');
    },
    getAjax: function(method,url,data,response){
        jQuery.ajax({
            method: method,
            url: url,
            data: data,
            async: true,
        }).done(function( value ) {
            response(value);
        });
    },
    shipping: function(){
        jQuery('.crazy_cep').mask('00000-000');

        // var productId = jQuery('#form_comprar').attr('data-id');
        var quantidade = 1;
  
        jQuery('.new-frete').on('submit', function(e){
            e.preventDefault();
            
            if(jQuery('#quant:visible').is(':visible')){
                quantidade = jQuery('#quant:visible').val();
            }

            var url2 = jQuery('#shippingSimulatorButton').attr('data-url');

            var cep = jQuery(this).find('input').val().split('-');
            var variant = jQuery('#product-container').find('#selectedVariant').val() ? jQuery('#product-container').find('#selectedVariant').val() : 0;

            url2 = url2.replace('cep1=%s','cep1='+cep[0])
            .replace('cep2=%s','cep2='+cep[1])
            .replace('acao=%s','acao=' + variant)
            .replace('dade=%s','dade=' + quantidade);

            if(jQuery('#selectedVariant').val() !== ''){
                jQuery('.box-frete .result').html('<div class="load-css"><div class="icon"></div></div>');
                theme.getAjax('get',url2,{},function(response){
                    jQuery('.box-frete .result').html(response);
        
                    jQuery('.box-frete .result').find('table:first').remove();
                    jQuery('.box-frete .result').find('img').parent().remove();

                    jQuery('.box-frete .result').find('th:last').text('Prazo:');
                
                    jQuery('.box-frete .result').find('th[colspan="2"]').removeAttr('colspan');
                    jQuery('.box-frete .result').find('[width]').removeAttr('width');

                    if (jQuery('.box-frete .result').find('tr').length == 1) {
                        jQuery('.box-frete .result').find('tr').after('<tr><td colspan="3">N�o foi encontrado formas de envio para o CEP</td></tr>');
                        jQuery('.box-frete .result').find('tr:first').remove();
                    }
                });
            }
            else{
                jQuery('.box-frete .result').html('Escolha uma varia��o');
            }
    
        });
    },
    startZoom: function(){

        jQuery('.nav-images .list').slick({
            dots: false,
            arrows: true,
            prevArrow: this.icPrev,
            nextArrow: this.icNext,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            vertical: true,
            asNavFor: '.image-show .list',
            focusOnSelect: true,
        });


        jQuery('.image-show .list').slick({
            asNavFor: '.nav-images .list',
            dots: false,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            useTransform: true,
            lazyLoad: 'ondemand',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        dots: true
                    }
                }
            ]
        }).on('afterChange', function(e,v,c){

            // jQuery('.nav-images .list').on('setPosition', v.currentSlide);

            var indice = v.currentSlide;
            indice += 1;
            var select = jQuery('.image-show').find('.box-img[data-id="'+indice+'"] .zoom');
            if(!select.find('img:first').next().length){

                select.zoom({
                    touch: false,
                    url: select.find('img').attr('data-src'),
                });
                
            }
        });       

        jQuery('.image-show').find('.box-img[data-id="1"] .zoom').zoom({touch: false});
        
    },
    removeZoom: function(images){
        jQuery('.nav-images .list,.image-show .list').slick('unslick');

        jQuery('.nav-images .list,.image-show .list').find('.item').remove();

        // console.log(images);
        images.forEach(function(val, index){
            var idIndice = ++index;

            jQuery('.nav-images .list').append('<div class="item"><div class="box-img" data-id="'+idIndice+'">\
                <img src="'+val.thumbs[90].https+'" alt="image">\
            </div></div>');

            jQuery('.image-show .list').append('\
            <div class="item">\
            <div class="box-img" data-id="'+idIndice+'">\
                <div class="zoom">\
                    <img data-lazy="'+val.https+'" alt="image">\
                </div>\
            </div></div>');
        });

        this.startZoom();

    },
    productVariant: function(){
        jQuery('.box-variants').on('click','.lista_cor_variacao li[data-id]', function(){
            var url = "/web_api/variants/" + jQuery(this).data('id');

            theme.getAjax('get',url,{},function(response){
                var images = response.Variant.VariantImage;

                if(images.length){
                    theme.removeZoom(images);
                }
            });
        });
        
        jQuery('.box-variants').on('click','.lista-radios-input', function(){
            var url = "/web_api/variants/" + jQuery(this).find('input').val();

            theme.getAjax('get',url,{},function(response){
                var images = response.Variant.VariantImage;

                if(images.length){
                    theme.removeZoom(images);
                }
            });
        });

        jQuery('.box-variants').on('change', 'select', function(){
            var url = "/web_api/variants/" + jQuery(this).val();
            theme.getAjax('get',url,{},function(response){
                var images = response.Variant.VariantImage;

                if(images.length){
                    theme.removeZoom(images);
                }
            });
        }); 
        // jQuery('.box-variants').on('change','#variacao', function(){

        //     if(jQuery(this).val() == ''){
        //         var url = "/web_api/variants/" + jQuery(this).val();

        //         theme.getAjax('get',url,{},function(response){
        //             var images = response.Variant.VariantImage;

        //             if(images.length){
        //                 theme.removeZoom(images);
        //             }
        //         });
        //     }
        // });

        jQuery('.produto img').each(function(){
            jQuery(this).attr('src', jQuery(this).attr('src').replace('/90_', '/'));
            
            var href = '';
            if(jQuery(this).parent().attr('href') !== ''){
                href = 'href="'+jQuery(this).parent().attr('href') + '"';
            } 
            
            jQuery(this).parents('span').after('<a '+href+' class="product-name">'+jQuery(this).attr('alt')+'</a>');
        });

        jQuery('.page-product').on('click','#detalhes_formas',function(){
            var productId = jQuery('#form_comprar').data('id');
            var price = jQuery('#preco_atual').val();

            var link = '/mvc/store/product/payment_options_details?loja='+theme.storeId()+'&IdProd='+productId+'&preco='+price;
            // console.log(link);
            jQuery('.payment-modal').addClass('active');

            jQuery('.payment-modal .append').html('<div class="load-css"><div class="icon"></div></div>');

            theme.getAjax('get',link,{},function(response){
                jQuery('.payment-modal .append').html(response).find('.tablePage').wrap('<div class="overflow-payment"></div>');
            });
        });

        // jQuery('#form_comprar').bind('submit',function(){

        //     setTimeout(function() {
        
        //       if(jQuery('body').hasClass('modal-open')){
        
        //         jQuery('#loading-product-container').show();
        
        //         var interval = setInterval(function(){
        //           if(jQuery('.cart-preview-loading-modal').hasClass('tray-hide')){
        //             // cart.showCart();
        //             cart.sidebarRelatedProduct(jQuery('#form_comprar').data('id'), jQuery('#form_comprar #quant').val());

        //             jQuery('#loading-product-container').hide();
        //             jQuery('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
        //             clearInterval(interval);
        //           }
        //         },50);     
        //       }     
        //     },100);
        
        // });
        jQuery('#form_comprar').on('submit', function () {

          if (!jQuery('.labelMultiVariacao').length) {

            if (jQuery('#selectedVariant').length && !jQuery('#selectedVariant').val()) {
              jQuery("#span_erro_carrinho").css("display", "block");
              return false;
            }
          }

          var isKitProducts = jQuery('.page-product .is-kit-products'),
            flagDontContinue = false;

          if (isKitProducts.length) {
            var variantsKit = isKitProducts.find('[name="variants_kit[]"][data-id="selectedVariant"]');
            if (variantsKit.length) {
              variantsKit.each(function (_, element) {
                if (!jQuery(element).val()) {
                  flagDontContinue = true;

                  return false;
                }
              })
            }
          }

          jQuery('#loading-product-container').show();  

          jQuery('body').removeClass('modal-open').removeAttr('style');
          jQuery('body').find('.modal-backdrop').remove();

          var interval = setInterval(function () {
            jQuery('body').find('.modal-backdrop').remove();

            if (jQuery('.cart-preview-loading-modal').hasClass('tray-hide')) {

              // cart.showCart();

              if (!flagDontContinue) {
                cart.sidebarRelatedProduct(jQuery('#form_comprar').data('id'), jQuery('#form_comprar #new-quant').val()); 
              }

              jQuery('#loading-product-container').hide();
              jQuery('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
              clearInterval(interval);
            }

          }, 50);
        });

        jQuery('.compreJunto form').on('submit.botao-compre-junto',function(){

            var form = jQuery(this);

            if(!form.find('.blocoAlerta').is(':visible')){
                jQuery('#loading-product-comprejunto').show();

                var interval = setInterval(function(){
                    if(jQuery('.cart-preview-loading-modal').hasClass('tray-hide')){
                        cart.showCart();
                        jQuery('#loading-product-comprejunto').hide();
                        jQuery('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
                        clearInterval(interval);
                    }
                },50);        
            }        
        });
        
    },

    pisoQuantidade:function(){

        if(jQuery('.product-colum-right').attr('data-id') == 317){       


            document.getElementsByClassName("comprimento").required = false;
            document.getElementsByClassName("largura").required = false;

            document.getElementById("ref-quant").required = false;
            
            jQuery('#quantidade').remove();
            // console.log('chegou');
            // console.log(jQuery('.product-colum-right').attr('data-id'));

            var metroQuadrado = jQuery('.metro-quadrado-value').val();

            if(!jQuery('.metro-quadrado-value').val()){
                var metroQuadrado = 4.45;
            }            

            jQuery('.block-metro #ref-quant').val(metroQuadrado);
            jQuery('.block-metro .metro').text(metroQuadrado);
            jQuery('.block-metro .metro-final').text(metroQuadrado);

            

          
            jQuery('body').on('click', '.block-metro .block-ref .plus', function(){
                // console.log('plus'); 
                var currentValue = jQuery('#new-quant').val();

                currentValue++;
                jQuery('#new-quant').val(currentValue);

                var newM = metroQuadrado * currentValue;

                jQuery('.block-metro .ref-quant').text(currentValue);
                jQuery('.block-metro .block-ref input').val(newM.toFixed(2));
                jQuery('.block-metro .metro-final').text(newM.toFixed(2));

            });            

            jQuery('body').on('click', '.block-metro .block-ref .minus', function(){
                 // console.log('minus'); 
                 var currentValue = jQuery('#new-quant').val();

                if(currentValue > 1){
                   // currentValue = currentValue - 1; 
                   currentValue--;


                   jQuery('#new-quant').val(currentValue);

                   var newM = metroQuadrado * currentValue;

                   jQuery('.block-metro .ref-quant').text(currentValue);
                   jQuery('.block-metro .block-ref input').val(newM.toFixed(2));
                   jQuery('.block-metro .metro-final').text(newM.toFixed(2));
                }               
 
            });

            jQuery('body').on('change', '.block-metro .block-ref input', function(){

                var inputText = jQuery(this).val();
                var finalValue = inputText / metroQuadrado;

                // console.log(finalValue);
                // console.log(Math.ceil(finalValue));

                jQuery('.block-metro .ref-quant').text(Math.ceil(finalValue));
                jQuery('.block-metro #new-quant').val(Math.ceil(finalValue));

                finalValue = Math.ceil(finalValue) * metroQuadrado;

                jQuery(this).val(finalValue.toFixed(2));               
                jQuery('.block-metro .metro-final').text(finalValue.toFixed(2));


            });
        }

    },

    calculadora:function(){

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

    },


    productVisited: function(){
        var content = jQuery('.content-visited');
        
        var link = '/loja/funcoes/paginacao_produtos_visitados.php?loja='+this.storeId()+'&cont=0&prod_visitados=4&id='+jQuery('#form_comprar').attr('data-id');
        theme.getAjax('get',link,{},function(response){
            var listProducts = [];
            var template = '<div class="item"><div class="product">\
                <div class="image">\
                    <a href="{link}" class="space-image">\
                        <img class="transform lazyHis" data-src="{img}" alt="{name}">\
                        <div class="view">VER DETALHES</div>\
                    </a>\
                </div>\
                <a href="{link}" class="info-product">\
                <div class="product-name">{name}</div>\
                <div class="box-price">\
                    <div class="price"><div class="price-off">{price}</div></div>\
                    <div class="product-payment">{payment}</div>\
                </div>\
                </a>\
            </div></div>';
            content.html(response);
            
            content.find('li').each(function(){
                var element = jQuery(this);
                
                var price = '';
                
                if (element.find('.ValoresLista .precode').text()){
                    price = '\
                    <div class="product-price">\
                    <div class="price-before ">\
                    <span class="line-price">'+element.find('.ValoresLista .precode').text()+'</span>\
                    </div><div class="price-off">\
                    <span class="por">Por</span> '+element.find('.ValoresLista .precoAvista:not(.preco-avista)').text()+'\
                    </div></div>';
                } else {
                    price = element.find('.ValoresLista .precoAvista:not(.preco-avista)').text();
                }
                
                var info = {
                    img: element.find('.FotoLista img').attr('src').replace('/90_','/180_'),
                    name: element.find('.NomeProdLista').text(),
                    price: price,
                    payment: element.find('.ValoresLista').html(),
                    link: element.find('a:first').attr('href'),
                }
                listProducts.push(info);
            });
            // console.log('lista visitados: ',listProducts);
            
            if(listProducts.length){
                content.html('<div class="list-slide visited"></div>');
                listProducts.forEach(function(val){
                    var product = template;
                    product = product.replace(/{name}/g, val.name);
                    product = product.replace(/{price}/g, val.price);
                    product = product.replace(/{img}/g, val.img);
                    product = product.replace(/{link}/g, val.link);
                    product = product.replace(/{payment}/g, val.payment.replace('<img src="https://images.tcdn.com.br/assets/store/img/sobconsulta.gif" alt="Pre�o sob Consulta" title="Pre�o sob Consulta" border="0">','<p class="consulta-product">Sob Consulta</p>'));
                    content.find('.list-slide').append(product);
                });
                
                jQuery('.content-visited').find('.product-payment .precoAvista, .list-slide .product-payment .precode').remove();
                var lazyHis = new LazyLoad({
                    elements_selector: ".lazyHis"
                });
                content.find('.list-slide').slick({
                    dots: false,
                    arrows: true,
                    prevArrow: theme.icPrev,
                    nextArrow: theme.icNext,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    useTransform: true,
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                            {
                            breakpoint: 550,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });
            }
            else{
                content.parents('.section-showcase').remove();
            }
            
        });
    },
    storeId: function(){
        return jQuery('html').attr('data-store');
    },
    depoimento: function(){
        jQuery('#depoimento a').prepend('<div class="botao-commerce">ENVIAR</div>').find('img').remove();
        jQuery('.page-content h2:first').appendTo('.depoimentos-modal .append');
        jQuery('.page-content h2:last').remove();
        jQuery('#comentario_cliente').appendTo('.depoimentos-modal .append');
        
        jQuery('.page-content .container').append('<div class="botao-commerce depoimento-event">Deixe seu depoimento</div>')
        
        jQuery('.botao-commerce.depoimento-event').on('click', function(){
            jQuery('.depoimentos-modal').addClass('active');
        });
    },
    present: function(){
        jQuery('#form_presentes input[type="image"]').prev().html('<div class="botao-commerce">Continuar Comprando</div>');
        jQuery('#form_presentes input[type="image"]').wrap('<div class="relative-button"></div>').after('<button class="botao-commerce">Avan�ar</button>').remove();
    },


    showBarSearch: function(){        

        if( jQuery( window ).width() > 1024){
            if(jQuery(window).scrollTop() > 86) {
                jQuery(".middle-action").addClass("active");
            }
            else if(jQuery(window).scrollTop() < 86){
                jQuery(".middle-action").removeClass("active");
            }             
        }
    },


    slideCatalog: function(){
        jQuery('.slide-catalog').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            fade: true,
            autoplay: true,
            autoplaySpeed: 5000,
            useTransform: true,
            lazyLoad: 'ondemand'
        });
    },

    slideExtraBanners: function(){
        jQuery('.slide-section').slick({
            dots: false,
            arrows: true,
            prevArrow: theme.icPrev,
            nextArrow: theme.icNext,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
        });
    },

    trackingSubmit: function () {
        jQuery(".tracking-form").on('submit', function (event) {
            var code = jQuery(this).find("input").val();
            var url = 'https://www.vaichegar.com.br/?id=' + code;
            window.open(url, '_blank');
            event.preventDefault();
            return false;
        });    
    }
}

var cart = {
    session: function () {
        return jQuery("html").attr("data-session");
    },
    idStore: function(){
        return jQuery("html").attr("data-store");
    },
    removeProduct: function (element){
        // console.log('remove: ',element);
        var id = parseInt(jQuery(element).attr('data-id'));
        var variantNumber = parseInt(jQuery(element).attr('data-variant'));
        var variant = variantNumber == 0 ? '' : '/' + variantNumber;
        var addText = jQuery(element).attr('data-add') == "" ? '' : "/?additional_information=" + jQuery(element).attr('data-add').replace(/br>/g, 'br/>');

        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session() + "/" + id + variant + addText
        }).done(function (response) {
            // console.log(response);
            cart.listProduct();
        }).fail(function (error) {
            // console.log("error remove product: ", error.responseText);
            cart.listProduct();
        });
    },
    listProduct: function () {
        jQuery.ajax({
            method: "GET",
            url: "/web_api/cart/" + cart.session()
        }).done(function (response) {
            cart.forProduct(response);
        }).fail(function (error) {
            var response = JSON.parse(error.responseText);
            cart.forProduct([]);
            // console.log("error list product: ", response);
        });
    },
    number: function(number){
        jQuery('.cart-header .number').text(number);
    },
    total: function(price){
        jQuery('.cart-sidebar .total .value').text(toReal(parseFloat(price), 'R$'));
    },
    filterVariantSimple: function(variants, select){
       var i = 0;
       while(i < variants.length){
           if(variants[i].Variant.Sku[0].value == select){
               return variants[i].Variant.id;
           }
           i++;
       }
       return 500;
   },
    forProduct: function (listProducts) {
        var listDom = jQuery('.cart-sidebar .content-cart .list');
        listDom.find('*').remove();
        listDom.parent().removeClass('empty');

        var button = jQuery('.botao-commerce.buy');

        var https = button.hasClass('https_true') ? '' : 'https://'+cart.idStore()+'.commercesuite.com.br'

        var checkout = https+'/checkout?session_id='+cart.session()+'&store_id='+cart.idStore();
        button.attr('href', checkout);
        var qnt = 0;
        var total = 0.0;

        var listId = [];
        if (listProducts.length){

            listProducts.forEach(function (product) {
                product = product.Cart;

                // console.log(product);
                
                var addMsg = product.additional_information.replace(/\//g, '');
                prices = product;
                // product.productImage.thumbs[90].https;
                listDom.append(cart.templateProduct(product.product_id, product.variant_id, product.product_name, product.product_image.thumbs[90].https, product.quantity, product.price, product.product_url.https,addMsg,product.additional_info_kit));
                qnt += parseInt(product.quantity);

                total += (parseFloat(product.price) * parseInt(product.quantity));
            
                listId.push(parseInt(product.product_id));
                
            });
            cart.number(qnt);
            cart.total(total);
            
        }else{
            listDom.append('<div class="error"><div clas="text">Carrinho Vazio</div></div>');
            listDom.parent().addClass('empty');
            cart.number(0);

            jQuery('body').find('.add-cart .buy-product').each(function(){
                if(jQuery(this).hasClass('active')) jQuery(this).removeClass('active').find('.text').text('Comprar');
            });
            
        }
    },
    startCart: function () {
        // jQuery(".cart-sidebar").on('click','.remove', function () {
        //     var removeId = parseInt(jQuery(this).attr('data-id'));
        //     var removeVariant = parseInt(jQuery(this).attr('data-variant'));
        //     cart.removeProduct(removeId, removeVariant);
        // });

        jQuery('.cart-header').on('click', function(){
            cart.showCart();
        });
        
        jQuery('.shadow-cart, .header-cart .box-prev, .close-nav,.box-fixed .close-box,.close-modal,.close-icon,.modal-theme .shadow').on('click', function(e){
            jQuery('.cart-sidebar, .nav-mobile,.box-fixed,.modal-theme').removeClass('active');
        });

        // add product variant
        jQuery('.product-submit').on('submit', function(e){
            e.preventDefault();
            var variant = jQuery(this).find('.select').val();
            var quantity = jQuery(this).find('.quantity').val();
            var product_id = jQuery(this).find('.quantity').attr('data-id');
            if(variant) cart.addVariantComplete(variant, quantity, product_id);
        });

        // jQuery(this).find('.sub-cart').removeClass('active');
    },
    showCart: function(){
        cart.listProduct();
        jQuery('.modal-theme').removeClass('active');

        jQuery('.cart-sidebar').addClass('active');
        
    },
    templateProduct: function (id,variant,name,image,qnt,price,url,addMsg) {
        var template = '\
            <div class="item">\
                <div class="box-cart flex align-center">\
                    <div class="box-image">\
                        <a href="{url}" class="image">\
                            <img src="{image}" alt="{name}">\
                        </a>\
                    </div>\
                    <div class="info-product">\
                        <div class="line-top flex justify-between">\
                            <a href="{url}" class="name t-color">{name}</a>\
                            <div class="remove" data-id="{id}" data-variant="{variant}" data-add="{addMsg}" onclick="cart.removeProduct(this)"></div>\
                        </div>\
                        <div class="line-down flex align-center">\
                            <div class="qnt">Qnt: {length}</div>\
                            <div class="price">{price}</div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';

        template = template.replace(/{url}/g,url);
        template = template.replace(/{image}/g,image);
        template = template.replace(/{name}/g,name);
        template = template.replace(/{id}/g,id);
        template = template.replace(/{variant}/g,variant);
        template = template.replace(/{length}/g,qnt);
        template = template.replace(/{addMsg}/g,addMsg);
        price = toReal(parseFloat(price), 'R$');
        template = template.replace(/{price}/g,price);
        return template;
    },

    addVariantComplete: function(variant, quantity, productId){
        // console.log('final: ', variant,quantity,productId);
        var customerId = cart.session();

        jQuery.ajax({
            method: "POST",
            url: "/web_api/cart/",
            contentType: "application/json; charset=utf-8",
            data:'{"Cart":{"session_id":"' + cart.session() + '","product_id":"' + productId + '","quantity":"' + quantity + '","variant_id":"' + variant + '"}}'
        }).done(function( response, textStatus, jqXHR ) {
            // jQuery('.add-cart .buy-product[product-id="'+productId+'"]').addClass('active').find('.text').text('Atualizar');
            cart.showCart();
        }).fail(function( jqXHR, status, errorThrown ){
            window.location.href = jQuery('.add-cart-modal').find('.image a').attr('href');
        });
    },
    getRelated: function (productId) {
        var url = '/web_api/products/' + productId,
          resultProducts = [];

        jQuery.ajax({
          method: 'GET',
          url: url,
          async: false,
          success: function (response) {
            if (typeof response.Product !== 'undefined') {
              response = response.Product;

              if (Array.isArray(response.related_products) && response.related_products.length) {
                var relatedProducts = response.related_products;

                relatedProducts.map(function (item) {

                  jQuery.ajax({
                    method: "GET",
                    url: "/web_api/products/" + item,
                    async: false,
                  }).done(function (responseProduct, textStatus, jqXHR) {
                    if (typeof responseProduct.Product !== 'undefined') {
                      resultProducts.push(responseProduct.Product);
                    }
                  })
                  .fail(function (jqXHR, status, errorThrown) {
                  // var response = JSON.parse(jqXHR.responseText);
                  // console.log(response);
                  });
                });
              }
            }
          }
        });

    return resultProducts;
  },
  sidebarRelatedProduct: function (productId, qtd) {

        jQuery('.sidebar-suggestion-products .current-product .box-line .actions .show-my-cart').on('click', function (e) {
          e.preventDefault();

          cart.showCart();

          jQuery('.sidebar-suggestion-products').removeClass('active')
        });

        jQuery('.sidebar-suggestion-products .close-suggestions, .sidebar-suggestion-products .shadow-suggestion').on('click', function () {
          jQuery(this).parents('.sidebar-suggestion-products').removeClass('active');
        })

        var related = cart.getRelated(productId);

        // console.log(related);

        if (related.length) {

          var ulContent = jQuery('<ul/>');

          related.map(function (item) {

            var productImage = (item.ProductImage && item.ProductImage[0]) ? item.ProductImage[0].thumbs['90'].https : '';

            var li = jQuery('<li class="product-suggestion" data-id="' + item.id + '">' +
              '<div class="right">' +
              '<a href="' + item.url.https + '" title="Clique aqui para acessar o produto: ' + item.name + '">' +
              '<span class="list-box-image">' +
              '<img src="' + productImage + '" alt="Imagem do produto ' + item.name + '">' +
              '</span>' +
              '<div class="box-desc">' +
              '<p>' + item.name + '</p>' +
              '<span>' + toReal(Number(item.price), 'R$') + '</span>' +
              '</div>' +
              '</a>' +
              '</div>' +
              '<div class="left">' +
              '<a href="' + item.url.https + '" title="Clique aqui para ver o produto">Ver o produto</a>' +
              '</div>' +
              '</li>'
            );

            ulContent.append(li);
          })

          // console.log('sidebarRelatedProduct');
          // console.log(productId);

          cart.ajaxGet('/web_api/products/' + productId, function (resultProduct) {

            if (typeof resultProduct.Product !== 'undefined') {
              jQuery('.sidebar-suggestion-products .box-image img').attr('src', (resultProduct.Product.ProductImage && resultProduct.Product.ProductImage[0]) ? resultProduct.Product.ProductImage[0].thumbs['90'].https : '')
              jQuery('.sidebar-suggestion-products .current-product .box-desc .desc').text('SubTotal (' + qtd + ' ' + (qtd > 1 ? 'Itens' : 'Item') + '): ');

              var priceProduct = resultProduct.Product.price;

              if (Number(resultProduct.Product.promotional_price)) {
                priceProduct = resultProduct.Product.promotional_price;
              }

              jQuery('.sidebar-suggestion-products .current-product .box-desc .value').text(toReal((priceProduct * qtd), 'R$'))
            }

          });

          jQuery('.sidebar-suggestion-products .box-list-product').empty().html(ulContent);

          setTimeout(function () {
            var sidebarSuggestionProducts = jQuery('.sidebar-suggestion-products');

            if (!sidebarSuggestionProducts.hasClass('active')) {
              sidebarSuggestionProducts.addClass('active');
            }
          }, 100)
        } else {
          jQuery('.sidebar-suggestion-products').removeClass('active')

          cart.showCart();
        }
      },
    addInfoModal: function(product){
        
        // console.log("product: ", product);
        var modal = jQuery('.add-cart-modal');
        modal.addClass('active');

        // reset
        modal.find('#variant_modal').removeClass('required').val(0);
        modal.find('.terms').remove();
        modal.find('#alert-modal-add').addClass('tray-hide');
        modal.find('.list-variants').remove();
        modal.find('.action-add .add-cart').removeAttr('disabled');
        modal.find('.quant input').val(1);

        modal.find('#product_modal').val(product.id);        
        modal.find('.image').html('<a href="'+product.link+'"><img src="'+product.image+'" alt="'+product.name+'" /></a>');
        modal.find('.box-info > .name').text(product.name);
        modal.find('.box-info > .sku').html('<strong>Sku: </strong>'+product.id);
        modal.find('.box-info > .sku').html('<strong>Sku: </strong>'+product.id);

        if(product.terms !== "0"){
            modal.find('.box-info form').append('<div class="terms">Clicando em comprar voc� aceita os termos de uso do produto</div>');
        }

        if(product.variant){
            modal.find('#variant_modal').addClass('required');
            // console.log("variants: ",product.variant);

            var options = [];
            var options2 = [];

            product.variant.forEach(function(val) {
                var value = val.Variant.Sku[0].value;
                if(options.indexOf(value) === -1){
                    options.push(value);
                }
            });

            if(product.variant[0].Variant.Sku.length > 1){
                product.variant.forEach(function(val) {
                    var value = val.Variant.Sku[1].value;
                    if(options2.indexOf(value) === -1){
                        options2.push(value);
                    }
                });
            }

            // console.log(options)


            // if(product.variant[0].Variant.Sku.length > 1){
            //     product.variant.forEach(function(val) {
            //         options += '<option>'+val.Variant.Sku[0].value+ ' + ' + val.Variant.Sku[1].value + '</option>';
            //     });
            // } else{
            //     product.variant.forEach(function(val) {
            //         options += '<option value="">'+val.Variant.Sku[0].value+'</option>';
            //     });
            // }

            var listOption = '';
            options.forEach(function(optionVal, index){
                // listOption += '<option value="'+product.variant[index].Variant.id+'">'+optionVal+'</option>';
                listOption += '<option value="'+optionVal+'">'+optionVal+'</option>';
            });

            modal.find('.action-add').before('\
            <div class="list-variants">\
                <div class="variant-title">'+product.variant[0].Variant.Sku[0].type+'</div>\
                <select required class=" select variants">\
                    <option hidden value="">Selecionar</option>\
                    '+listOption+'\
                </select>\
            </div>\
            ')

            if(options2.length){

                var listOption2 = '';
                options2.forEach(function(optionVal){
                    listOption2 += '<option value="'+optionVal+'">'+optionVal+'</option>';
                });

                modal.find('.action-add').before('\
                <div class="list-variants">\
                    <div class="variant-title">'+product.variant[0].Variant.Sku[1].type+'</div>\
                    <select required class=" select variants">\
                        <option hidden value="">Selecionar</option>\
                        '+listOption2+'\
                    </select>\
                </div>\
            ')
            }
        }

        if(product.price.type === 'number'){
            if(product.price.promotional_price){
                modal.find('.box-price').html('\
                    <div class="price">De: '+toReal(parseFloat(product.price.price), 'R$')+'</div>\
                    <div class="price-promotion">'+toReal(parseFloat(product.price.promotional_price), 'R$')+'</div>\
                    <div class="payment">'+product.price.payment+'</div>\
                ');
            } else{
                modal.find('.box-price').html('\
                    <div class="price-promotion">'+toReal(parseFloat(product.price.price), 'R$')+'</div>\
                    <div class="payment">'+product.price.payment+'</div>\
                ');
            }

        }
        else if(price.type === 'esgotado'){

        }

        var select = modal.find('.select:eq(0)');
        var select2 = modal.find('.select:eq(1)');

        if(select.length){
            select.on('change', function(){
                // console.log(jQuery(this).val())
                if(jQuery(this).val() !== '' && !select2.length){
                    modal.find('#variant_modal').val(cart.filterVariantSimple(product.variant, select.val())).removeClass('required');

                } else if(select2.val() !== ''){
                    modal.find('#variant_modal').val(cart.filterVariant(product.variant, select.val(), select2.val())).removeClass('required');
                }
                cart.getPrice();
            });
        }

        if(select2.length){
            select2.on('change', function(){
                // console.log(jQuery(this).val())
                if(jQuery(this).val() !== '' && select.val() !== ''){
                    modal.find('#variant_modal').val(cart.filterVariant(product.variant, select.val(), select2.val())).removeClass('required');
                }
                cart.getPrice();
            });
        }
    },
    filterVariant: function(variants, select, select2){
        var i = 0;

        while(i < variants.length){
            // console.log(variants[i].Variant.Sku[0].value, select, variants[i].Variant.Sku[1].value, select2);
            if(variants[i].Variant.Sku[0].value == select && variants[i].Variant.Sku[1].value == select2){
                
                return variants[i].Variant.id;
            }
            i++;
        }
        return 500;
    },
    submitAdd: function(){
        jQuery('.add-cart-modal form').on('submit', function(e){
            e.preventDefault();
            var productId = jQuery(this).find('#product_modal').val();
            var quant =jQuery(this).find('#quant_modal').val();
            var variant =jQuery(this).find('#variant_modal');

            if(variant.hasClass('required')){
                jQuery('#alert-modal-add').removeClass('tray-hide')
                return;
            }

            jQuery('.action-add .add-cart').attr('disabled');

            cart.addVariantComplete(variant.val(), quant, productId);

            // console.log('product: ', productId, 'quant: ', quant, 'variant: ', variant.val());
            
        });
    },
    showModal: function(productDom){
        // console.log(productDom);
        this.ajaxGet("/web_api/products/"+productDom.id, function(result){

            if(!result.error){
                console.log(result);
                var product = result.Product;
                var image = product.ProductImage.length ? product.ProductImage[0].https : '';

                if(product.has_variation !== '0'){
                    cart.getVariant(product, productDom.list_variant, function(listVariant){
                        cart.addInfoModal({
                            image: image,
                            link: product.url.https,
                            name: product.name,
                            id: product.id,
                            price: {
                                type: 'number',
                                promotional_price: product.promotional_price !== '0' ? product.promotional_price : false,
                                price: product.price,
                                payment: product.payment_option_html
                            },
                            terms: product.has_acceptance_terms,
                            variant: listVariant
                        });
                    })
                } else{
                    cart.addInfoModal({
                        image: image,
                        link: product.url.https,
                        name: product.name,
                        id: product.id,
                        price: {
                            type: 'number',
                            promotional_price: product.promotional_price !== '0' ? product.promotional_price : false,
                            price: product.price,
                            payment: product.payment_option_html
                        },
                        terms: product.has_acceptance_terms,
                        variant: false
                    });
                }
            }            
        })        

        /*
        

        var button = jQuery(this).find('.buy-product');
        var quantity = button.parent().find('input').val();
        var productId = button.attr('data-id');
        var variant = button.attr('data-variant') == 'true' ? 1 : 0;

        if(!variant){

        }
        else{
            jQuery.ajax({
                method: "GET",
                url: "/web_api/products/"+productId
            }).success(function( response, textStatus, jqXHR ) {
                cart.addVariant(response.Product,quantity);
            }).fail(function( jqXHR, status, errorThrown ){
                var response = jQuery.parseJSON( jqXHR.responseText );
                console.log(response);
            });
        }
        */
        
    },
    addToCart: function(productId, quantity, variant){
        var customerId = dataLayer[0].customerId ? dataLayer[0].customerId : 0;
        jQuery.ajax({
            method: "POST",
            url: "/web_api/cart/",
            contentType: "application/json; charset=utf-8",
            data:'{"Cart":{"session_id":"' + cart.session() + '","product_id":"' + productId + '","quantity":"' + quantity + '","variant_id":"' + variant + '"}}'
        }).done(function( response, textStatus, jqXHR ) {
            // button.addClass('active').find('.text').text('Atualizar');
            cart.showCart();                   
        }).fail(function( jqXHR, status, errorThrown ){
            window.location.href = buy.parents('.product-box').find('.product-image').attr('href');
        });
    },
    ajaxGet: function(url, result){
        jQuery.ajax({
            method: "GET",
            url: url
        }).done(function( response) {
            result(response);
        }).fail(function( jqXHR, status, errorThrown ){
            result({error: true});
            var response = JSON.parse( jqXHR.responseText );
            // console.log(response);
        });
    },
    templateInfo: function(product,vars,quantity){
        // console.log('template:', vars);
        var template = '<a href="'+product.url.https+'" class="image">\
            <img src="'+product.ProductImage[0].thumbs[180].https+'" alt="image">\
        </a>';

        jQuery('.modal-product .content-product .box-image').html(template);

        var templateVars = '<option value="{val}">{text}</option>';

        var listSelect = '';

        vars.forEach(function(val){
            if(parseInt(val.Variant.available)){
                if(val.Variant.Sku.length > 1){
                    listSelect += templateVars.replace('{val}',val.Variant.id).replace('{text}',val.Variant.Sku[0].value +' - ' +val.Variant.Sku[1].value);
                }
                else{
                    listSelect += templateVars.replace('{val}',val.Variant.id).replace('{text}',val.Variant.Sku[0].value);
                }
            }
        });

        var info = '<input type="hidden" class="quantity" data-id="'+product.id+'" value="'+quantity+'"><div class="name"><a href="'+product.url.https+'">'+product.name+'</a></div>\
            <div class="price"></div>\
            <div class="vars">\
            <div class="var-text">Selecione uma op��o:</div>\
            <select required class="select"><option value="">Selecione</option>'+listSelect+'</select>\
            </div>\
            <button class="submit-product">COMPRAR</button>\
        ';

        jQuery('.modal-product .content-product form').html(info);
        
    },
    getVariant: function(product, variants, callback){
        // console.log(product);
        jQuery('.modal-product').addClass('active');
        var variantId = product.Variant;
        var listVariant = [];
        variantId.forEach(function(val, index){
            var url =  "/web_api/variants/" + val.id;
            cart.ajaxGet(url, function(result){
                listVariant.push(result);
                if(variantId.length == listVariant.length){
                    callback(cart.orderVariant(variantId,listVariant, variants));
                }
            });
        });
    },
    orderVariant: function(order, list, listDom){
        
        // console.log(order, list, listDom);
        
        var newList = [];
        
        listDom.forEach(function(val, index) {
            
            list.forEach(function(valList) {
                if(val.id == valList.Variant.id) {
                    if (valList.Variant.Sku.length > 1 || !!Number(valList.Variant.available)){
                        newList.push(valList);
                    }
                }
            });
        });
        
        // console.log("antes:", list);
        // console.log("depois:", newList);
        
        return newList;
    },
    addVariant: function(product,quantity){
        // console.log(product);
        jQuery('.modal-product').addClass('active');
        var variantId = product.Variant;
        var listVariant = [];
        variantId.forEach(function(val, index){
            var url =  "/web_api/variants/" + val.id;
            cart.ajaxGet(url, function(result){
                listVariant.push(result);
                if(variantId.length == listVariant.length){
                    cart.templateInfo(product,listVariant,quantity);
                }
            });
        });
    },
    getPrice: function(){
        var id = jQuery('.add-cart-modal').find('#variant_modal').val();
        //console.log('get price: ', id);
        if(id && id != 0){
            this.ajaxGet('/web_api/variants/'+id, function(response){
                // console.log("get price return:", response);
                
                var price = Number(response.Variant.promotional_price) != 0 ? Number(response.Variant.promotional_price) : Number(response.Variant.price);
                
                jQuery('.add-cart-modal .price-promotion').html(toReal(price, 'R$'));
                jQuery('.add-cart-modal .payment').html(response.Variant.payment_option_html);
            });
        }
        
    }
}

jQuery(document).on('ready', function(){
    
    theme.header();
    theme.resets();
    cart.submitAdd();
    
    theme.showBarSearch();

    jQuery(window).on('scroll', function() {
        theme.showBarSearch();
    });

    jQuery('.board_htm iframe[src*="youtube"], .page-noticia .board iframe[src*="youtube"]').wrap('<div class="video"></div>');

    jQuery('.noticias li').wrapInner('<div class="box-noticia"></div>');

    jQuery('.page-next a').append(theme.icNext);
    jQuery('.page-prev a').prepend(theme.icPrev);
    // slide index
    jQuery('.section-avaliacoes .dep_dados').wrap('<a href="/depoimentos-de-clientes"></a>');
    jQuery('.dep_lista li:hidden').remove();
    jQuery('.dep_lista').slick({
        dots: false,
        arrows: true,
        prevArrow: theme.icPrev,
        nextArrow: theme.icNext,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        useTransform: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
                {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    jQuery('.page-product .increment-page .low').on('click', function(){
        var input = jQuery('.page-product').find('#quantidade #quant');
        input.val(parseInt(input.val()) == 1 ? 1 : parseInt(input.val()) - 1);
    });

    jQuery('.page-product .increment-page .add').on('click', function(){
        var input = jQuery('.page-product').find('#quantidade #quant');
        input.val(parseInt(input.val()) + 1);
    });

    jQuery('.add-cart-modal .increment-page .low').on('click', function(){
        var input = jQuery('.box-add-cart .quant input');
        input.val(parseInt(input.val()) == 1 ? 1 : parseInt(input.val()) - 1);
    });

    jQuery('.add-cart-modal .increment-page .add').on('click', function(){
        var input = jQuery('.box-add-cart .quant input');
        input.val(parseInt(input.val()) + 1);
    });
    
    theme.slideCatalog();

    if(jQuery('html').hasClass('page-product')){
        theme.productVisited();
        theme.shipping();
        theme.startZoom();
        theme.productVariant();

        theme.pisoQuantidade();
        theme.calculadora();
    }

    if(jQuery('html').hasClass('page-depoimentos')) theme.depoimento();
    if(jQuery('html').hasClass('page-finalizar_presentes')) theme.present();

    cart.startCart();
    var lazy = new LazyLoad({
        elements_selector: ".lazyload"
    }); 

    theme.bannerFull();
    theme.slideExtraBanners();
    theme.bannerInfo();
    theme.slideProduct();
    theme.trackingSubmit();
    
});

// lazyload
var _extends = Object.assign || function (e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e }; !function (e, t) { "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.LazyLoad = t() }(this, function () { "use strict"; var e = { elements_selector: "img", container: document, threshold: 300, data_src: "src", data_srcset: "srcset", class_loading: "loading", class_loaded: "loaded", class_error: "error", callback_load: null, callback_error: null, callback_set: null, callback_enter: null }, t = function (e, t) { return e.getAttribute("data-" + t) }, n = function (e, t, n) { return e.setAttribute("data-" + t, n) }, r = function (e) { return e.filter(function (e) { return !t(e, "was-processed") }) }, s = function (e, t) { var n, r = new e(t); try { n = new CustomEvent("LazyLoad::Initialized", { detail: { instance: r } }) } catch (e) { (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: r }) } window.dispatchEvent(n) }, o = function (e, n) { var r = n.data_srcset, s = e.parentNode; if ("PICTURE" === s.tagName) for (var o, a = 0; o = s.children[a]; a += 1)if ("SOURCE" === o.tagName) { var i = t(o, r); i && o.setAttribute("srcset", i) } }, a = function (e, n) { var r = n.data_src, s = n.data_srcset, a = e.tagName, i = t(e, r); if ("IMG" === a) { o(e, n); var c = t(e, s); return c && e.setAttribute("srcset", c), void (i && e.setAttribute("src", i)) } "IFRAME" !== a ? i && (e.style.backgroundImage = 'url("' + i + '")') : i && e.setAttribute("src", i) }, i = "classList" in document.createElement("p"), c = function (e, t) { i ? e.classList.add(t) : e.className += (e.className ? " " : "") + t }, l = function (e, t) { i ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|jQuery)"), " ").replace(/^\s+/, "").replace(/\s+jQuery/, "") }, u = function (e, t) { e && e(t) }, d = function (e, t, n) { e.removeEventListener("load", t), e.removeEventListener("error", n) }, f = function (e, t) { var n = function n(s) { _(s, !0, t), d(e, n, r) }, r = function r(s) { _(s, !1, t), d(e, n, r) }; e.addEventListener("load", n), e.addEventListener("error", r) }, _ = function (e, t, n) { var r = e.target; l(r, n.class_loading), c(r, t ? n.class_loaded : n.class_error), u(t ? n.callback_load : n.callback_error, r) }, v = function (e, t) { u(t.callback_enter, e), ["IMG", "IFRAME"].indexOf(e.tagName) > -1 && (f(e, t), c(e, t.class_loading)), a(e, t), n(e, "was-processed", !0), u(t.callback_set, e) }, m = function (t, n) { this._settings = _extends({}, e, t), this._setObserver(), this.update(n) }; m.prototype = { _setObserver: function () { var e = this; if ("IntersectionObserver" in window) { var t = this._settings; this._observer = new IntersectionObserver(function (n) { n.forEach(function (n) { if (n.isIntersecting || n.intersectionRatio > 0) { var r = n.target; v(r, t), e._observer.unobserve(r) } }), e._elements = r(e._elements) }, { root: t.container === document ? null : t.container, rootMargin: t.threshold + "px" }) } }, update: function (e) { var t = this, n = this._settings, s = e || n.container.querySelectorAll(n.elements_selector); this._elements = r(Array.prototype.slice.call(s)), this._observer ? this._elements.forEach(function (e) { t._observer.observe(e) }) : (this._elements.forEach(function (e) { v(e, n) }), this._elements = r(this._elements)) }, destroy: function () { var e = this; this._observer && (r(this._elements).forEach(function (t) { e._observer.unobserve(t) }), this._observer = null), this._elements = null, this._settings = null } }; var b = window.lazyLoadOptions; return b && function (e, t) { if (t.length) for (var n, r = 0; n = t[r]; r += 1)s(e, n); else s(e, t) }(m, b), m });

//slick
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!1,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(a.currentSlide-1===0&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",null),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,c.options.infinite||(c.slideCount<=c.options.slidesToShow?c.currentSlide=0:c.currentSlide>e&&(c.currentSlide=e)),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d);}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(a){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});