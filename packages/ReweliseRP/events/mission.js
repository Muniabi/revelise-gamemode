mp.events.addCommand({
    spawnPed: (player) => {
        if (player.myPed) player.myPed.destroy(); // Удаляем существующего NPC, если есть
        player.myPed = mp.peds.new(
            mp.joaat("csb_burgerdrug"),
            new mp.Vector3(
                player.position.x + 1,
                player.position.y,
                player.position.z
            ),
            {
                dynamic: true,
                invincible: true, // NPC бессмертный
            }
        );
        player.myPed.controller = player; // Устанавливаем контроллером игрока
    },
    spawnVeh: (player) => {
        if (player.myVeh) player.myVeh.destroy(); // Удаляем существующий автомобиль, если есть
        player.myVeh = mp.vehicles.new(
            mp.joaat("audia6"),
            new mp.Vector3(
                player.position.x + 3,
                player.position.y,
                player.position.z
            ),
            {
                numberPlate: "RAGEMP",
                color: [
                    [0, 0, 0],
                    [0, 0, 0],
                ],
                alpha: 255,
                locked: false,
                dimension: player.dimension,
            }
        );
        if (player.myPed) player.myPed.data.veh = player.myVeh; // Привязываем машину к NPC
    },
    ped: (player, command) => {
        player.myPed.data.command = command; // Отправляем команду NPC
    },
    startMission: (player) => {
        // Спавним NPC и транспортное средство
        mp.events.call("spawnPed", player);
        mp.events.call("spawnVeh", player);

        // Ставим метку для начала движения NPC
        player.myPed.data.command = "goToPickup";
    },
});
