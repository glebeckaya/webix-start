const popupProfile = webix.ui({
    view: "window",
    // top: 59,
    // right: 0,
    head: false,
    body: {
        view: "list",
        autoheight: true,
        data: [ "Settings", "Log out" ]
    }
});

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
            css: "webix_transparent",
            click: function() {
                (popupProfile.getNode().style.display === "block") ? popupProfile.hide() : popupProfile.show(this.getNode());
            }
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
      scroll: "y",
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
                { template: "Edit films", type: "section" },
                { view: "text", label: "Title", name: "title" },
                { view: "text", type: "number", label: "Year", name: "year" },
                { view: "text", type: "number", label: "Rating", name: "rating" },
                { view: "text", type: "number", label: "Votes", name: "votes" },
                { margin: 5, cols: [
                    { 
                        view: "button", 
                        value: "Add new" , 
                        css: "webix_primary", 
                        click: function() {
                            if ($$("$form1").validate()) {
                                let values = $$("$form1").getValues();
                                $$("$datatable1").add(values);
                                webix.message("Validation is successful!");
                                $$("$form1").clear();
                            } else {
                                webix.message("Please fill out all fields correctly!");
                            }
                        }
                    },
                    { 
                        view: "button", 
                        value: "Clear",
                        click: function() {
                            webix.confirm({
                                text: "Form data will be cleared"
                            }).then(
                                function(){
                                    $$("$form1").clear();
                                    $$("$form1").clearValidation();
                                }
                            );
                        }
                    }
                ]}
            ],
            rules: {
                title: webix.rules.isNotEmpty,
                year: function(value) {
                    let currentDate = new Date();
                    return (value > 1970 && value <= currentDate.getFullYear());
                },
                rating: webix.rules.isNotEmpty && function(value) {
                    return (value != 0) ;
                },
                votes: function(value) {
                    return value < 100000;
                }
            }
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