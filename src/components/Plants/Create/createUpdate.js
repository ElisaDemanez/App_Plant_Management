
import { connection, app } from "@/components/firebase.js";


function setPlant(self) {
  if (self.existingID == null) {
    //create
    self.increaseID();
    var id = self.aiID;
  } else if (typeof self.existingID == "number") {
    //update
    var id = self.existingID;
  }
  //push images
  if (self.images) {
    function storeimg(image) {
      var storedIMG = app.storage().ref(id + "/" + image.name);
      storedIMG
        .put(image)
        .then(function () {
          return storedIMG.getDownloadURL();
        })
        .then(function (urli) {
          connection.ref("plants/" + id + "/images/").push(
            {
              name: image.name,
              url: urli
            },
            function (error) {
              if (error) {
                console.log("error", error);
              } else {
                console.log("successfull");
              }
            }
          );
        });
    }
    for (const key in self.images) {
      var reg = /^[0-9]+$/;
      if (reg.test(key)) storeimg(self.images[key]);
    }
  }
  if (self.existingID == null) {
    //create
    pushPlant(self, id);
  } else if (typeof self.existingID == "number") {
    //update
    updatePlant(self, id);
  }
}
function pushPlant(self, id) {
  connection.ref("plants/" + id).set(
    {
      seller: self.selectedSeller,
      species: self.selectedSpecies,
      subsp: self.selectedSubspecies,
      description: self.description ? self.description : null,
      id: id
    },
    function (error) {
      if (error) {
        console.log("error", error);
      } else {
        console.log("successfull");
        self.loading = false;
        self.$router.push("/");
      }
    }
  );
}
function updatePlant(self, id) {

  connection.ref("plants/" + id).update(
    {
      seller: self.selectedSeller,
      species: self.selectedSpecies,
      subsp: self.selectedSubspecies,
      description: self.description ? self.description : null,
      id: id
    },
    function (error) {
      if (error) {
        console.log("error", error);
      } else {
        console.log("successfull");
        self.loading = false;
        self.$router.push("/");
      }
    }
  );
}
export default setPlant