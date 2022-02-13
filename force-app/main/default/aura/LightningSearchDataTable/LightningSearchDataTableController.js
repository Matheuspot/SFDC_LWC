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
        let savedAccountName  = ''
        if (fieldName == 'accountName') {
            savedAccountName = fieldValue
        }      
        if (fieldName == 'accountIndustry') cmp.set('v.accountIndustry', fieldValue)

       
        let savedAccountIndustry = cmp.get('v.accountIndustry') == undefined ? '' :  cmp.get('v.accountIndustry')
    
        var tempArray = []
        for(let i = 0; i < fetchedData.length; i++){
            if(
                (fetchedData[i].name && fetchedData[i].name.toUpperCase().indexOf(savedAccountName.toUpperCase()) != -1) && 
                (fetchedData[i].industry && fetchedData[i].industry.toUpperCase().indexOf(savedAccountIndustry.toUpperCase()) != -1) 
            ){
               
                tempArray.push(fetchedData[i]);
                
            }
        }

        if (savedAccountName == '' &&  savedAccountIndustry == '') {
            tempArray = []
        }

        console.log('saved acc: '  + savedAccountName)
        console.log('saved industry: ' + savedAccountIndustry)
        console.log('ARRAY: ' + JSON.stringify(tempArray))

        if (tempArray.length > 0 ) {
            cmp.set('v.filteredData', tempArray)
        } else {
            cmp.set('v.filteredData', fetchedData) 
        }



           
    }  
})