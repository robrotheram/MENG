define(['jquery'], function () {
  modelinfo = {
    selectedPartID: null,
    selectedMaterial: {},
    materialsData: null,
    partsData: null,
    partJsonPath: null,
    materialJsonPath: null,
    reset: function () {
      this.selectedPartID = null;
      this.selectedMaterial = {};
      this.materialsData = null;
      this.partsData = null;
      this.partJsonPath = null;
      this.materialJsonPath = null;


    },
    check: function () {
      for (var i = 0; i < this.partsData.jetEngineParts.length; i++) {
        if (this.partsData.jetEngineParts[i].name == this.selectedPartID) {
          if (this.partsData.jetEngineParts[i].correctMat == this.selectedMaterial[this.selectedPartID].id) {


            $("#FanCheck").css('background-color', '#5cb85c');

            if ((this.selectedPartID == "compressor") || (this.selectedPartID == "compressor2")) {
              _3DView.models.modelMaterialArray["compressor"] = _3DView.models.materialarray["compressor"];
              _3DView.models.modelMaterialArray["compressor2"] = _3DView.models.materialarray["compressor2"];

              _3DView.models.models["compressor"].material = _3DView.models.modelMaterialArray["compressor"];
              _3DView.models.models["compressor2"].material = _3DView.models.modelMaterialArray["compressor2"];

            } else if ((this.selectedPartID == "shaft") || (this.selectedPartID == "nose")) {
              _3DView.models.modelMaterialArray["shaft"] = _3DView.models.materialarray["shaft"];
              _3DView.models.modelMaterialArray["nose"] = _3DView.models.materialarray["nose"];
              _3DView.models.models["shaft"].material = _3DView.models.modelMaterialArray["shaft"];
              _3DView.models.models["nose"].material = _3DView.models.modelMaterialArray["nose"];
            } else {
              _3DView.models.modelMaterialArray[this.partsData.jetEngineParts[i].name] = _3DView.models.materialarray[this.partsData.jetEngineParts[i].name];
              _3DView.models.models[this.partsData.jetEngineParts[i].name].material = _3DView.models.modelMaterialArray[this.partsData.jetEngineParts[i].name]
            }


          } else {
            $("#FanCheck").css('background-color', '#d9534f');
            _3DView.models.modelMaterialArray[this.partsData.jetEngineParts[i].name] = new THREE.MeshNormalMaterial();
            _3DView.models.models[this.partsData.jetEngineParts[i].name].material = _3DView.models.modelMaterialArray[this.partsData.jetEngineParts[i].name]
          }
        }
      }

      if ($("#FanCheck:has(div.scrollToTOP)")) {
        $("#FanCheck").append('<style>#FanCheck::before{padding-top: 0px;}</style>');
        $("#FanCheck").append('<style>#FanCheck{border: none;border-radius:0px; }</style>');
        $("#FanCheck").append('<style>#FanCheck>.scrollToTOP{margin-top:37px;margin-bottom: 37px; }</style>');


        console.log("yay");
      } else {
        $("#FanCheck").append('<style>#FanCheck::before{padding-top: 100%;}</style>');
        $("#FanCheck").append('<style>#FanCheck{border: solid;border-radius:50%; }</style>');
        $("#FanCheck").append('<style>#FanCheck>.scrollToTOP{margin-top:37px;margin-bottom: 37px; }</style>');

        $("#FanCheck").html('<span class="drop-thing-text"><h4>Drop Material here</h4></span>');
        console.log("yay - boo");
      }
      console.log(this.selectedMaterial[this.selectedPartID].id + " ->" + this.selectedPartID);
    },
    getMaterials: function (init) {
      $.getJSON(this.materialJsonPath, function (data) {
        modelinfo.materialsData = data;
        modelinfo.setMaterialInfo(init);
        modelinfo.generateMaterialTable();
      });
    },
    getParts: function (init) {
      $.getJSON(this.partJsonPath, function (data) {
        modelinfo.partsData = data;
        modelinfo.setPartsInfo(init);
        console.log(modelinfo.partsData.jetEngineParts[0].correctMat);

      });
    },

    generateMaterialTable: function () {
      //$( ".scrollToTOP" ).draggable();
      for (var i = 0; i < this.materialsData.materials.length; i++) {


        $('#materialTable tr:last').after(
          '<tr><th colspan="3">' + this.materialsData.materials[i].name + '</th></tr>' +
          '<tr><td>Density</td><td>' + this.materialsData.materials[i].density + '</td>' +
          '<td rowspan="5" align="center" valign="center" ><img src="../../images/' + this.materialsData.materials[i].id + '.jpg" id="' + this.materialsData.materials[i].id + '" class="scrollToTOP img img-circle img-responsive img-thumbnail materialImg"/></td></tr>' +
          '<tr><td>Strength</td><td>' + this.materialsData.materials[i].strength + '</td></tr>' +
          '<tr><td>Temperature</td><td>' + this.materialsData.materials[i].temperature + '</td></tr>' +
          '<tr><td>Oxidation</td><td>' + this.materialsData.materials[i].oxidation + '</td></tr>' +
          '<tr><td>Corrosion</td><td>' + this.materialsData.materials[i].corrosion + '</td></tr>'
        );
        // <tr><th colspan="3">Steel</th></tr><tr><td>Thing</td><td>1</td><td rowspan="5">Image</td></tr><tr><td>Thing</td><td>2</td></tr><tr><td>Thing</td><td>3</td></tr><tr><td>Thing</td><td>4</td></tr><tr><td>Thing</td><td>5</td></tr>


      }
      $(".scrollToTOP").draggable({
        appendTo: "body",
        activeClass: "draggable",
        helper: "clone",
        start: function () {
          imageImgID = this.id;
          $("#FanCheck").css('background-color', '#0073ea');
        },
        stop: function () {
          if ($('#leftmenu').is(':empty')) {
            $("#FanCheck").css('background-color', '#FFF');
          } else {
            _3DView.modelInfomation.check();
          }

        }
      });

      $(".drop-thing").droppable({
        activeClass: "droppable",
        hoverClass: "ui-state-hover",
        helper: "clone",
        drop: function (event, ui) {

          //alert(_3DView.modelInfomation.selectedPartID);
          $(this).find(".materialImg").remove();
          for (var i = 0; i < _3DView.modelInfomation.materialsData.materials.length; i++) {
            if (_3DView.modelInfomation.materialsData.materials[i].id == imageImgID) {
              var imgData = '<img  src="' + _3DView.modelInfomation.materialsData.materials[i].texture_img + '" ' +
                'id="titainumImage" class="scrollToTOP img img-circle img-responsive img-thumbnail dropedIMG materialImg"/>';
              _3DView.modelInfomation.selectedMaterial[_3DView.modelInfomation.selectedPartID] = {
                html: imgData,
                id: imageImgID
              };
              _3DView.modelInfomation.check();
              $("#FanCheck").html(imgData);
            }
          }
          //
          //obj.addClass("dropedIMG");
          //obj.appendTo(this);

        }
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
          } else {
            $("#FanCheck").html('<span class="drop-thing-text"><h4>Drop Material here</h4></span>');
          }

          $("#PartDesc").html(this.partsData.jetEngineParts[i].description);
          $("#PartRequirement").html(this.partsData.jetEngineParts[i].requirements);
          break;
        }
      }
    }
  }
});
