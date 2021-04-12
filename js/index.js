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
            age:['age', getAverage]
        }
    });
});

$$("dataFilms").registerFilter(
    $$("tabbar"), 
    { columnId: "year", compare: function(value, filter, item){
        const year = value;
        if (filter == "allFilms") return year;
        if (filter == "oldFilms") return year <= 1950;
        if (filter == "modernFilms") return year > 1950 && year <= 1980;
        if (filter == "newFilms") return year > 1980;
    }},
    { 
        getValue(node) {
            return node.getValue();
        },
    //   setValue:function(node, value){
    //     node.setValue(value);
    //   }
    }
);

function getAverage(prop, data){
    if (!data.length) return 0;
    let summ = data.length;
    return summ;
}