AFRAME.registerComponent("markerhandler", {
    init: async function () {
      var compounds = await this.getCompounds();
    this.el.addEventListener("markerFound", () => {
        this.handleMarkerFound(compounds);
        this.el.setAttribute("glow", "color: red; intensity: 1")
        this.el.setAttribute("position", {x: 0, y: -1.5,z: -0.5})
        this.el.setAttribute("rotation", {x: 0, y: 0,z: 0})
        this.el.setAttribute("scale", {x: 1, y: 1, z: 1})
        this.el.setAttribute("material", "color: #ff0000")}),
            
        
    this.el.addEventListener("markerLost", () => {
        this.el.setAttribute("glow", "color: red; intensity: 0")
        this.el.setAttribute("position", {x: 0, y: -1.5,z: -0.5})
        this.el.setAttribute("rotation", {x: 0, y: 0, z: 0})
        this.el.setAttribute("scale", {x: 1, y: 1,z: 1})
        this.el.setAttribute("material", "color: #ff0000") }),
    
    
    getDistance: function(elA,elB){
        return elA.object3D.position.distanceTo(elB.object3D.position)

    },

    getModelGeometry:function(models,modelname){
        var barcode = Object.keys(models);
        for(var barcode of barcode) {
            if(models[barcode].model_name===modelName){
                return{
                    position:models[barcode]["placement_position"],
                    rotation:models[barcode]["placement_rotation"],
                    scale:models[barcode]["placement_scale"],
                    model_url:models[barcode]["model_url"]
                }
            }
        }
    },
    
    
    placeTheModel:function(modelName,models){
        var islistContainModel = this.isModelPresentInArray(modelList, modelName)
        if(islistContainModel){
            var distance=null;
            var marker1=document.queryselector('#marker-base');
            var marker2=document.queryselector('#marker-${modelName}');
            distance=this.getDistance(marker1,marker2);
            if(distance<1.25){
                var modelEl= document.queryselector(`#${modelName}`);
                modelEl.setAttribute("visible",false);

                var isModelPlaced=document.queryselector(`#model-${modelName}`);
                if(isModelPlaced===null){
                    var el = document.createElement("a-entity")
                    var modelGeometry = this.getModelGeometry(models,modelName)
                    el.setAttribute("id",`model-${modelName}`)
                    el.setAttribute("gltf-model",`url(${modelGeometry.modelurl})`);
                    el.setAttribute("position",modelGeometry.position);
                    el.setAttribute("rotation",modelGeometry.rotation);
                    el.setAttribute("scale",modelGeometry.scale);
                    marker1.appenchild(el);
                }
            }
        }
    }

    isModelPresentInArray:function(arr,val){
        for(var i of arr){
            if (i.model_name===val){
                return true;
            }
        }
        returnfalse;
    },
    tick:async function(){
        if(modelList.length>1){
            var isbasemodelPresent=this.isModelPresentInArray(modelList,"base");
            var messagetext = document.queryselector("#message-text");

            if(!isbasemodelPresent){
                messagetext.setAttribute("visible",true);
            } else {
                if (models===null){
                    models=await this.getModels()
                }
                
                messagetext.setAttribute("visible",false)
                this.placeTheModel("road",models);
                this.placeTheModel("car",models);
                this.placeTheModel("building1",models);
                this.placeTheModel("building2",models);
                this.placeTheModel("tree",models);
                this.placeTheModel("sun",models);
            }
        }
    }

},
   }
       })
