import { connection, app } from "@/components/firebase.js";


function deletePlant(self, id) {
  console.log('bjr', self)

  // // Known bug : unexplained : On computer, with mobiel display : confirm is not fired and always fake
  var oui = confirm(
    "Its like, gonna be gone, like forever. Like you sure its really dead ? You could like pop it in a lil bit of water or like idk "
  );
  if (oui) {
    for (const key in self.plantsRef[id].images) {
      if (self.plantsRef[id].images.hasOwnProperty(key)) {
        const element = self.plantsRef[id].images[key];
        app
          .storage()
          .ref(id.toString() + "/" + element.name)
          .delete();
      }
    }

    self.$firebaseRefs.plantsRef.child(id).remove();
    self.dialog = false;
    self.$emit("close");
  }
}

export default deletePlant