Game.registerMod("countStormClicks", {
	init: () => {
        let popFunc = Game.shimmerTypes['golden'].popFunc.bind({});
        Game.shimmerTypes['golden'].popFunc = (me) => {
            if (!me.spawnLead) {
                Game.goldenClicks++;
                Game.goldenClicksLocal++;
          
                if (Game.goldenClicks>=1) Game.Win('Golden cookie');
                if (Game.goldenClicks>=7) Game.Win('Lucky cookie');
                if (Game.goldenClicks>=27) Game.Win('A stroke of luck');
                if (Game.goldenClicks>=77) Game.Win('Fortune');
                if (Game.goldenClicks>=777) Game.Win('Leprechaun');
                if (Game.goldenClicks>=7777) Game.Win('Black cat\'s paw');
                if (Game.goldenClicks>=27777) Game.Win('Seven horseshoes');
            
                if (Game.goldenClicks>=7) Game.Unlock('Lucky day');
                if (Game.goldenClicks>=27) Game.Unlock('Serendipity');
                if (Game.goldenClicks>=77) Game.Unlock('Get lucky');
            
                if ((me.life/Game.fps)>(me.dur-1)) Game.Win('Early bird');
                if (me.life<Game.fps) Game.Win('Fading luck');
            }
          
            popFunc(me);
          }
    }
});