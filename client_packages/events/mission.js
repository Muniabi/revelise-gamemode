let player = mp.players.local;
let controlledNpc = null;

mp.events.add('guiReady', () => {
    mp.events.addDataHandler({
        'command': (entity, value, oldValue) => {
            switch (value) {
                case 'enterVeh':
                    let veh = entity.getVariable("veh");
                    if (veh) {
                        entity.taskEnterVehicle(veh.handle, 10000, -1, 1, 1, 0);
                        entity.vehicle = veh;
                        controlledNpc = entity; // Запоминаем NPC, которым управляем
                    } else {
                        mp.gui.chat.push("ped: У меня нет машины в которую я мог бы сесть :(");
                    }
                    break;

                case 'goMe':
                    if (entity.vehicle) {
                        entity.taskVehiclePark(entity.vehicle.handle, player.position.x, player.position.y, player.position.z, 0, 0, 50, false);
                    } else {
                        entity.taskGoToCoordAnyMeans(player.position.x, player.position.y, player.position.z, 6, 0, false, 1, 0);
                    }
                    break;

                case 'goToPickup':
                    let pickupPosition = new mp.Vector3(-1168.778076171875, -2929.595703125, 13.944877624511719); // Укажите реальные координаты
                    if (entity.vehicle) {
                        entity.taskVehicleDriveToCoord(entity.vehicle.handle, pickupPosition.x, pickupPosition.y, pickupPosition.z, 15.0, 1, entity.vehicle.model, 786603, 1.0, true);
                    } else {
                        entity.taskGoToCoordAnyMeans(pickupPosition.x, pickupPosition.y, pickupPosition.z, 6, 0, false, 1, 0);
                    }
                    break;

                case 'goToDropOff':
                    let dropOffPosition = new mp.Vector3(-1018.7459106445312, -2707.720703125, -2707.720703125); // Укажите реальные координаты
                    if (entity.vehicle) {
                        entity.taskVehicleDriveToCoord(entity.vehicle.handle, dropOffPosition.x, dropOffPosition.y, dropOffPosition.z, 15.0, 1, entity.vehicle.model, 786603, 1.0, true);
                    } else {
                        mp.gui.chat.push("ped: Я не в машине, не могу отвезти вас.");
                    }
                    break;

                default:
                    mp.gui.chat.push("ped: Я не знаю команды " + value);
                    break;
            }
        }
    });

    mp.events.add('playerEnterVehicle', (vehicle, seat) => {
        if (controlledNpc && controlledNpc.vehicle && controlledNpc.vehicle.id === vehicle.id) {
            // Если NPC управляет этим автомобилем, проверяем место
            if (seat === -1 || seat === 0) {
                mp.gui.chat.push("Вы не можете сесть на переднее сиденье.");
                player.taskLeaveVehicle(vehicle.handle, 0);
            }
        }
    });
});


// Координаты точки посадки
// let pickupPosition = new mp.Vector3(-1168.778076171875, -2929.595703125, 13.944877624511719); // Укажите реальные координаты

// Координаты точки высадки
// let dropOffPosition = new mp.Vector3(-1018.7459106445312, -2707.720703125, -2707.720703125); // Укажите реальные координаты
