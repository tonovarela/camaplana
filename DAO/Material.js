
const { QueryTypes } = require("sequelize");
const DAO = require("./DAO");
class Material extends DAO {

    async porID(id_cotizacionMaterial) {
        return await this.sequelize.query(`
        select 
        c.ALTO,
        c.ANCHO,
        c.MEDIANIL_ALTO,
        c.MEDIANIL_ANCHO,  
              a.MATANCHO,
              a.MATALTO,
              a.TIPO tipoMaterial,
              a.ORIENTA 
              from  v_cotizaciones_material a  
        join dbo.cotizaciones c on (c.ID_COTIZACIONES=a.ID_COTIZACIONES)
        where a.ID_COTIZACIONES_MATERIAL=:id`,  
            {
				plain:false,
                replacements: { id: id_cotizacionMaterial},
                type: QueryTypes.SELECT
            }
        );
    }
}

module.exports = Material;