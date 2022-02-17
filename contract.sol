// Nome: Diego Rodriges Medeiros
// Nome: Reyne Jasson Marcelino
// Conta do contrato: 
pragma solidity ^ 0.4.25;

contract certificado{

    struct Certificado{
        string definicao;
        uint carga_horaria;
        bool valido;
    }

    
    address owner;

    mapping(string => Certificado)  certificados;

    constructor() public {
  owner =  msg.sender;
 }
    modifier onlyOwner {
    require(msg.sender == owner, "Somente o dono do contrato pode invocar essa função!");
    _;
    }


    function cadastrar_certificado(string definicao,uint carga_horaria,string hash_cert) public onlyOwner returns(bool){


        certificados[hash_cert]  = Certificado(definicao,carga_horaria, true );


        return true;

    }

    function verificar_autenticidade(string hash_cert) public view returns(bool){
        
        return certificados[hash_cert].valido;
        
    }
}