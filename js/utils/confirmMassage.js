export function showConfirmMessage(id, viewId, param){
    const view = $$(viewId);
    if (!view) return;
    webix.confirm({
        text: `Do you really want to delete "${view.data.pull[id][param]}"?`
    }).then(
        () => view.remove(id)
    );
}