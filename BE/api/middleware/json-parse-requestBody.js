exports.convertToJson = (requestBody) => {
    return JSON.parse(Object.keys(requestBody)[0]);
}