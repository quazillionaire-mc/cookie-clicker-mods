Game.registerMod("enableRefresh", {
	init: () => {
        AddEvent(window, 'keydown', (e) => {
            Game.Notify(e.key,'',[16,5]);
            if (e.key == '5') {
                Game.Notify(`Restarting the game!`,'',[0,0], true); //For people interested: Game.Notify(title,desc,pic,quick,noLog) quick = Notification disappears automatically after around a second. noLog = Doesn't display in console
                Game.toSave = true;
                Game.toReload = true; //Turns out CC actually saves the game before reloading, it was an oopsie on my side. But now it's fixed
            }
        });
        Game.Notify(`Enable Refresh loaded!`,'',[16,5]);
    }
});