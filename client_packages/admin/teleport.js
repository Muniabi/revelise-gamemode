// Клавиша P (0x50) - для телепортации на метку
mp.keys.bind(0x50, false, () => {
    // Проверяем, активна ли метка на карте
    const waypointActive = mp.game.ui.isWaypointActive();

    if (waypointActive) {
        // Получаем координаты метки
        const blipId = mp.game.ui.getFirstBlipInfoId(8); // ID метки типа 8 (маркер на карте)
        const coords = mp.game.ui.getBlipInfoIdCoord(blipId);

        // Проверяем координаты метки
        if (coords && coords.x !== 0 && coords.y !== 0) {
            // Отправляем координаты на сервер
            mp.events.callRemote(
                "teleportToWaypoint",
                coords.x,
                coords.y,
                coords.z
            );
        } else {
            mp.game.graphics.notify(
                "~r~Не удалось получить координаты метки. Убедитесь, что метка установлена правильно."
            );
        }
    } else {
        mp.game.graphics.notify(
            "~r~Метка не установлена. Пожалуйста, установите метку."
        );
    }
});
