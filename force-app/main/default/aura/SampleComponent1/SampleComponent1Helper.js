({
    getResponse : function(component) {
        console.log('I am inside the helper');
        var action = component.get("c.getCalloutResponseContents");
        action.setParams({
            "url" : "http://data.fixer.io/api/latest?access_key=dc791d55ccada67058753325b8ac9ae5"
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid && state === "SUCCESS") {
                console.log('response.getReturnValue() ' + response.getReturnValue());
                component.set("v.response", response.getReturnValue());
                var getAllRates = component.get("v.response")['rates'];
                console.log('getAllRates => ' + getAllRates);
                var currencyLst = [];
                for (var key in getAllRates) {
                    currencyLst.push(key + '= ' + getAllRates[key]);
                }
                component.set("v.ListOfCurrency", currencyLst);
            }
        });
        $A.enqueueAction(action);
    },
})