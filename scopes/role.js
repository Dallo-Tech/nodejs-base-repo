module.exports = RoleScope = (db) => {
    db.Role.addScope('includeResource', {
        include: [{
            model: db.RoleResourcePermission,
            attributes: ['id'],
            include: [{model: db.Resource, attributes: ['name']}]
        }],
    })

    db.Role.addScope('includeResourcePermission', {
        include: [{
            model: db.RoleResourcePermission,
            attributes: ['id'],
            include: [{
                model: db.Resource, attributes: ['name']
            }, {
                model: db.Permission, attributes: ['name']
            }]
        }],
    })
}