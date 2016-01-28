Polygraph(
{
	".bse":
	{
		"categorias":{
			nome:String,
		},
		"produtos": {
			nome:String,
			preco:Number
		}
	},
	".app":
	{
		"cardapio-app":
		{
			"paper-tabs":
			{
				"paper-tab.x":
				{
					"span":"ok"
				},
				"paper-tab.y":
				{
					"span":"ok"
				}
			},
			"@each categoriasKeys":
			{
				"cardapio-wishlist":
				{
					"cardapio-wishlist-item":
					{

					}
				}
			},
			"cardapio-categorias":{
				".template":
				{
					".each categoriasKeys":
					{
						"div layout vertical #category-item":
						{
							"paper-shadow":
							{
								"span.1":"{{ nome }}",
								"span.2":"{{ quantidade }}"
							}
						}
					}
				},
				".controller":
				{
					"$.cat-item":
					{
						$click:function()
						{

						},
						$hover:function()
						{

						}
					}
				}
			},
		}
	}
}