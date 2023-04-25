import axios from "axios";
import toast, { getEndpointRelatedToast } from "@/javascript/utils/toastUtils";
import { openModal } from "jenesius-vue-modal";
import AlgoModal from "@/components/global/AlgoModal.vue";
export default {
    name: "App",
    components: {
        AlgoModal,
    },
    data() {
        return {
            isModalVisible: true,
        };
    },
    methods: {
        showModal() {
            openModal(AlgoModal);
        },
    },
};

export function sendRequest(url, data = {}, method) {
    if (!validateMethod(method)) return;
    axios.defaults.withCredentials = true;
    if (!data) data = {};

    const toastStrings = getEndpointRelatedToast(url);
    const loadingToast = toastStrings.loading ? toast.info(toastStrings.loading, { timeout: false }) : undefined;

    method = method.toLowerCase();
    url = BACKEND_URL + url;

    return axios[method](url, data)
        .then((response) => {
            if (toastStrings.success) toast.success(toastStrings.success);
            return response.data;
        })
        .catch((error) => {
            console.error(error.response);
            let errorMessage = error.message + (error.response ? "\nDetails: " + error.response.data.error : "");
            toast.error(toastStrings.error ? toastStrings.error : "Wystąpił błąd! Spróbuj ponownie później.");
            throw error;
        })
        .finally(() => {
            if (loadingToast !== undefined) toast.dismiss(loadingToast);
        });
}

function validateMethod(method) {
    return method && ["get", "post", "put"].includes(method.toLowerCase());
}
