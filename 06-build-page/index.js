const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, `project-dist`), () => { });

const htmlwriteStream = fs.createWriteStream(path.join(__dirname, `project-dist`, `index.html`), { encoding: 'utf-8' });
const htmlreadStream = fs.createReadStream(path.join(__dirname, `project-dist`, `index.html`), { encoding: 'utf-8' });
const htmlTemplatereadStream = fs.createReadStream(path.join(__dirname, `template.html`), { encoding: 'utf-8' });
const csswriteStream = fs.createWriteStream(path.join(__dirname, `project-dist`, `style.css`), { encoding: 'utf-8' });

let array = [];
let arr = [];
let arraynumber = [];
let arraycopy = [];
let information = [];
let informationNum = [];
let endarray = [];


function inforFromTemplate(info, num) {
    htmlTemplatereadStream.on(`data`, data => {

        let arr = data.split(` `);

        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i].slice(0, 2) == `{{`) { array.push(arr[i]); arraynumber.push(i) };
        }

        for (let i = 0; i < array.length; i += 1) {

            arraycopy.push(array[i].slice(array[i].indexOf('}') + 2));
            array[i] = array[i].slice(2, array[i].indexOf('}'));
        }

        arraynumber = arraynumber.reverse();
        for (let i = 0; i < array.length; i += 1) {
            for (let j = 0; j < num.length; j += 1) {
                if (array[i] == num[j]) endarray[i] = info[j] + arraycopy[i];
            }

            if ((i == (array.length - 1))) {
                endarray = endarray.reverse()

                for (let q = 0; q < arraynumber.length; q += 1) {
                    arr[arraynumber[q]] = endarray[q];

                }
                data = arr.join(` `);

                htmlwriteStream.write(data);


            }
        }
    })
}

fs.readdir(path.join(__dirname, `components`), { withFileTypes: true }, (err, data) => {

    if (err) return err;
    data.forEach(file => {

        fs.readFile(path.join(__dirname, `components`, file.name), (err, dat) => {
            informationNum.push(file.name.slice(0, file.name.indexOf(`.`)));
            information.push(dat);

            if (information.length === data.length) {
                inforFromTemplate(information, informationNum)
            };

        });

    })
});

fs.readdir(path.join(__dirname, "styles"), { withFileTypes: true }, (err, data) => {

    if (err) return err;

    data.forEach(file => {

        if ((file.isFile() && (path.extname(file.name).slice(1) == `css`))) {

            let readStream = fs.createReadStream(path.join(__dirname, "styles", file.name), { encoding: 'utf-8' });

            readStream.on(`data`, data => {
                csswriteStream.write(data);
            })

        }
    })
})

copeDir();
function copeDir() {

    fs.readdir(path.join(__dirname, `project-dist`, `assets`), { withFileTypes: true }, (err, data) => {
        if (err) return err;
        data.forEach(file => {
            fs.readdir(path.join(__dirname, `project-dist`, `assets`, file.name), { withFileTypes: true }, (err, data) => {
                if (err) return err;
                data.forEach(fil => {
                    fs.unlink(path.join(__dirname, `project-dist`, `assets`, file.name, fil.name), err => { });
                })
            })
        })
    });

    fs.mkdir(path.join(__dirname, `project-dist`, `assets`), { recursive: true }, (err) => {
        if (err) return err;
    });

    fs.readdir(path.join(__dirname, `assets`), { withFileTypes: true }, (err, data) => {
        if (err) return err;
        data.forEach(file => {

            fs.mkdir(path.join(__dirname, `project-dist`, "assets", file.name), err => { });

            fs.readdir(path.join(__dirname, `assets`, file.name), { withFileTypes: true }, (err, data) => {
                if (err) return err;
                data.forEach(fil => {
                    fs.copyFile(path.join(__dirname, `assets`, file.name, fil.name), path.join(__dirname, `project-dist`, `assets`, file.name, fil.name), err => { });

                })
            })
        })
    });
}