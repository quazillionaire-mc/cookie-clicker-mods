Game.registerMod("beautifyChips", {
	init: () => {
		let logic = () => {
			let chips = Number.parseInt(Game.ascendNumber.textContent.replaceAll(/[\+\,]/g, ''));
			Game.ascendNumber.innerHTML = '+' + Beautify(chips, 1).replace(' ', '&nbsp;');
		};

		Game.registerHook('logic', () => {
			if (Game.T % 15 == 0) logic();
		});

		logic();
	}
});