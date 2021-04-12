export default {
    type: "clean",
    css: "side-section",
    width: 200,
    minWidth: 130,
    rows: [
        {
            view: "list",
            id: "sidebar",
            select: true,
            autoheight: true,
            scroll: false,
            data: [ "Dashboard", "Users", "Products", "Admin" ],
            on: { onAfterLoad: selectSideItem }
        },
        { },
        { template: "<span class='webix_icon mdi mdi-check'></span>Connected", autoheight: true }
    ]
};

function selectSideItem () {
    const sidebar = $$("sidebar");
    sidebar.select("Dashboard");
    sidebar.attachEvent("onAfterSelect", (id) => {
        $$(id).show();
    })
}