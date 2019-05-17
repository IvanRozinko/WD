const ATM = {
    isAuth: false, 
    currentUser: {},
    // all cash available in ATM
    cash: 2000,
    // all available users
    users: [
        { id: "0000", pin: "000", debet: 0, type: "admin" }, // EXTENDED
        { id: "0025", pin: "123", debet: 675, type: "user" }
    ],
    log: [],

    // authorization
    auth(id, pin) {
        const user = this.users.find((elem) => (elem.id === id && elem.pin === pin));
        if (user === undefined) {
            this.errorMessage(0);
            return;
        }
        this.currentUser = user;
        this.isAuth = true;
        console.log("Welcome to ATM");
        this.log.push(user.id + " authorized");
    },
    // check current debet
    check() {
        if (!this.isAuth) {
            this.errorMessage(1);
            return;
        }
        const user = this.currentUser;
        console.log("Amount on your account " + user.debet);
        this.log.push("Checking account " + user.id);
    },
    // get cash - available for user only
    getCash(amount) {
        if (!this.isAuthorized("user")){
          return;
        }
        const user = this.currentUser;
        if (this.currentUser.debet <= amount || this.cash <= amount) {
            console.log("Not enough money, try another sum");
            this.log.push("Trying overdraft withdraw by user " + user.id + " amount " + amount);
            return;
        }
        const userFromList = this.findUserFromList(this.currentUser);
        userFromList.debet -= amount;
        this.cash -= amount;
        console.log("Withdrawing money amount, get your money!!!");
        this.log.push("Withdrawing money by user " + user.id + " amount " + amount);

    },
    // load cash - available for user only
    loadCash(amount) {
        if (!this.isAuthorized("user")){
            return;
        }
        const user = this.findUserFromList(this.currentUser);
        user.debet += amount;
        this.cash += amount;
        console.log("Cash loaded " + amount);
        this.log.push("Loaded cash amount " + amount + " by " + user.id);

    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if (!this.isAuthorized("admin")){
            return;
        }
        this.cash += amount;
        console.log("ATM loaded " + amount);
        this.log.push("ATM loaded with " + amount);
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        if (!this.isAuthorized("admin")){
            return;
        }
        this.log.forEach(function (message) { console.log(message); });
    },
    // log out
    logout() {
        if (!this.isAuth) {
            this.errorMessage(1);
            return;
        }
        this.log.push("Log out user " + this.currentUser.id);
        this.isAuth = false;
        this.currentUser = {};
        console.log("Good bye");
    },
    // displaying console message for user and logging events
    errorMessage(msg) {
        if (msg === 0) {
            console.log("Authorization failed");
            this.log.push("Authorization failed");
        } else if (msg === 1){
            console.log("Please log in first");
            this.log.push("Unauthorized access attempt");
        } else if (msg === 2){
            console.log("Operation not supported for your type of user");
            this.log.push("Unsupported operation");
        }
    },
    // searching user in array of users
    findUserFromList(user) {
       return this.users.find((userFromList) => (user.id === userFromList.id && user.pin === userFromList.pin));
    },
    // checking is user authorized
    isAuthorized(userType) {
        if (!this.isAuth) {
            this.errorMessage(1);
            return false;
        }
        if (this.currentUser.type !== userType){
            this.errorMessage(2);
            return false;
        }
        return true;
    }
};


