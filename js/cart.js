function toReal(value,r) {
    return  r + Number(value).formatMoney(2, ',', '.');
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

var cart = {
    session: function () {
        return jQuery("html").attr("data-session");
    },
    idStore: function(){
        return jQuery("html").attr("data-store");
    },
    removeProduct: function (element){
        var id = parseInt(jQuery(element).attr('data-id'));
        var variant = '/'+jQuery(element).attr('data-variant');
        var addText = jQuery(element).attr('data-add') == "" ? '' : "/?additional_information=" + jQuery(element).attr('data-add').replace(/br>/g, 'br/>');
        var together = jQuery(element).attr('data-together') !== '' ? '/'+jQuery(element).attr('data-together') : ''; 
        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session() + "/" + id + variant + together + addText
        }).done(function (response) {
            cart.listProduct();
        }).fail(function (error) {
            cart.listProduct();
        });
    },
    addQnt: function(ele,values){
        this.refreshQnt(ele,{
            cart_id: values.cart_id,
            quantity: values.quantity,
            product_id: values.product_id,
            variant_id: values.variant_id
        })
    },
    refreshQnt: function(ele,values){
        var url = '/checkout/cart/api/item/'+values.cart_id+'?session_id='+this.session()+'&store_id='+this.idStore()+'&zip_code=null';
        var qnt;

        if(jQuery(ele).attr('data-js') == 'decrement'){
            if(values.quantity == 1) {
                // cart.removeProduct(ele);
                return;
            }

            if(values.quantity > 1){
                if(values.quantity == 1) $(ele).addClass('disabled');
                qnt = values.quantity - 1;
            }
        }
        
        if(jQuery(ele).attr('data-js') == 'increment'){
 
            if(jQuery(ele).hasClass('disabled')) return;

            qnt = values.quantity + 1;
        }

        if(typeof values.manually !== 'undefined' && values.manually) {
            qnt = values.quantity;
        }

        jQuery.ajax({
            method: 'PUT',
            url: url,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader("x-newrelic-id", "VQUOWFdaDxADVFJWAQYCXg==");
            // },
            data: jQuery.param( {
                quantity: qnt,
                product_id: values.product_id,
                variant_id: values.variant_id
            } ),
            success: function() {
                cart.listProduct();
            }
        });
    },
    listProduct: function(){

        jQuery('.cart-modal .list').html('<div class="load-css"></div>');
        jQuery('.cart-modal').removeClass('load');

        jQuery.ajax({
            method: 'GET',
            url: '/checkout/cart/api?session_id='+cart.session()+'&store_id='+cart.idStore()+'&nocache=0.'+new Date().getTime(),
            success: function(r) {
                var forList = r.data.cart.products;
                var addList = [];

                forList.forEach(function(list){
                    addList.push({
                        "Cart": {
                            "email": "",
                            "variants_kit": list.variants_kit || "",
                            "additional_info_kit": list.additional_info_kit || "",
                            "price_itens_kit": list.price_itens_kit || "",
                            "product_id": list.id,
                            "product_name": list.name,
                            "quantity": list.quantity,
                            "price": list.price,
                            "variant_id": list.variant_id || "0",
                            "additional_information": list.additional_information,
                            "product_url": list.url,
                            "bought_together_id": list.bought_together_id || "",
                            "product_image": list.images,
                            "cart_id": list.cart_id,
                            "stock": list.stock

                        }
                    })
                });

                cart.forProduct(addList);
            },
            error: function(){
                cart.forProduct([]);
            }
        });
    },
    number: function(number){
        jQuery('[data-cart="amount"]').text(number);
    },
    total: function(price){
        this.shipping(price);
        jQuery('[data-cart="price"]').text(toReal(parseFloat(price),''));
        jQuery('[data-js="price"]').text(toReal(parseFloat(price), 'R$ '));
    },
    forProduct: function (listProducts) {
        var listDom = jQuery('.cart-modal .list');
        listDom.find('*').remove();
        listDom.parent().removeClass('empty');
        listDom.parent().addClass('load');

        jQuery('.modal-theme').removeClass('active');

        jQuery('.cart-header').addClass('active');

        var button = jQuery('.botao-commerce.buy');

        var https = button.attr('href')

        var checkout = https+'/checkout?session_id='+cart.session()+'&store_id='+cart.idStore();
        button.attr('href', checkout);
        var qnt = 0;
        var total = 0.0;

        var listId = [];
        if (listProducts.length){

            listProducts.forEach(function (product) {
                product = product.Cart;
                
                var addMsg = product.additional_information.replace(/\//g, '');
                prices = product;
                // product.productImage.thumbs[90].https;
                listDom.append(cart.templateProduct(product.product_id, product.variant_id, product.product_name, product.product_image.medium, product.quantity, product.price, product.product_url.https,addMsg,product.additional_info_kit, product.bought_together_id,product.cart_id,product.stock));
                qnt += parseInt(product.quantity);

                total += (parseFloat(product.price) * parseInt(product.quantity));
            
                listId.push(parseInt(product.product_id));
                
            });
            cart.number(qnt);
            cart.total(total);
            
        }else{
            listDom.append('<div class="empty-area"><div class="area-icon"></div><span class="featured">Carrinho de compras vazio</span><span class="msg">Nenhum item foi adicionado ainda.</span></div>');
            listDom.parent().addClass('empty');
            listDom.parent().removeClass('load');
            cart.number(0);
            cart.total(0);

            jQuery('body').find('.add-cart .buy-product').each(function(){
                if(jQuery(this).hasClass('active')) jQuery(this).removeClass('active').find('.text').text('Comprar');
            });
            
        }
    },
    startCart: function () {
        jQuery('[data-js="open_cart"]').on('click', function(){
            cart.showCart();
        });

        // add product variant
        jQuery('.product-submit').on('submit', function(e){
            e.preventDefault();
            var variant = jQuery(this).find('.select').val();
            var quantity = jQuery(this).find('.quantity').val();
            var product_id = jQuery(this).find('.quantity').attr('data-id');
            if(variant) cart.addVariantComplete(variant, quantity, product_id);
        });

        jQuery('.cart-modal .close-button, .cart-modal .continue-buying').on('click', function() {
            jQuery('.shadow-top,.cart-modal').toggleClass('active');
        });

        jQuery('.remove-items').on('click', function() {
            cart.removeCart();
        });
    },
    removeCart: function() {
        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session()
        }).done(function (response) {
            cart.listProduct();
        }).fail(function (error) {
            cart.listProduct();
        });
    },
    showCart: function(){
        jQuery('.shadow-top,.cart-modal').toggleClass('active');
        cart.listProduct();
    },
    // <div class="remove icon icon-close" data-stock="{stock}" data-together="{together}" data-id="{id}" data-variant="{variant}" data-add="{addMsg}" onclick="cart.removeProduct(this)"></div>\
    templateProduct: function (id,variant,name,image,qnt,price,url,addMsg,infoKit,together,cart_id,stock) {

        var param = "{\
        'cart_id': "+cart_id+",\
        'quantity': "+qnt+",\
        'product_id': "+id+",\
        'variant_id': "+variant+"\
        }";
        
         var template = '\
        <div class="item flex">\
            <a href="{url}"><img src="{image}" alt="{name}"></a>\
            <div class="info">\
                <span class="name">{name}</span>\
                <div class="line-footer">\
                    <span class="price">{price}</span>\
                    <div class="qnt">\
                        <input data-js="qnt" type="number" value="{length}" min="1" max="{stock}" data-cart-id="{cart_id}" data-id="{id}" data-variant="{variant}" />\
                        <div data-js="decrement" tabindex="0" role="button" data-stock="{stock}" data-together="{together}" data-id="{id}" data-variant="{variant}" data-add="{addMsg}" onclick="cart.addQnt(this,'+param+')" class="{disableDec}"></div>\
                        <div data-js="increment" tabindex="0" role="button" data-stock="{stock}" data-together="{together}" data-id="{id}" data-variant="{variant}" data-add="{addMsg}" onclick="cart.addQnt(this,'+param+')" class="{disable}"></div>\
                    </div>\
                    <div class="remove" data-id="{id}" data-variant="{variant}" data-add="{addMsg}" onclick="cart.removeProduct(this)">\
                        <span class="ic-trash"></span>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ';

        


        template = template.replace(/{url}/g,url);
        template = template.replace(/{image}/g,image);
        template = template.replace(/{name}/g,name);
        template = template.replace(/{id}/g,id);
        template = template.replace(/{variant}/g,variant != 0 ? variant : '0' );
        template = template.replace(/{length}/g,qnt);
        template = template.replace(/{addMsg}/g,addMsg);
        template = template.replace(/{together}/g,together);
        template = template.replace(/{stock}/g,stock);
        template = template.replace(/{cart_id}/g,cart_id);
        template = template.replace(/{disable}/g,stock == qnt ? 'disabled' : '' );
        template = template.replace(/{disableDec}/g,qnt == 1? 'disabled' : '' );
        price = toReal(parseFloat(price), 'R$ ');
        template = template.replace(/{price}/g,price);
        return template;
    },
    shipping: function(total){
        var shipping = jQuery('.cart-modal .shipping');

        if(!shipping.length) return;
        var value = Number(shipping.attr('data-value'));
        var result = jQuery('[data-js="shipping-decrement"]');
        var percentage = jQuery('.bar-progress');
        var percentageStyle = jQuery('.bar-progress .bar');

        var resultCount = value - total;

        if(!total){
            var text = 'Frete grátis nas compras acima de <b>'+toReal(value,'R$ ')+'</b>*';
            result.html(text);
            percentage.attr('data-value', 0+'%');
            percentageStyle.attr('style', 'width: '+0+'%');
        }
        else if(resultCount > 0){
            var text = 'Faltam <b>'+toReal(resultCount, 'R$ ')+'</b> para você ganhar frete grátis.';
            result.html(text);
            percentage.attr('data-value', ((total / value) * 100).toFixed(0)+'%');
            percentageStyle.attr('style', 'width: '+((total / value) * 100)+'%');
        }
        
        else{
            result.html('<b>PARABÉNS!</b> Você desbloqueou o frete grátis!');
            percentage.attr('data-value', '100%');
            percentageStyle.attr('style', 'width: 100%');
        }
    },
    addProduct: function(){
        jQuery('body').on('submit', '.product .submit', function(e) {

            var thisE = jQuery(this);
            e.preventDefault();

            var config = jQuery(this).data('config');

            var qnt = 1;

            var product = {
                Cart: {
                    session_id: cart.session(),
                    product_id: config.id,
                    quantity: qnt,
                    variant_id: "0"
                }
            }

            jQuery.ajax({
                method: "POST",
                url: "/web_api/cart/",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(product),
                success: function(r) {
         
                    jQuery('[data-js="open_cart"]').trigger('click');
                },
                error: function(){
                    window.location.href = thisE.parents('.product').find('.image').attr('href')
                }
            })
        });

        jQuery('body').on('change input','[data-js="qnt"]', function() {
            var num = Number(jQuery(this).val()),
                intervalTime = 2500,
                changerTimer,
                currentInput = $(this);

           if(num){
                // num = num > Number(jQuery(this).attr('data-max'));
                jQuery(this).val(num);
            }else{
                jQuery(this).val('1');
            }

            if (Number(currentInput.val()) > Number(currentInput.attr('max'))) {
                currentInput.val(Number(currentInput.attr('max')))
            }

            clearTimeout(changerTimer);

            changerTimer = setTimeout(function () {

                cart.refreshQnt(currentInput, {
                    cart_id: currentInput.data('cart-id'),
                    quantity: num,
                    product_id: currentInput.data('id'),
                    variant_id: currentInput.data('variant'),
                    manually: true
                });


            }, intervalTime);

        });
    },
    qntProduct: function() {

        jQuery('body').on('click', '.product [data-js="decrement"]', function(){

            var input = jQuery(this).parent().find('input');
            input.val(parseInt(input.val()) == 1 ? 1 : parseInt(input.val()) - 1);

            if(input.val() == 1){
                jQuery(this).addClass('dec')
            }else{
                jQuery(this).removeClass('dec')
            }
        });
    
        jQuery('body').on('click', '.product [data-js="increment"]', function(){
            var input = jQuery(this).parent().find('input');
            if (Number(input.attr('data-max')) > input.val() || !input.attr('data-max')) {
                var soma = parseInt(input.val()) + 1
                input.val(soma);

                jQuery(this).parent().find('[data-js="decrement"]').removeClass('dec')
            }

        });
    }
}

cart.startCart();
cart.addProduct();
cart.qntProduct();