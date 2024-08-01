let GodMode = false;
let localPlayer = mp.players.local;

// F5 - включение/выключение godmode
mp.keys.bind(0x74, false, function () {
    GodMode = !GodMode;
    if (GodMode) {
        mp.events.callRemote("setPlayerInvincible", true);
        mp.game.graphics.notify("~g~Режим бессмертия включен.");
    } else {
        mp.events.callRemote("setPlayerInvincible", false);
        mp.game.graphics.notify("~r~Режим бессмертия отключен.");
    }
});
