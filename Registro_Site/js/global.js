
var contractAddress = "0xae3746bcC3c5EF77E2aDaF3b50ad43628324425d";

// Inicializa o objeto DApp
document.addEventListener("DOMContentLoaded", onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}

// Nosso objeto DApp que irá armazenar a instância web3
const DApp = {
  web3: null,
  contracts: {},
  account: null,

  init: function () {
    return DApp.initWeb3();
  },

  // Inicializa o provedor web3
  initWeb3: async function () {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ // Requisita primeiro acesso ao Metamask
          method: "eth_requestAccounts",
        });
        DApp.account = accounts[0];
        window.ethereum.on('accountsChanged', DApp.updateAccount); // Atualiza se o usuário trcar de conta no Metamaslk
      } catch (error) {
        console.error("Usuário negou acesso ao web3!");
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    } else {
      console.error("Instalar MetaMask!");
      return;
    }
    return DApp.initContract();
  },

  // Atualiza 'DApp.account' para a conta ativa no Metamask
  updateAccount: async function() {
    DApp.account = (await DApp.web3.eth.getAccounts())[0];
    atualizaInterface();
  },

  // Associa ao endereço do seu contrato
  initContract: async function () {
    DApp.contracts.certificado = new DApp.web3.eth.Contract(abi, contractAddress);
    return DApp.render();
  },

  // Inicializa a interface HTML com os dados obtidos
  render: async function () {
    inicializaInterface();
  },
};

function inicializaInterface(){

}

function atualizaInterface(){
    
}

// *** MÉTODOS (de consulta - view) DO CONTRATO ** //

function verificarCert(cert_hash) {

    return DApp.contracts.certificado.methods.verificar_autenticidade(cert_hash).call()
  }
  
  function cadastrar_cert(cert_hash) {
    let definicao = document.getElementById("cert_name").value;
    let carga_hor = document.getElementById("carga_h").value;
    return DApp.contracts.certificado.methods.cadastrar_certificado(definicao,carga_hor,cert_hash).send({ from: DApp.account }).call();
  }
  


(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });
    
        var myCalendar = $('.js-datepicker');
        var isClick = 0;
    
        $(window).on('click',function(){
            isClick = 0;
        });
    
        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
    
        });
    
        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();
    
            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;
    
            if (isClick === 1) {
                myCalendar.focus();
            }
        });
    
        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });
    
        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });
    
    
    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/
    
    try {
        var selectSimple = $('.js-select-simple');
    
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    
    } catch (err) {
        console.log(err);
    }
    

})(jQuery);

$(document).ready(function () {
    $("#btn").click(function () {
        var reader = new FileReader(); //define a Reader
        var file = $("#file")[0].files[0]; //get the File object 
        if (!file) {
            alert("no file selected");
            return;
        } //check if user selected a file

        reader.onload = function (f) {
            var file_result = this.result; // this == reader, get the loaded file "result"
            var file_wordArr = CryptoJS.lib.WordArray.create(file_result); //convert blob to WordArray , see https://code.google.com/p/crypto-js/issues/detail?id=67
            var sha1_hash = CryptoJS.SHA1(file_wordArr); //calculate SHA1 hash

            console.log(sha1_hash.toString())
            verificarCert(sha1_hash.toString()).then((result) =>{
                console.log(result)
                if (result){

                    document.getElementById('text_status').innerHTML = "Confirmado!"+" SHA1:" + sha1_hash.toString()+"EEncontrado e valido";
    
                }
                
                
                else{
                alert("Calculated SHA1:" + sha1_hash.toString()+"\nNÃO ENCONTRADO!");
            } //output result
            });


        };
        reader.readAsArrayBuffer(file); //read file as ArrayBuffer
    });
});

$(document).ready(function () {
    $("#regist_btn").click(function () {
        var reader = new FileReader(); //define a Reader
        var file = $("#file")[0].files[0]; //get the File object 
        if (!file) {
            alert("no file selected");
            return;
        } //check if user selected a file

        reader.onload = function (f) {
            var file_result = this.result; // this == reader, get the loaded file "result"
            var file_wordArr = CryptoJS.lib.WordArray.create(file_result); //convert blob to WordArray , see https://code.google.com/p/crypto-js/issues/detail?id=67
            var sha1_hash = CryptoJS.SHA1(file_wordArr); //calculate SHA1 hash
            console.log(sha1_hash.toString())
            verificarCert(sha1_hash.toString()).then((result) =>{
                console.log(result)
                if (!result){
                    try{
                    cadastrar_cert(sha1_hash.toString()).then((result_cadast) => {

                        if(result_cadast){
                            document.getElementById('text_status').innerHTML = "Confirmado!"+" SHA1: " + sha1_hash.toString()+"Inserido na Blockchain";
                        }
                        else{
                            alert("Não foi possivel cadastrar - Certifique-se que está com conta certa")
                            document.getElementById('text_status').innerHTML =""
                        }

                    });
                    
                }catch{
                alert("ERRO!")
                }
                
               

                    //document.getElementById('text_status').innerHTML = "Confirmado!"+" SHA1: " + sha1_hash.toString()+" Encontrado e valido";
    
                }
                else{
                    document.getElementById('text_status').innerHTML ="Já ná blockchain"
                }
                 //output result
            });
        };
        reader.readAsArrayBuffer(file); //read file as ArrayBuffer
    });
});


$(document).bind('dragover', function (e) {
    var dropZone = $('.zone'),
        timeout = window.dropZoneTimeout;
    if (!timeout) {
        dropZone.addClass('in');
    } else {
        clearTimeout(timeout);
    }
    var found = false,
        node = e.target;
    do {
        if (node === dropZone[0]) {
            found = true;
            break;
        }
        node = node.parentNode;
    } while (node != null);
    if (found) {
        dropZone.addClass('hover');
    } else {
        dropZone.removeClass('hover');
    }
    window.dropZoneTimeout = setTimeout(function () {
        window.dropZoneTimeout = null;
        dropZone.removeClass('in hover');
    }, 100);
});