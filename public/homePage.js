'use strict'

// ## Logout
const logonButton = new LogoutButton();
logonButton.action = function () {
    ApiConnector.logout((serverAnswer) => {
        if (serverAnswer.success) {
            location.reload();
        }
    });
}   //  logonButton.action


// ## User info
ApiConnector.current((serverAnswer) => {
    if (serverAnswer.success) {
        ProfileWidget.showProfile(serverAnswer.data);
    }
});


// ## Rates
const ratesBoard = new RatesBoard();

const getRates = function () {
    ApiConnector.getStocks((serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(serverAnswer.data);
        }
    });
}   //  const getRates function

getRates();
setInterval(getRates, 60000);


//  ## Money
const moneyManager = new MoneyManager();

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
}   //  moneyManager.addMoneyCallback


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
}   //  moneyManager.conversionMoneyCallback


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
}   //  moneyManager.sendMoneyCallback


// ## Favorites
const favoritesWidget = new FavoritesWidget();

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


favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(serverAnswer.data);
            moneyManager.updateUsersList(serverAnswer.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно добавлен в адресную книгу.');
        } else {
            favoritesWidget.setMessage(false, 'Добавить в адресуню книгу не удалось:\n' + serverAnswer.error);
        }
    });
}   //  favoritesWidget.addUserCallback


favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, (serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(serverAnswer.data);
            moneyManager.updateUsersList(serverAnswer.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно удален из адресной книги.');
        } else {
            favoritesWidget.setMessage(false, 'Удалить не удалось:\n' + serverAnswer.error);
        }
    });
}   //  favoritesWidget.removeUserCallback
