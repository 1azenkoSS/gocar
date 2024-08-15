export const updateObjectInArray = (item, itemId, objPropsName, newObjProps) => {
    return item.map(u => {
        if (u[objPropsName] === itemId) {
            return {...u, ...newObjProps};
        }
        return u;
    })
}