Game.registerMod("modLogTest", {
    runTests: function () {
        console.log('test');
        console.clear();
        console.assert(true, 'test console.assert true');
        console.assert(false, 'test console.assert false');
        console.log('test console.log');
        console.info('test console.info');
        console.debug('test console.debug');
        console.warn('test console.warn');
        console.error('test console.error');
        console.table('test console.table');
        console.trace('test console.trace');
        console.dir('test console.dir');
        console.dirxml('test console.dirxml');
        console.count('test console.count');
        console.countReset('test console.countReset');
        console.group('test console.group');
        console.groupCollapsed('test console.groupCollapsed');
        console.groupEnd();
        console.time('test console.time');
        console.timeLog('test console.timeLog');
        console.timeEnd('test console.timeEnd');
    },

	init: function () {
        AddEvent(window, 'keydown', (e) => {
            if (e.key == '\\') this.runTests();
        });
    }
});