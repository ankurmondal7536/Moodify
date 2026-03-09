const imageKit = require('@imagekit/nodejs').default;
const client = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})
async function uploadFile({ buffer, filename, folder = "" }) {
const file = await client.files.upload({
    file: await imageKit.toFile(Buffer.from(buffer)),
    fileName: filename,
    folder: folder
})
return file
}

module.exports = {
    uploadFile
}