const hasRole = (user, role) => {
    return user?.roles?.includes(role);
};

export default hasRole;
