const watch = require("node-watch");
const sass = require("sass");

console.log("Starting Watch on files....");

watch(
  "./build-ui",
  {
    recursive: true,
    delay: 1000,
  },
  function (evt, name) {
    console.log("%s changed.", name);
    // 1.
    // (may need promise.all?)
    // get head.html
    // compile scss and store as css (wrap in <style>)
    const result = sass.compile("./build-ui/style.scss");
    console.log(result.css);
    // get script.js (wrap in <script>)
    // get body.html
    //
    // 2.
    // write to ui.html
  }
);
