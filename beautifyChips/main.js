Game.registerMod("beautifyChips", {
	init: () => {
		let logic = () => {
			var ascendNowToGet = Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) - Math.floor(Game.HowMuchPrestige(Game.cookiesReset));
			Game.ascendNumber.innerHTML = '+' + Beautify(ascendNowToGet).replace(/\.\d\d$/, '').replace(' ', '&nbsp;');
		};

		Game.registerHook('logic', () => {
			if (Game.T % 15 == 0) logic();
		});

		logic();
	}
});