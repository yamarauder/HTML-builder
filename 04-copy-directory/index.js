const fs = require('fs');
const path = require('path');

copeDir();

function copeDir() {

    fs.readdir(path.join(__dirname, "files-copy"), { withFileTypes: true }, (err, data) => {
        if (err) return err;
        data.forEach(file => {
            fs.unlink(path.join(__dirname, "files-copy", file.name), err => { });
        })
    });

    fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {
        if (err) return (err);
    });

    fs.readdir(path.join(__dirname, "files"), { withFileTypes: true }, (err, data) => {
        if (err) return (err);
        data.forEach(file => {
            fs.copyFile(path.join(__dirname, "files", file.name), path.join(__dirname, "files-copy", file.name), err => { });
        })
    })
}
