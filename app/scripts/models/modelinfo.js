define(['jquery'], function () {
  modelinfo = {
    materialsData: null,
    partsData: null,
    init: function () {
      this.getMaterials();
      this.getParts();
    },
    getMaterials: function () {
      $.getJSON("scripts/data/Info/materials.json", function (data) {
        modelinfo.materialsData = data;
        modelinfo.setMaterialInfo("Steel");
      });
    },
    getParts: function () {
      $.getJSON("scripts/data/Info/parts.json", function (data) {
        modelinfo.partsData = data;
        modelinfo.setPartsInfo("Shaft");
      });
    },
    setMaterialInfo: function (matName) {
      for (var i = 0; i < this.materialsData.materials.length; i++) {
        if (this.materialsData.materials[i].name == matName) {
          $("#material_title").html("<i class='fa fa-info-circle fa-fw'></i> " + this.materialsData.materials[i].name);
          $("#Material_Density").html(this.materialsData.materials[i].density);
          $("#Material_Strength").html(this.materialsData.materials[i].strength);
          $("#Material_Temperature").html(this.materialsData.materials[i].temperature);
          $("#Material_Oxidation").html(this.materialsData.materials[i].oxidation);
          $("#Material_Corrosion").html(this.materialsData.materials[i].corrosion);
        }
      }
    },
    setPartsInfo: function (objName) {
      for (var i = 0; i < this.partsData.jetEngineParts.length; i++) {
        if (this.partsData.jetEngineParts[i].name == objName) {

          $("#partName").html("<h4> " + this.partsData.jetEngineParts[i].name + "</h4>");
          $("#parIMG").html("<img class='scrollToTOP partIMG img img-responsive img-thumbnail' src=\"" + this.partsData.jetEngineParts[i].texture_img + "\" width='100%' align='middle''>");
          $("#PartDesc").html(this.partsData.jetEngineParts[i].description);
          $("#PartRequirement").html(this.partsData.jetEngineParts[i].requirements);
          break;
        }
      }
    }
  }
});
