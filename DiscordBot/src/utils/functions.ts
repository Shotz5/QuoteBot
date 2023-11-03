import * as fs from "fs";

export function findStorageFolder(): string | boolean {
    let sym_exists: boolean = fs.existsSync(__dirname + '/../storage/');
    if (!sym_exists) {
        let long_path = fs.existsSync(__dirname + '/../../../Uploader/storage/app/public/images/');
        return long_path ? __dirname + '/../../../Uploader/storage/app/public/images/' : false;
    }
    let path = __dirname + '/../storage/';
    return path;
}