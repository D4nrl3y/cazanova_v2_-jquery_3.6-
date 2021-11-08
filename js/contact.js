;(function($){
    var form = $('.formulario-contato,.board iframe').parent();
    var inputButton = $('input[src*="enviar.gif"]');
    form.appendTo('.area-form');
    $('.area-form').nextAll().remove();
    $('.tit-contato,.msg-obriga').remove();

    $('#nome_contato').attr('placeholder', 'Ex: Matheus Eduardo');
    $('#email_contato').attr('placeholder', 'Ex: matheus@exemplo.com.br');
    $('#telefone_contato').attr('placeholder', 'Ex: (99) 99999-9999');
    $('#mensagem_contato').attr('placeholder', 'Digite aqui sua mensagem...');


    inputButton.after('<button class="button">Enviar mensagem<span class="icon icon-right"></span></button>');
    inputButton.remove();

    $('.iframe iframe').attr('src', $('.iframe iframe').attr('data-src'));
})(jQuery);