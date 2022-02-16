({
    init : function (cmp, event, helper) {
        
        cmp.set('v.columns', [
            { label: 'Id', fieldName: 'id', type: 'text' },
            { label: 'Name', fieldName: 'name', type: 'text' },
            { label: 'Industry', fieldName: 'industry', type: 'text' }
        ]);

        var action = cmp.get("c.fetchAccountData");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.data", response.getReturnValue());
                cmp.set("v.filteredData", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    searchTable : function(cmp, event) {  
        
        let fetchedData = cmp.get("v.data");
        let filteredValues = []
        let searchedFields = {}       
       
        let fieldName  = event.getSource().get("v.name")
        let fieldValue = event.getSource().get("v.value")           
      
        searchedFields = cmp.get('v.searchedFields') === null ? {} : cmp.get('v.searchedFields')  

        searchedFields[fieldName] = fieldValue             
        cmp.set('v.searchedFields', searchedFields)
       
        Object.keys(searchedFields).forEach(key => {
            if (searchedFields[key] === "undefined" || searchedFields[key] === "") {
                delete searchedFields[key];
            }
        });   

        fetchedData.filter(item => {           
            for (let key in searchedFields) {             
                if (!item[key].toUpperCase().includes(searchedFields[key].toUpperCase())) { return false }
            }              
            filteredValues.push(item)  
        });   
              
        if (filteredValues.length > 0) cmp.set('v.filteredData', filteredValues)
        if (filteredValues.length == 0) cmp.set('v.filteredData', [])      
    },     
})