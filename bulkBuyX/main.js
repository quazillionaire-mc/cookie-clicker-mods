Game.registerMod("bulkBuyX", {
	curVal: null,
	btnX: null,

	storeBulkButtonClick: function (id) {
		if (id === undefined) {
			// Make the other buttons de-selected
			if (Game.buyBulk === 1)   l('storeBulk1').classList.remove('selected');
			if (Game.buyBulk === 10)  l('storeBulk10').classList.remove('selected');
			if (Game.buyBulk === 50)  l('storeBulk50').classList.remove('selected');
			if (Game.buyBulk === 100) l('storeBulk100').classList.remove('selected');
			if (Game.buyBulk === -1)  l('storeBulkMax').classList.remove('selected');
			// select the X button
			this.btnX.classList.add('selected');
			this.updateBulk();
			PlaySound('snd/tick.mp3');
		} else {
			// This will only be triggered if one of the normal buy buttons are clicked, so just 
			// run the normal function and deselect the X button
			if (Game.mods['bulkBuy50'] !== undefined) {
				Game.mods['bulkBuy50'].storeBulkButtonClick(id);
			} else {
				Game.storeBulkButton(id);
			}
			this.btnX.classList.remove('selected');
		}
	},

	updateBulk: function () {
		if (!this.btnX.classList.contains('selected')) return;

		let x = Number.parseInt(this.btnX.value);
		if (this.btnX.value === '') {
			this.curVal = '';
			Game.buyBulk = 0;
		} else if (!/\D/.test(this.btnX.value) && Number.isInteger(x) && Number.isFinite(x) && x >= 0 && x <= 1000) {
			// Falls within parameters
			this.curVal = x;
			Game.buyBulk = x;
		} else {
			// Invalid value; fallback to curVal
			this.btnX.value = this.curVal;
			return; // do not update store
		}
		Game.storeToRefresh = 1;
	},

	adjustForBulk50: function () {
		let MOD = this;
		// Get all the other bulk buttons
		document.querySelectorAll('.storeBulkAmount').forEach(btn => {
			// Modify the onclick behavior of the buttons so they select and deselect properly
			let id;
			switch (btn.innerHTML.toLowerCase()) {
				case '1':   id = 2;   btn.style.width = '25px'; return;
				case '10':  id = 3;   btn.style.width = '35px'; return;
				case '50':  id = 3.5; btn.style.width = '35px'; break; // Update btn50 onlick only
				case '100': id = 4;   btn.style.width = '45px'; return;
				case 'all': id = 5;   btn.style.width = '27px'; return;
				default: return;
			}
			btn.setAttribute('onclick', `Game.mods['${MOD.id}'].storeBulkButtonClick(${id})`);
		});
	},

	init: function () {
		let MOD = this;

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
				// These ids are taken from the original code
				case '1':   id = 2; btn.style.width = '32px'; break;
				case '10':  id = 3; btn.style.width = '42px'; break;
				case '100': id = 4; btn.style.width = '52px'; break;
				case 'all': id = 5; btn.style.width = '40px'; break;
				default: return;
			}
			btn.setAttribute('onclick', `Game.mods['${MOD.id}'].storeBulkButtonClick(${id})`);
		});

		if (Game.mods['bulkBuy50'] !== undefined) this.adjustForBulk50();

		btnX.className = 'storePreButton storeBulkAmount';
		btnX.style.width = '45px';
		btnX.style.fontFamily = 'Tahoma';
		btnX.style.fontSize = '14px';
		btnX.style.fontWeight = 'bold';
		btnX.style.textAlign = 'center';
		btnX.style.background = 'none';
		btnX.style.color = '#fff';
		btnX.style.height = '5px';
		btnX.style.margin = '2px 8px 0 8px';
		btnX.style.outline = 'none';
		btnX.style.position = 'relative';
		btnX.style.top = '1px';
		
		btnX.value = MOD.curVal;

		btnX.setAttribute('onclick', `Game.mods['${MOD.id}'].storeBulkButtonClick()`);
		btnX.setAttribute('oninput', `Game.mods['${MOD.id}'].updateBulk()`);

		// Insert the new button
		l('storeBulk').insertBefore(btnX, l('storeBulkMax'));

		MOD.btnX = btnX;
	},
	save: function () {
		return this.curVal.toString();
	},
	load: function (str) {
		this.curVal = str;
		this.btnX.value = this.curVal;
	}
});