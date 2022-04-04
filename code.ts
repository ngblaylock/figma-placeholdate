figma.showUI(__html__, {height: 230, title: "Lorem Date"});

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'add-date') {
    for (const node of figma.currentPage.selection) {
      if (node.type == 'TEXT') {
        const fonts = node.getRangeAllFontNames(0, node.characters.length);
        for (const font of fonts) {
          await figma.loadFontAsync(font);
        }
        node.characters = msg.dates[Math.floor(Math.random() * 100)];
      }
    }
  }
  figma.closePlugin();
};
