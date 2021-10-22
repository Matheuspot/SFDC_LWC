({
    getData : function(component, event, helper) {
        var searchKey = component.find("searchKey").get("v.value");
        var action = component.get('c.getAccount');
        action.setParams({
            "searchKey": searchKey
        });
        var self = this;
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === 'SUCCESS') {
                var recordList = response.getReturnValue();
                component.set("v.allData", recordList);
                component.set('v.recordList', recordList);
            }
        });
        $A.enqueueAction(action);
    },

    sortData: function (component, fieldName, sortDirection) {
        var fname = fieldName;
        var data = component.get("v.recordList");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse))
        component.set("v.recordList", data);
    },

    sortBy: function (field, reverse) {
        var key = function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
})