Game.registerMod("beautifyChips", {
	init: () => {
		let style = document.createElement("style");
		// style.appendChild(document.createTextNode(""));
		document.head.appendChild(style);
		style.sheet.insertRule('.chipCount {' +
			'margin-right: 21px; }');
		style.sheet.insertRule('.chipCount::after {' +
			'content: "";' +
			'display: block;' +
			'position: absolute;' +
			'right: 2px;' +
			'top: 8px;' +
			'background: url(img/heavenlyMoney.png);' +
			'width: 16px;' +
			'height: 16px; }');

		Game.ascendNumber.style.whiteSpace = 'pre';
		
		let logic = () => {
			var ascendNowToGet = Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) - Math.floor(Game.HowMuchPrestige(Game.cookiesReset));
			Game.ascendNumber.innerHTML = 
				'<span class="chipCount">' + '+' + Beautify(ascendNowToGet).replace(/\.\d\d$/, '') + '</span>';
		};

		Game.registerHook('logic', () => {
			if (Number.isInteger(Game.T / 15)) logic();
		});

		logic();
	}
});