import {showConfirmMessage} from "../../utils/confirmMassage.js"
export default {
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
            select: true,
            css: "cell-rank",
            hover: "row-highlight",
            columns: [
                { id: "value", header: "Category", fillspace: true,  sort: "string" },
                { id: "del", header: "Del", template: "{common.trashIcon()}", width: 50 },
            ],
            scroll: "y",
            editable: true,
            onClick: {
                "wxi-trash"(e, id) {
                    showConfirmMessage(id, this, "value");
                    return false;
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
        $$("dataCategories").add({value: result});
        webix.message("new category added successfully!");
    });
}