Game.registerMod("bulkBuyX", {
	// mod values
	curVal: null,
	btnX: null,

	// custom functions
	storeBulkButtonClick: (id) => {
		let MOD = Game.mods['bulkBuyX'];

		if (id === null || id === undefined) {
			// Make the other buttons de-selected
			if (Game.buyBulk === 1)   l('storeBulk1').classList.remove('selected');
			if (Game.buyBulk === 10)  l('storeBulk10').classList.remove('selected');
			if (Game.buyBulk === 100) l('storeBulk100').classList.remove('selected');
			if (Game.buyBulk === -1)  l('storeBulkMax').classList.remove('selected');
			// select the X button
			MOD.btnX.classList.add('selected');
			MOD.updateBulk();
			PlaySound('snd/tick.mp3');
		} else {
			// This will only be triggered if one of the normal buy buttons are clicked, so just 
			// run the normal function and deselect the X button
			Game.storeBulkButton(id);
			MOD.btnX.classList.remove('selected');
		}
	},

	updateBulk: () => {
		let MOD = Game.mods['bulkBuyX'];

		if (!MOD.btnX.classList.contains('selected')) return;

		let x = Number.parseInt(MOD.btnX.value);
		if (MOD.btnX.value === '') {
			MOD.curVal = '';
			Game.buyBulk = 0;
		} else if (!/\D/.test(MOD.btnX.value) && Number.isInteger(x) && Number.isFinite(x) && x >= 0 && x <= 1000) {
			// Falls within parameters
			MOD.curVal = x;
			Game.buyBulk = x;
		} else {
			// Invalid value; fallback to curVal
			MOD.btnX.value = MOD.curVal;
			return; // do not update store
		}
		Game.storeToRefresh = 1;
	},

	// mod functions
	init: () => {
		let MOD = Game.mods['bulkBuyX'];

		MOD.curVal = 50;

		// Create the new HTML element and give it the same attributes as the other bulk buttons
		let btnX = document.createElement('input');
		btnX.setAttribute('type', 'text');
		btnX.setAttribute('id', 'storeBulkX');
		
		// Get all the other bulk buttons
		document.querySelectorAll('.storeBulkAmount').forEach(btn => {
			// Modify the onclick behavior of the buttons so they select and deselect properly
			let id;
			switch (btn.innerHTML.toLowerCase()) {
				case 'buy':
				case 'sell': return; // We don't want to change the behavior of buy/sell
				// These ids are taken from the original code
				case '1':   id = 2; btn.style.width = '42px'; break;
				case '10':  id = 3; btn.style.width = '42px'; break;
				case '100': id = 4; btn.style.width = '42px'; break;
				case 'all': id = 5; btn.style.width = '32px'; break;
			}
			btn.setAttribute('onclick', `Game.mods['${MOD.id}'].storeBulkButtonClick(${id})`);
		});

		btnX.className = 'storePreButton storeBulkAmount';
		btnX.style.width = '48px';
		btnX.style.fontFamily = 'Tahoma';
		btnX.style.fontSize = '14px';
		btnX.style.fontWeight = 'bold';
		btnX.style.textAlign = 'center';
		btnX.style.background = 'none';
		btnX.style.color = '#fff';
		btnX.style.height = '7px';
		btnX.style.margin = '2px 10px 0 10px';
		btnX.style.outline = 'none';
		
		btnX.value = MOD.curVal;

		btnX.setAttribute('onclick', `Game.mods['${MOD.id}'].storeBulkButtonClick()`);
		btnX.setAttribute('oninput', `Game.mods['${MOD.id}'].updateBulk()`);

		// Insert the new button
		l('storeBulk').insertBefore(btnX, l('storeBulkMax'));

		MOD.btnX = btnX;
	},
	save: () => {
		let MOD = Game.mods['bulkBuyX'];
		return MOD.curVal.toString();
	},
	load: (str) => {
		let MOD = Game.mods['bulkBuyX'];
		MOD.curVal = str;
		MOD.btnX.value = MOD.curVal;
	}
});