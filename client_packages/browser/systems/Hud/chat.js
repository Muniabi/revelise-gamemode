// Директива Vue для автоматической фокусировки на элементе input
Vue.directive("focus", {
    inserted: function (el) {
        el.focus();
    },
    update: function (el, binding) {
        var value = binding.value;
        if (value) {
            Vue.nextTick(function () {
                el.focus();
            });
        }
    },
});

// Основной компонент Vue для управления чатом
var Chat = new Vue({
    el: "#HUD_chat", // Привязываем Vue к элементу с ID #HUD_chat
    data: {
        active: true, // Состояние видимости чата (по умолчанию активен)
        message: "", // Текущее сообщение, вводимое пользователем
        messages: [], // Список сообщений чата
        historyMessages: [], // История введенных сообщений для поддержки навигации
        historyCount: 0, // Индекс текущего сообщения в истории
        open: false, // Состояние открытия чата (по умолчанию закрыт)
        border_color1: "2px solid #2C80EF", // Цвет границы для обычного чата
        border_color2: "0", // Цвет границы для реального чата
        border_color3: "0", // Цвет границы для ролевого чата
        border_color4: "0", // Цвет границы для рации
    },
    mounted() {
        var $this = this; // Сохраняем контекст Vue

        // Обработчик нажатий клавиш для навигации по истории сообщений
        $(document).keyup(function (key) {
            if ($this.open) {
                if (key.keyCode === 38) {
                    // Стрелка вверх
                    if ($this.historyCount > 0) {
                        $this.message =
                            $this.historyMessages[--$this.historyCount];
                    }
                } else if (key.keyCode === 40) {
                    // Стрелка вниз
                    if ($this.historyCount < $this.historyMessages.length) {
                        $this.message =
                            $this.historyMessages[++$this.historyCount] || "";
                    }
                }
            }
        });

        // Обработчик нажатий клавиш для открытия и закрытия чата
        $(document).keydown(function (key) {
            if (key.key === "T" && !$this.open) {
                // Открытие чата при нажатии "T"
                $this.open = true;
                mp.trigger("HUD_freezePlayer::CLIENT", true); // Замораживаем игрока
            } else if (key.key === "Escape" && $this.open) {
                // Закрытие чата при нажатии "Escape"
                $this.closeChat();
            }
        });
    },
    methods: {
        // Метод для закрытия чата и очищения поля ввода
        closeChat() {
            this.open = false; // Закрываем чат
            this.message = ""; // Очищаем сообщение
            mp.trigger("HUD_freezePlayer::CLIENT", false); // Размораживаем игрока
        },
        // Метод для отправки сообщения
        sendMessage() {
            var message = this.message;
            // Проверяем, что сообщение соответствует допустимым символам
            if (
                /^[а-яА-ЯёЁa-zA-Z0-9/\,.:)(-*^$#@!<>+-=?_ ]+$/.test(message) &&
                /[а-яА-ЯёЁa-zA-Z0-9/\,.:)(-*^$#@!<>+-=?_]/.test(message)
            ) {
                if (message[0] == "/") {
                    // Если сообщение начинается с "/", это команда
                    mp.invoke("command", message.slice(1)); // Отправляем команду
                } else {
                    // Отправляем сообщение в чат и очищаем поле ввода
                    mp.trigger(
                        "Hud_sendMessage::CEF",
                        message.replace(/<\/?[^>]+>/g, "")
                    );
                }
                this.historyMessages.push(message); // Добавляем сообщение в историю
            }
            this.closeChat(); // Закрываем чат после отправки
        },
        // Метод для обработки и форматирования сообщений с цветом
        acceptMessage(message) {
            var newMessage = "";
            for (let i = 0; i < message.length; i++) {
                var colorCheck = `${message[i]}${message[i + 1]}`;

                if (colorCheck === "!{") {
                    // Начало цвета
                    var sub = message.slice(i + 2, -1);
                    var color = "";
                    for (val of sub) {
                        if (val == "}") break;
                        else color += val;
                    }
                    i += 2 + color.length;
                    newMessage += `<span style='color: ${color}'>`; // Открываем тег с цветом
                } else if (colorCheck === "}!") {
                    // Конец цвета
                    newMessage += "</span>"; // Закрываем тег с цветом
                } else {
                    newMessage += message[i]; // Добавляем обычные символы
                }
            }
            this.messages.push(newMessage); // Добавляем новое сообщение в список сообщений
            this.messages.push(message); // Добавляем сообщение в список сообщений
        },
    },
    watch: {
        // Следим за изменениями в истории сообщений
        historyMessages() {
            this.historyCount = this.historyMessages.length; // Обновляем количество сообщений в истории
        },
        // Следим за изменениями в списке сообщений
        messages() {
            setTimeout(() => {
                // Автоматическая прокрутка чата вниз при добавлении новых сообщений
                $(".messages").scrollTop($(".messages")[0].scrollHeight);
            }, 10);
        },
    },
});

// Подключаемся к событиям, если есть интеграция с alt:V
if ("alt" in window) {
    alt.on("HUD_showHideChat::CEF", (bool) => {
        Chat.active = bool;
        Chat.message = "";
    });
    alt.on("HUD_openChat::CEF", (bool) => {
        Chat.open = bool;
    });
    alt.on("Chat_sendMessage::CEF", (text) => {
        Chat.acceptMessage(text);
    });
    alt.on("Hud_addString::CEF", (text) => {
        Chat.acceptMessage(text);
    });
}
