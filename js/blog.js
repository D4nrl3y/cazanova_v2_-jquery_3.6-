;(function($){
    function toReal(value) {
        return  'R$ ' + Number(value).formatMoney(2, ',', '.');
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


    $('#noticia_dados h3').each(function(){
        var title = $(this).find('a').clone();
        $(this).find('a').remove();
        var datePost = $(this).text().replace(' -', '');

        $(this).before('<span class="date">'+datePost+'</span>');
        $(this).html('').append(title);
    });

    if (jQuery('.page-noticia').length) {
        var socialListShare = '<div class="social-share-links">' +
          '<a title="Clique aqui e compartilhe pelo facebook essa notícia" href="javascript:;" data-href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(window.location.href) + '"><span class="icon icon-circle-facebook"></span></a>' +
          '<a title="Clique aqui e compartilhe pelo Linkedin essa notícia" href="javascript:;" data-href="https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURI(window.location.href) + '"><span class="icon icon-circle-linkedin"></span></a>' +
          '<a title="Clique aqui e compartilhe pelo Twitter essa notícia" href="javascript:;" data-href="https://twitter.com/share?url=' + encodeURI(window.location.href) + '"><span class="icon icon-circle-twitter"></span></a>'+
          '<a title="Clique aqui e compartilhe pelo Whatsapp" target="_blank" href="https://wa.me/?text='+encodeURI(window.location.href)+'"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm5.425781 405.050781c-.003906 0 .003907 0 0 0h-.0625c-25.644531-.011719-50.84375-6.441406-73.222656-18.644531l-81.222656 21.300781 21.738281-79.375c-13.410156-23.226562-20.464844-49.578125-20.453125-76.574219.035156-84.453124 68.769531-153.160156 153.222656-153.160156 40.984375.015625 79.457031 15.96875 108.382813 44.917969 28.929687 28.953125 44.851562 67.4375 44.835937 108.363281-.035156 84.457032-68.777343 153.171875-153.21875 153.171875zm0 0"></path><path d="m261.476562 124.46875c-70.246093 0-127.375 57.105469-127.40625 127.300781-.007812 24.054688 6.726563 47.480469 19.472657 67.75l3.027343 4.816407-12.867187 46.980468 48.199219-12.640625 4.652344 2.757813c19.550781 11.601562 41.964843 17.738281 64.816406 17.746094h.050781c70.191406 0 127.320313-57.109376 127.351563-127.308594.011718-34.019532-13.222657-66.003906-37.265626-90.066406-24.042968-24.0625-56.019531-37.324219-90.03125-37.335938zm74.90625 182.035156c-3.191406 8.9375-18.484374 17.097656-25.839843 18.199219-6.597657.984375-14.941407 1.394531-24.113281-1.515625-5.5625-1.765625-12.691407-4.121094-21.828126-8.0625-38.402343-16.578125-63.484374-55.234375-65.398437-57.789062-1.914063-2.554688-15.632813-20.753907-15.632813-39.59375 0-18.835938 9.890626-28.097657 13.398438-31.925782 3.511719-3.832031 7.660156-4.789062 10.210938-4.789062 2.550781 0 5.105468.023437 7.335937.132812 2.351563.117188 5.507813-.894531 8.613281 6.570313 3.191406 7.664062 10.847656 26.5 11.804688 28.414062.957031 1.917969 1.59375 4.152344.320312 6.707031-1.277344 2.554688-5.519531 8.066407-9.570312 13.089844-1.699219 2.105469-3.914063 3.980469-1.679688 7.8125 2.230469 3.828125 9.917969 16.363282 21.296875 26.511719 14.625 13.039063 26.960938 17.078125 30.789063 18.996094 3.824218 1.914062 6.058594 1.59375 8.292968-.957031 2.230469-2.554688 9.570313-11.175782 12.121094-15.007813 2.550782-3.832031 5.105469-3.191406 8.613282-1.914063 3.511718 1.273438 22.332031 10.535157 26.160156 12.449219 3.828125 1.917969 6.378906 2.875 7.335937 4.472657.960938 1.597656.960938 9.257812-2.230469 18.199218zm0 0"></path></svg></a>'
        if (jQuery('.whatsapp-number-contact').length) {
          socialListShare += '' +
            '<a title="Clique aqui e compartilhe pelo Whatsapp essa notícia" href="javascript:;" data-href="https://api.whatsapp.com/send?l=pt&phone=55' + jQuery('.whatsapp-number-contact').attr('data-number') + '&text=' + encodeURI(window.location.href) + '"><span class="icon icon-circle-whatsapp"></span></a>' ;
        }
        socialListShare += '</ul>';
        jQuery('.page-noticia .container3 > .container2 > .board:first-of-type').eq(0).append(jQuery('<div class="line-title-share"></div>'))
        jQuery(socialListShare).appendTo('.link-bottom-news');
        setTimeout(function () {
          jQuery('.social-share-links a').on('click', function (e) {
            e.preventDefault();
            var height = jQuery(window).height() >= 600 ? 600 : jQuery(window).height()
            var width = jQuery(window).width() >= 600 ? 600 : jQuery(window).width()
            window.open(jQuery(this).attr('data-href'), "Compartilhar", "height=" + height + ",width=" + width + ",left=200,top=200,menubar=0");
          });
        }, 300);
        var products = [];

        $('.prodBox div > img').each(function(){
            var id;
            $(this).attr('src').replace(/(\d+)_\d+_\d+?\./g, function(reg, select){
                id = select;
            });
            products.push(id);
        });

        var params = {};

        params["id"] = products.join();
        params["attrs"] = [
            'Product.ProductImage',
            'Product.payment_option_details',
            'Product.images',
            'Product.name',
            'Product.price',
            'Product.promotional_price',
            'Product.url'
        ].join();

      $.ajax({
        method: "GET",
        url: "/web_api/products/",
        data: params
      }).done(function( response, textStatus, jqXHR ) {
        console.log(response);

        
        var list = '';


        response.Products.forEach(function(val){
            var product = val.Product;
            var priceFeatured = product.promotional_price > 0 ? toReal(product.price_offer) : toReal(product.price);

            var payment = '';
    
            product.payment_option_details.forEach(function(val, i){
                if(i == 0){
                    payment = 'até '+val.plots+'x de '+ toReal(val.value);
                }
            });
    
            var price = '<span class="area-price">';
            if(product.promotional_price > 0) price += '<span class="before">'+toReal(product.price, 'R$')+'</span>';
            price += '<span class="after-featured">'+priceFeatured+'</span>';
            price += '<span class="parcel">'+payment+'</span>';
            price += '</span>';
    
            var discount = product.promotional_price > 0 ? '<div class="discount">'+ 100 - (Number(product.promotional_price) / Number(product.price) * 100)+'%</div>' : '';
            
            list += '<div class="item">\
            <a href="'+product.url.https+'" class="product horizontal">\
                <span class="image">\
                    <img class="lazyload" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAQMAAAC3/F3+AAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjwAsAAB4AAdpxxYoAAAAASUVORK5CYII=" data-src="'+product.ProductImage[0].thumbs[180].https+'">\
                    '+discount+'\
                </span>\
                <span class="info">\
                    <span class="name">'+product.name+'</span>\
                    '+price+'\
                </span>\
            </a></div>';
        });

        $('.prodBox').html('<div class="section-showcase"><h2 class="title-section">Produtos relacionados</h2><div class="flex line-related">'+list+'</div></div>');
        
        setTimeout(function(){
            new LazyLoad({
                elements_selector: ".prodBox .lazyload"
            });
        },1500);
      });
    }
})(jQuery);