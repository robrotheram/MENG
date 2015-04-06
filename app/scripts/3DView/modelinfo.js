define(['jquery'], function () {
  modelinfo = {
    selectedPartID: null,
    selectedMaterial: {},
    materialsData: null,
    partsData: null,
    partJsonPath: null,
    materialJsonPath: null,
    check: function () {
      for (var i = 0; i < this.partsData.jetEngineParts.length; i++) {
        if (this.partsData.jetEngineParts[i].name == this.selectedPartID) {
          if (this.partsData.jetEngineParts[i].correctMat == this.selectedMaterial[this.selectedPartID].id) {

            $("#FanCheck").css('background-color', '#5cb85c');
          } else {
            $("#FanCheck").css('background-color', '#d9534f');
          }
        }
      }
      console.log(this.selectedMaterial[this.selectedPartID].id + " ->" + this.selectedPartID);
    },
    getMaterials: function (init) {
      $.getJSON(this.materialJsonPath, function (data) {
        modelinfo.materialsData = data;
        modelinfo.setMaterialInfo(init);
      });
    },
    getParts: function (init) {
      $.getJSON(this.partJsonPath, function (data) {
        modelinfo.partsData = data;
        modelinfo.setPartsInfo(init);
        console.log(modelinfo.partsData.jetEngineParts[0].correctMat);
      });
    },
    setMaterialInfo: function (matName) {
      for (var i = 0; i < this.materialsData.materials.length; i++) {
        if (this.materialsData.materials[i].id == matName) {
          $("#Material_Name").html(this.materialsData.materials[i].name);
          $("#Material_Density").html(this.materialsData.materials[i].density);
          $("#Material_Strength").html(this.materialsData.materials[i].strength);
          $("#Material_Temperature").html(this.materialsData.materials[i].temperature);
          $("#Material_Oxidation").html(this.materialsData.materials[i].oxidation);
          $("#Material_Corrosion").html(this.materialsData.materials[i].corrosion);
        }
      }
    },
    toTitleCase: function (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    setPartsInfo: function (objName) {
      console.log(objName);
      for (var i = 0; i < this.partsData.jetEngineParts.length; i++) {
        if (this.partsData.jetEngineParts[i].name == objName) {
          this.selectedPartID = objName;
          var partname = this.partsData.jetEngineParts[i].name.replace("_", " ");
          $("#partName").html("<h4> " + this.toTitleCase(partname) + "</h4>");
          $("#FanCheck").empty();
          $("#FanCheck").css('background-color', '#FFF');
          if (this.selectedMaterial[objName] != null) {
            $("#FanCheck").html(this.selectedMaterial[objName].html);
            this.check();
          }

          $("#PartDesc").html(this.partsData.jetEngineParts[i].description);
          $("#PartRequirement").html(this.partsData.jetEngineParts[i].requirements);
          break;
        }
      }
    }
  }
});
