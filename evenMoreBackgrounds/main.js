Game.registerMod("evenMoreBackgrounds", {
    bgType: 0,

	init: function() {
        if (typeof(CCSE) !== 'undefined') {
            if (CCSE && CCSE.isLoaded) {
                this.launch();
            } else {
                CCSE.postLoadHooks.push(this.launch);
            }
        } else {
            Game.registerHook('create', () => {
                this.launch();
            });
        }
    },

	save: function () {
		return this.bgType.toString();
	},
	load: function (str) {
        this.bgType = Number.parseInt(str) | 0;
        Game.bgType = this.bgType;
	},

    launch: function() {
        let JPG = name => `${this.dir}/img/${name}${typeof(CCSE) !== 'undefined' ? '.jpg' : ''}`;

        let iconPath = `${this.dir}/img/icons.png`;
        let ICON = (x,y) => [x,y,iconPath];

        let BGs = [
            { pic:JPG('bgWhiteNoise'), name:'White Noise', icon:ICON(0,0) },
            { pic:JPG('bgBlackNoise'), name:'Black Noise', icon:ICON(1,0) },
            { pic:JPG('bgPolishedSilver'), name:'Polished Silver', icon:ICON(10,0) },
            { pic:JPG('bgPolishedGold'), name:'Polished Gold', icon:ICON(9,0) },
            { pic:JPG('bgCoins'), name:'Coins', icon:ICON(2,0) },
            { pic:JPG('bgCookies'), name:'Cookies', icon:ICON(3,0) },
            { pic:JPG('bgPlanks'), name:'Planks', icon:ICON(4,0) },
            { pic:JPG('bgNeverendingLegacy'), name:'Neverending Legacy', icon:ICON(5,0) },
            { pic:JPG('bgCloudy'), name:'Cloudy', icon:ICON(6,0) },
            { pic:JPG('bgIcy'), name:'Icy', icon:ICON(7,0) },
            { pic:JPG('bgSpace'), name:'Space', icon:ICON(8,0) },
        ];

        let div, i = div = Object.getOwnPropertyNames(Game.BGsByChoice).length;
        BGs.forEach(bg => {
            if (!EN) bg.name = loc(bg.name,0,bg.name);
            Game.BGsByChoice[i++] = bg;
        });

        let choicesFunction = Game.Upgrades['Background selector'].choicesFunction.bind({});
        Game.Upgrades['Background selector'].choicesFunction = () => {
            let choices = choicesFunction();
            choices[div].div = true;
            return choices;
        };

        let choicesPick = Game.Upgrades['Background selector'].choicesPick.bind({});
        Game.Upgrades['Background selector'].choicesPick = (id) => {
            this.bgType = id;
            choicesPick(id);
        };
        
        let WriteSave = Game.WriteSave.bind({});
        Game.WriteSave = (type) => {
            Game.bgType = 0;
            let ret = WriteSave(type);
            Game.bgType = this.bgType;
            return ret;
        };

        let updateIcon = () => {
            // let curIcon = Game.Upgrades['Background selector'].icon;
            Game.Upgrades['Background selector'].icon = ICON(Game.Has("Distinguished wallpaper assortment"),1);
            // if (Game.Upgrades['Background selector'].icon !== curIcon) Game.upgradesToRebuild = 1;
        };

        Game.registerHook('check', updateIcon);
        updateIcon();
        Game.upgradesToRebuild = 1;
    }
});