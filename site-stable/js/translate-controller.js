/* Controller translate */
/* @author : Pablo Rapettti

So adicionar as properties 
Example : 
'nome.decricao' : 'Carlos Santana' em cada language e depois utilizar {{ nome.decricao | translate }} 

*/
var app = angular.module('app', ['pascalprecht.translate' , 'ngSanitize']);

app.config(function ($translateProvider) {
  $translateProvider.translations('pt', {
	
	'site.nome': 			'LevelUp',
	
	'menu.solucoes': 		'Soluções',
	'menu.comofunciona':	'Como funciona?',
	'menu.comprar': 		'Comprar!',
	'menu.contato':			'Contato',

	'site.mensagem.bemvindo':	 	'Bem vindo ao próximo nível',
	'site.mensagem.modernizese':	'Modernize-se',
	'site.mensagem.assineja': 		'Assine Já!',

	'secao.solucoes.titulo': 						'Soluções',
	'secao.solucoes.titulo.descricao': 				'Lorem ipsum dolor sit amet consectetur.',
	'secao.solucoes.cardapio':						'Cardápio eletrônico',
	'secao.solucoes.cardapio.descricao': 			'N/A',
	'secao.solucoes.torneseuatendimento': 			'Torne seu atendimento eficiente',
	'secao.solucoes.torneseuatendimento.descricao': 'Criar fidelidade é essencial para crescimento do negócio, um bom atendimento rápido e preciso é o que garante isso.',
	'secao.solucoes.acompanhe': 					'Acompanhe os resultados',
	'secao.solucoes.acompanhe.descricao':			'N/A',

	'secao.comofunciona.titulo':						'Como funciona ?',
	'secao.comofunciona.titulo.decricao': 				'Simples...',
	'secao.comofunciona.cliente': 						'O cliente escolhe',
	'secao.comofunciona.cliente.decricao': 				'Após o cliente escolher independente ou chama o garçom usando apenas um toque.',
	'secao.comofunciona.casopreparavel': 				'Caso for preparável:',
	'secao.comofunciona.horadefaturar': 				'Hora de faturar',
	'secao.comofunciona.horadefaturar.descricao': 		'Após o garçom marcar o pedido como entregue o caixa já pode pagar',
	'secao.comofunciona.acompanhe': 					'Acompanhe aonde estiver.',
	'secao.comofunciona.relatorios':					'Relatórios\nComo Você\nDesejar!',
	'secao.comofunciona.casopreparavel.descricao': 		'O pedido vai para a cozinha.',
	'secao.comofunciona.casonaopreparavel':				'Caso não for preparável:',
	'secao.comofunciona.casonaopreparavel.descricao': 	'O pedido cai para o garçom.',

	'secao.comprar.titulo': 					'Potencial++',
	'secao.comprar.titulo.descricao': 			'Tenha informação em mãos, padrão ou desejada.',
	'secao.comprar.cardapio': 					'Cardapio App*',
	'secao.comprar.cardapio.preco': 			'$ 89 /mês',
	'secao.comprar.cozinha':					'Cozinha App*',
	'secao.comprar.cozinha.preco': 				'$ 299 /mês',
	'secao.comprar.garcon': 					'Garçom App*',
	'secao.comprar.garcon.preco': 				'$ 199 /mês<sup>**</sup>',
	'secao.comprar.garconwatch': 				'Garçom Watch App*',
	'secao.comprar.garconwatch.preco': 			'$ 99 /mês',
	'secao.comprar.equipamento': 				'* O equipamento de hardware será cobrado dependendo do plano.',

	'secao.contato.titulo': 	'Contato :)'
	
  });
  /* amanha vou traducir para espanhol (y) */
  $translateProvider.translations('es', {
	
	'site.nome': 			'LevelUp1',
	
	'menu.solucoes': 		'Soluções',
	'menu.comofunciona':	'Como funciona?',
	'menu.comprar': 		'Comprar!',
	'menu.contato':			'Contato',

	'site.mensagem.bemvindo':	 	'Bem vindo ao próximo nível',
	'site.mensagem.modernizese':	'Modernize-se',
	'site.mensagem.assineja': 		'Assine Já!',

	'secao.solucoes.titulo': 						'Soluções',
	'secao.solucoes.titulo.descricao': 				'Lorem ipsum dolor sit amet consectetur.',
	'secao.solucoes.cardapio':						'Cardápio eletrônico',
	'secao.solucoes.cardapio.descricao': 			'N/A',
	'secao.solucoes.torneseuatendimento': 			'Torne seu atendimento eficiente',
	'secao.solucoes.torneseuatendimento.descricao': 'Criar fidelidade é essencial para crescimento do negócio, um bom atendimento rápido e preciso é o que garante isso.',
	'secao.solucoes.acompanhe': 					'Acompanhe os resultados',
	'secao.solucoes.acompanhe.descricao':			'N/A',

	'secao.comofunciona.titulo':						'Como funciona ?',
	'secao.comofunciona.titulo.decricao': 				'Simples...',
	'secao.comofunciona.cliente': 						'O cliente escolhe',
	'secao.comofunciona.cliente.decricao': 				'Após o cliente escolher independente ou chama o garçom usando apenas um toque.',
	'secao.comofunciona.casopreparavel': 				'Caso for preparável:',
	'secao.comofunciona.horadefaturar': 				'Hora de faturar',
	'secao.comofunciona.horadefaturar.descricao': 		'Após o garçom marcar o pedido como entregue o caixa já pode pagar',
	'secao.comofunciona.acompanhe': 					'Acompanhe aonde estiver.',
	'secao.comofunciona.relatorios':					'Relatórios\nComo Você\nDesejar!',
	'secao.comofunciona.casopreparavel.descricao': 		'O pedido vai para a cozinha.',
	'secao.comofunciona.casonaopreparavel':				'Caso não for preparável:',
	'secao.comofunciona.casonaopreparavel.descricao': 	'O pedido cai para o garçom.',

	'secao.comprar.titulo': 					'Potencial++',
	'secao.comprar.titulo.descricao': 			'Tenha informação em mãos, padrão ou desejada.',
	'secao.comprar.cardapio': 					'Cardapio App*',
	'secao.comprar.cardapio.preco': 			'$ 89 /mês',
	'secao.comprar.cozinha':					'Cozinha App*',
	'secao.comprar.cozinha.preco': 				'$ 299 /mês',
	'secao.comprar.garcon': 					'Garçom App*',
	'secao.comprar.garcon.preco': 				'$ 199 /mês<sup>**</sup>',
	'secao.comprar.garconwatch': 				'Garçom Watch App*',
	'secao.comprar.garconwatch.preco': 			'$ 99 /mês',
	'secao.comprar.equipamento': 				'* O equipamento de hardware será cobrado dependendo do plano.',

	'secao.contato.titulo': 	'Contato :)'
  });
  
  $translateProvider.preferredLanguage('pt');
  //$translateProvider.useSanitizeValueStrategy('sanitize');

});

app.controller('contr', function ($scope, $translate) {
	$scope.changeLanguage = function (key) {
		$translate.use(key);
	};
	/* apos rendererizar show */
	setTimeout( function(){ 
			$('body').fadeIn(500); 
	} , 0);	
});
