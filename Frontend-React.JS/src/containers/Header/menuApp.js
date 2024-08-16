export const adminMenu = [

    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-docter', link: '/system/manage-docter',
                //     subMenus: [
                //         { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //         { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     ]
            },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin',
            // },
            { //Quản lý kế hoạch khám bệnh của bs
                name: 'menu.docter.manage-schedule', link: '/docter/manage-schedule',
            },

        ]
    },

    { //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            },
        ]
    },
    { //Quản lý Chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },
        ]
    },
    { //Quản lý Cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            },
        ]
    },
];



export const docterMenu = [
    {

        name: 'menu.admin.manage-user',
        menus: [

            { //Quản lý kế hoạch khám bệnh của bs
                name: 'menu.docter.manage-schedule', link: '/docter/manage-schedule',
            },
        ]
    }

];