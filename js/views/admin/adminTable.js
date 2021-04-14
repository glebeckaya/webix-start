import {showConfirmMessage} from "../../utils/confirmMassage.js";
const categories = new webix.DataCollection({
    url: "./js/data/categories.js"
});
const admin = {
    minWidth: 750,
    rows: [
        {
            view: "toolbar",
            cols: [
                {
                    view: "button", 
                    value: "Add new category", 
                    css: "webix_primary",
                    click: addNewCategory, 
                }
            ]
        }, 
        {
            view: "datatable",
            id: "dataCategories",
            data: categories,
            select: true,
            hover: "row-highlight",
            columns: [
                { id: "value", header: "Category", fillspace: true,  sort: "string", editor: "text" },
                { id: "del", header: "Del", template: "{common.trashIcon()}", width: 50 },
            ],
            scroll: "y",
            editable: true,
            onClick: {
                "wxi-trash"(e, id) {
                    showConfirmMessage(id, categories, "value");
                    return false;
                }
            },
            on: {
                onBeforeEditStop(state, editor, ignore) {
                    const check = ( editor.getValue() != "" );
                    if (!ignore && !check){
                        webix.message("Name of category must not be empty");
                        return false;
                    }
                }
            }
        }
    ]
}

function addNewCategory() {
    webix.prompt({
        title: "Add a new category",
        text: "Type name of category",
        ok: "Add",
        cancel: "Cancel",
        input: { required: true }
    }).then(result => {
        categories.add({value: result});
        webix.message("new category added successfully!");
    });
}

export {admin, categories};