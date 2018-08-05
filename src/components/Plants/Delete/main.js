import { connection, app } from "@/components/firebase.js";
import deleteImage from "@/components/Images/main.js";


function deletePlant(self, id) {

  // // Known bug : unexplained : On computer, with mobiel display : confirm is not fired and always fake
  var oui = confirm(
    "Its like, gonna be gone, like forever. Like you sure its really dead ? You could like pop it in a lil bit of water or like idk "
  );
  if (oui) {
    var plantRef = self.plantsRef[".value"][id]
    for (const key in plantRef.images) {
      if (plantRef.images.hasOwnProperty(key)) {
        const element = plantRef.images[key];
        deleteImage(id, element.name)
      }
    }

    self.$firebaseRefs.plantsRef.child(id).remove();
    self.dialog = false;
    self.$emit("close");
  }
}

export default deletePlant