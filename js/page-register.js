/*
* Form Register
*
* IT'S REAL, IT WORKS
* I don't know how, but... there it is
* */

/*
//Pessoa Fisica
var dataSend = {
  international: '',
  origem: 'central',
  IdProd: '',
  premiacao: '',
  id_evento: '',
  flagPfPj: ' 0',
  cpf_gravado: '',
  cnpj_gravado: '',
  redirecionar: '',
  razao_social: '',
  ie: '',
  cnpj: '',
  pj_nome_cliente: '',
  pj_data_nascimento: '',
  pj_cpf_cliente: '',
  pf_nome_cliente: ' Matheus Netzee',
  pf_data_nascimento: '',
  pf_cpf_cliente: ' 01234567890',
  telefone_cliente: ' (18) 3355-2255',
  telefone_cliente_2: '',
  email_cliente: ' teste@netzee.com.br',
  email_cliente2: ' teste@netzee.com.br',
  email: ' S',
  senha_cliente: ' 102030',
  senha_cliente2: ' 102030',
  adicionais_obrig_pf: '',
  adicionais_obrig_pj: '',
  adicionais_obrig_both: '',
  pais: ' Brasil',
}

//Pessoa Juridica
var dataSend = {
  international: '',
  origem: ' central',
  IdProd: '',
  premiacao: '',
  id_evento: '',
  flagPfPj: ' 1',
  cpf_gravado: '',
  cnpj_gravado: '',
  redirecionar: '',
  razao_social: ' Teste',
  ie: 'ISENTO',
  cnpj: ' 02.921.467/0001-08',
  pj_nome_cliente: ' Teste Netzee',
  pj_data_nascimento: '',
  pj_cpf_cliente: ' 01234567890',
  pf_nome_cliente: '',
  pf_data_nascimento: '',
  pf_cpf_cliente: '',
  telefone_cliente: ' (18) 3355-2266',
  telefone_cliente_2: '',
  email_cliente: ' teste@netzee.com.br',
  email_cliente2: ' teste@netzee.com.br',
  email: ' S',
  senha_cliente: ' 102030',
  senha_cliente2: ' 102030',
  adicionais_obrig_pf: '',
  adicionais_obrig_pj: '',
  adicionais_obrig_both: '',
  pais: ' Brasil',
}

//Ambos com endereço de entrega e cobrança
var dataSend = {
  international: '',
  origem: ' central',
  IdProd: '',
  premiacao: '',
  id_evento: '',
  flagPfPj: ' 0',
  cpf_gravado: '',
  cnpj_gravado: '',
  redirecionar: '',
  razao_social: '',
  ie: '',
  cnpj: '',
  pj_nome_cliente: '',
  pj_data_nascimento: '',
  pj_cpf_cliente: '',
  pf_nome_cliente: ' Teste Netzee',
  pf_data_nascimento: '',
  pf_cpf_cliente: ' 01234567890',
  telefone_cliente: ' (18) 3352-6655',
  telefone_cliente_2: '',
  email_cliente: ' teste@netzee.com.br',
  email_cliente2: ' teste@netzee.com.br',
  email: ' S',
  senha_cliente: ' 102030',
  senha_cliente2: ' 102030',
  adicionais_obrig_pf: '',
  adicionais_obrig_pj: '',
  adicionais_obrig_both: '',
  cep_internacional: '',
  cep_1: ' 17700',
  cep_2: ' 000',
  cep: ' 17700000',
  endereco_cliente: ' Avenida Brasil',
  numero_endereco: ' 1551',
  complemento: ' Piso Superior',
  bairro_cliente: ' Centro',
  cidade_cliente: ' Osvaldo Cruz',
  estado_cliente: ' SP',
  estado_funcao: ' SP',
  pais: ' Brasil',

  endereco_cobranca_diferente: 1,
  cobranca_cep_internacional: '',
  cobranca_cep_1: ' 17700',
  cobranca_cep_2: ' 000',
  cobranca_cep: ' 17700000',
  habilita_ajax2: ' 1',
  cobranca_endereco: ' Avenida Brasil',
  cobranca_numero_endereco: ' 1551',
  cobranca_complemento: ' Piso superior',
  cobranca_bairro: ' Centro',
  cobranca_cidade: ' Osvaldo Cruz',
  cobranca_estado: ' SP',
  cobranca_estado_funcao: ' SP',
  cobranca_pais: ' Brasil',
  pais: ' Brasil',
}*/

