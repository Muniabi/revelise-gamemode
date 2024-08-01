// Аренда ТС

// Координаты мест, где можно арендовать транспортное средство
let rent = [
    { x: -1014.6593627929688, y: -2699.583740234375, z: 13.959694862365723 },
];

// Массив для хранения созданных колшэйпов (зон активации)
let rentColshapes = [];

// Проходим по каждому месту аренды из массива rent
for (let i = 0; i < rent.length; i++) {
    // Создание сферического колшэйпа в месте аренды (зона радиусом 1 метр)
    let shape = mp.colshapes.newSphere(rent[i].x, rent[i].y, rent[i].z, 1, 0);
    rentColshapes.push(shape);
    // Создание маркера в виде круга на земле в месте аренды
    mp.markers.new(2, new mp.Vector3(rent[i].x, rent[i].y, rent[i].z), 0.0);
    // Создание NPC (неигрового персонажа) в месте аренды
    let ped = mp.peds.new(
        mp.game.joaat("a_m_y_beach_01"),
        new mp.Vector3(
            -1013.8114624023438,
            -2697.649169921875,
            13.987889289855957
        ),
        128.07366943359375
    );
    // Создание текста над NPC
    let text = mp.labels.new(
        `Кузя Лакомкин (NPC)`,
        new mp.Vector3(ped.position.x, ped.position.y, ped.position.z + 1),
        {
            los: false, // Видимость текста сквозь стены
            font: 0, // Шрифт текста
            drawDistance: 7, // Дистанция, с которой виден текст
            dimension: 0, // Измерение, в котором виден текст
        }
    );
    // Создание иконки на мини-карте (блипа) для места аренды
    mp.blips.new(280, new mp.Vector3(rent[i].x, rent[i].y, rent[i].z), {
        name: `Аренда ТС`, // Название точки на карте
        color: 2, // Цвет иконки
        shortRange: true, // Иконка видна только вблизи
    });
}

// ----------------------------[Вход в шэйп]------------------------------\\

// Обработчик события входа игрока в колшэйп (зону активации)
// mp.events.add("playerEnterColshape", (shape) => {
//     for (let colshape of rentColshapes) {
//         // Проверяем, входит ли игрок в один из арендуемых колшэйпов
//         if (shape == colshape) {
//             // Привязка кнопки 'E' к вызову события аренды транспорта
//             mp.keys.bind(0x45, true, function () {
//                 mp.events.callRemote("rentVehicle");
//             });
//             // Активация кнопки взаимодействия в интерфейсе (например, HUD)
//             global.browser.execute("HUD.usebutton.active = true;");
//             break;
//         }
//     }
// });

// ----------------------------[Выход из шэйпа]------------------------------\\

// Обработчик события выхода игрока из колшэйпа (зоны активации)
// mp.events.add("playerExitColshape", (shape) => {
//     for (let colshape of rentColshapes) {
//         // Проверяем, выходит ли игрок из одного из арендуемых колшэйпов
//         if (shape == colshape) {
//             // Деактивация кнопки взаимодействия в интерфейсе
//             browser.execute("HUD.usebutton.active = false;");
//             // Отмена привязки кнопки 'E' к вызову события аренды транспорта
//             mp.keys.unbind(0x45, true);
//             break;
//         }
//     }
// });
