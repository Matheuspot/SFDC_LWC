({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            { label: 'First Name', fieldName: 'FirstName', type: 'text' },
            { label: 'Last Name', fieldName: 'LastName', type: 'text' },
            { label: 'Email', fieldName: 'Email', type: 'text' }
        ]);
        var action = cmp.get("c.fetchData");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.data", response.getReturnValue());
                cmp.set("v.filteredData", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    searchTable : function(cmp,event,helper) {
        var allRecords = cmp.get("v.data");
        var searchFilter = event.getSource().get("v.value").toUpperCase();
        
        var tempArray = [];
        var i;

        for(i=0; i < allRecords.length; i++){
            if((allRecords[i].FirstName && allRecords[i].FirstName.toUpperCase().indexOf(searchFilter) != -1) ||
               (allRecords[i].LastName && allRecords[i].LastName.toUpperCase().indexOf(searchFilter) != -1 ) || 
               (allRecords[i].Email && allRecords[i].Email.toUpperCase().indexOf(searchFilter) != -1 ) )
            {
                tempArray.push(allRecords[i]);
            }
        }
        cmp.set("v.filteredData",tempArray);
    }
})