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
        var i = 1;
        $("#material_title").html("<i class='fa fa-info-circle fa-fw'></i> " + modelinfo.materialsData.materials[i].name);
        $("#material_info").html(modelinfo.materialsData.materials[i].description);
        $("#material_info").append("<hr/><h4>Material Properties</h4>");
        $("#material_info").append("<b>Melting Point: </b>" + modelinfo.materialsData.materials[i].melting_point + "<br/>");
        $("#material_info").append("<b>Strength: </b>" + modelinfo.materialsData.materials[i].Strength + "<br/>");
        $("#material_info").append("<b>Density: </b>" + modelinfo.materialsData.materials[i].Density + "<br/>");
      });
    },
    getParts: function () {
      $.getJSON("scripts/data/Info/parts.json", function (data) {
        modelinfo.partsData = data;
        modelinfo.setPartsInfo("Nose");
      });
    },
    setMaterialInfo: function (i) {
      $("#material_title").html("<i class='fa fa-info-circle fa-fw'></i> " + this.materialsData.materials[i].name);
      $("#material_info").html(this.materialsData.materials[i].description);
      $("#material_info").append("<hr/><h4>Material Properties</h4>");
      $("#material_info").append("<b>Melting Point: </b>" + this.materialsData.materials[i].melting_point + "<br/>");
      $("#material_info").append("<b>Strength: </b>" + this.materialsData.materials[i].Strength + "<br/>");
      $("#material_info").append("<b>Density: </b>" + this.materialsData.materials[i].Density + "<br/>");
    },
    setPartsInfo: function (objName) {
      for (var i = 0; i < this.partsData.jetEngineParts.length; i++) {
        if (this.partsData.jetEngineParts[i].name == objName) {
          //alert(partsData.jetEngineParts[i].description)
          $("#partName").html("<h4> " + this.partsData.jetEngineParts[i].name + "</h4>");
          $("#parIMG").html("<img class='scrollToTOP partIMG img img-responsive img-thumbnail' src=\"" + this.partsData.jetEngineParts[i].texture_img + "\" width='100%' align='middle''>");
          $("#PartDesc").html(this.partsData.jetEngineParts[i].description);
          $("#PartTmp").html(this.partsData.jetEngineParts[i].operating_temperature);
          $("#PartRPM").html("<p>" + this.partsData.jetEngineParts[i].rpm + "</p>");
          break;
        }
      }
    },
  }
});
