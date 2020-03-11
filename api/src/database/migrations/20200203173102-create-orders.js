module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            product: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            signature_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'files',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            recipient_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'recipients',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            deliveryer_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'deliveryers',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            start_date: {
                type: Sequelize.DATE,
            },
            end_date: {
                type: Sequelize.DATE,
            },
            canceled_at: {
                type: Sequelize.DATE,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('orders');
    },
};
