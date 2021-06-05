export const mixinMethods = () => {
    return {
        findChild(array, id) {
            let result
            array.some(
                (child) =>
                    (child.id === id && (result = child)) ||
                    (result = this.findChild(child.children || [], id))
            )
            return result
        },
    }
}
