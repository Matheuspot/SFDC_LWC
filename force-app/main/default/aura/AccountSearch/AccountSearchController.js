({
    doInit: function(component, event, helper) {
        helper.getAccountList(component);
    },
    searchKeyChange: function(component, event) {
        var searchKey = component.find("searchKey").get("v.value");
        console.log('searchKey:::::'+searchKey);
        var action = component.get("c.findByName");
        action.setParams({
            "searchKey": searchKey
        });
        action.setCallback(this, function(a) {
            component.set("v.accounts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    }   
})