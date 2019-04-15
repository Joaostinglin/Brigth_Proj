class User {
   
    constructor(userFirstName, userLastName, userLogin, userPass, userRole) {
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userLogin = userLogin;
        this.userPass = userPass;
        this.userRole = userRole;
    }
}

module.exports = User;