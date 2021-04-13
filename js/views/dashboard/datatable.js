export default {
    minWidth: 750,
    rows: [
        {
            view: "tabbar", 
            id: "tabbar", 
            value: "allFilms",
            options: [
                { "id": "allFilms", "value": "All", width: 100 },
                { "id": "oldFilms", "value": "Old", width: 100 },
                { "id": "modernFilms", "value": "Modern", width: 100 },
                { "id": "newFilms", "value": "New", width: 100 },
            ],
            on: {
                onAfterTabClick(id,ev) {
                    $$("dataFilms").filterByAll();
                }
            }
        },
        {
            view: "datatable",
            id: "dataFilms",
            select: true,
            css: "cell-rank",
            hover: "row-highlight",
            columns: [
                { id: "rank", header: "", width: 50, sort: "int" },
                { id: "title", header: ["Film title", { content: "textFilter" }], sort:"string", fillspace: true },
                { id: "category", header: ["Category", { content: "selectFilter"}], options:[] },
                { id: "rating",	header: ["Rating", { content: "numberFilter" }], sort: "int" },
                { id: "votes", header: ["Votes", { content: "numberFilter" }], sort: "int" },
                { id: "year", header: "Year", sort: "int" },
                { id: "del", header: "Del", template: "{common.trashIcon()}", width: 50 },
            ],
            scroll: "y",
            autoConfig: true,
            url: "./js/data/data.js",
            onClick: {
                "wxi-trash"(e, id) {
                    removeFilm.call(this, id);
                    return false;
                }
            },
            scheme: {
                $init: function(obj) {
                    obj.category =  Math.floor(1 + Math.random() * 4);
                    obj.rating = obj.rating.replace(/\,/g, ".");
                    obj.votes = obj.votes.replace(/\,/g, ".");
                }
            }, 
        }
    ]
}

function removeFilm(id) {
    webix.confirm({
        text: `Do you really want to delete movie "${this.data.pull[id].title}"?`
    }).then(
        () => this.remove(id)
    );
}