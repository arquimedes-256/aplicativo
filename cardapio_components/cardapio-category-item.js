Polymer({
	observe: {
		'categoryData productData': 'readyObj',
		'categoryKey': 'readyKey'
	},
	slideIt: false,
	ready: function () {},
	onImgComplete: function () {
		/*
		this.job('img-card-job', function () {
			var f = this.onImgComplete.bind(this);
			var x = this.shadowRoot.querySelector('img-card');
			if (x) {
				var t = parseFloat(x.style.top.replace('%', ""));
				var obj;

				if (t == -(10 * PHI)) {
					obj = {
						css: {
							top: (60 * PHI) + '%',
							left: 24 * PHI,
							scale: .7 * PHI
						}
					}
				} else {
					obj = {
						css: {
							top: -(10 * PHI) + '%',
							left: -24 * PHI,
							scale: .5 * PHI
						}
					};
				}

				obj['onComplete'] = f;
				obj['ease'] = Bounce.easeOut;

				TweenLite.to(x, 1 * PHI, obj);

			}
		},
		200 * PHI)
      */
	},
	readyObj: function (_old, _new) {
		if (_new)
			this.obj = _new;
		this.onImgComplete();
		this.onInnerImageComplete();
	},
	onInnerImageComplete: function () {


		// var f = this.onInnerImageComplete.bind(this);
		// var x = this.shadowRoot.querySelector('img-card');

		// if (x) {

		// 	var img = x.shadowRoot.querySelector('img');
		// 	console.log(img)
		// 	img.style.top
		// 	TweenLite.to(img, .5, {
		// 		css: {
		// 			top: 10
		// 		},
		// 		onComplete: f
		// 	})
		// } else this.async(this.onInnerImageComplete, 200);

	},
	readyKey: function (_old, _new) {
		if (_new)
			this.objKey = _new;
	},
	onClickRoot: function () {
		this.fire("click-cardapio-category-item", {
			category: this.categoryData,
			categoryKey: this.categoryKey
		});
	},
	fireMark: function (e, d, s) {
		this.fire('product-item-mark', {
			productKey: this.objK2,
			categoryKey: this.objK1,
			checked: s.checked
		});
		console.log('firemark')
		this.async(queryBases, 100);
	}
});