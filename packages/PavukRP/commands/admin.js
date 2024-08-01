/*

Сервер сделан Discord: челавек паук#9555
Для коммерческого (и не только) использования!

Если Вы распостраняете данную сборку/основу
указание автора и ссылку на действующий репозиторий

https://github.com/SashaGoncharov19/pavukrp-gamemode

                  обязательное!

    */

// -1039.43115234375 -2740.855224609375 13.881134986877441

const exec = require("child_process").exec;

// Инициализация customData для игроков при входе на сервер
mp.events.add("playerJoin", (player) => {
    if (!player.customData) {
        player.customData = {};
    }
    player.customData.isGodMode = false; // По умолчанию режим бессмертия отключен
});

// КОМАНДА ДЛЯ РЕСТАРТА СЕРВЕРА
mp.events.addCommand("restart", (player) => {
    // Проверка прав доступа (например, администраторская роль)
    // Убедитесь, что игрок имеет права на перезапуск сервера
    if (player.adminLevel < 1) {
        // Например, adminLevel 1 и выше имеют права
        return player.notify("~r~У вас нет прав для перезапуска сервера.");
    }

    // Уведомление всех игроков о перезапуске
    mp.players.broadcast("! Сервер будет перезапущен через 30 секунд. !");
    console.log("<LOG> ! Сервер будет перезапущен через 30 секунд. !");

    // Задержка перед перезапуском
    setTimeout(() => {
        // Запуск команды для перезапуска сервера
        exec("path/to/restart/script.sh", (error, stdout, stderr) => {
            if (error) {
                console.error(`Ошибка при перезапуске сервера: ${error}`);
                mp.players.broadcast("~r~Не удалось перезапустить сервер.");
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }, 30000); // Задержка в 30 секунд
});

//КОМАНДА ДЛЯ ИЗМЕНЕНИЕ ВРЕМЕНИ НА СЕРВЕРЕ
mp.events.addCommand("time", (player, time) => {
    if (typeof time == "undefined")
        return player.outputChatBox("Правильное использование: /time [0-24]");
    if (time < 0 || time > 24)
        return player.outputChatBox("<SERVER> Временной диапазон 0-24!");
    mp.world.time.hour = parseInt(time);
    player.notify("~g~Вы изменили время!");
    mp.players.broadcast(
        `Администратор ${player.name} изменил время игры на ${time}:00!`
    );
    console.log(
        `<LOG> Администратор ${player.name} изменил время игры на ${time}:00!`
    );
});

//КОМАНДА ДЛЯ ИЗМЕНЕНИЕ ПОГОДЫ
mp.events.addCommand("setw", (player, _, weather) => {
    if (weather == undefined) return player.outputChatBox("/setw [weather]");
    mp.world.weather = weather;
    mp.players.broadcast(`${player.name} изменил погоду в игре на ${weather}!`);
    console.log(`<LOG> ${player.name} изменил погоду в игре на ${weather}!`);
});

//Команда /pos
mp.events.addCommand("pos", (player) => {
    player.outputChatBox(`${player.position}`);
    console.log(`<LOG> ${player.position}`);
});

//Команда суицида
// mp.events.addCommand("kill", (player) => {
//     player.health = 0;
// });

mp.events.addCommand("kill", (player, _, targetId) => {
    // Проверка, указан ли ID игрока
    if (targetId && !isNaN(targetId)) {
        let target = mp.players.at(parseInt(targetId));

        // Если игрок с указанным ID найден
        if (target) {
            target.health = 0;
            player.notify(`~g~Вы убили игрока с ID ${targetId}.`);
        } else {
            player.notify("~r~Игрок с указанным ID не найден.");
        }
    } else {
        // Если ID не указан или неверен, убиваем самого себя
        player.health = 0;
        player.notify("~g~Вы погибли.");
    }
});

//Команда восстановления здоровья
mp.events.addCommand("hp", (player) => {
    player.health = 100;
    player.notify("~g~Здоровье восстановленно.");
});

//Команда выдачи бронежилета
mp.events.addCommand("armor", (player) => {
    player.armour = 100;
    player.notify("~g~Броня восстановленна.");
});

// Установка бессмертия для игрока
mp.events.add("setPlayerInvincible", (player, state) => {
    if (typeof state === "boolean") {
        player.customData.isGodMode = state;

        if (state) {
            // Устанавливаем максимальное здоровье и броню
            player.health = 100;
            player.armour = 100;
            // Регулярное восстановление здоровья и брони
            setInterval(() => {
                mp.players.forEach((player) => {
                    if (player.customData && player.customData.isGodMode) {
                        if (player.health < 100) player.health = 100;
                        if (player.armour < 100) player.armour = 100;
                    }
                });
            }, 5); // Обновление каждые 5 миллисекунд
        }
    }
});

//Команда спавна автомобиля /veh carname (/veh neon)
// mp.events.addCommand("veh", (player, _, veh, color1, color2) => {
//     if (veh == undefined)
//         return player.outputChatBox(
//             "/veh [model] [color1(необяз.)] [color2(необяз.)]"
//         );
//     let target = mp.players.at(player.id);
//     if (target == null) return player.notify("~r~ID игрока не найден!");
//     let pos;
//     let colorPrimary = color1 != undefined ? parseInt(color1) : 0; // 0 — черный цвет
//     let colorSecondary = color2 != undefined ? parseInt(color2) : 0; // 0 — черный цвет
//     pos = target.position;
//     var adminVeh = mp.vehicles.new(
//         mp.joaat(veh),
//         new mp.Vector3(pos.x + 2, pos.y, pos.z),
//         {
//             heading: 0,
//             engine: false,
//             locked: false,
//             numberPlate: "ADMIN",
//             color: [
//                 [255, 0, 0],
//                 [255, 0, 0],
//             ],
//         }
//     );
//     adminVeh.setColor(parseInt(colorPrimary), parseInt(colorSecondary));
//     adminVeh.setMod(parseInt("53"), parseInt("2"));
//     adminVeh.numberPlate = " ADMIN ";
//     player.dim = player.id;
//     setTimeout(() => {
//         target.putIntoVehicle(adminVeh, 0); // Спавн за водительское место
//     }, 150);
//     player.notify("~g~ Заспавенно!");
// });

//Команда спавна автомобиля /veh carname (/veh neon)
mp.events.addCommand("veh", (player, _, veh, color1, color2) => {
    // Проверка на наличие модели автомобиля
    if (veh == undefined || veh.trim().length === 0) {
        return player.outputChatBox("/veh [model] [color1] [color2]");
    }

    // Убедиться, что у игрока есть объект customData
    if (!player.customData) {
        player.customData = {};
    }

    // Определение позиции для спавна
    let pos = player.position;
    pos.x += 2;

    // Установка цвета автомобиля (по умолчанию черный)
    let colorPrimary = color1 != undefined ? parseInt(color1) : 0; // 0 — черный цвет
    let colorSecondary = color2 != undefined ? parseInt(color2) : 0; // 0 — черный цвет

    // Если у игрока уже есть транспортное средство
    if (player.customData.vehicle) {
        player.customData.vehicle.destroy(); // Удаление старого транспортного средства
    }

    // Создание нового транспортного средства
    var adminVeh = mp.vehicles.new(mp.joaat(veh), pos, {
        heading: 0,
        engine: false,
        locked: false,
        numberPlate: "ADMIN",
        color: [
            [0, 0, 0],
            [0, 0, 0],
        ], // Цвета будут изменены ниже
    });

    // Установка цвета автомобиля
    adminVeh.setColor(colorPrimary, colorSecondary);

    // Дополнительные настройки автомобиля
    adminVeh.setMod(53, 1); // Номерной знак

    // Максимальное улучшение двигателя
    adminVeh.setMod(11, 3); // Уровень улучшения двигателя (максимальный)

    // Турбонаддув
    adminVeh.setMod(18, 0); // Включение турбонаддува

    // Улучшение трансмиссии
    adminVeh.setMod(13, 2); // Уровень улучшения трансмиссии (максимальный)

    // Улучшение тормозов
    adminVeh.setMod(12, 2); // Уровень улучшения тормозов (максимальный)

    // Улучшение подвески
    adminVeh.setMod(15, 3); // Уровень улучшения подвески (максимальный)

    adminVeh.setMod(46, 2); // Тонировка (-1 to 2)

    adminVeh.numberPlate = " ADMIN "; // Установка текста номерного знака и типа (если API позволяет)

    // Сохранение нового транспортного средства в customData
    player.customData.vehicle = adminVeh;

    // Посадка игрока в автомобиль (на водительское место)
    setTimeout(() => {
        player.putIntoVehicle(adminVeh, 0);
    }, 150);

    // Уведомление игрока
    player.notify("~g~Заспавнено!");
});

//Команда удаления автомобиля которые я спавнил
mp.events.addCommand("delveh", (player, fullText, vehicleId) => {
    if (vehicleId) {
        // Преобразуем переданный ID в целое число
        let id = parseInt(vehicleId, 10);

        // Ищем автомобиль по указанному ID среди всех транспортных средств
        let vehicle = mp.vehicles.toArray().find((veh) => veh.id === id);

        if (vehicle) {
            // Удаление автомобиля
            vehicle.destroy();

            // Проверка, если удаляемый автомобиль соответствует тому, который хранится у игрока
            if (
                player.customData &&
                player.customData.vehicle &&
                player.customData.vehicle.id === id
            ) {
                player.customData.vehicle = null;
            }

            // Уведомление игрока
            player.notify(`~g~Автомобиль с ID ${id} был удален!`);
        } else {
            // Уведомление, если автомобиль не найден
            player.notify(`~r~Автомобиль с ID ${id} не найден!`);
        }
    } else {
        // Проверка, есть ли у игрока заспавненный автомобиль
        if (player.customData && player.customData.vehicle) {
            // Удаление автомобиля
            player.customData.vehicle.destroy();

            // Удаление ссылки на автомобиль
            player.customData.vehicle = null;

            // Уведомление игрока
            player.notify("~g~Ваш автомобиль был удален!");
        } else {
            // Уведомление, если автомобиль не найден
            player.notify("~r~У вас нет заспавненного автомобиля!");
        }
    }
});

// Удаление !!!ВСЕХ!!! машин
// mp.events.addCommand(`delvehall`, (player) => {
//     mp.vehicles.forEach((vehicle) => {
//         vehicle.destroy();
//     });
//     mp.players.broadcast(`${player.name} Удалил все машины!`);
//     player.notify("~r~Все машины удалены");
// });

// Команда для починки автомобиля
// Команда для починки автомобиля
mp.events.addCommand("fix", (player, _, vehicleId) => {
    let vehicle;

    // Если указан ID транспортного средства, находим машину по этому ID
    if (vehicleId) {
        vehicle = mp.vehicles.at(parseInt(vehicleId));

        if (!vehicle) {
            player.notify("~r~Машина с таким ID не найдена.");
            return;
        }
    } else {
        // Если ID не указан, проверяем, сидит ли игрок в транспортном средстве
        if (player.vehicle) {
            vehicle = player.vehicle;
        } else if (player.customData && player.customData.vehicle) {
            // Проверка наличия заспавненного игроком автомобиля
            vehicle = player.customData.vehicle;
        } else {
            // Уведомление, если игрок не в автомобиле и у него нет заспавненного автомобиля
            player.notify(
                "~r~Вы не находитесь в транспортном средстве и у вас нет заспавненного автомобиля."
            );
            return;
        }
    }

    // Починка найденного автомобиля
    if (vehicle) {
        vehicle.repair();
        player.notify("~g~Транспортное средство починено.");
    }
});

//Команда Set Turbo Tuning" автомобиля                         !!! НЕ РАБОТАЕТ !!!
mp.events.addCommand("stt", (player, _, powerCoefficient) => {
    // Проверка, указан ли коэффициент и является ли он числом
    if (!powerCoefficient || isNaN(powerCoefficient) || powerCoefficient <= 0) {
        // return player.notify("~r~Использование: /stt [коэффициент (больше 0)]");
        return player.notify("~r~!!! КОМАНДА ВРЕМЕННО НЕ РАБОТАЕТ !!!");
    }

    // // Преобразование коэффициента в число
    // powerCoefficient = parseFloat(powerCoefficient);

    // // Проверка, есть ли у игрока заспавненный автомобиль
    // if (player.customData && player.customData.vehicle) {
    //     let vehicle = player.customData.vehicle;

    //     // Установка максимальных модификаций
    //     let maxEngineMod = 3; // Максимум уровня для двигателя
    //     let maxTransmissionMod = 2; // Максимум уровня для трансмиссии
    //     let maxBrakesMod = 2; // Максимум уровня для тормозов
    //     let maxSuspensionMod = 3; // Максимум уровня для подвески
    //     let maxTurboMod = 0; // Турбонаддув включен

    //     // Установка максимальных модификаций на основе коэффициента
    //     vehicle.setMod(11, maxEngineMod); // Уровень улучшения двигателя (максимум)
    //     vehicle.setMod(13, maxTransmissionMod); // Уровень улучшения трансмиссии (максимум)
    //     vehicle.setMod(12, maxBrakesMod); // Уровень улучшения тормозов (максимум)
    //     vehicle.setMod(15, maxSuspensionMod); // Уровень улучшения подвески (максимум)
    //     vehicle.setMod(18, maxTurboMod); // Турбонаддув

    //     // Применение коэффициента к максимальной скорости
    //     // Например, если ваш сервер поддерживает изменение максимальной скорости таким образом:
    //     vehicle.setVariable("speedMultiplier", powerCoefficient / 100); // Этот метод нужно заменить в зависимости от API

    //     // Уведомление игрока
    //     player.notify(
    //         `~g~Мощность вашего автомобиля увеличена в ${powerCoefficient} раз!`
    //     );
    // } else {
    //     // Уведомление, если автомобиль не найден
    //     player.notify("~r~У вас нет заспавненного автомобиля!");
    // }
});

//Телепорт по координатам
mp.events.addCommand("tpcor", (player, _, x, y, z) => {
    if (x == undefined || y == undefined || z == undefined)
        return player.outputChatBox("/tpcor [x] [y] [z]");
    player.position = new mp.Vector3(
        parseFloat(x),
        parseFloat(y),
        parseFloat(z)
    );
    player.notify("~g~Телепортирован по координатам!");
});

//Телепортиртация игрока к себе
mp.events.addCommand("metp", (player, _, id) => {
    if (id == undefined) return player.outputChatBox("/metp [id]");
    let target = mp.players.at(id);
    if (target == null) return player.notify("~r~ID игрока не найден!");
    target.dimension = player.dimension;
    target.position = player.position;
    player.notify(`~g~ Вы телепортировали ~y~${target.id} ~g~ID`);
});

//Телепортироваться к игроку
mp.events.addCommand("tp", (player, _, id) => {
    if (id == undefined) return player.outputChatBox("/tp [id]");
    let target = mp.players.at(id);
    if (target == null) return player.notify("~r~ID игрока не найден!");
    player.dimension = target.dimension;
    player.position = target.position;
    player.notify(`~g~ Вы телепортировались к ~y~${target.id} ~g~ID`);
});

//Телепортировать машину к себе
mp.events.addCommand("tpveh", (player, fullText, vehicleId) => {
    if (!vehicleId) {
        player.outputChatBox("Использование: /tpveh [ID машины]");
        return;
    }

    // Попробуем найти транспортное средство по ID
    let vehicle = mp.vehicles.at(parseInt(vehicleId));
    if (!vehicle) {
        player.outputChatBox("~r~Машина с таким ID не найдена.");
        return;
    }

    // Получаем текущую позицию игрока
    let playerPos = player.position;

    // Телепортируем машину к игроку, немного смещая позицию по оси X, чтобы избежать коллизии
    vehicle.position = new mp.Vector3(
        playerPos.x + 2,
        playerPos.y,
        playerPos.z
    );
    vehicle.dimension = player.dimension; // Устанавливаем машину в ту же дименсию, что и игрок

    player.notify(`~g~Машина с ID ${vehicleId} телепортирована к вам.`);
});

// Проверка дименшина
mp.events.addCommand("dim", (player) => {
    player.notify(`Вы в ~r~${player.dimension} ~w~дименшине.`);
});

//Смена дименшина
mp.events.addCommand("setdim", (player, _, id, dim) => {
    if (id == undefined || dim == undefined)
        return player.outputChatBox("/setdim [id] [dim]");
    let target = mp.players.at(id);
    if (target == null) return player.notify("~r~ID игрока не найден!");
    target.dimension = parseInt(dim);
    player.notify(`~g~ Переход в~y~ ${target.dimension} ~g~дименшин`);
});

//Команда для вывода информации всем игрокам (Не протестировано)
mp.events.addCommand("gl", (player, fullText, args) => {
    if (args == undefined || args.length == 1) {
        return player.notify("~r~Введите глобальное сообщение '/gl [message]'");
    }
    mp.players.broadcast(`[A] ${player.name}: ${args}`);
});

console.log("[SERVER] Команды загружены!");
