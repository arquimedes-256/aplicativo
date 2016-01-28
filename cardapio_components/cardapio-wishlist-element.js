 Polymer({
 	disabledSend: false,
 	disabledMoney: false,
 	useAll: false,
 	ready: function () {


 	},
 	toChanged: function () {
 		this._to = this.to;
 	},
 	onWishListCalc: function () {
 		this.$.cardapioTotal.calcWishs();
 	},
 	saidaDeEstoque: function (prodKey, value) {
 		if (value != 0) {
 			var g = this.$.g;
 			var estoqueRef = new Firebase(g.location + "/estoque");

 			estoqueRef.push({
 				dataLancamento: new Date().getTime(),
 				item: prodKey,
 				quantidade: (value * -1)
 			});
 		}

 	},
 	/**
      bebida
       aberto
          coca-cola: 
       all
          coca-cola: 
       entregue
          coca-cola: 
       pago
       pronto
          coca-cola: 
 */
 	pushVendasPagas: function () {
 		var mesa = this.$.g.data.currentMesa;

 		var vendasRef = new Firebase(this.$.g.location + "/vendas");
 		var produtosData = this.produtosData;
 		var categoriasData = this.categoriasData;

 		_.each(this.pedidosData, function (category, categoryKey) {
 			_.each(category['entregue'], function (quantidade, pedidoKey) {
 				var row = {
 					Produto: produtosData[pedidoKey].nome,
 					Categoria: categoriasData[categoryKey].nome,
 					Quantidade: quantidade,
 					'data': Firebase.ServerValue.TIMESTAMP,
 					Mesa: mesa,
 					valor: (quantidade * produtosData[pedidoKey].preco)
 				};
 				vendasRef.push(row);
 			});
 		});
 	},
 	// soma todos os ciclos(aberto, fechado ... , pago)
 	calculateAll: function () {
 		_.each(this.pedidosData, function (v, k) {
 			v['all'] = {};
 			_.each(v, function (v2, k2) {
 				if (k2 != 'all')
 					_.each(v2, function (v3, k3) {
 							//seta zero se não estiver definido
 							if (!v['all'][k3])
 								v['all'][k3] = 0;
 							//soma
 							v['all'][k3] += v3;
 						}
 						.bind(this));
 			}.bind(this))
 		}.bind(this));

 		this.$.pedidosBase.commit();
 	},
 	sendHandler: function (e, d, s) {
 		var to = this.to;
 		var from = this.from;
 		var produtosData = this.produtosData;
 		var hasDetail = !_.isEmpty(d);

 		if (to == 'pago')
 			this.pushVendasPagas();

 		if (from == 'all')
 			from = 'aberto';

 		if (true) {

 			_.each(this.pedidosData, function (v, k) {
 				_.each(v[from], function (prodFromVal, prodFromKey) {
 					var _to = to;

 					//1. Se não for o produto do detalhe, ele pula
 					if (hasDetail && d.pedidoKey != prodFromKey)
 						return;
 					//Caso for uma coca-cola por exemplo, vai para o garçon
 					if (from == 'aberto' && to == 'fechado' && !produtosData[prodFromKey].preparavel) {
 						_to = 'pronto'
 					}
 					//cria destino caso não exista
 					if (!v[_to])
 						v[_to] = {};
 					if (_.isUndefined(v[_to][prodFromKey]))
 						v[_to][prodFromKey] = 0;
 					if (prodFromVal === 0)
 						return;


 					var a, b, c;
 					if (v[from][prodFromKey] === 0 && v[_to][prodFromKey] === 0)
 						v[from][prodFromKey] = (v[_to][prodFromKey] = 0), a = true;
 					if (_.isNaN(v[from][prodFromKey]))
 						v[from][prodFromKey] = 0, b = true;
 					if (_.isNaN(v[_to][prodFromKey])) {
 						//debugger;
 						v[_to][prodFromKey] = 0;
 					}

 					console.log(a, b, c)
 					if (_.isNaN(v[_to][prodFromKey] + prodFromVal))
 						debugger;
 					//incrementa valor 
 					v[_to][prodFromKey] += prodFromVal;
 					// seta no estoque
 					if (from == 'aberto' && to == 'fechado') {
 						this.saidaDeEstoque(prodFromKey, prodFromVal);
 					}
 					//zera destino
 					v[from][prodFromKey] = 0;

 					this.sendClock(_to, prodFromKey, k);




 				}.bind(this))
 			}.bind(this));


 		}

 		//calcula o somatório de todos os cycle
 		this.calculateAll();
 		this.$.pedidosBase.commit();

 		this.queryPedidosRef();

 		console.log('enviado de:' + this.from + ' para:' + this.to);
 	},
 	// :mesa / :categoria / :ciclo / :produto
 	sendClock: function (to, prodFromKey, categoryKey) {

 		var mesa = this.$.g.data.currentMesa;
 		var categoria = categoryKey;
 		var ciclo = to;
 		var produto = prodFromKey;
 		var loc = this.$.g.location;
 		var path = "relogios/" + mesa + "/" + categoria + "/" + ciclo + "/" + produto;
 		var url = loc + "/" + path;

 		var cicloRef = new Firebase(url);
 		cicloRef.once('value', function (data) {
 			console.log('url:', url);
 			console.log('val:', data.val());
 			cicloRef.set(Firebase.ServerValue.TIMESTAMP);

 			queryIt(path);

 		})
 	},
 	queryPedidosRef: function () {
 		var a = document.querySelector('html /deep/ firebase-element.pedidos-base-ref');
 		if (a)
 			a.queryChanged();

 		var b = document.querySelector('html /deep/ firebase-element.pedidos-base-ref2')
 		if (b)
 			b.queryChanged();

 		var B = document.querySelectorAll('* /deep/ [id="pedidosAbertoBase"]');
 		for (var i = 0; i < B.length; i++)
 			B[i].queryChanged();
 	}
 });