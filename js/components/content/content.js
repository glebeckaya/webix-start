import base from "../../views/dashboard/datatable.js";
import form from "../../views/dashboard/form.js";
import usersList from "../../views/users/list.js";
import usersChart from "../../views/users/chart.js";
import productsTree from "../../views/products/treetable.js";

export default {
    cells: [
        { id: "Dashboard", cols: [base, form] },
        { id: "Users", rows: [usersList, usersChart] },
        { id: "Products", rows: [productsTree] },
        { id: "Admin", template: "Admin" },
    ]
};