onmessage = (event) => {
  Alpine.store("data").nodes =
    event.data.pluginMessage.textElementsSelected;
  let clientStorage = event.data.pluginMessage.clientStorage;
  if (clientStorage) {
    Alpine.store("data").format = clientStorage.format;
    Alpine.store("data").start = clientStorage.start;
    Alpine.store("data").end = clientStorage.end;
    Alpine.store("data").sort = clientStorage.sort;
  }
};

const getDate = function () {
  let start = dayjs(Alpine.store("data").start).valueOf();
  let end = dayjs(Alpine.store("data").end).valueOf();
  let random = Math.floor(Math.random() * (end - start + 1)) + start;
  return random;
};

const insertDates = function (format, start, end, sort) {
  let clientStorageData = { format, start, end, sort };
  let unixArray = [];
  for (let i = 0; i < Alpine.store("data").nodes; i++) {
    unixArray.push(getDate());
  }
  if (sort == "asc") {
    unixArray.sort(function (a, b) {
      return a - b;
    });
  } else if (sort == "desc") {
    unixArray.sort(function (a, b) {
      return b - a;
    });
  }
  let dates = unixArray.map((d) => {
    return dayjs(d).format(format);
  });
  parent.postMessage(
    { pluginMessage: { type: "add-date", dates, clientStorageData } },
    "*"
  );
};

const cancel = function () {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};

document.addEventListener("alpine:init", () => {
  Alpine.store("data", {
    format: "YYYY-MM-DD",
    start: dayjs().subtract(2, "year").format("YYYY-MM-DD"),
    end: dayjs().add(2, "year").format("YYYY-MM-DD"),
    sort: "rand",
    nodes: 1,
  });
});