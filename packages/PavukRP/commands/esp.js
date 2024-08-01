mp.events.addCommand("dl", (player) => {
    // player.setVariable(
    //     "render_info_cars",
    //     !player.getVariable("render_info_cars")
    // );
    const currentValue = player.getVariable("render_info_cars") || false;
    player.setVariable("render_info_cars", !currentValue);
    player.notify(
        currentValue
            ? "~r~ESP для машин отключен."
            : "~g~ESP для машин включен."
    );
});

// Инициализация customData для игроков при входе на сервер
mp.events.add("playerJoin", (player) => {
    if (!player.customData) {
        player.customData = {};
    }
    player.customData.render_info_players = false; // По умолчанию рендеринг информации о игроках выключен
});

// Команда для переключения отображения информации о игроках
mp.events.addCommand("dlp", (player) => {
    const currentValue = player.getVariable("render_info_players") || false;
    player.setVariable("render_info_players", !currentValue);
    player.notify(
        currentValue
            ? "~r~ESP для игроков отключен."
            : "~g~ESP для игроков включен."
    );
});
