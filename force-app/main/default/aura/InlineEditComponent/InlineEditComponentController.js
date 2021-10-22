({
    init : function(component, event, helper) {
        component.set('v.columns', 
        [
            {label: 'Id',                 fieldName: 'Id',               sortable: true, type: 'text', initialWidth: 300},
            {label: 'Name',               fieldName: 'Name',             sortable: true, type: 'text', initialWidth: 400, editable: true},
            {label: 'Phone',              fieldName: 'Phone',            sortable: true, type: 'text', initialWidth: 300},
            {label: 'Last Modified Date', fieldName: 'LastModifiedDate', sortable: true, type: 'text', initialWidth: 400}
        ]);
        helper.getData(component, event, helper);
    },
    
    save : function(component, event, helper) {
        var draftValues = event.getParam('draftValues');
        var action      = component.get('c.updateAccount');

        action.setParams({lsAccount : draftValues});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === 'SUCCESS') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully.",
                    "type" : "success",
                    "duration" : 7000
                });
                toastEvent.fire();
                component.set('v.draftValues', []);
                helper.getData(component, helper);
                $A.get('e.force:refreshView').fire();
            } else if (state === "ERROR") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "The record has not been updated successfully.",
                    "type" : "error",
                    "duration" : 7000
                });
                toastEvent.fire();
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert(errors[0].message);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },

    updateSorting: function (component, event, helper)  {
        var fieldName       = event.getParam('fieldName');
        var sortDirection   = event.getParam('sortDirection');
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    },

    searchTable: function (component, event, helper) {
        var allRecords      = component.get("v.allData");
        var searchFilter    = event.getSource().get("v.value").toUpperCase();
        var tempArray       = [];        
        for(var i = 0; i <allRecords.length; i++){
            if((allRecords[i].Name && allRecords[i].Name.toUpperCase().indexOf(searchFilter)!= -1) || 
               (allRecords[i].Phone && allRecords[i].Phone.toUpperCase().indexOf(searchFilter) != -1)){
                tempArray.push(allRecords[i]);
            }
        }
        component.set("v.recordList", tempArray);
    }
})