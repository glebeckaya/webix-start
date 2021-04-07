// header
const header = {
    type: "clean",
    view: "toolbar", 
    css: "webix_dark",
    padding: 10, 
    elements: [
        { view: "label", label: "My App" },
        {
            view: "button",
            type: "icon", 
            icon: "mdi mdi-account", 
            label: "Profile", 
            autowidth: true, 
            css: "webix_transparent"
        }
    ]
};

//main
const side = {
    type: "clean",
    css: "side-section",
    width: 200,
    minWidth: 130,
    rows: [
        {
            view: "list",
            autoheight: true,
            scroll: false,
            data: [ "Dashboard", "Users", "Products", "Locations" ]
        },
        { },
        { template: "<span class='webix_icon mdi mdi-check'></span>Connected", autoheight: true }
    ]
};

const base = {
  minWidth: 750,
  rows: [
    {
      view: "datatable",
      data: small_film_set,
      autoConfig: true
    }
  ]
}

const form = {
    type: "clean",
    rows: [
        {
            view: "form",
            width: 300,
            elements: [
                { template: "Edit films", type: "section"},
                { view: "text", label:"Title"},
                { view: "text", type: "number", label: "Year" },
                { view: "text", type: "number", label: "Rating" },
                { view: "text", type: "number", label: "Votes" },
                { margin: 5, cols: [
                    { view: "button", value: "Add new" , css: "webix_primary" },
                    { view: "button", value: "Clear" }
                ]}
            ]
        },
        { }
    ]
}

const main = {
    cols: [
        side,
        { view: "resizer" },
        base,
        form,
    ]
};

//footer
const footer = { 
    template: "The software is provided by <a href='https://webix.com' target='blank'>https://webix.com.</a> All rights reserved (c)", 
    autoheight: true, 
    css: "footer" 
}

webix.ui({
    rows: [ header, main, footer ]
});