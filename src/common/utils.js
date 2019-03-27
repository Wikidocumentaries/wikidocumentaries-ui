import _ from 'lodash'

// Return a sorting function to be applied on an array of objects
//
// Based on https://stackoverflow.com/a/4760279/5528498
// props: Array of names of parameters to be sorted. Dot notation ok.
// For descending add "-" in front of parameter
export const sortResults = (props) => {
	const sortParam = (property) => {
    let sortOrder = 1;
    if(property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        let result = (_.get(a, property) < _.get(b, property)) ? -1 : (_.get(a,property) > _.get(b,property)) ? 1 : 0;
        return result * sortOrder;
    }
	}
	return function (obj1, obj2) {
			let i = 0, result = 0;
			/* try getting a different result from 0 (equal)
			 * as long as we have extra properties to compare
			 */
			while(result === 0 && i < props.length) {
					result = sortParam(props[i])(obj1, obj2);
					i++;
			}
			return result;
	}
}
