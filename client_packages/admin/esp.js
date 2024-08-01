let espEnabled = false;

mp.events.add("render", () => {
    const isRenderEnabled =
        mp.players.local.getVariable("render_info_cars") || false;

    if (isRenderEnabled && !espEnabled) {
        espEnabled = true;
        mp.game.graphics.notify("~g~ESP включен.");
    } else if (!isRenderEnabled && espEnabled) {
        espEnabled = false;
        mp.game.graphics.notify("~r~ESP выключен.");
    }

    if (isRenderEnabled) {
        mp.vehicles.forEachInStreamRange((veh) => {
            var playerPos = mp.players.local.position;
            var vehDist = mp.game.gameplay.getDistanceBetweenCoords(
                playerPos.x,
                playerPos.y,
                playerPos.z,
                veh.position.x,
                veh.position.y,
                veh.position.z,
                true
            );
            if (vehDist > 150) return; // если дистанция > 15 то он не будет рендерить
            mp.game.graphics.drawText(
                `ID ${
                    veh.id
                } - MODEL: ${mp.game.vehicle.getDisplayNameFromVehicleModel(
                    veh.getModel()
                )}\nX: ${veh.position.x.toFixed(3)} Y: ${veh.position.y.toFixed(
                    3
                )} Z: ${veh.position.z.toFixed(3)}`,
                [veh.position.x, veh.position.y, veh.position.z],
                {
                    font: 4,
                    color: [255, 255, 255, 185],
                    scale: [0.5, 0.5],
                }
            );
        });
    }
});

let playerEspEnabled = false;

mp.events.add("render", () => {
    const isPlayerRenderEnabled =
        mp.players.local.getVariable("render_info_players") || false;

    if (isPlayerRenderEnabled && !playerEspEnabled) {
        playerEspEnabled = true;
        mp.game.graphics.notify("~g~ESP для игроков включен.");
    } else if (!isPlayerRenderEnabled && playerEspEnabled) {
        playerEspEnabled = false;
        mp.game.graphics.notify("~r~ESP для игроков отключен.");
    }

    if (isPlayerRenderEnabled) {
        mp.players.forEachInStreamRange((player) => {
            if (player === mp.players.local) return; // Не рендерить информацию о себе

            var playerPos = mp.players.local.position;
            var targetPos = player.position;
            var playerDist = mp.game.gameplay.getDistanceBetweenCoords(
                playerPos.x,
                playerPos.y,
                playerPos.z,
                targetPos.x,
                targetPos.y,
                targetPos.z,
                true
            );

            if (playerDist > 150) return; // Если дистанция > 150, не рендерить

            mp.game.graphics.drawText(
                `ID ${player.remoteId}\nИмя: ${player.name}\nЗдоровье: ${player.health}\nБроня: ${player.armour}`,
                [targetPos.x, targetPos.y, targetPos.z],
                {
                    font: 4,
                    color: [255, 255, 255, 185],
                    scale: [0.5, 0.5],
                    outline: true,
                }
            );
        });
    }
});
