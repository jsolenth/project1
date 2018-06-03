/**
 * Array Utilities
 */
Array.prototype.findById = function(id) {
    id = String(id);
    return this.find(i => i.id === id);
};


Array.prototype.sortByProb = function(property) {
    property = String(property);
    return this.sort(dynamicSort(property))

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
};

