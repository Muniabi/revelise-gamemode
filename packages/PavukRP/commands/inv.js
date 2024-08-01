// Серверная часть
mp.events.addCommand("inv", (player) => {
    // Отправляем событие на клиентскую сторону
    player.call("toggleInvisible");
});
