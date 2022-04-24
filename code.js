var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let textElementsSelected = 0;
for (const node of figma.currentPage.selection) {
    if (node.type == 'TEXT') {
        textElementsSelected++;
    }
}
// * Uncomment the following to test new users without clientStorage set
// figma.clientStorage.deleteAsync('placeholdate').then(res => {
//   console.log("Deleted", res);
// })
figma.clientStorage.getAsync('placeholdate').then(res => {
    figma.showUI(__html__, { height: 300, width: 350, title: "Placeholdate" });
    figma.ui.postMessage({ textElementsSelected, clientStorage: res });
});
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.type === 'add-date') {
        const textNodesSelected = msg.dates.length;
        figma.clientStorage.setAsync('placeholdate', msg.clientStorageData);
        for (const node of figma.currentPage.selection) {
            if (node.type == 'TEXT') {
                const fonts = node.getRangeAllFontNames(0, node.characters.length);
                for (const font of fonts) {
                    yield figma.loadFontAsync(font);
                }
                node.characters = msg.dates.shift();
            }
        }
        figma.closePlugin(!textNodesSelected ? 'Oops! Make sure at least one text layer is selected.' : '');
    }
    if (msg.type === 'cancel') {
        figma.closePlugin();
    }
});
