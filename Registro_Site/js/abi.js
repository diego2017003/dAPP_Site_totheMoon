var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "hash_cert",
				"type": "string"
			}
		],
		"name": "verificar_autenticidade",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "definicao",
				"type": "string"
			},
			{
				"name": "carga_horaria",
				"type": "uint256"
			},
			{
				"name": "hash_cert",
				"type": "string"
			}
		],
		"name": "cadastrar_certificado",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]