"use strict";
const userInfo = {
    name: "JOhnnyOhms",
    id: 25,
    result: (name) => {
        console.log(name);
    }
};
class USerNames {
    constructor(name, id, data) {
        this.name = name;
        this.id = id;
        this.data = data;
    }
}
const userNames = new USerNames("JohnnyOhms", 247, userInfo);
console.log(userNames);
//# sourceMappingURL=classes.js.map