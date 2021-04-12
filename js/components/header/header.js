import popupProfile from "./popupProfile.js";

export default {
    type: "clean",
    view: "toolbar", 
    css: "webix_dark",
    padding: 10, 
    elements: [
        { view: "label", label: "My App" },
        {
            view: "button",
            type: "icon", 
            icon: "mdi mdi-account", 
            label: "Profile", 
            autowidth: true, 
            css: "webix_transparent",
            popup: popupProfile
        }
    ]
};