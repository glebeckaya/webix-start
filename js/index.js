import header from "./components/header/header.js";
import side from "./components/sidebar/side.js";
import main from "./components/content/content.js";
import footer from "./components/footer/footer.js";

webix.ui({
    rows: [
        header, 
        {cols:[side, {view:"resizer"}, main]}, 
        footer 
    ]
});