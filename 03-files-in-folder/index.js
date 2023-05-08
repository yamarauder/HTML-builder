const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, "secret-folder"), { withFileTypes: true }, (err, data) => {
  if (err) console.log(err);
  data.forEach(file => {
    if (file.isFile()) {
      fs.stat(path.join(__dirname, "secret-folder", file.name), (err, stats) => {
        if (err) console.log(err);
        console.log(path.parse(file.name).name + " - " + path.extname(file.name).slice(1) + " - " +
          stats.size + ` B`)
      })
    }
  })
}
)