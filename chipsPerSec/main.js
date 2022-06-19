Game.registerMod("chipsPerSec", {
	init: () => {
		// A function to calculate the chips per second
		let chipsPerSec = () => Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned + (Game.cookiesPs * (1 - Game.cpsSucked))) - Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned));
		let chipsPerSecStr = () => (Beautify(chipsPerSec(), 1) + '/sec').replace(' ', '&nbsp;');

		// Create the new HTML element and give it the same attributes as the current ascend chip number
		let el = document.createElement('div');
		el.innerHTML = chipsPerSecStr();
		el.className = "roundedPanel";
		el.setAttribute('id', 'chipsPerSec');

		el.style.position = 'absolute';
		el.style.right = '115px';
		el.style.top = '0';
		el.style.fontSize = '12px';
		el.style.fontWeight = 'bold';
		el.style.fontFamily = 'Georgia';
		el.style.color = '#999';

		// Find the parent node and the reference node to prepend the new element to
		let parent = document.querySelector('#legacyButton'),
			reference = document.querySelector('#ascendNumber');

		// Insert the new div
		parent.insertBefore(el, reference);

		let logic = () => {
			if (chipsPerSec() > 0) {
				el.innerHTML = chipsPerSecStr();
				el.style.display = 'block';
			} else {
				el.style.display = 'none';
			}
		};

		Game.registerHook('logic', () => {
			if (Number.isInteger(Game.T / 15)) logic();
		});

		logic();
	}
});