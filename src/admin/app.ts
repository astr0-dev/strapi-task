import {StrapiApp} from "@strapi/strapi/admin";

export default {
    register(app: StrapiApp) {
        const router = app.router
        if (!router) return;

        if (router?.settings?.email) {
            delete router.settings.email;
        }

        const settingsIndex = router.routes?.findIndex(
            (route: any) => route.path === 'settings/*'
        );

        if (settingsIndex >= 0) {
            const settingsRoute = router.routes[settingsIndex];
            if (Array.isArray(settingsRoute.children)) {
                settingsRoute.children = settingsRoute.children.filter(
                    (child: any) =>
                        typeof child.path !== 'string' || !child.path.startsWith('email')
                );
            }
        }
    },
    bootstrap() {},
};
