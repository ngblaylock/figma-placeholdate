let textElementsSelected = 0;

for (const node of figma.currentPage.selection) {
  if (node.type == 'TEXT') {
    textElementsSelected++;
  }
}

figma.showUI(__html__, {height: 300, width: 350, title: "Placeholdate"});

figma.ui.postMessage(textElementsSelected);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'add-date') {
    for (const node of figma.currentPage.selection) {
      if (node.type == 'TEXT') {
        const fonts = node.getRangeAllFontNames(0, node.characters.length);
        for (const font of fonts) {
          await figma.loadFontAsync(font);
        }
        node.characters = msg.dates.shift();
      }
    }
    figma.closePlugin();
  }
  if(msg.type === 'cancel'){
    figma.closePlugin();
  }
  if(msg.type === 'save-data'){
    figma.clientStorage.setAsync('placeholdate', msg.obj).then(() => {
      figma.clientStorage.getAsync('placeholdate').then(res => {
        // If it doesn't exist, it will return undefined.
        console.log('placeholdate', res);
      })
    })
  }
};
