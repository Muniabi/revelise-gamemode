/*

Сервер сделан Discord: челавек паук#9555
Для коммерческого (и не только) использования!

Если Вы распостраняете данную сборку/основу
указание автора и ссылку на действующий репозиторий

https://github.com/SashaGoncharov19/pavukrp-gamemode

                  обязательное!

    */
try {
    //Евенты сервера
    require("./events/events.js");
    require("./events/mission");

    //Команды сервер
    require("./commands/commands.js");
    require("./commands/admin");
    require("./commands/esp.js");
    require("./commands/teleport.js");
    require("./commands/inv.js");

    require("./utilities/time"); // Система времени
    // require("./utilities/weather"); // Система погоды
    // require("./utilities/items"); // Предметы
    // require("./utilities/death"); // Система смерти
    // require("./utilities/zones"); // Зеленые зоны

    global.browser = mp.browsers.new("package://browser/index.html");
    global.player = mp.players.local;

    //Загружаем главные компоненты сервера
    require("./system/DB.js");

    console.log("[SERVER] Сервер загружен!");
} catch (err) {
    console.log(err);
}
