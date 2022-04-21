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
figma.showUI(__html__, { height: 230, width: 400, title: "Placeholdate" });
figma.ui.postMessage(textElementsSelected);
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.type === 'add-date') {
        for (const node of figma.currentPage.selection) {
            if (node.type == 'TEXT') {
                const fonts = node.getRangeAllFontNames(0, node.characters.length);
                for (const font of fonts) {
                    yield figma.loadFontAsync(font);
                }
                node.characters = msg.dates.shift();
            }
        }
    }
    figma.closePlugin();
});
