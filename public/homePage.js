'use strict'

// ## Выход из личного кабинета
const logonButton = new LogoutButton();
logonButton.action = function () {
    ApiConnector.logout((serverAnswer) => {
        if (serverAnswer.success) {
            location.reload();
        }
    });
}


// ## Получение информации о пользователе
ApiConnector.current((serverAnswer) => {
    if (serverAnswer.success) {
        ProfileWidget.showProfile(serverAnswer.data);
    }
});


// ## Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

const getRates = function () {
    ApiConnector.getStocks((serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            // alert('Курсы получены успешно');
            ratesBoard.clearTable();
            ratesBoard.fillTable(serverAnswer.data);
        }
    });
}

getRates();
setInterval(getRates, 60000);

// ## Операции с деньгами
// 1. Создайте объект типа `MoneyManager`
const moneyManager = new MoneyManager();

// 2. Реализуйте пополнение баланса
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            ProfileWidget.showProfile(serverAnswer.data);
            moneyManager.setMessage(true, 'Пополнение прошло успешно!');
        } else {
            moneyManager.setMessage(false, 'Пополнение не удалось:\n' + serverAnswer.error);
        }
    });
}


// 3. Реализуйте конвертирование валюты:
moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            ProfileWidget.showProfile(serverAnswer.data);
            moneyManager.setMessage(true, 'Конвертация прошла успешно!');
        } else {
            moneyManager.setMessage(false, 'Конвертация не удалась:\n' + serverAnswer.error);
        }
    });
}


// 4. Реализуйте перевод валюты:
moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            ProfileWidget.showProfile(serverAnswer.data);
            moneyManager.setMessage(true, 'Перевод успешно завершен!');
        } else {
            moneyManager.setMessage(false, 'Перевод не удался:\n' + serverAnswer.error);
        }
    });
}


// ## Работа с избранным
// 1. Создайте объект типа `FavoritesWidget`
const favoritesWidget = new FavoritesWidget();

// 2. Запросите начальный список избранного:
//     1. Выполните запрос на получение списка избранного (`getFavorites`).
//     2. В колбеке запроса проверяйте успешность запроса.
//     3. При успешном запросе очистите текущий список избранного (`clearTable`).
//     4. Отрисуйте полученные данные (`fillTable`).
//     5. Заполните выпадающий список для перевода денег (`updateUsersList`).
ApiConnector.getFavorites((serverAnswer) => {
    // debugger;
    if (serverAnswer.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(serverAnswer.data);
        moneyManager.updateUsersList(serverAnswer.data);
    } else {
        favoritesWidget.setMessage(false, 'Список адресной книги получить не удалось:\n' + serverAnswer.error);
    }
});

// 3. Реализуйте добавления пользователя в список избранных:
//     1. Запишите в свойство `addUserCallback` функцию, которая будет выполнять запрос.
//     2. Внутри функции выполните запрос на добавление пользователя (`addUserToFavorites`).
//     3. Используйте аргумент функции свойства `addUserCallback` для передачи данных пользователя в запрос.
//     4. После выполнения запроса выполните проверку успешности запроса.
//     5. В случае успеха запроса выполните пункты 2.3-2.5
//     6. Также выведите сообщение об успехе или *ошибку* (причину неудачного действия) добавлении пользователя в окне отображения сообщения (`setMessage`).
favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(serverAnswer.data);
            moneyManager.updateUsersList(serverAnswer.data);
            favoritesWidget.setMessage(true, 'Адресная книга обновлена.');
        } else {
            favoritesWidget.setMessage(false, 'Список адресной книги получить не удалось:\n' + serverAnswer.error);
        }
    });
};


// 4. Реализуйте удаление пользователя из избранного
//     1. Запишите в свойство `removeUserCallback` функцию, которая будет выполнять запрос.
//     2. Внутри функции выполните запрос на удаление пользователя (`removeUserFromFavorites`).
//     3. Используйте аргумент функции свойства `removeUserCallback` для передачи данных пользователя в запрос.
//     4. После запроса выполните пункты 3.4-3.6
