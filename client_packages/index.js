/*

Сервер сделан Discord: челавек паук#9555
Для коммерческого (и не только) использования!

Если Вы распостраняете данную сборку/основу
указание автора и ссылку на действующий репозиторий

https://github.com/SashaGoncharov19/pavukrp-gamemode

                  обязательное!

    */

//Это основной файл подключения всех скриптов и т.п.
//
require("./admin/noclip.js");
require("./admin/gm.js");
require("./admin/esp.js");
require("./admin/teleport");
require("./admin/inv");

require("./events/rent");
require("./events/lsc");
require("./events/mission");
require("./events/hud");

// Централизованое управление интерфейсом
require("./ui/uiManager");

// Utils
// require("./utils/3dCamera");
// require("./systems/utils/snake");
// require("./systems/utils/noclip");
require("./utils/other");
// require("./systems/utils/death");
// require("./systems/utils/zones");
//

// require("accounts");

global.browser = mp.browsers.new("package://browser/index.html");
global.player = mp.players.local;
