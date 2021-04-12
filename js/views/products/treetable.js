export default {
    view: "treetable",
    openAll: true,
    scroll: "y",
    columns:[
        { id: "id", header: "", width: 50 },
        { id: "title", header: "Title", template:"{common.treetable()} #title#", fillspace: true },
        { id: "price", header: "Price"}
    ],
    select: true,
    url: "./js/data/products.js",
    on: {
        onAfterLoad() { this.openAll() },
    }
}