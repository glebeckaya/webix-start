const popupProfile = webix.ui({
    view: "popup",
    head: false,
    body: {
        view: "list",
        autoheight: true,
        data: [ "Settings", "Log out" ],
        select: true,
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
            popup: popupProfile,
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
      id: "dataFilms",
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
            id: "editFilmsForm",
            width: 300,
            elements: [
                { template: "Edit films", type: "section" },
                { view: "text", label: "Title", name: "title", invalidMessage: "This field is required", bottomPadding: 20 },
                { view: "text", type: "number", label: "Year", name: "year", invalidMessage: "Enter year between 1970 and 2021", bottomPadding: 25 },
                { view: "text", type: "number", label: "Rating", name: "rating", invalidMessage: "This field is required and can`t be 0", bottomPadding: 25 },
                { view: "text", type: "number", label: "Votes", name: "votes", bottomPadding: 25 },
                { margin: 5, cols: [
                    { 
                        view: "button", 
                        value: "Add new" , 
                        css: "webix_primary", 
                        click() {
                            if (this.getFormView().validate()) {
                                let values = this.getFormView().getValues();
                                for(let item in values) {
                                    values[item] = values[item].replace(/[<>]/g, " ");
                                }
                                $$("dataFilms").add(values);
                                webix.message("Validation is successful!");
                                this.getFormView().clear();
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
                                    console.log(this)
                                    $$("editFilmsForm").clear();
                                    $$("editFilmsForm").clearValidation();
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
                rating: value => webix.rules.isNotEmpty && value != 0,
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