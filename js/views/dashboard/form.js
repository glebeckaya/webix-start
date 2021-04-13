export default {
    type: "clean",
    rows: [
        {
            view: "form",
            id: "editFilmsForm",
            width: 300,
            elements: [
                { template: "Edit films", type: "section" },
                { view: "text", label: "Title", name: "title", invalidMessage: "This field is required", bottomPadding: 20 },
                { view: "text", label: "Year", name: "year", invalidMessage: "Enter year between 1970 and 2021", bottomPadding: 25 },
                { view: "text", label: "Rating", name: "rating", invalidMessage: "This field is required and can`t be 0", bottomPadding: 25 },
                { view: "text", label: "Votes", name: "votes", invalidMessage: "Votes can`t be 100000 and more", bottomPadding: 25 },
                {
                    view: "richselect",
                    name: "category",
                    id: "formRichSelect",
                    label: "Select",
                    options: [],
                    invalidMessage: "This field is required",
                    bottomPadding: 25
                },
                { margin: 5, cols: [
                    { 
                        view: "button", 
                        value: "Add new" , 
                        css: "webix_primary", 
                        click: addFilmInfo
                    },
                    { 
                        view: "button", 
                        value: "Clear",
                        click: clearForm
                    }
                ]}
            ],
            rules: {
                title: webix.rules.isNotEmpty,
                year: value => {
                    const currentDate = new Date();
                    return (value > 1920 && value <= currentDate.getFullYear());
                },
                rating: value => webix.rules.isNotEmpty && value.replace(/[,]/g, ".") > 0,
                votes: value => value.replace(/[,]/g, ".") < 100000,
                category: webix.rules.isNotEmpty
            }
        },
        { }
    ]
}

function addFilmInfo() {
    const form = $$("editFilmsForm");
    const table = $$("dataFilms");
    
    if (form.isDirty()){
        if (!form.validate()) return false;
        const values = form.getValues();

        if (!values.id) {
            const ranks = table.serialize().map(item => item.rank);
            let max = Math.max(...ranks);
            const newOrder = max + 1;
            values.rank = newOrder;
        }
        
        form.save(correctInfo(values));
        webix.message("Validation is successful!");
        form.clear();
        table.unselectAll();
    }
}

function correctInfo(obj) {
    Object.keys(obj).forEach(key => {
        obj[key] = obj[key].toString();
        obj[key] = obj[key].replace(/[<>]/g, " ");
        if (key !== "title") obj[key] = obj[key].replace(/\./g, ",");
        if (key === "year") obj[key] = parseInt(obj[key]);
    });
    return obj;
}

function clearForm() {
    const form = $$("editFilmsForm");
    webix.confirm({
        text: "Form data will be cleared"
    }).then(
        () => {
            form.clear();
            form.clearValidation();
        }
    );
}