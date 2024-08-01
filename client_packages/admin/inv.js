// Переменная для хранения состояния невидимости
var isInvisible = false;

// Обработка команды "inv" с клиентской стороны
mp.events.add("toggleInvisible", () => {
    isInvisible = !isInvisible;

    if (isInvisible) {
        mp.game.graphics.notify("Невидимость ~g~включена");
        mp.players.local.setVisible(false, false); // Скрываем игрока
    } else {
        mp.game.graphics.notify("Невидимость ~r~выключена");
        mp.players.local.setVisible(true, false); // Показываем игрока
    }
});

// Опционально: проверка состояния невидимости в определенных ситуациях
mp.events.add("render", () => {
    if (isInvisible) {
        mp.players.local.setVisible(false, false);
    }
});
