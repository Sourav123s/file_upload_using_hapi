const fs = require("fs");
const StreamZip = require("node-stream-zip");
const AdmZip = require('adm-zip')
const path = require('path')
const Unrar = require('unrar')
const nodeUnrar = require('node-unrar-js');
const Busboy = require('busboy')
const decompress = require('decompress');
const decompressZip = require('decompress-zip')
const user = require('../models').User
module.exports = {
  uploads,
  uploadMultiple
};

async function uploads(req, res) {
  try {
    const data = req.payload;

    if (data.file) {
      const name = data.file.filename;
      let fileArr = name.split(".");
      let filename = fileArr[0];
      let fileExt = fileArr[1];
      // if (fileExt !== "png") {
      //   return res.response("something went wrong").code(400);
      // }
      const path = __basedir + "/uploads/" + name;
      const inp = fs.createReadStream(data.file.path);
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
  } catch (error) {
    console.log(error);
  }
}
async function uploadMultiple(req, res) {
  const data = req.payload;
  mainExtation = data.file.hapi.filename.split('.')[1];
  // console.log(mainExtation);
  try {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'svg', 'pdf'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let uploadedInformation = []
    let uploadDoc;
    if (mainExtation === 'zip') {
      let files = await decompress(data.file._data)
      for (let file of files) {

        let fileName = file.path;
        let empCode = fileName.split('-')[0];
        let docType = fileName.split('-')[1].split('.')[0]
        console.log(empCode);

        let uploaded_date_and_time = new Date();

        let uploaded_month = monthNames[uploaded_date_and_time.getMonth()]

        let uploaded_year = uploaded_date_and_time.getFullYear();

        let fileExtension = fileName.split('.').pop();

        const fileAceptableOrNot = allowedExtensions.includes(fileExtension.toLowerCase())
        if (!fileAceptableOrNot) {
          continue;

        }
        let uploadDoc = user.create({
          doc_type: docType,
          document_name: fileName,
          document_comment: fileName,
          uploaded_month: uploaded_month,
          uploaded_year,
          uploaded_time: uploaded_date_and_time
        })
        uploadedInformation.push(uploadDoc)
      }
      console.log('done!');
      return res.response({uploadedInformation}).code(200)
    } else if (mainExtation === 'rar') {
      // console.log(data.file);
      let unzipper = new decompressZip(data.file._data)
      console.log(unzipper.filename);
      console.log('before new unzipper ');
      let newUnzipper = new decompressZip(unzipper.filename)


      console.log(newUnzipper);
      console.log('after new unzipper ');
      unzipper.on('error', function (error) {
        console.log('caugth an error :', error);
      });

      unzipper.on('extract', function (log) {
        console.log('Finished extracting', log);
      });

    }


    // // console.log(path.dirname)
    // const zip = new AdmZip(data.file);
    // let zipEntries = zip.getEntries();
    // zipEntries.forEach(function (zipEntry) {
    //   console.log('i am here ');
    //   console.log(zipEntry.toString()); // outputs zip entries information
    // });
    // const outputDir = `${path.parse(data.file.path).name}_extracted`;

    // zip.extractAllTo(outputDir);

    // console.log(`Extracted to "${outputDir}" successfully`);


  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
};


// const unrar = require('node-unrar-js')

// module.exports = async (req, res) => {
//   try {
//     const busboy = new Busboy({ headers: req.headers })
//     busboy.on('finish', async () => {

//       const fileData = req.files.file
//       const extractor = unrar.createExtractorFromData(fileData.data)
//       const list = extractor.getFileList()
//       if (list[0].state === 'SUCCESS')
//         //  Here I have the file names
//         const fileNmes = list[1].fileHeaders.map(header => header.name)
//       // ...

//     })
//     req.pipe(busboy)
//   } catch (err) { return response.error(req, res, err, 'uploadProductFile_unexpected') }
// }

// this file is for the main project doc uploads 

// async function uploadMultiple(req, res) {
//   const data = req.payload;
//   const { id } = req.user;
//   // console.log(data);
//   try {
//     const allowedExtensions = ['jpg', 'jpeg', 'png', 'svg', 'pdf'];
//     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let uploadedInformation = []
//     let uploadDoc;
//     let files = await decompress(data.file._data);
//     console.log(files);
//     // return success({ files }, "file")(res)
//     decompress(data.file._data, {
//     }).then(async (files) => {

//       for (let file of files) {
//         console.log(file);
//         let fileName = file.path;
//         let empCode = fileName.split('-')[0];
//         let docType = fileName.split('-')[1].split('.')[0]
//         console.log(empCode);
//         let user;

//         let uploaded_date_and_time = new Date();

//         let uploaded_month = monthNames[uploaded_date_and_time.getMonth()]

//         let uploaded_year = uploaded_date_and_time.getFullYear();

//         let fileExtension = fileName.split('.').pop();

//         const fileAceptableOrNot = allowedExtensions.includes(fileExtension.toLowerCase())
//         if (!fileAceptableOrNot) {

//           continue;

//         }
//         if (fileAceptableOrNot) {
//           user = await User.findOne({
//             where: {
//               emp_code: empCode
//             }
//           })

//         }
//         uploadDoc = await DocTable.create({
//           emp_id: user.id ? user.id : id,
//           doc_type: docType,
//           document_name: docType,
//           document_heading: fileName,
//           document_comment: fileName,
//           upload_month: uploaded_month,
//           upload_year: uploaded_year,
//           upload_date_time: uploaded_date_and_time,
//           uploaded_by: id
//         })

//         let uploadedResult = await upload(file.data, fileName);
//         let signedUrl = await getSignedURL(uploadedResult.Location, 8760);

//         console.log(uploadedResult.Location, signedUrl);
//         let docInformation = {
//           Url: uploadedResult.Location,
//           signedUrl: signedUrl,
//           upload: uploadDoc.dataValues
//         }
//         uploadedInformation.push(docInformation)
//       }

//       console.log(uploadedInformation);


//     }).catch(err => {
//       return error({ err }, "file is not uploaded !")(res)
//     })


//     return success({ uploadedInformation }, "File Uploaded successfully ")(res)

//   } catch (e) {
//     console.log(`Something went wrong. ${e}`);
//   }
// };