jQuery(function () {

  var emailClientDefault = jQuery('.old-layout-register #email_cliente').val();

  if (emailClientDefault) {
    jQuery('#customer-register #email_cliente').val(emailClientDefault)
    jQuery('#customer-register #email_cliente2').val(emailClientDefault)
  }

  jQuery('.old-layout-register').remove();

  jQuery('.modal-popup-default .button-exit, .modal-popup-default .close-modal, .shadow-modal-popup').on('click', function () {
    jQuery('.modal-popup-default').removeClass('active');
  });

  jQuery('.cpf').mask('000.000.000-00');
  jQuery('.cnpj').mask('00.000.000/0000-00');
  jQuery('.phone').mask('(AA) B000-0000', {
    'translation': {
      A: {pattern: /[0-9]/},
      B: {pattern: /[2-6]/},
    }
  });

  // jQuery('.date-mask').mask('AB/CD/EFGH', {
  //   'translation': {
  //     A: {pattern: /[0-3]/},
  //     B: {pattern: /[0-9]/},
  //     C: {pattern: /[0-1]/},
  //     D: {pattern: /[0-9]/},
  //     E: {pattern: /[1-3]/},
  //     F: {pattern: /[8-9]/},
  //     G: {pattern: /[0-9]/},
  //     H: {pattern: /[0-9]/},
  //   }
  // });
   jQuery('.date-mask').mask('AB/CD/EFGH', {
    'translation': {
      A: {pattern: /[0-3]/},
      B: {pattern: /[0-9]/},
      C: {pattern: /[0-1]/},
      D: {pattern: /[0-9]/},
      E: {pattern: /[0-3]/},
      F: {pattern: /[0-9]/},
      G: {pattern: /[0-9]/},
      H: {pattern: /[0-9]/},
    }
  });

  jQuery('.cellphone').mask('(00) 00000-0000');

  jQuery('.customer-type input[type="radio"]').on('change', function (e) {

    if (Number(jQuery('#stepForm').val()) > 1) {
      jQuery('.modal-change-type').addClass('active');

      e.target.checked = false;

      if (Number(e.target.value) === 1) {
        jQuery('#customerPF').attr('checked', true)
      } else {
        jQuery('#customerPJ').attr('checked', true)
      }

      return true;
    }

    var boxContent = jQuery('.page-register-form .box-content');

    if (Number(e.target.value) === 0) {
      boxContent.removeClass('isPJ').addClass('isPF')
    } else {
      boxContent.addClass('isPJ').removeClass('isPF')
    }
  });

  jQuery('.confirm-button').on('click', function () {

    var checked = jQuery('.customer-type input[type="radio"]:checked');
    var noChecked = jQuery('.customer-type input[type="radio"]:not(:checked)');

    checked.attr('checked', false)
    noChecked.attr('checked', true)

    jQuery('#stepForm').val(1)

    var boxContent = jQuery('.page-register-form .box-content');

    if (Number(noChecked.val()) === 0) {
      boxContent.removeClass('isPJ').addClass('isPF')
    } else {
      boxContent.addClass('isPJ').removeClass('isPF')
    }

    boxContent.find('.step.active').removeClass('active');
    var currentContent = boxContent.find('.step:first-child');

    currentContent.addClass('side-to-right');

    setTimeout(function () {
      currentContent.addClass('active');
    }, 100)

    jQuery('.modal-popup-default .shadow-modal-popup').trigger('click')
  });

  jQuery('#email_cliente2').val('');

  jQuery('#nome_cliente, #cpf_cliente, #telefone_cliente, #telefone_cliente_2').on('change', function(){
    var email = jQuery('#email_cliente').val();
    var email2 = jQuery('#email_cliente2').val();

    if(email2 && (email !== email2)){
      jQuery('#email_cliente2').val('');
    }

    jQuery('#email_cliente').val('');
  });

  jQuery('.botao-commerce.next-step').on('click', function(){
    var email = jQuery('#email_cliente').val();
    var email2 = jQuery('#email_cliente2').val();

    if(email2 && (email !== email2)){
      jQuery('#email_cliente2').val('');
    }
  });

  jQuery('.page-register-form form').validate({
    ignore: "",
    rules: {
      'razao_social': {
        required: function () {
          return Number(jQuery('input[name="flagPfPj"]:checked').val()) === 1 && Number(jQuery('#stepForm').val()) === 1
        },
      },
      'ie': {
        required: function () {
          return Number(jQuery('input[name="flagPfPj"]:checked').val()) === 1 && Number(jQuery('#stepForm').val()) === 1
        },
      },
      'cnpj': {
        required: function () {
          return Number(jQuery('input[name="flagPfPj"]:checked').val()) === 1 && Number(jQuery('#stepForm').val()) === 1
        },
        cnpjBR: function () {
          return Number(jQuery('input[name="flagPfPj"]:checked').val()) === 1 && Number(jQuery('#stepForm').val()) === 1
        },
      },
      'data_nascimento': {
        dateBR: function () {
          return Number(jQuery('#stepForm').val()) === 1
        },
      },
      'nome_cliente': {
        required: function () {
          return Number(jQuery('#stepForm').val()) === 1
        },
        minWords: 2,
      },
      'cpf_cliente': {
        required: function () {
          // return Number(jQuery('input[name="flagPfPj"]:checked').val()) === 0 && Number(jQuery('#stepForm').val()) === 1
          return Number(jQuery('#stepForm').val()) === 1
        },
        cpfBR: function () {
          // return Number(jQuery('input[name="flagPfPj"]:checked').val()) === 0 && Number(jQuery('#stepForm').val()) === 1
          return Number(jQuery('#stepForm').val()) === 1
        },
      },
      'telefone_cliente': {
        required: function () {
          return (
            jQuery('#telefone_cliente').val() === '' &&
            jQuery('#telefone_cliente_2').val() === '' &&
            Number(jQuery('#stepForm').val()) === 1
          )
        }
      },
      'telefone_cliente_2': {
        required: function () {
          return (
            jQuery('#telefone_cliente').val() === '' &&
            jQuery('#telefone_cliente_2').val() === '' &&
            Number(jQuery('#stepForm').val()) === 1
          )
        }
      },
      'email_cliente': {
        email: true,
        required: function () {
          return Number(jQuery('#stepForm').val()) === 2;
        },
      },
      'email_cliente2': {
        email: true,
        equalTo: '#email_cliente'
      },
      'senha_cliente': {
        required: function () {
          return Number(jQuery('#stepForm').val()) === 2;
        },
        minlength: 6
      },
      'senha_cliente2': {
        equalTo: '#senha_cliente',
        minlength: 6
      },
    },
    messages: {
      password: {
        required: "Informe uma senha.",
        minlength: "A senha deve ter pelo menos {0} caracteres"
      },
      password_confirmation: {
        equalTo: "Parece que as senhas n&atilde;o s&atilde;o iguais.",
        minlength: "A confirma&ccedil;&atilde;o da senha tamb&eacute;m deve ter pelo menos {0} caracteres"
      },
      ie: {
        required: "Esse campo &eacute; obrigat&oacute;rio, caso sua empresa for isenta, digite ISENTO no campo."
      }
    },
    errorElement: 'span',
    errorClass: 'error-msg',
    highlight: function (element, errorClass, validClass) {
      jQuery(element).closest('.input-item').addClass("has-error");
    },
    unhighlight: function (element, errorClass, validClass) {
      jQuery(element).closest('.input-item').removeClass("has-error");
    }
  })

  jQuery('.next-step').on('click', function () {
    var button = jQuery(this),
      nextContent = button.closest('.step').next(),
      stepForm = jQuery('#stepForm');

    if (jQuery('.page-register-form form').valid()) {

      button.closest('.step').removeClass('active')

      stepForm.val(Number(stepForm.val()) + 1)

      changeStageForm(nextContent.index())

      if (nextContent.hasClass('step')) {

        insertAnimationStep(nextContent, 'side-to-left');

        setTimeout(function () {
          nextContent.addClass('active');

          verifyScrollScreen()
        }, 100)
      }

      return true;
    }
  });

  jQuery('.prev-step').on('click', function () {
    var button = jQuery(this),
      stepForm = jQuery('#stepForm'),
      prevContent = button.closest('.step').prev();

    button.closest('.step').removeClass('active');

    if (Number(stepForm.val()) > 1) {
      stepForm.val(Number(stepForm.val()) - 1);
    }

    if (jQuery('[name="senha_cliente"]').val() !== '' && jQuery('[name="senha_cliente2"]').val() === '') {
      jQuery('[name="senha_cliente"]').val('')
    }

    if (jQuery('[name="email_cliente"]').val() !== '' && jQuery('[name="email_cliente2"]').val() === '') {
      jQuery('[name="email_cliente"]').val('')
    }

    changeStageForm(prevContent.index());

    if (prevContent.hasClass('step')) {
      insertAnimationStep(prevContent, 'side-to-right');

      setTimeout(function () {
        prevContent.addClass('active');

        verifyScrollScreen()
      }, 100)
    }
  });

  jQuery('#senha_cliente').on('keyup', function (e) {

    var passStrengthValue = passStrength(e.target.value);
    var textStrength = '';

    switch (passStrengthValue) {
      case 1:
      case 2:
        textStrength = 'Senha fraca';
        break

      case 3:
      case 4:
        textStrength = 'Senha boa'
        break

      case 5:
        textStrength = 'Senha forte'
        break

      default:
        textStrength = ''
    }

    jQuery(this).closest('.form-group').attr('data-strength', passStrengthValue)
    jQuery(this).closest('.form-group').find('.indicator-strength').html(textStrength)
  });

  jQuery('.button-finish').on('click', function () {
    if (jQuery('.page-register-form form').valid()) {
      submitFormRegister();
    } else {
      activeStepWithError()
    }
  });

  jQuery('.redirect-button').on('click', function () {
    jQuery(this).text('Redirecionando...')

    setTimeout(function () {
      window.location.href = window.location.origin + '/loja/central_cliente.php?loja='+jQuery('html').data('store')+'&login=1'
    }, 1000)
  });

});

