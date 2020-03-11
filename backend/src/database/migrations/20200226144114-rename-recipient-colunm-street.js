module.exports = {
    up: queryInterface => {
        return queryInterface.renameColumn('recipients', 'street', 'address');
    },
};
