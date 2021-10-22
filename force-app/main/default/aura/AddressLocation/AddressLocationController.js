({
  doInit: function (component, event, helper) {
    console.log(component.get("v.recordId"));
  },

  cancel: function (component, event, helper) {
    var dismissActionPanel = $A.get("e.force:closeQuickAction");
    dismissActionPanel.fire();
  },

  searchCEP: function (component, event, helper) {
    var action = component.get("c.getAddress");
    action.setParams({
      CEP: component.get("v.CEP")
    });
    action.setCallback(this, function (response) {
      var state = response.getState();
	  var toastEvent = $A.get("e.force:showToast");  
	  console.log(state);

      if (state === "SUCCESS") {		
        component.set("v.cepReturn", response.getReturnValue());        
        toastEvent.setParams({
          title: "Success!",
          message: "Your search has been successfully done!",
          type: "success"
        });        
      } else {
		toastEvent.setParams({
			title: "Error!",
			message: "Your search has not been successfully done!",
			type: "error"
		  });		  
      }
	  toastEvent.fire();
    });
    $A.enqueueAction(action);
  },
  save: function (component, event, helper) {
    var action = component.get("c.updateAddress");
    action.setParams({
      jsonCEP: JSON.stringify(component.get("v.cepReturn")),
      accountId: component.get("v.recordId")
    });
    action.setCallback(this, function (response) {
      var state = response.getState();
	  var toastEvent = $A.get("e.force:showToast");

      if (state === "SUCCESS") {     

        if (response.getReturnValue) {          
          toastEvent.setParams({
            title: "Success!",
            message: "Your update has been successfully done!",
            type: "success"
          });
		  $A.get("e.force:refreshView").fire();
          var dismissActionPanel = $A.get("e.force:closeQuickAction");
          dismissActionPanel.fire();
        } else {
          console.log("erro");
        }
      } else {
		toastEvent.setParams({
			title: "Error!",
			message: "Your update has not been successfully done!",
			type: "error"
		  });		  
      }
	  toastEvent.fire();
    });
    $A.enqueueAction(action);
  }
});