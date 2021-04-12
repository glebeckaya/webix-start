export default {
    minWidth: 750,
    rows: [
        {
            view: "datatable",
            id: "dataFilms",
            select: true,
            css: "cell-rank",
            hover: "row-highlight",
            columns: [
                { id: "rank", header: "", width: 50, sort: "int" },
                { id: "title", header: ["Film title", { content: "textFilter" }], sort:"string", fillspace: true },
                { id: "year",	header: ["Released", { content: "numberFilter" }], sort:"int"},
                { id: "votes",	header: ["Votes", { content: "numberFilter" }], sort: "int"},
                { id: "rating",	header: ["Rating", { content: "numberFilter" }], sort: "int"},
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
            on: {
                onAfterSelect(id) {
                    const values = this.getItem(id);
                    $$("editFilmsForm").setValues(values)
                },
            }
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