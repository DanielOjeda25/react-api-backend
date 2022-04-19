/*El middleware Redux no es más que una función que se invoca después de que se envía una acción, pero antes de que un reductor se encargue de la acción. Puede modificar la acción original, esperar a que se termine alguna otra acción o, incluso cancelarla.*/

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
}
module.exports = logger;
