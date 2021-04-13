export default {
    view: "treetable",
    openAll: true,
    scroll: "y",
    columns:[
        { id: "id", header: "", width: 50 },
        { id: "title", header: "Title", template:"{common.treetable()} #title#", fillspace: true, editor: "text" },
        { id: "price", header: "Price", editor: "text" }
    ],
    editable:true,
    url: "./js/data/products.js",
    on: {
        onAfterLoad() { this.openAll() },
        onBeforeEditStop(state, editor, ignore) {
            const check = ( editor.getValue() != "" );
            if (!ignore && !check){
                if (editor.column == "title") webix.message("Title must not be empty");
                if (editor.column == "price") webix.message("Price must not be empty");
                return false;
            }
        }
    }
}