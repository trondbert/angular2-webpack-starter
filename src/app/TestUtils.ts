import fs = require("fs");

export class TestUtils {

    static writeScreenshot(data, filename) {
        var stream = fs.createWriteStream(filename);

        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }
}