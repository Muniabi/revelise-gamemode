mp.events.add("teleportToWaypoint", (player, x, y, z) => {
    // Проверяем, получены ли корректные координаты
    if (
        typeof x === "number" &&
        typeof y === "number" &&
        typeof z === "number"
    ) {
        player.position = new mp.Vector3(x, y, z + 1); // +1 к Z, чтобы избежать попадания под текстуры
        player.notify("~g~Вы телепортированы на метку.");
    } else {
        player.notify("~r~Неверные координаты для телепортации.");
    }
});
