function example(name, gender, callback, age = undefined) {
    let obj = {
        name,
        gender,
        age
    };
    callback(obj);
}
function cb(response) {
    console.log("🚀 ~ cb ~ response:", response);
    return response;
}
example("ABC", "male", cb);
export {};
