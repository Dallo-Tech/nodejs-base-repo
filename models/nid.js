module.exports = (sequelize, Sequelize) =>
    sequelize.define('NationalIdentity', {
        national_identity_number: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,  // <-- auto-generate UUID
            allowNull: false,
            unique: true,
        },
        full_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        dob: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        birth_place: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        gender: {
            type: Sequelize.ENUM('Male', 'Female', 'Other'),
            allowNull: false,
        },
        citizenship_number: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        citizenship_issue_district: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        permanent_address: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        temporary_address: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        contact_number: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        emergency_contact_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        emergency_contact_number: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        issue_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        card_status: {
            type: Sequelize.ENUM('Active', 'Lost', 'Blocked', "InActive"),
            allowNull: false,
            defaultValue: 'InActive',
        },
    }, {
        timestamps: true, // automatically adds createdAt and updatedAt
        tableName: 'national_identities',
    });

