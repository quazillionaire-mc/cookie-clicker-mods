Game.registerMod("bulkBuy50", {
	btn50: null,

	storeBulkButtonClick: function (id) {
		if (id === 3.5) {
			// Make the other buttons de-selected
			if (Game.buyBulk === 1)   l('storeBulk1').classList.remove('selected');
			if (Game.buyBulk === 10)  l('storeBulk10').classList.remove('selected');
			if (Game.buyBulk === 100) l('storeBulk100').classList.remove('selected');
			if (Game.buyBulk === -1)  l('storeBulkMax').classList.remove('selected');
			// select the 50 button
			this.btn50.classList.add('selected');
			// Do the things that the actual code does, except with 50
			Game.buyBulk = 50;
			Game.storeToRefresh = 1;
			PlaySound('snd/tick.mp3');
		} else {
			// This will only be triggered if one of the normal buy buttons are clicked, so just 
			// run the normal function and deselect the X button
			Game.storeBulkButton(id);
			this.btn50.classList.remove('selected');
		}
	},	

	init: function () {
		let MOD = this;

		// Create the new HTML element and give it the same attributes as the other bulk buttons
		let btn50 = document.createElement('div');
		btn50.innerHTML = "50";
		btn50.className = "storePreButton storeBulkAmount";
		btn50.setAttribute('id', 'storeBulk50');

		let btn1, btn10, btn100, btnAll;

		// Insert the new button
		l('storeBulk').insertBefore(btn50, l('storeBulk100'));

		MOD.btn50 = btn50;

		// Get all the bulk buttons
		document.querySelectorAll('.storeBulkAmount').forEach(btn => {
			// Modify the CSS for the buttons so they all fit again
			btn.style.width = "46px";
			// Modify the onclick behavior of the buttons so they select and deselect properly
			let id;
			switch (btn.innerHTML.toLowerCase()) {
				case '1': id = 2; btn1 = btn; break; // These ids are taken from the original code
				case '10': id = 3; btn10 = btn; break;
				case '50': id = 3.5; break; // This is the new id for the 50 button
				case '100': id = 4; btn100 = btn; break;
				case 'all': id = 5; btnAll = btn; break;
				default: return;
			}
			btn.setAttribute('onclick', `Game.mods['${MOD.id}'].storeBulkButtonClick(${id})`);
		});

		let bulkBuyX = Game.mods['bulkBuyX'];
		if (bulkBuyX !== undefined) bulkBuyX.adjustForBulk50();
	}
});