export function getMenuItems(isLoggedIn?: boolean) {
    let menuItems = [
        {
            href: "/",
            body: "Home",
        },
        {
            href: "/classes",
            body: "Popular Classes",
        },
        {
            href: "/search",
            body: "Search",
        }
    ]
    if (isLoggedIn) {
        menuItems.push({
            href: "/profile",
            body: "My Profile",
        })
    }
    menuItems.push({
        href: isLoggedIn ? "/logout" : "/login",
        body: isLoggedIn ? "Log Out" : "Log In",
    })

    return menuItems
}