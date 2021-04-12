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
                { margin: 5, cols: [
                    { 
                        view: "button", 
                        value: "Add new" , 
                        css: "webix_primary", 
                        click() {addFilmInfo(this.getFormView(), $$("dataFilms"))}
                    },
                    { 
                        view: "button", 
                        value: "Clear",
                        click() {clearForm(this.getFormView())}
                    }
                ]}
            ],
            rules: {
                title: webix.rules.isNotEmpty,
                year: value => {
                    const currentDate = new Date();
                    return (value > 1900 && value <= currentDate.getFullYear() && (value % 1 == 0));
                },
                rating: value => webix.rules.isNotEmpty && value.replace(/[,]/g, ".") > 0,
                votes: value => value.replace(/[,]/g, ".") < 100000
            }
        },
        { }
    ]
}

function addFilmInfo(form, table) {
    if (!form) return;
    if (!table) {
        webix.message("Sorry, datatable is not found");
        return;
    }
    if (form.validate()) {
        const values = form.getValues();
        (values.id && table.data.order.includes(values.id)) ? updateFilm(values, table) : addNewFilm(values, table);
        webix.message("Validation is successful!");
        form.clear();
    } else {
        webix.message("Please fill out all fields correctly!");
    }
}

function updateFilm(film, table) {
    if (!table) {
        webix.message("Sorry, datatable is not found");
        return;
    }
    table.updateItem(film.id, correctInfo(film));
}

function addNewFilm(film, table) {
    if (!table) {
        webix.message("Sorry, datatable is not found");
        return;
    }
    if (!film.id) {
        const ranks = table.data.order.map(item => table.data.pull[item].rank * 1);
        let max = ranks[0];
        ranks.forEach(elem => {
            if(max < elem){
                max = elem;
            }
        });
        const newOrder = max + 1;
        film.rank = newOrder;
    }
    table.add(correctInfo(film));
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

function clearForm(form) {
    if (!form) return;
    webix.confirm({
        text: "Form data will be cleared"
    }).then(
        () => {
            form.clear();
            form.clearValidation();
        }
    );
}