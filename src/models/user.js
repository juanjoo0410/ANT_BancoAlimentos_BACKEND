class User {
    constructor(id_user, name, usercode, password, status){
        this.id_user = id_user;
        this.name = name;
        this.usercode = usercode;
        this.password = password;
        this.status = status;
    }
}

module.exports = User;