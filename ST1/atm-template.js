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
        this.users.forEach(  (user) => {
            if (user.id === id && user.pin === pin) {
                this.currentUser = user;
                this.isAuth = true;
                console.log("Welcome to ATM");
                this.log.push(user.id + " authorized");
            }
        });
        if (this.currentUser === {}) {
            console.log("Authorization failed");
            this.log.push("Authorization failed");
        }


    },
    // check current debet
    check() {
        if (this.isAuth) {
            const user = this.currentUser;
            console.log(user.debet);
            this.log.push("Checking debet " + user.id);
        }
    },
    // get cash - available for user only
    getCash(amount) {
        if (this.isAuth && this.currentUser.type === "user") {
            const user = this.currentUser;
            if (user.debet >= amount && this.cash >= amount) {
                this.users.forEach((userFromList) =>  {
                    if (user.id === userFromList.id && user.pin === userFromList.pin) {
                        userFromList.debet -= amount;
                        this.cash -= amount;
                    }
                });
                console.log("Withdrawing money amount, get your money!!!");
                this.log.push("Withdrawing money by user " + user.id + " amount " + amount);
            }
            else {
                console.log("Not enough money, try another sum");
                this.log.push("Trying withdraw money by user " + user.id + " amount " + amount);
            }
        }
    },
    // load cash - available for user only
    loadCash(amount) {
        if (this.isAuth && this.currentUser.type === "user") {
            const user = this.currentUser;
            this.users.forEach((userFromList) =>  {
                if (user.id === userFromList.id && user.pin === userFromList.pin) {
                    userFromList.debet += amount;
                    this.cash += amount;
                    this.log.push("Loaded cash amount " + amount + " by " + userFromList.id);
                }
            });
        }
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if (this.isAuth && this.currentUser.type === "admin") {
            this.cash += amount;
            this.log.push("ATM loaded with " + amount);
        }
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        this.log.forEach( function (message) {
            console.log(message);
        })
 
    },
    // log out
    logout() {
        this.log.push("Log out user " + this.currentUser.id);
        this.currentUser = {};
        console.log("Good bye");
    }
};


