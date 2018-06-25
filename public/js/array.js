/**
 * Array Utilities
 */
Array.prototype.findById = function (id) {
    id = String(id);
    return this.find(i => i.id === id);
};


Array.prototype.sortByProb = function (property, reverse) {
    property = String(property);
    reverse = Boolean(reverse);
    if (reverse) {
        return this.sort(dynamicSort(property)).reverse();
    } else {
        return this.sort(dynamicSort(property));
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
};

Array.prototype.filterByProb = function (property) {
    property = Boolean(property);

    return this.filter(isBigEnough(property));

    function isBigEnough(property) {
        return function (obj, idx, array,) {
            return obj.finished == property;
        }
    }
};
