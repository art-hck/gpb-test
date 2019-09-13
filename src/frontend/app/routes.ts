import {AppRoutes} from "../modules/Application/Entity/Route";
import {MessengerRoute} from "../modules/Messenger/Route/Messenger";

export const appRoutes: AppRoutes = [
    {
        path: '',
        component: MessengerRoute,
        data: {
            title: "Messenger"
        }
    }
];