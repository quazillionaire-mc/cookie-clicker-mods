Game.registerMod("bulkBuy50", {
	init: () => {
		// Create the new HTML element and give it the same attributes as the other bulk buttons
		let btn50 = document.createElement('div');
		btn50.innerHTML = "50";
		btn50.className = "storePreButton storeBulkAmount";
		btn50.setAttribute('id', 'storeBulk50');

		// Find the parent node and the reference node to prepend the new element to
		let parent = document.querySelector('#storeBulk'),
			reference = document.querySelector('#storeBulk100');

		// Insert the new button
		parent.insertBefore(btn50, reference);

		let btn1, btn10, btn100, btnAll;

		// Get all the other bulk buttons
		document.querySelectorAll('.storeBulkAmount').forEach(btn => {
			// Modify the CSS for the buttons so they all fit again
			btn.style.width = "46px";
			// Modify the onclick behavior of the buttons so they select and deselect properly
			let id;
			switch (btn.innerHTML.toLowerCase()) {
				case 'buy':
				case 'sell': return; // We don't want to change the behavior of buy/sell
				case '1': id = 2; btn1 = btn; break; // These ids are taken from the original code
				case '10': id = 3; btn10 = btn; break;
				case '50': id = 3.5; break; // This is the new id for the 50 button
				case '100': id = 4; btn100 = btn; break;
				case 'all': id = 5; btnAll = btn; break;
			}
			btn.setAttribute('onclick', `Game.storeBulkButton50(${id})`);
		});

		// Attach a new function to the Game object
		Game.storeBulkButton50 = (id) => {
			if (id === 3.5) {
				// Make the other buttons de-selected
				if (Game.buyBulk === 1)   btn1.classList.remove('selected');
				if (Game.buyBulk === 10)  btn10.classList.remove('selected');
				if (Game.buyBulk === 100) btn100.classList.remove('selected');
				if (Game.buyBulk === -1)  btnAll.classList.remove('selected');
				// select the 50 button
				btn50.classList.add('selected');
				// Do the things that the actual code does, except with 50
				Game.buyBulk = 50;
				Game.storeToRefresh = 1;
				PlaySound('snd/tick.mp3');
			} else {
				// This will only be triggered if another quantity is chosen, so just 
				// run the normal function and deselect the 50 button
				Game.storeBulkButton(id);
				btn50.classList.remove('selected');
			}
		};
	}
});