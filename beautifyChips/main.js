Game.registerMod("beautifyChips", {
	init: () => {
		let style = document.createElement("style");
		// style.appendChild(document.createTextNode(""));
		document.head.appendChild(style);
		style.sheet.insertRule('.chipCount { color: #fff; }');
		style.sheet.insertRule('.chipCount::before { top: 1px; }');

		Game.ascendNumber.style.whiteSpace = 'pre';
		
		let logic = () => {
			var ascendNowToGet = Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) - Math.floor(Game.HowMuchPrestige(Game.cookiesReset));
			Game.ascendNumber.innerHTML = 
				'+<span class="chipCount heavenly price">' + Beautify(ascendNowToGet).replace(/\.\d\d$/, '') + '</span>';
		};

		Game.registerHook('logic', () => {
			if (Number.isInteger(Game.T / 15)) logic();
		});

		logic();
	}
});