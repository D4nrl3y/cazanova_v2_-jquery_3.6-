(function(a){function b(a){return a.replace(/[&<>"'`=\/]/g,function(a){return l[a]})}function c(a){return"undefined"!=typeof a.node.edge_media_to_caption.edges[0]&&"undefined"!=typeof a.node.edge_media_to_caption.edges[0].node&&"undefined"!=typeof a.node.edge_media_to_caption.edges[0].node.text&&null!==a.node.edge_media_to_caption.edges[0].node.text?a.node.edge_media_to_caption.edges[0].node.text:"undefined"!=typeof a.node.title&&null!==a.node.title&&0!=a.node.title.length?a.node.title:!("undefined"==typeof a.node.accessibility_caption||null===a.node.accessibility_caption||0==a.node.accessibility_caption.length)&&a.node.accessibility_caption}function d(a,b){var c=b||!1;if(!b&&0<a.cache_time){var d=localStorage.getItem(a.cache_time_key);null!==d&&parseInt(d)+60000*a.cache_time>new Date().getTime()&&(c=!0)}if(c){var e=localStorage.getItem(a.cache_data_key);if(null!==e)return JSON.parse(e)}return!1}function e(a,b){var c=localStorage.getItem(a.cache_time_key),d=0!=a.cache_time&&(null===c||parseInt(c)+60000*a.cache_time>new Date().getTime());d&&(localStorage.setItem(a.cache_data_key,JSON.stringify(b)),localStorage.setItem(a.cache_time_key,new Date().getTime()))}function f(a,b){switch(a){case"username":case"tag":case"location":try{b=b.split("window._sharedData = ")[1].split("</script>")[0]}catch(a){return!1}return b=JSON.parse(b.substr(0,b.length-1)),b=b.entry_data.ProfilePage||b.entry_data.TagPage||b.entry_data.LocationsPage,"undefined"!=typeof b&&(b[0].graphql.user||b[0].graphql.hashtag||b[0].graphql.location);break;case"userid":return"undefined"!=typeof b.data.user&&b.data.user;}}function g(b,c,d,h,i,j){var k;i&&j&&(k="https://images"+~~(3333*Math.random())+"-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url="+b),a.get(k||b,function(a){data=f(c,a),!1===data?h(!1):h(data)}).fail(function(a){1<d?(console.warn("Instagram Feed: Request failed, "+(d-1)+" tries left. Retrying..."),g(b,c,d-1,h,i,!j)):h(!1,a)})}function h(a,b){var c=d(a,!1);if(!1!==c)b(c);else{var f;switch(a.type){case"username":f=a.host+a.id+"/";break;case"tag":f=a.host+"explore/tags/"+a.id+"/";break;case"location":f=a.host+"explore/locations/"+a.id+"/";break;case"userid":f=a.host+"graphql/query/?query_id=17888483320059182&variables={\"id\":\""+a.id+"\",\"first\":"+a.items+",\"after\":null}";}g(f,a.type,a.max_tries,function(c,f){!1===c?"undefined"==typeof f?a.on_error("Instagram Feed: It looks like the profile you are trying to fetch is age restricted. See https://github.com/jsanahuja/InstagramFeed/issues/26",3):(c=d(a,!0),!1===c?a.on_error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: "+f.status,5):b(c)):(e(a,c),b(c))},a.host===j.host&&"userid"!=a.type,!1)}}function i(d,e){var f,g="";if(d.styling){var h=(100-2*d.margin*d.items_per_row)/d.items_per_row;f={profile_container:" style=\"text-align:center;\"",profile_image:" style=\"border-radius:10em;width:15%;max-width:125px;min-width:50px;\"",profile_name:" style=\"font-size:1.2em;\"",profile_biography:" style=\"font-size:1em;\"",gallery_image:" style=\"width:100%;\"",gallery_image_link:" style=\"width:"+h+"%; margin:"+d.margin+"%;position:relative; display: inline-block; height: 100%;\""},d.display_captions&&(g+="<style>                    a[data-caption]:hover::after {                        content: attr(data-caption);                        text-align: center;                        font-size: 0.8rem;                        color: black;                        position: absolute;                        left: 0;                        right: 0;                        bottom: 0;                        padding: 1%;                        max-height: 100%;                        overflow-y: auto;                        overflow-x: hidden;                        background-color: hsla(0, 100%, 100%, 0.8);                    }                </style>")}else f={profile_container:"",profile_image:"",profile_name:"",profile_biography:"",gallery_image:"",gallery_image_link:""};if(d.display_profile&&"userid"!==d.type&&(g+="<div class=\"instagram_profile\""+f.profile_container+">",g+="<img class=\"instagram_profile_image\" src=\""+e.profile_pic_url+"\" alt=\""+("tag"==d.type?e.name+" tag pic":e.username+" profile pic")+"\""+f.profile_image+(d.lazy_load?" loading=\"lazy\"":"")+" />","tag"==d.type?g+="<p class=\"instagram_tag\""+f.profile_name+"><a href=\"https://www.instagram.com/explore/tags/"+d.tag+"/\" rel=\"noopener\" target=\"_blank\">#"+d.tag+"</a></p>":"username"==d.type?(g+="<p class='instagram_username'"+f.profile_name+">@"+e.full_name+" (<a href='https://www.instagram.com/"+d.username+"/' rel='noopener' target='_blank'>@"+d.username+"</a>)</p>",d.display_biography&&(g+="<p class='instagram_biography'"+f.profile_biography+">"+e.biography+"</p>")):"location"==d.type&&(g+="<p class='instagram_location'"+f.profile_name+"><a href='https://www.instagram.com/explore/locations/"+d.location+"/' rel='noopener' target='_blank'>"+e.name+"</a></p>"),g+="</div>"),d.display_gallery)if("undefined"!=typeof e.is_private&&!0===e.is_private)g+="<p class=\"instagram_private\"><strong>This profile is private</strong></p>";else{var j="undefined"==typeof k[d.image_size]?k[640]:k[d.image_size],l=(e.edge_owner_to_timeline_media||e.edge_hashtag_to_media||e.edge_location_to_media).edges,m=l.length>d.items?d.items:l.length;g+="<div class='instagram_gallery'>";for(var n=0;n<m;n++){var o,p,q="https://www.instagram.com/p/"+l[n].node.shortcode,r=b(c(l[n],e));switch(!1===r&&(r=("userid"==d.type?"":d.id)+" image"),l[n].node.__typename){case"GraphSidecar":p="sidecar",o=l[n].node.thumbnail_resources[j].src;break;case"GraphVideo":p="video",o=l[n].node.thumbnail_src;break;default:p="image",o=l[n].node.thumbnail_resources[j].src;}g+="<a href=\""+q+"\""+(d.display_captions?" data-caption=\""+r+"\"":"")+" class=\"instagram-"+p+"\" rel=\"noopener\" target=\"_blank\""+f.gallery_image_link+">",g+="<img"+(d.lazy_load?" loading=\"lazy\"":"")+" src=\""+o+"\" alt=\""+r+"\""+f.gallery_image+" />",g+="</a>"}g+="</div>"}if(d.display_igtv&&"undefined"!=typeof e.edge_felix_video_timeline){var s=e.edge_felix_video_timeline.edges,m=s.length>d.items?d.items:s.length;if(0<s.length){g+="<div class=\"instagram_igtv\">";for(var n=0;n<m;n++){var q="https://www.instagram.com/p/"+s[n].node.shortcode,r=b(c(s[n],e));!1===r&&(r=("userid"==d.type?"":d.id)+" image"),g+="<a href=\""+q+"\""+(d.display_captions?" data-caption=\""+r+"\"":"")+" rel=\"noopener\" target=\"_blank\""+f.gallery_image_link+">",g+="<img"+(d.lazy_load?" loading=\"lazy\"":"")+" src=\""+s[n].node.thumbnail_src+"\" alt=\""+r+"\""+f.gallery_image+" />",g+="</a>"}g+="</div>"}}a(d.container).html(g)}var j={host:"https://www.instagram.com/",username:"",tag:"",user_id:"",location:"",container:"",display_profile:!0,display_biography:!0,display_gallery:!0,display_captions:!1,display_igtv:!1,max_tries:8,callback:null,styling:!0,items:8,items_per_row:4,margin:.5,image_size:640,lazy_load:!1,cache_time:360,on_error:console.error},k={150:0,240:1,320:2,480:3,640:4},l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};a.instagramFeed=function(b){var c=a.fn.extend({},j,b);return""==c.username&&""==c.tag&&""==c.user_id&&""==c.location?(c.on_error("Instagram Feed: Error, no username, tag or user_id defined.",1),!1):("undefined"!=typeof b.display_profile&&b.display_profile&&""!=c.user_id&&console.warn("Instagram Feed: 'display_profile' is not available using 'user_id' (GraphQL API)"),"undefined"!=typeof b.display_biography&&b.display_biography&&(""!=c.tag||""!=c.location||""!=c.user_id)&&console.warn("Instagram Feed: 'display_biography' is not available unless you are loading an user ('username' parameter)"),"undefined"!=typeof c.get_data&&console.warn("Instagram Feed: options.get_data is deprecated, options.callback is always called if defined"),null==c.callback&&""==c.container)?(c.on_error("Instagram Feed: Error, neither container found nor callback defined.",2),!1):(""==c.username?""==c.tag?""==c.location?(c.type="userid",c.id=c.user_id):(c.type="location",c.id=c.location):(c.type="tag",c.id=c.tag):(c.type="username",c.id=c.username),c.cache_data_key="instagramFeed_"+c.type+"_"+c.id,c.cache_time_key=c.cache_data_key+"_time",h(c,function(a){""!=c.container&&i(c,a),null!=c.callback&&c.callback(a)}),!0)}})(jQuery);

;(function(window, $){
   
    var config = {
        breadcrumb: function(){
            if(!$('.breadcrumb').length && !$('html').hasClass('page-home')){
                $('.area-content.container').prepend('<div class="breadcrumb flex">\
                <div class="icon icon-arrow-left" role="button" tabindex="0" aria-label="Voltar página"></div>\
                <ol class="list">\
                    <li>\
                        <a href="/">Início</a>\
                    </li>\
                    <li>\
                        <a href="'+window.location.href+'">\
                            <span>'+document.title.split(' - ')[0]+'</span>\
                        </a>\
                    </li>\
                </ol>\
            </div>');
            }

            $('.breadcrumb .icon-arrow-left').on('click', function(){
                var link = document.referrer == window.location.href ? '/' : document.referrer;
                window.location.href = link;
            });
        },
        /*instagram: function(){
            if(!$('#instagram').is(':visible')) return;
            new LazyLoad({
                 elements_selector: ".section-instagram",
                 callback_enter: function(){
                    $.instagramFeed({
                        'username': window.instagram,
                        'container': "#instagram",
                        'display_profile': false,
                        'display_biography': false,
                        'display_gallery': true,
                        'callback': null,
                        'styling': true,
                        'items':4,
                        'items_per_row': 1,
                        'margin': 0,
                        'lazy_load': true,
                        'image_size': 320,
                        'on_error': console.error
                    });
                }
            });          
        },*/        
        ebit: function(){
            if(!$('.seals-line .ebit').length) return;
            // new LazyLoad({
            //     elements_selector: ".seals-line",
            //     callback_enter: function(){
                // $(window).on('load', function(){
              
                    // var el = document.createElement('script');
                    // el.src = 'https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?102787'
                    // el.id = 'getSelo';
                    // el.type = 'text/javascript';
                    // el.async;
                    // el.defer;
                    // document.querySelector('body').appendChild(el);
               
                    
                // });
            //     }
            // });
           
        },
        resets: function(){

            // trocar senha
            $('.page-central_senha input[type="image"]').after('<button type="submit" class="botao-commerce">Continuar</button>').remove();

            // panel
            // .page-extra .page-content table, .page-extras .page-content table,
            // $('.col-panel table, .board_htm table').wrap('<div class="table-overflow"></div>');
            $('.caixa-cadastro #email_cadastro').attr('placeholder', 'Seu e-mail');

            // contact
            $('#imagem[src*="filtrar.gif"]').after('<button type="submit" class="botao-commerce">Filtrar</button>');
            $('#imagem[src*="filtrar.gif"]').remove();

            $('input[src*="gerarordem.png"]').after('<button type="submit" class="botao-commerce">Gerar ordem de devolução</button>');
            $('input[src*="gerarordem.png"]').remove();

            // $('#form-comments #bt-submit-comments').before('<button class="botao-commerce">Enviar</button>').remove();

            $('[src="/mvc/store/img/ico_clientes_relacionar.jpg"]').after('<div class="flex justify-end"><div class="button inline-block" role="button">Relacionar mais clientes</div></div>');
            $('[src="/mvc/store/img/ico_clientes_relacionar.jpg"]').remove();

            $('[src="/mvc/store/img/voltar.png"]').after('<span class="button inline-block" role="button">Voltar</span>');
            $('[src="/mvc/store/img/voltar.png"]').remove();

            $('[src="/mvc/store/img/enviar.png"], #enviar_dep,.newsletterBTimg').after('<button class="button inline-block yellow" role="button">Enviar</button>');
            $('[src="/mvc/store/img/enviar.png"],#enviar_dep,.newsletterBTimg').remove();

            $('[src="/mvc/store/img/utilizar_lista.gif"]').after('<span class="button inline-block" role="button">Utilizar</span>');
            $('[src="/mvc/store/img/utilizar_lista.gif"]').remove();

            $('[src="/mvc/store/img/imprimir_orcamento.png"]').after('<span class="button" role="button"> <span class="icon icon-impressao"></span>Imprimir Orçamento</span>');
            $('[src="/mvc/store/img/imprimir_orcamento.png"]').remove();
            $('[src="/mvc/store/img/realizar_pagamento.png"]').after('<span class="button green" role="button">Fechar pedido <span class="icon icon-down"></span></span>');
            $('[src="/mvc/store/img/realizar_pagamento.png"]').remove();

            $('.caixa-login').after('<div class="divider">OU</div>');

            $('#email_cadastro').attr('placeholder', 'Ex: maria@example.com');
            $('.botao-efetuar-login').text('Entrar');

            $('.nav-mobile .sub-is').on('click', function(e){
                e.preventDefault();
                $(this).next().addClass('active');
                $('.nav-mobile').addClass('full');

                $(this).next().addClass('active-over').parents('.modal-menu').removeClass('active-over');
            });

            $('.modal-menu .prev').on('click', function(){
                $(this).parent().removeClass('active').removeClass('active-over');
                if($(this).parent().parent().hasClass('list-categories')) $('.nav-mobile').removeClass('full');
                if($(this).parent().hasClass('modal-menu')) $(this).parent().removeClass('active-over');
            });

            $('#email_avise').attr('placeholder', 'Endereço de e-mail');

            $('[name="imageField"]').after('<div class="flex justify-start"><button class="button margin">Enviar</button></div>')
            $('[name="imageField"]').remove();

            $('.noticias li').wrapInner('<div class="box-noticia"></div>');

            $('.list-topics .name').on('click', function(){
                $(this).toggleClass('active');
            });

            $('.page-central_cliente .tablePage th,.page-central_cliente .tablePage td').each(function(){
                if($(this).text().trim() == ''){
                    $(this).text('');
                }
                
            });
        },
        header: function() {

            $('.header .search-icon').on('click', function(){
                $('.header .search').toggleClass('active');
                $(this).toggleClass('active');
            }); 

            // if($(window).width() < 1025 && $('.page-home,.page-catalog,.page-search').length){
            //     $('.header').addClass('fixed-mobile');

            //     var headerF = $('.header');
            //     headerF.find('.nav').remove();

            //     window.addEventListener('scroll', function(){
            //         if($(window).scrollTop() > 300){
            //             headerF.addClass('fixed-true');
            //         } else{
            //             headerF.removeClass('fixed-true');
            //         }
            //     }, false);
            // }

            $('.bar-top .button-close').on('click', function(){
                $(this).parent().remove();
            });

            $('.modal-sub [data-js="close"], .modal-sub .shadow, .header-modal .area-close').on('click', function(){
                $(this).parents('.modal-sub').removeClass('active');
            });

            $('.fixed-sub [data-js="close"], .shadow-cart').on('click', function(){
                $('.fixed-sub ,.shadow-cart, .target.featured').removeClass('active');
            });

            $('.fixed-sub span.target').on('click', function(){
                $(this).toggleClass('active');
            });

            $('.item-right.area-cart').on('click', function(){
                $('.cart-modal,.shadow-top').removeClass('active');
            });

            $('.rastreio-link').on('click', function(e){
                e.preventDefault();

                $('.rastreio-block').addClass('active');
                $('.modal-sub .content-sub').addClass('hidden');
            });

            $('.rastreio-block .header-rastreio').on('click', function(){
                $('.rastreio-block').removeClass('active');
                $('.modal-sub .content-sub').removeClass('hidden');
            });           

            $('.header .item-right.ajuda > span, .header .item-right.ajuda > .icon').on('click', function(){
                $('[data-js="modal-contact"]').addClass('active');
                $(this).parent().addClass('active');
            });

            $('[data-js="modal-contact"] [data-js="close"]').on('click', function(){
                $('[data-js="modal-contact"],.header .item-right.ajuda').removeClass('active');
            });

            $('.header .item-right.ajuda .shadow-help, .header .item-right.ajuda .area-close').on('click', function(){
                $('[data-js="modal-contact"], .header .item-right.ajuda').removeClass('active');
            });

            $('[data-js="open-menu"]').on('click', function(){
                $('.fixed-sub').toggleClass('active');
            });

            $('.target.featured[data-js="open_cart"]').on('click', function(){
                $('.fixed-sub ,.shadow-cart, .target.featured').removeClass('active');
            });

            $('.block-absolute-account .title-modal .icon').on('click', function(){
                $('.target.featured.open-account').removeClass('active');
            });
            
            $.ajax({
                method: 'GET',
                url: '/mvc/store/greeting?loja=' + $('html').attr('data-store'),
                success: function(res){
                    if(res.data.name){
                        $('.header .item-right.account').on('click', function(){
                            $('[data-js="modal-account"]').addClass('active');
                            //$('.fixed-sub,.header .item-right.account,.shadow-top').toggleClass('active');
                        });
                    } else{
                        $('.header .item-right.account').on('click', function(){
                            $('[data-js="modal-account"]').addClass('active');
                        });
                    }
                    if(!res.data.name) return;
                    $('.fixed-sub').addClass('has-login');
                    $('[data-js="name-user"]').text('Olá, '+res.data.name.split(' ')[0]+'!');
                    $('[data-js="email-user"]').text(res.data.email);
                }
            })

            $('.shadow-nav').on('click', function(){
                $('.modal-help').removeClass('active');
            });

            $('.shadow-top').on('click', function(){
                $('.cart-modal,.fixed-sub,.header .item-right,.shadow-top').removeClass('active');
            });

            $('.modal-theme .close,.close-button,[data-close-modal],.modal-theme .shadow').on('click', function(){
                $('.modal-theme,.shadow-nav').removeClass('active');
            });
        
            $('.header .item-right .close').on('click', function(){
                $('.cart-modal,.shadow-nav').removeClass('active');
            });

            $('.nav .sub-is,.item-right.account').on('mouseenter', function(){
                setTimeout(function(){
                    $('.shadow-nav').addClass('active');
                }, 200)
                
            }).on('mouseleave', function(){
                setTimeout(function(){
                    $('.shadow-nav').removeClass('active');
                }, 200)
            });

            // $('.item-right.help > .icon, .item-right.cart > .icon-cart').on('click', function(){
            //     setTimeout(function(){
            //         $('.shadow-nav').addClass('active');
            //     }, 200)
                
            // });

            $('.shipping-status').on('click', function(){
                $('.nav-mobile').addClass('full');
                $(this).next().addClass('active');
            });

            $('.item-right.help > .icon').on('click', function() {
                $('.modal-help').addClass('active')
            });

            $('.modal-help .close-button').on('click', function() {
                $('.modal-help').removeClass('active')
            });

            $('.shadow-modal').on('click', function(){
                $('.option-header').removeClass('active');
            });

            $('.sub-area > ul > li').on('mouseenter', function(){
                var index = $(this).index();
                new LazyLoad({
                    elements_selector: ".sub-area > ul > li:nth-child("+(index + 1)+") [data-src]"
                });
            });

            $('.nav .sub-is').on('mouseenter', function(){
                new LazyLoad({
                    elements_selector: ".sub-area > ul > li:nth-child(1) [data-src]"
                });
            });

            $('.fixed-sub .header-modal').on('click', function(){
                $(this).toggleClass('active');
            });

            // mobile nav 
            $('.fixed-sub div.area-text').on('click', function(){
                $(this).toggleClass('active');
            });

            $('.fixed-sub .list-category .target.subs').on('click', function(e){
                e.preventDefault();
                $(this).toggleClass('active');
            });

            $('.list-category .prev').on('click', function(){
                $(this).parent().prev().removeClass('active');
            });

            $('.footer .title').on('click', function(){
                $(this).toggleClass('active');
            })

            $('.header .menu').on('click', function() {
                $('.wrap-page').toggleClass('show-nav');
                $('.shadow-header').toggleClass('active');                
            });

            $('.shadow-header').on('click', function() {
                $('.wrap-page').toggleClass('show-nav');
                $('.shadow-header').toggleClass('active');
            });

            $('.area-item:nth-child(3) .option-header').on('click', function(){
                $(this).toggleClass('active');
            });

            $('.modal-option .close-button').on('click', function() {
                $('.area-item:nth-child(3) .option-header').removeClass('active');
            });

            $('.bar-footer').on('click', function(){
                $('body,html').animate({
                    scrollTop: 0
                });
            });

            $('.filter__title').on('click', function(){
                $(this).toggleClass('active');
                
            });

            $('.filter__label').on('click', function(){
                if(!$('.bar-filter-button').is(':visible')){
                    setTimeout(function(){
                        $('.smart-filter').trigger('submit');
                    },50);
                }               
            });

            $('.filter-mob .button.filter-btn').on('click', function(){
                $('.smart-filter').addClass('active');
            });

            $('.filter-mob .button.order-btn').on('click', function(){
                $('.select-order').toggleClass('active');
            });

            $('.filter-title .icon, .sha, .smart-filter > .filter-title, .bar-filter-button .button.close-filter').on('click', function(){
                $('.smart-filter').removeClass('active');
     
            });

            /*$('.help-link').on('click', function(){
                $(this).prev().toggleClass('active');
            });*/

            var height = jQuery('.list-catalog-area .article_html');
            if(height.find('.board').outerHeight() > 80){
                height.after('<div class="help-link">\
                                <span>Leia mais</span>\
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><defs><clipPath><path fill="#fe800a" stroke="#fff" stroke-width="0.8px" d="M0 0H12V12H0z" transform="translate(1597 2058)"/></clipPath><style>.arrow-orange-ic-3{fill:#fe800a}</style></defs><g transform="translate(-1597 -2058)"><g transform="translate(1597 2058.001)"><path d="M10.427 19.494a6 6 0 1 0-6-6.012 6.009 6.009 0 0 0 6 6.012zm.026-1.091a4.908 4.908 0 1 1 4.883-4.985 4.917 4.917 0 0 1-4.883 4.982z" class="arrow-orange-ic-3" transform="translate(-4.429 -7.496)"/><path d="M10.764 13.476l-1.488 1.487c-.286.286-.574.571-.857.859a.545.545 0 0 0 .308.933.549.549 0 0 0 .483-.181q.993-.995 1.988-1.988c.226-.226.453-.451.677-.678a.543.543 0 0 0 0-.825Q10.539 11.745 9.2 10.41a.547.547 0 0 0-.955.393.608.608 0 0 0 .2.4q1.09 1.087 2.179 2.176a1.107 1.107 0 0 0 .14.097z" class="arrow-orange-ic-3" transform="translate(-3.88 -7.496)"/></g></g></svg>\
                            </div>');
            } else{
                jQuery('.list-catalog-area .article_html').toggleClass('active');
            }

            jQuery('.help-link').on('click', function() {
                jQuery('.list-catalog-area .article_html').toggleClass('active');
            });

            // scroll 
            $('.nav-all').on('mouseenter', function(){
                $('.shadow-header').addClass('active-nav');
            }).on('mouseleave', function(){
                $('.shadow-header').removeClass('active-nav');
            });

            $('[data-js="up-scroll"]').on('click', function(){
                $('body,html').animate({
                    scrollTop: 0
                })
            });

            if(window.innerWidth > 1024 && !document.querySelectorAll('html.page-product').length)this.scrollHeader();           
       
        },
        scrollHeader: function () {

            //   if(window.innerWidth > 1024 && !document.querySelectorAll('html.page-product').length){
            //     window.addEventListener('scroll', function(){
            //       theme.scrollHeader();
            //     }, false);  
            //   }   
            // },
            // scrollHeader: function () {
            //   var bar = document.querySelector('.bar-top');
            //   var height = bar ? 48 : 0;
            //   (scroll.scrollTop > height) ? wrapper.classList.add("fixed") : wrapper.classList.remove("fixed");
            
            var didScroll;
            var lastScrollTop = 36;
            var delta = 5;
            var navbarHeight = jQuery('.header').outerHeight();
            var wrapper = jQuery(".wrap-page");
    
            (jQuery(window).scrollTop() > 36) ? wrapper.addClass("fixed") : wrapper.removeClass("fixed");
    
            window.addEventListener('scroll', function(){
                var bar = document.querySelector('.bar-top');
                var height = bar ? 48 : 0;
                (jQuery(window).scrollTop() > height) ? wrapper.addClass("fixed") : wrapper.removeClass("fixed");
    
                didScroll = true;
            }, false);  
    
            /*setInterval(function() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 250);
    
            function hasScrolled() {
                var st = jQuery(this).scrollTop();
                
                if(Math.abs(lastScrollTop - st) <= delta)
                    return;
    
                if (st > lastScrollTop && st > navbarHeight){
                    wrapper.removeClass('show-nav')
                } else {
                    if(st + jQuery(window).height() < jQuery(document).height()) {
                        wrapper.addClass('show-nav')
                    }
                }
                
                lastScrollTop = st;
            }*/
    
        },
        gridCatalog: function () {
            var catalog = $('.option-grid').length;
            var grid = $('.option-grid .option:eq(0)');
            var list = $('.option-grid .option:eq(1)');
            var getList = localStorage.getItem('listType');
            var listPorducts = $('.list-catalog');
            if (!catalog) return;
      
            if (getList == 'list') {
              listPorducts.addClass('line-type');
              grid.removeClass('active');
              list.addClass('active');
            }
      
            grid.on('click', function () {
              localStorage.setItem('listType', 'grid')
              grid.addClass('active');
              list.removeClass('active');
              listPorducts.removeClass('line-type');
            });
      
            list.on('click', function () {
              localStorage.setItem('listType', 'list');
              grid.removeClass('active');
              list.addClass('active');
              listPorducts.addClass('line-type');
            });
      
        },
        pricePisos: function() {

            jQuery('.list-products .product').each(function(){

                var valorMetro = jQuery(this).find('.metro-quadrado .caracteristica-metro').attr('value');
                var valorCaixa = jQuery(this).find('.metro-quadrado .valor-caixa').attr('value');
                var calculoValores = (valorCaixa / valorMetro);
                var total = calculoValores.toFixed(2).replace('.',',');
                jQuery(this).find('.metro-quadrado').prepend(jQuery('<span class="preco-metro">R$ '+total+' /m²</span>'));

            });            

        },
        pricePisosSecond: function() {

            jQuery('.list-products-second .product').each(function(){

                var valorMetro = jQuery(this).find('.metro-quadrado .caracteristica-metro-second').attr('value');
                var valorCaixa = jQuery(this).find('.metro-quadrado .valor-caixa').attr('value');
                var calculoValores = (valorCaixa / valorMetro);
                var total = calculoValores.toFixed(2).replace('.',',');
                jQuery(this).find('.metro-quadrado').prepend(jQuery('<span class="preco-metro">R$ '+total+' /m²</span>'));

            });            

        },
        init: function(){
            this.resets();
            this.filterCatalog();
            this.header();
            this.breadcrumb();
            this.resetEditor();
            this.gridCatalog();
            this.modalNews();
            // this.ebit();
            this.editDatePost($('.page-home .noticias'));
            this.blogHome();
            //this.instagram();
            this.pricePisos();
            this.pricePisosSecond();
            this.bannerMob();
        },
        filterCatalog: function(){
            
            $('.filter-list .button-select').on('click', function(){
                var loop = $(this).parent().index();
                $(this).toggleClass('active').parent().siblings().find('.button-select').removeClass('active');
            
                $('.item.filter-drop').eq(loop).toggleClass('active').siblings().removeClass('active')
            });

            $('.filter-active .item .icon-remove').on('click', function(){
                var element = $(this);
                var value = element.attr('data-value');

                $('input.filter__input').each(function(){
                    if(this.value === value){
                    
                        $(this).prop('checked', false);
                        element.parent().remove();

                        reloadProduct();
                    }
                });

            });

            function reloadProduct(){
                setTimeout(function(){
                    $('[name="form-filter"]').trigger('submit');
                },30);
            }

            var list = [];

            jQuery('#select_ordem option').each(function() {
                list.push({
                    name: jQuery(this).text(),
                    value: jQuery(this).attr('value'),
                    check: jQuery(this).attr('selected') || ''
                });
            });

            var listAp = jQuery('.select-button .list');

            list.forEach(function(val){
                // if(val.check){
                //     jQuery('.option-button.value').text(val.name);
                // } else {
                    var check = val.check;
                    listAp.append('<div class="option-button '+check+'" tabindex="0" data-value="'+val.value+'" role="button">'+val.name+'</div>')
                // }
                
            });

            jQuery('.option-button:not(.value)').on('click', function(){
                jQuery('.option-button.value').removeClass('active').text(jQuery(this).text());
                jQuery('#select_ordem').val(jQuery(this).attr('data-value'));
                jQuery('[data-form="filter"]').trigger('submit');
            });

            $('.filter-list .close-button').on('click', function(){
                $('.filter-list').removeClass('active');
            });

            $('.filter-list .prev').on('click', function(){
                var index = $(this).parent().index();

                $(this).parent().removeClass('active');

                $('.filter-list .list-buttons .select-area:eq('+index+') .button-select').removeClass('active');
            });

            $('.fixed-order .option:first-child .button-area').on('click', function(){
                $(this).toggleClass('active');
                $('.list-catalog').toggleClass('active');
            });

            $('.button-link').on('click', function(){
                $('.button-link').toggleClass('active');
                $('.area-filter .list-category').toggleClass('active');
                if($('.area-filter .list-category').hasClass('active')){
                    localStorage.setItem('listCatalog','1');
                }else{
                    localStorage.removeItem('listCatalog');
                }
            });

            if(localStorage.getItem('listCatalog') == 'line'){
                $('.button-link').toggleClass('active');
                $('.area-filter .list-category').toggleClass('active');
            }

            $('.filter__name').on('click', function(){
                setTimeout(function(){
                    $('.smart-filter').trigger('submit');
                },50)
            });

            // load pages 
            $('.pagination .button').on('click', function(){
                var button = $(this);
                var link = $('.page-last a').attr('href');
                var last = $('[data-pages]').data('pages');
                var actual = $('[data-page-load]');
                if(button.hasClass('load')) return;

                actual.attr('data-page-load', Number(actual.attr('data-page-load')) + 1);

                link = link.replace(/pg=\d+/g, 'pg=' + actual.attr('data-page-load'));

                var e = $('.list-catalog');

                button.addClass('load');
                
                $.ajax({
                    url: link,
                    type: "GET",
                    async: !0,
                    success: function(s) {  
                        button.removeClass('load');
                        var t = s;
                        e.append($(t).find(".list-catalog").html());


                        new LazyLoad({
                            elements_selector: ".product .lazyload:not(.loaded)"
                        });
     
                        if(Number(actual.attr('data-page-load')) == last) button.remove();
                    }
                })

            });

        },
        resetEditor: function() {
            var html = $('.article_html .board');
            if(!$('.article_html .board').length) return;
        
            html.find('table').wrap('<div class="overflow-table">');
        
            html.find('iframe[src*="youtu"]').wrap('<div class="video-box"></div>')
        },
        setSwiperShowcase: function(element){
            new Swiper(element.querySelector('.swiper-container'), {
                preloadImages: false,
                lazy: {
                  loadPrevNext: false,
                },
                navigation: {
                  nextEl: element.querySelector('.next'),
                  prevEl: element.querySelector('.prev'),
                },
                pagination: {
                  clickable: true,
                  el: element.querySelector('.swiper-pagination')
                },
                loop: document.querySelector('html').classList.contains('page-home') ? true : false,
                slidesPerView: 'auto',
                watchSlidesVisibility: true
            });
        },
        bannerMob: function(){
            new Swiper('.banner-line-content-mob .swiper-container', {
                preloadImages: false,
                effect: 'fade',
                autoplay :{
                    delay: 5000,
                    disableOnInteraction : false
                },
                lazy: {
                  loadPrevNext: true,
                },
                navigation: {
                  nextEl: '.banner-line-content-mob .next',
                  prevEl: '.banner-line-content-mob .prev',
                },
                pagination: {
                  clickable: false,
                },                
                loop: document.querySelector('html').classList.contains('page-home') ? true : false,
                slidesPerView: 'auto',
                watchSlidesVisibility: true
            });
        },
        editDatePost: function(e){
            e.find('h3').each(function(){
                var split = $(this).html().split(' - ');
                var pub = split[0];
                var linkText = split[1];
                function setDate(dateSet){
                    var listDate = dateSet.split('/');

                    var month = ['Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'];

                    return listDate[0] + ' ' + month[(Number(listDate[1]) - 1)] + ', ' + listDate[2];
                }

                $(this).html(linkText).before('<div class="date">'+setDate(pub)+'</div>');
            });
        },
        modalNews: function(){
            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires="+ d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }
            
            $('.modal-theme .close,.modal-theme .shadow').on('click', function(){
                $('.modal-theme').removeClass('active');
                setCookie('modalnews','true', 7);
            });

            // if(document.cookie.indexOf('modalnews') == -1){
            //     $('.modal-news').addClass('active');
            // }

            $('.button-news').on('click', function(){
                $('.modal-news-button').addClass('active');
            });
        },
        blogHome: function(){

            var s = "busca_noticias.php?loja=" + document.getElementsByTagName("html")[0].getAttribute("data-store") +'&'+ document.getElementsByTagName("html")[0].getAttribute("data-files")
              , e = jQuery(".list-posts");
            jQuery.ajax({
                url: s,
                type: "GET",
                dataType: "html",
                contentType: "charset=iso-8859-1",
                success: function(s) {
                    var t = s.replace(/src/g, 'class="lazy" data-src');
                    e.html('<div class="noticias">' + jQuery(t).find(".noticias").html() + "</div>"),
                    e.find("li").wrapInner('<div class="box-noticia"></div>'),
                    e.find(".noticias li:nth-child(n+5)").remove(),
                    e.find('.box-noticia').unwrap(),
                    e.find('h3').each(function(){
                        var split = $(this).html().split(' - ');
                        var pub = split[0];
                        var linkText = split[1];

                        $(this).html(linkText).before('<div class="date">'+pub+'</div>');
                    });

                    new LazyLoad({
                        elements_selector: '.box-noticia img',
                    });
                
                    !e.find('.box-noticia').length && jQuery('.section-blog').remove();
                    
                }
            })
        },

    }
    config.init();
})(window,jQuery);