function loaderForm(active) {
  var formLoader = jQuery('.page-register-form .loader-form ');
  if (active) {
    formLoader.addClass('active')
  } else {
    formLoader.removeClass('active')
  }
}

function passStrength(password) {
  if (password.length === 0) {
    return 0;
  }

  var strength = 0,
    arr = [/.{5,}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/, /[$@!%*#?&]+/];

  arr.map(function (regexp) {
    if (password.match(regexp)) {
      strength++;
    }
  });

  return strength
}

function changeStageForm(stage) {
  var formStage = jQuery('.page-register-form .list-stages'),
    newStage = formStage.find('li').eq(stage)

  if (newStage.length) {
    formStage.find('li.active').removeClass('active');
    formStage.find('li.completed').removeClass('completed');
    newStage.addClass('active');

    newStage.prevAll().addClass('completed')
  }

}

function getFormData($form) {
  var unindexed_array = $form.serializeArray(),
    indexed_array = {};

  jQuery.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });
  return indexed_array;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
  } else {
    obj[key] = value;
  }
  return obj;
}

/*
* Validate Form from template
*
* Validate that the json sent is not standard in the model, it will return an "error" index as a
* Boolean indicating if there are errors and an "fieldError" as a object with keys and error messages if any
* */
function formValidationData(template, formJson) {
  var returnMessage = {
      error: false,
      fieldError: []
    },
    arrayMessagesError = [],
    messages = {
      template_not_found: 'N&atilde;o foi poss&iacute;vel encontrar a template',
      required: 'Est&eacute; campo &eacute; obrigat&oacute;rio',
      empty: 'Est&eacute; campo n&atilde;o pode estar vazio',
      only_one_phone: 'Um dos telefones deve estar preenchido'
    }

  if (!template) {
    throw Error(messages.template_not_found);
  }

  template.map(function (item) {
    if (item.rule === 'required') {
      if (!(item.key in formJson)) {
        arrayMessagesError = addNewIndexArrayOrFill(arrayMessagesError, item.key, messages.required);
      }

      if (item.key in formJson && formJson[item.key] === '') {
        arrayMessagesError = addNewIndexArrayOrFill(arrayMessagesError, item.key, messages.empty);
      }
    }

    if (item.rule === 'required_without_phone') {
      var onlyPhone = template.filter(function (filter) {
        return filter.rule === item.rule;
      });
      var flag = false;
      onlyPhone.map(function (newSearchItem) {
        if (newSearchItem.key in formJson && formJson[newSearchItem.key] !== '') {
          flag = true;
        }
      });

      if (!flag) {
        arrayMessagesError = addNewIndexArrayOrFill(arrayMessagesError, item.key, messages.only_one_phone);
      }

      //Remove unnecessary element after find
      var templateOnlyRule = template.map(function (item) {
        return item.rule;
      });
      onlyPhone.map(function (phoneFind, index) {
        template.splice(templateOnlyRule.indexOf(phoneFind.rule), 1);
      });
    }
  });

  if (arrayMessagesError.length) {
    returnMessage.error = true;
  }

  returnMessage.fieldError = arrayMessagesError.reduce(function (acc, current) {
    var findElement = acc.find(function (item) {
      return Object.keys(item)[0] === Object.keys(current)[0];
    });

    if (!findElement) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  //console.log(returnMessage)
  return returnMessage;
}

/*
* Fill array
*
* Fill the o array or create a new item inside him
* */
function addNewIndexArrayOrFill(array, key, value) {
  array.map(function (fieldError) {
    if (typeof fieldError[key] !== 'undefined') {
      fieldError[key].push(value);
    } else {
      array.push(_defineProperty({}, key, [value]));
    }
  });

  if (!array.length) {
    array.push(_defineProperty({}, key, [value]));
  }

  return array;
}

function checkReallyError(response) {
  if (jQuery(response).filter('title').text() === 'Carregando...') {
    return false
  }

  return true;
}

function showModalError(text) {
  if (typeof text.message === 'string') {
    text = text.message
  }

  var modalError = jQuery('.modal-popup-default.modal-error');
  modalError.addClass('active');
  modalError.find('.desc').html(text);
}

function validateResponseForm(response) {

  //checking if you really had an error
  if (!checkReallyError(response.responseText)) {
    jQuery('.modal-confirm').addClass('active');

    return true;
  }

  var blockAlert = jQuery(response.responseText).find('.old-layout-register .blocoAlerta');

  if (blockAlert.length) {
    jumpFormToError(blockAlert.html())

    throw blockAlert.html();
  }

  var oldLayoutRegister = jQuery(response.responseText).find('.old-layout-register .container .carrinho-heading + .container2 .board.color')


  if (oldLayoutRegister.length && oldLayoutRegister.text() === 'Prezado Cliente, você já está cadastrado em nossa loja.Para manutenção de seu cadastro, acesse a CENTRAL DO CLIENTE.') {
     throw Error('CPF j&aacute; cadastrado. Por favor, realize seu login.');
  }

  throw Error('N&atilde;o foi poss&iacute;vel salvar os dados');
}

function activeStepWithError() {
  jQuery('.step.active').removeClass('active');

  var blockStep = jQuery(jQuery('.input-item.has-error')[0]);

  blockStep.closest('.step').addClass('active');
  changeStageForm(blockStep.closest('.step').index())

  jQuery('#stepForm').val(blockStep.closest('.step').index() + 1);
}

function jumpFormToError(htmlError) {
  var objectErrors = {};

  if (typeof htmlError.message === 'string') {
    htmlError = [htmlError.message]
  }

  if (~htmlError.includes('Email j&aacute; existe em nossa base') || ~htmlError.includes('O e-mail digitado j&aacute; est&aacute; cadastrado em nosso sistema')) {
    objectErrors = {...objectErrors, 'email_cliente': 'Email j&aacute; existe em nossa base'}
    objectErrors = {...objectErrors, 'email_cliente2': 'Email j&aacute; existe em nossa base'}
  }

  if (~htmlError.includes('CPF j&aacute; cadastrado. Por favor, realize seu login.')) {
    objectErrors = {...objectErrors, 'cpf_cliente': 'CPF j&aacute; cadastrado. Por favor, realize seu login.'}
  }

  if (!jQuery.isEmptyObject(objectErrors)) {

    var pageFormValidate = jQuery('.page-register-form form').validate();
    pageFormValidate.showErrors(objectErrors)

    jQuery('.input-item.has-error input').val('');

    activeStepWithError()
  }
}

function translateNameFromKey(key) {

  var defaultNames = {
    'razao_social': 'Raz&atilde;o Social',
    'ie': 'Inscri&ccedil;&atilde;o Estadual',
    'cnpj': 'CNPJ',
    'pj_nome_cliente': 'Nome',
    'pj_data_nascimento': 'Data de nascimento',
    'pj_cpf_cliente': 'CPF',
    'pf_nome_cliente': 'Nome',
    'pf_data_nascimento': 'data de nascimento',
    'pf_cpf_cliente': 'CPF',
    'telefone_cliente': 'Telefone fixo ou comercial',
    'telefone_cliente_2': 'Celular',
    'email_cliente': 'E-mail',
    'email_cliente2': 'Confirma&ccedil;&atilde;o do e-mail',
    'email': 'E-mail de ofertas',
    'senha_cliente': 'Senha',
    'senha_cliente2': 'Confirma&ccedil;&atilde;o da senha',
  }

  return typeof defaultNames[key] !== 'undefined' ? defaultNames[key] : key;
}

function verifyScrollScreen() {
  var stepActive = jQuery('.page-register-form .step.active'),
    scrollTop = jQuery(window).scrollTop(),
    elementOffset = stepActive.offset().top,
    distance = (elementOffset - scrollTop);

  if (distance <= 260) {
    window.scrollTo({
      top: jQuery('.list-steps').offset().top - 260,
      behavior: 'smooth',
    });
  }
}

function insertAnimationStep(element, className) {
  element.removeClass('side-to-left');
  element.removeClass('side-to-right');

  if (jQuery(window).width() >= 767) {
    element.addClass(className);
  }
}

function submitFormRegister() {
  setTimeout(function () {
    loaderForm(true);
  }, 100)

  var options = {
    baseURI: window.location.origin,
    registerURL: window.location.origin + '/loja/cadastro_layout.php?loja=' + jQuery('html').attr('data-store') + '&incluir=1',
    registerMethod: 'POST',
  }

  var form = jQuery('.page-register .page-register-form form');

  try {
    var formJson = getFormData(form),
      dataSend = {},
      validation;

    // console.log(formJson)

    if (Number(formJson.flagPfPj) === 0) {

      // console.log('Pessoa Fisica')

      var templateBasePF = [
        {key: 'flagPfPj', rule: 'required'},
        {key: 'nome_cliente', rule: 'required'},
        {key: 'cpf_cliente', rule: 'required'},
        {key: 'telefone_cliente', rule: 'required_without_phone'},
        {key: 'telefone_cliente_2', rule: 'required_without_phone'},
        {key: 'email_cliente', rule: 'required'},
        {key: 'email_cliente2', rule: 'required'},
        {key: 'senha_cliente', rule: 'required'},
        {key: 'senha_cliente2', rule: 'required'},
      ]

      validation = formValidationData(templateBasePF, formJson);

      if (validation.error) {
        throw validation.fieldError
      }

      dataSend = {
        international: '',
        origem: 'central',
        IdProd: '',
        premiacao: '',
        id_evento: '',
        flagPfPj: 0,
        cpf_gravado: '',
        cnpj_gravado: '',
        redirecionar: '',
        razao_social: '',
        ie: '',
        cnpj: '',
        pj_nome_cliente: '',
        pj_data_nascimento: '',
        pj_cpf_cliente: '',
        pf_nome_cliente: removeAccents(formJson.nome_cliente),
        pf_data_nascimento: formJson.data_nascimento ? formJson.data_nascimento : '',
        pf_cpf_cliente: formJson.cpf_cliente,
        telefone_cliente: typeof formJson.telefone_cliente !== 'undefined' ? formJson.telefone_cliente : '',
        telefone_cliente_2: typeof formJson.telefone_cliente_2 !== 'undefined' ? formJson.telefone_cliente_2 : '',
        email_cliente: formJson.email_cliente,
        email_cliente2: formJson.email_cliente2,
        email: formJson.email ? 'S' : 'N',
        senha_cliente: formJson.senha_cliente,
        senha_cliente2: formJson.senha_cliente2,
        adicionais_obrig_pf: '',
        adicionais_obrig_pj: '',
        adicionais_obrig_both: '',
        pais: 'Brasil',
        csrfp_token: CSRFP._getAuthKey(),
      }

    } else {

      // console.log('Pessoa Juridica')

      var templateBasePJ = [
        {key: 'razao_social', rule: 'required'},
        {key: 'ie', rule: 'required'},
        {key: 'cnpj', rule: 'required'},
        {key: 'nome_cliente', rule: 'required'},
        {key: 'cpf_cliente', rule: 'required'},
        {key: 'telefone_cliente', rule: 'required_without_phone'},
        {key: 'telefone_cliente_2', rule: 'required_without_phone'},
        {key: 'email_cliente', rule: 'required'},
        {key: 'email_cliente2', rule: 'required'},
        {key: 'senha_cliente', rule: 'required'},
        {key: 'senha_cliente2', rule: 'required'},
      ]

      validation = formValidationData(templateBasePJ, formJson);

      if (validation.error) {
        throw validation.fieldError
      }

      dataSend = {
        international: '',
        origem: 'central',
        IdProd: '',
        premiacao: '',
        id_evento: '',
        flagPfPj: 1,
        cpf_gravado: '',
        cnpj_gravado: '',
        redirecionar: '',
        razao_social: formJson.razao_social,
        ie: formJson.ie,
        cnpj: formJson.cnpj,
        pj_nome_cliente: removeAccents(formJson.nome_cliente),
        pj_data_nascimento: formJson.data_nascimento ? formJson.data_nascimento : '',
        pj_cpf_cliente: formJson.cpf_cliente,
        pf_nome_cliente: '',
        pf_data_nascimento: '',
        pf_cpf_cliente: '',
        telefone_cliente: typeof formJson.telefone_cliente !== 'undefined' ? formJson.telefone_cliente : '',
        telefone_cliente_2: typeof formJson.telefone_cliente_2 !== 'undefined' ? formJson.telefone_cliente_2 : '',
        email_cliente: formJson.email_cliente,
        email_cliente2: formJson.email_cliente2,
        email: formJson.email ? 'S' : 'N',
        senha_cliente: formJson.senha_cliente,
        senha_cliente2: formJson.senha_cliente2,
        adicionais_obrig_pf: '',
        adicionais_obrig_pj: '',
        adicionais_obrig_both: '',
        pais: 'Brasil',
        csrfp_token: CSRFP._getAuthKey(),
      }
    }

    // console.log('dataSend')
    // console.log(dataSend)

    loaderForm(true);

    // jQuery('#customer-register').submit();

    jQuery.ajax({
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
      url: options.registerURL,
      method: options.registerMethod,
      data: dataSend,
      async: false,
      cache: false,
      dataType: "json",
    }).done(function (response) {

      validateResponseForm(response);
      loaderForm(false);

    }).fail(function (error) {

      validateResponseForm(error);
      loaderForm(false);

    });

  } catch (e) {

    setTimeout(function (){
      loaderForm(false);
    }, 500);

    if (Array.isArray(e)) {
      var response = '';
      e.map(function (item) {
        response += '<strong>' + translateNameFromKey(Object.keys(item)[0]) + '</strong>';
        Object.values(item).map(function (msg) {
          response += '<br/><p>' + msg + '</p>'
        })
      });

      showModalError(response)
      loaderForm(false);

      return true;
    }

    showModalError(e);
    loaderForm(false);

    setTimeout(function () {
      jumpFormToError(e)
    }, 500)

    loaderForm(false);
    return true;
  }

}

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

