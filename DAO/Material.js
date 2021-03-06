
const { QueryTypes } = require("sequelize");
const DAO = require("./DAO");
class Material extends DAO {

    async porID(folio) {
        return await this.sequelize.query(`
        SELECT a.ID_MATERIAL,
		ANCHO,
		ALTO,
		MEDIANIL_ANCHO,
		MEDIANIL_ALTO,
    (select nombre_material from materiales_cotizador where ID_MATERIAL=a.ID_MATERIAL) as descripcionMaterial,
	(select tipo from materiales_cotizador where id_material=a.id_material) as tipoMaterial,
        a.MEDIDA,
		a.MATANCHO,
		a.MATALTO,
		a.MATENTRAN,
		a.ORIENTA,
		a.ID_MATERIAL2,
		(select nombre_material from materiales_cotizador where ID_MATERIAL=a.ID_MATERIAL2) as descripcionMaterial2,
		(select tipo from materiales_cotizador where id_material=a.id_material2) as tipoMaterial2,
        a.MEDIDA2,
		a.MATANCHO2,
		a.MATALTO2,
		a.MATENTRAN2,
		a.ORIENTA2,
		a.ID_MATERIAL3,
		(select nombre_material from materiales_cotizador where ID_MATERIAL=a.ID_MATERIAL3) as descripcionMaterial3,
		(select tipo from materiales_cotizador where id_material=a.id_material3) as tipoMaterial3,
        a.MEDIDA3,
		a.MATANCHO3,
		a.MATALTO3,
		a.MATENTRAN3,
		a.ORIENTA3,
		a.ID_MATERIAL3,
        a.MEDIDA3,
		a.MATANCHO3,
		a.MATALTO3,
		a.MATENTRAN3,
		a.ORIENTA3,
		a.ID_MATERIAL4,
		(select nombre_material from materiales_cotizador where ID_MATERIAL=a.ID_MATERIAL4) as descripcionMaterial4,
		(select tipo from materiales_cotizador where id_material=a.id_material4) as tipoMaterial4,
        a.MEDIDA4,
		a.MATANCHO4,
		a.MATALTO4,
		a.MATENTRAN4,
		a.ORIENTA4,
		a.ID_MATERIAL5,
		(select nombre_material from materiales_cotizador where ID_MATERIAL=a.ID_MATERIAL4) as descripcionMaterial5,
		(select tipo from materiales_cotizador where id_material=a.id_material4) as tipoMaterial5,
        a.MEDIDA5,
		a.MATANCHO5,
		a.MATALTO5,
		a.MATENTRAN5,
		a.ORIENTA5,
		a.ID_MAT_ESPECIAL,
		(select nombre_material from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL) as descripcionMaterialEspecial,
		(select tipo from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL) as tipoMaterialEspecial,
		a.ID_MAT_ESPECIAL2,
		(select nombre_material from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL2) as descripcionMaterialEspecial2,
		(select tipo from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL2) as tipoMaterialEspecial2,
		a.ID_MAT_ESPECIAL3,
		(select nombre_material from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL3) as descripcionMaterialEspecial3,
		(select tipo from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL3) as tipoMaterialEspecial3,
		a.ID_MAT_ESPECIAL4,
		(select nombre_material from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL4) as descripcionMaterialEspecial4,
		(select tipo from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL4) as tipoMaterialEspecial4,
		a.ID_MAT_ESPECIAL5,
		(select nombre_material from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL5) as descripcionMaterialEspecial5,
		(select tipo from materiales_especiales where ID_MAT_ESPECIAL=a.ID_MAT_ESPECIAL5) as tipoMaterialEspecial5
  FROM cotizaciones a
  where FOLIO=:folio`,  
            {
				plain:false,
                replacements: { folio },
                type: QueryTypes.SELECT
            }
        );
    }
}

module.exports = Material;