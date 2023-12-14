
const { QueryTypes } = require("sequelize");
const DAO = require("./DAO");
class Material extends DAO {

    async porID(id_cotizacionMaterial) {
        return await this.sequelize.query(`
        select 
  a.ID_COTIZACIONES_MATERIAL,
  c.ALTO,
  c.ANCHO,
  c.MEDIANIL_ALTO,
  c.MEDIANIL_ANCHO,
  b.ID_MATERIAL,
      b.NOMBRE_MATERIAL descripcionMaterial,
        a.MATANCHO,
		a.MATALTO,
		b.TIPO tipoMaterial,
		a.ORIENTA 
		from dbo.cotizaciones_material a
  join dbo.materiales_cotizador b on (b.ID_MATERIAL=a.ID_MATERIAL)
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