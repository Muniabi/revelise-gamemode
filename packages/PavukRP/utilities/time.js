let moment = require("moment-timezone");
let chat = require("../events/basic/hud");

function updateTime() {
    let moscowTime = moment().tz("Europe/Moscow");
    let hours = moscowTime.hours(); // Получаем текущий час
    let minutes = moscowTime.minutes();
    let seconds = moscowTime.seconds();

    // Если часы равны 24, установите на 0
    if (hours === 24) {
        hours = 0;
    }

    mp.world.time.set(hours, minutes, seconds);
}

setInterval(updateTime, 10000);
console.log("\x1b[34m[TIME]\x1b[0m Загружена система времени");

mp.events.addCommand("time", (player) => {
    let moscowTime = moment().tz("Europe/Moscow");
    let hours = String(moscowTime.hours()).padStart(2, "0");
    let minutes = String(moscowTime.minutes()).padStart(2, "0");
    let seconds = String(moscowTime.seconds()).padStart(2, "0");

    // Если часы равны 24, установите на 00
    if (parseInt(hours) === 24) {
        hours = "00";
    }

    chat.send(
        player,
        `!{#0077FF}[Время] !{#FFFFFF}Сейчас: ${hours}:${minutes}:${seconds}`
    );
});

mp.events.addCommand("settime", (player, timeString) => {
    if (!timeString) {
        return chat.send(
            player,
            "!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /settime [часы:минуты]"
        );
    }

    let timeParts = timeString.split(":");
    if (timeParts.length !== 2) {
        return chat.send(
            player,
            "!{#BAFE2A}[Ошибка] !{#FFFFFF}Некорректный формат времени. Используйте /settime [часы:минуты]"
        );
    }

    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);

    if (
        isNaN(hours) ||
        isNaN(minutes) ||
        hours < 0 ||
        hours >= 24 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return chat.send(
            player,
            "!{#BAFE2A}[Ошибка] !{#FFFFFF}Некорректное время. Часы должны быть от 0 до 23, минуты от 0 до 59."
        );
    }

    // Установка времени в игровом мире
    mp.world.time.set(hours, minutes, 0);
    chat.send(
        player,
        `!{#0077FF}[Время] !{#FFFFFF}Время установлено на ${String(
            hours
        ).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    );
});
