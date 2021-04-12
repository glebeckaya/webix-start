export default webix.ui({
    view: "popup",
    head: false,
    body: {
        view: "list",
        autoheight: true,
        data: [ "Settings", "Log out" ],
        select: true,
    }
});