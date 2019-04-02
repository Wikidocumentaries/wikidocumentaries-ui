import _ from 'lodash'

/**
 * Return a sorting function to be applied on an array of objects
 *
 * @param props An array of names of object properties to be sorted. Dot notation for hierarchical objects supported. For descending add "-" in front of name.
 * @return the function to apply to the sort method called on an array of objects
 * @see <a href="https://stackoverflow.com/a/4760279/5528498">Based on input from StackOverflow</a>
 */
export const sortResults = (props, currLocale) => {
	const sortParam = (property) => {
    let sortOrder = 1;
    if(property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        let result = _.get(a, property).toLocaleLowerCase().localeCompare(_.get(b, property).toLocaleLowerCase(), currLocale, { usage: 'sort' });
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
