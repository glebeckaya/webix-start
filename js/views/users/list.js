export default {
    rows: [
        {   padding: 5,
            cols: [
                { 
                    view: "text", 
                    id: "inputUsers",
                    on: { onTimedKeyPress: filterList }
                },
                { view: "button", value: "Sort asc", autowidth: true, css: "webix_primary", click: sortAsc },
                { view: "button", value: "Sort desc", autowidth: true, css: "webix_primary", click: sortDesc },
                { view: "button", value: "Add new", autowidth: true, css: "webix_primary", click: addNewUser }
            ]
        },
        {
            view: "editlist",
            id: "listUsers",
            editable: true,
            editor: "text",
            editValue: "name",
            css: "users-list",
            url: "./js/data/users.js",
            template: "#name#, #age# from #country# <div class='webix_icon wxi-close'></div>",
            scroll: "y",
            onClick: {
                "wxi-close"(e, id) {
                    removeUser.call(this, id);
                    return false;
                }
            },
            on: {
                onBeforeEditStop(state, editor) {
                    if (state.value == "") {
                        webix.message("Name must not be empty");
                        return false;
                    }
                }
            },
            scheme: {
                $init: (obj) => {
                    if (obj.age < 26) obj.$css = "row-highlight";
                }
            }
        }
    ]
}

webix.protoUI({
    name: "editlist"
}, webix.EditAbility, webix.ui.list);

function removeUser(id) {
    webix.confirm({
        text: `Do you really want to delete user "${this.data.pull[id].name}"?`
    }).then(
        () => this.remove(id)
    );
}

function sortAsc() {
    $$("listUsers").sort("#name#", "asc");
}

function sortDesc() {
    $$("listUsers").sort("#name#", "desc");
}

function filterList() {
    const value = $$("inputUsers").getValue().toLowerCase();
    $$("listUsers").filter(function(obj){
        return obj.name.toLowerCase().indexOf(value) !== -1;
    })
}

function addNewUser() {
    const inputValue = $$("inputUsers").getValue()
    if (!inputValue) return;
    const list = $$("listUsers");
    const listLength = Object.keys(list.data.pull).length;
    const newUser = createNewUser(inputValue, listLength);
    list.add(newUser);
    webix.message("new user added successfully!");
    $$("inputUsers").setValue("");
    filterList();
}

function createNewUser(name, usersAmount) {
    const user = {};
    user.name = name;
    user.age = Math.floor(20 + Math.random() * (60 - 20));
    let idRandomUser = (Math.floor(1 + Math.random() * (usersAmount - 1)));
    user.country = $$("listUsers").getItem(idRandomUser).country;
    return user;
}