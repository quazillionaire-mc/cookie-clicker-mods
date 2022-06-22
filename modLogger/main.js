Game.registerMod("modLogger", {
	init: function () {

        /* INIT UI */

        let style = document.createElement("style");
        document.head.appendChild(style);
        style.sheet.insertRule('.modLog { padding: 20px; }');
        style.sheet.insertRule('.modLog > div:first-child { border-top: 1px solid rgba(255, 255, 255, 0.15); }');
        style.sheet.insertRule('.modLog > div { padding: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.15); }');
        style.sheet.insertRule('.modLog > div.error { color: rgb(223, 83, 83); background: rgba(204, 49, 49, 0.3)}');
        style.sheet.insertRule('.modLog > div.warn { color: rgb(230, 201, 47); background: rgba(196, 169, 23, 0.3); }');
        
        let LogLines = [];
        function DrawLog() {
            if (Game.onMenu == 'log') {
                let str = '<div class="close menuClose" ' + Game.clickStr + '="Game.ShowMenu();">x</div>';

                str += '<div class="modLog monospace">';
                for (let line of LogLines) {
                    str += line.toString() + '\n';
                }
                str += '</div>';

                l('menu').innerHTML = str;
            }
        }

        let _UpdateMenu = Game.UpdateMenu.bind({});
        Game.UpdateMenu = function (modLogger) {
            if (!modLogger) _UpdateMenu();
            DrawLog();
        }

        function Output(logLvl, str, opts) {
            LogLines.push({
                logLvl: logLvl,
                str: str,
                toString: () => `<div class="${logLvl}">${str}</div>`
            });
            DrawLog();
        }
        
        /* BASE FUNCTIONS */

        let specRX = /%[sdifoOc]/;

        function Print(logLvl, args, opts) {
            let [first, ...rest] = args;
            let str = new String(first);
            for (let arg of rest) str += ', ' + new String(arg);
            Output(logLvl, str, opts);
        }

        function Log(logLvl, args) {
            if (args.length === 0) return;
            let [first, ...rest] = args;
            if (rest.length === 0) {
                Print(logLvl, [first]);
                return;
            }
            if (specRX.test(first)) {
                Print(logLvl, Format(args));
                return;
            }
            Print(logLvl, args);

        }

        function Format(args) {
            let [tgt, cur, ...rest] = args;
            let match = specRX.match(tgt);
            if (match) {
                let conv;
                switch (match[0]) {
                    case '%s': conv = new String(cur); break;
                    case '%d':
                    case '%i': conv = Number.parseInt(cur); break;
                    case '%f': conv = Number.parseFloat(cur); break;
                    case '%o': // TODO
                    case '%O': // TODO
                    case '%c': // TODO
                }
                if (conv) tgt.replace(specRX, cur);
            }
            let result = rest;
            result.unshift(tgt);
            if (!specRX.test(tgt)) return result;
            if (result.length === 1) return result;
            return Format(result);
        }

        /* HELPER FUNCTIONS */

        function NoImpl(name) {
            Log('warn', [name + '() not implemented for ModLogger'])
        }

        function Todo(name) {
            Log('warn', [name + '() TODO'])
        }

        /* INIT MODLOGGER */

        let _console = console;

        let ModLogger = {
            
            /* LOGGING FUNCTIONS */

            assert: (cond, ...data) => {
                _console.assert(cond, ...data);
                if (cond) return;
                let msg = 'Assertion failed';
                if (data.length === 0) data.push(msg);
                let first = data[0];
                if (typeof(first) !== 'string') {
                    data.unshift(msg);
                } else {
                    data[0] = msg + ': ' + first;
                }
                Log('assert', data);
            },

            clear: () => {
                _console.clear();
                LogLines = [];
                Log('log', ['Console cleared.']);
            },

            debug: (...data) => {
                _console.debug(...data);
                Log('debug', data);
            },

            error: (...data) => {
                _console.error(...data);
                Log('error', data);
            },

            info: (...data) => {
                _console.info(...data);
                Log('info', data);
            },

            log: (...data) => {
                _console.log(...data);
                Log('log', data);
            },

            table: (tableData, props) => {
                _console.table(tableData, props);
                NoImpl('table');
            },

            trace: (...data) => {
                _console.trace(...data);
                Todo('trace'); // TODO
            },

            warn: (...data) => {
                _console.warn(...data);
                Log('warn', data);
            },

            dir: (item, opts) => {
                _console.dir(item, opts);
                Todo('dir'); // TODO
            },

            dirxml: (...data) => {
                _console.dirxml(...data);
                Todo('dirxml'); // TODO
            },

            /* COUNTING FUNCTIONS */

            count: (label) => {
                _console.count(label);
                Todo('count'); // TODO
            },

            countReset: (label) => {
                _console.countReset(label);
                Todo('countReset'); // TODO
            },

            /* GROUPING FUNCTIONS */

            group: (...data) => {
                _console.group(...data);
                Todo('group'); // TODO
            },

            groupCollapsed: (...data) => {
                _console.groupCollapsed(...data);
                Todo('groupCollapsed'); // TODO
            },

            groupEnd: () => {
                _console.groupEnd();
                Todo('groupEnd'); // TODO
            },

            /* TIMING FUNCTIONS */

            time: (label) => {
                _console.time(label);
                Todo('time'); // TODO
            },

            timeLog: (label, ...data) => {
                _console.timeLog(label, ...data);
                Todo('timeLog'); // TODO
            },

            timeEnd: (label) => {
                _console.timeEnd(label);
                Todo('timeEnd'); // TODO
            }
        };

        /* OVERWRITE CONSOLE */
        console = ModLogger;
    }
});