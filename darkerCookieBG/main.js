Game.registerMod("darkerCookieBG", {
	init: () => {
        let style = document.createElement("style");
        document.head.appendChild(style);
        style.sheet.insertRule('#cookies { background: rgba(0,0,0,0.77); padding: 5px 0; }');
    }
});