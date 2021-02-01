const { BrowserWindow, Notification } = require("electron");
const { getConection } = require("./database");
let window;

async function createProduct(product) {
  console.log(product);
  try {
    const conn = await getConection();
    product.price = parseFloat(product.price);
    const result = await conn.query("INSERT INTO productos SET ?", product);

    new Notification({
      title: "Productos",
      body: "el producto fue cargado correctamente",
    }).show();

    product.id = result.insertid;
    return product;
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(id, product){
    const conn = await getConection();
    const result = await conn.query("UPDATE productos SET ? WHERE id = ?", [product, id])
    console.log(result);
}
async function getProductById(id) {
  const conn = await getConection();
  const result = await conn.query("SELECT * FROM productos WHERE id =?", id);
  return result[0];
}

async function getProducts(params) {
  const conn = await getConection();

  const results = await conn.query("SELECT * FROM productos ORDER by id DESC");

  console.log(results);
  return results;
}

async function deleteProduct(id) {
  const conn = await getConection();
  const result = await conn.query("DELETE FROM productos WHERE id =?", id);
  console.log(result);
  new Notification({
    title: "Productos",
    body: "el producto fue borrado con exito",
  }).show();
}

function createWindow() {
  window = new BrowserWindow({
    width: 1200,
    height: 650,
    // tamaño minimo de la ventana
    minWidth: 600,
    minHeight: 400,
    // tamaño maximo de la ventana
    maxWidth: 1200,
    maxHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  window.loadFile("src/vista/index.html");
  // oculta el menu superior de la ventana.
  window.setMenuBarVisibility(false);
  // maximiza la ventana al iniciar la aplicacion
  // window.maximize()
}

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct
};
