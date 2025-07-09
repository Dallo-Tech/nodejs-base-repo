module.exports = RRPScope = (db) => {
    db.RoleResourcePermission.addScope('includeRole', roleName => {
        const condition = roleName && Object.keys(roleName).length
        return {
            include: [{
                model: db.Role,
                required: condition,
                attributes: ['name', 'subName'], where: {subName: roleName}
            }],
        }
    })

    db.RoleResourcePermission.addScope('includeResource', {
        include: [{model: db.Resource, attributes: ['name']}],
    })
}