import { app } from "@/components/firebase.js";


export default function deleteImage(id, filename) {
    var refp = app.storage().ref(id + "/" + filename)
    refp.delete().then(function () {
        console.log("deleted image")
    }).catch(function (error) {
        console.log(error)
    });
    return true;

}

