import header from "./components/header/header.js";
import side from "./components/sidebar/side.js";
import main from "./components/content/content.js";
import footer from "./components/footer/footer.js";

webix.ui({
    rows: [
        header, 
        {cols:[side, {view:"resizer"}, main]}, 
        footer 
    ]
});

$$("editFilmsForm").bind($$("dataFilms"));

$$("chartUsers").sync($$("listUsers"), function() {
    this.group({ 
        by: "country",
        map: {
            age:['age', 'count']
        }
    });
});

$$("dataFilms").registerFilter(
    $$("tabbar"), 
    { columnId: "year", compare: function(value, filter){
        if (filter == "allFilms") return value;
        if (filter == "oldFilms") return value <= 1950;
        if (filter == "modernFilms") return value > 1950 && value <= 1980;
        if (filter == "newFilms") return value > 1980;
    }},
    { 
        getValue(node) {
            return node.getValue();
        },
    }
);