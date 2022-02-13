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
    searchTable : function(cmp,event,helper) {  
        
        let fetchedData = cmp.get("v.data");
        let filteredValues = []
       
        let fieldName  = event.getSource().get("v.name")
        let fieldValue = event.getSource().get("v.value")
  
        if (fieldName == 'accountName') cmp.set("v.accountName", fieldValue)        
        if (fieldName == 'accountIndustry') cmp.set('v.accountIndustry', fieldValue)

        let savedAccountName = cmp.get('v.accountName')
        let savedAccountIndustry = cmp.get('v.accountIndustry')  

        console.log(savedAccountName)
        console.log(savedAccountIndustry)
        
        let searchedFields = {}
     
        searchedFields = JSON.parse(
            `{
                "name" : "${savedAccountName}", 
                "industry" : "${savedAccountIndustry}"
            }`
        )
                   

        console.log('searched fields: ' + JSON.stringify(searchedFields))    
        console.log('fetchedData: ' + JSON.stringify(fetchedData))

        fetchedData.filter(item => {           
            for (let key in searchedFields) {             
                if (item[key] === undefined || item[key].toUpperCase() != searchedFields[key].toUpperCase()) {
                    console.log('passed here 1')
                    return false
                }
            }   
            console.log('passed here 2')
            filteredValues.push(item)  
        });

        console.log('filtered value array: ' + filteredValues)
        if (filteredValues.length > 0) cmp.set('v.filteredData', filteredValues)
        if (filteredValues.length < 1) cmp.set('v.filteredData', fetchedData)          
    }  
})