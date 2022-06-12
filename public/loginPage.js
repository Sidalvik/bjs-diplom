'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = function (data) {
        ApiConnector.login(data,(serverAnswer) => {
            // debugger;
            if (serverAnswer.success) {
                // successful login - reload page
                location.reload();
            } else {
                // unsuccessful login - show error message
                this.setLoginErrorMessage(serverAnswer.error);
            }
        });
}   //  userForm.loginFormCallback

userForm.registerFormCallback = function (data) {
    ApiConnector.register(data,(serverAnswer) => {
        // debugger;
        if (serverAnswer.success) {
            // successful registering - reload page
            location.reload();
        } else {
            // unsuccessful registering - show error message
            this.setRegisterErrorMessage(serverAnswer.error);
        }
    });
}   //  userForm.registerFormCallback
