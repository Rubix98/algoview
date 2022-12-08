import { useToast } from "vue-toastification";

const toast = useToast();

export function validateSceneObject(model) {
    if (!assert(model.type != null, "Podaj rodzaj obiektu")) return false;
    if (!assert(model.variable != null, "Przypisz zmienną")) return false;
    model.subobjects.forEach((subObj) => {
        if (!assert(subObj.type != null, "Podaj rodzaj właściwości")) return false;
        if (!assert(subObj.variable != null, "Przypisz zmienną do właściwości")) return false;
    });
    return true;
}

function assert(assertion, warning) {
    if (!assertion) {
        toast.error(warning);
        return false;
    }
    return true;
}