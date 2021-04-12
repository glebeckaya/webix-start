export default {
    rows: [
        {   padding: 5,
            cols: [
                { view: "text", id: "inputUsers" },
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
            },
            on: {
                onAfterLoad() {
                    highlightItems();
                    $$("inputUsers").attachEvent("onTimedKeyPress", filterList);
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
            highlightItems();
        }
    );
}

function sortAsc() {
    $$("listUsers").sort("#name#", "asc");
    $$("chartUsers").sort("#name#", "asc");
    highlightItems();
}

function sortDesc() {
    $$("listUsers").sort("#name#", "desc");
    $$("chartUsers").sort("#name#", "desc");
    highlightItems();
}

function filterList() {
    const value = this.getValue().toLowerCase();
    $$("listUsers").filter(function(obj){
        return obj.name.toLowerCase().indexOf(value) !== -1;
    })
    highlightItems();
}

function highlightItems() {
    const list = $$("listUsers");
    list.clearCss("row-highlight", true);
    for (let index = 0; index < list.data.order.length; index++) {
        let res = list.find(function(obj){
            return obj.id == index;
        });
        if(res.length !== 0) list.data.pull[`${res[0].id}`].$css = "";
    }
    let firstElements = list.data.order.slice(0, 5);
    firstElements.forEach( item => list.data.pull[`${item}`].$css = "row-highlight");
    list.refresh();
}