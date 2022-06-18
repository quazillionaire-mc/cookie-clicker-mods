Game.registerMod("enableRefresh", {
	init: () => {
        AddEvent(window, 'keydown', (e) => {
            Game.Notify(e.key,'',[16,5]);
            if (e.key == '5') {
                App.reload();
                window.location.reload();
                // e.preventDefault();
            }
        });
        Game.Notify(`Enable Refresh loaded!`,'',[16,5]);
    }
});