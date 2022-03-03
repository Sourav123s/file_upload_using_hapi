const fs = require("fs");
const homedir = require("os").homedir();
module.exports = {
  uploads,
};

async function uploads(req, res) {
  console.log("i am here ");
  const data = req.payload;
  // console.log(data.file);
  // console.log(__dirname);
  console.log(homedir);

  if (data.file) {
    const name = data.file.filename;
    const path = __basedir + "/uploads/" + name;
    const inp = fs.createReadStream(name);
    const file = fs.createWriteStream(path);

    file.on("error", (err) => console.error(err));

    await inp.pipe(file);

    inp.on("end", (err) => {
      const ret = {
        filename: name,
        headers: data.file.headers,
      };
      return JSON.stringify(ret);
    });
  }
  return res.response("File uploaded").code(200);
}
