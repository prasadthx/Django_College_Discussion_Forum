import {store} from "react-notifications-component";

type messageType = "success" | "danger" | "warning" | "info" ;

const displayNotifications = (title: string, message: string, messageType: messageType) => {
    store.addNotification({
        title: `${title}`,
        message: `${message}`,
        type: `${messageType}`,
        insert: "top",
        container: "bottom-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}

export default displayNotifications;
