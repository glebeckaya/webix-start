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
                { view: "button", value: "Sort desc", autowidth: true, css: "webix_primary", click: sortDesc }
            ]
        },
        {
            view: "list",
            id: "listUsers",
            select: true,
            css: "users-list",
            url: "./js/data/users.js",
            header: "textFilter" ,
            template: "#name# from #country# <div class='webix_icon wxi-close'></div>",
            scroll: "y",
            onClick: {
                "wxi-close"(e, id) {
                    removeUser.call(this, id);
                    return false;
                }
            }
        }
    ]
}

function removeUser(id) {
    webix.confirm({
        text: `Do you really want to delete user "${this.data.pull[id].name}"?`
    }).then(
        () => {
            this.remove(id);
        }
    );
}

function sortAsc() {
    $$("listUsers").sort("#name#", "asc");
    $$("chartUsers").sort("#name#", "asc");
}

function sortDesc() {
    $$("listUsers").sort("#name#", "desc");
    $$("chartUsers").sort("#name#", "desc");
}

function filterList() {
    const value = this.getValue().toLowerCase();
    $$("listUsers").filter(function(obj){
        return obj.name.toLowerCase().indexOf(value) !== -1;
    })
}