// uiManager.js

// Пример серверного события для открытия меню автосалона
// mp.events.callClient(player, "showAutoSalon");
// mp.events.callClient(player, "hideAutoSalon");

// Объект для хранения ссылок на различные части интерфейса
const UI = {
    hud: "HUD",
    miniUvedi: "miniuvedi",
    autosalon: "AutoSalon",
    // Добавляйте здесь другие элементы интерфейса по мере необходимости
};

// Функция для отображения части интерфейса
function showUI(element) {
    if (global.browser) {
        global.browser.execute(`${element}.active = true;`);
    }
}

// Функция для скрытия части интерфейса
function hideUI(element) {
    if (global.browser) {
        global.browser.execute(`${element}.active = false;`);
    }
}

// Примеры использования функций при различных событиях
mp.events.add("playerSpawn", () => {
    showUI(UI.hud);
});

mp.events.add("hideMiniUvedi", () => {
    hideUI(UI.miniUvedi);
});

mp.events.add("showAutoSalon", () => {
    showUI(UI.autosalon);
});

mp.events.add("hideAutoSalon", () => {
    hideUI(UI.autosalon);
});

// Добавляйте другие события и функции по необходимости
