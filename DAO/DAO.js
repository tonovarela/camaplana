const { Sequelize } = require('sequelize');
class DAO {
  sequelize = new Sequelize('mssql://sa:TcpkfcW8l1t0@192.168.2.217:1433/CotizadorLito', {
    logging: false,
    encrypt: false,    
    trustServerCertificate: true,
  })
  obtenerData = async (sql) => {
    const [resultados] = await this.sequelize.query(sql, { logging: console.log, plain: false ,})
    return resultados;
  }
}
module.exports = DAO;