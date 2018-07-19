/**
 * Vanilla Javascript Utilities
 * (c) Hunter Rancourt
 * https://github.com/skwid138/vanilla-javascript-utilities
 * License: MIT
 */

class Vjs {
	constructor() {
		this.init();
	}

	init() {

	}

	/*********************************************************************************/
	/******************************** Object Manipulation ********************************/
	/*********************************************************************************/

	//@TODO grab useful functions from -- https://dev.to/amit_merchant/essential-vanilla-javascript-functions

	/**
	 * Check if a string has capitalized letters in it.
	 * @param str String The string being checked for caps
	 * @returns {boolean}
	 */
	static isCamelCase(str) {
		return /[A-Z]/.test(str)
	}

	/**
	 * Check if a string is JSON
	 * @param str String to check
	 * @returns {boolean}
	 */
	static isJSON(str) {
		try {
			JSON.parse(str);
		} catch (error) {
			return false;
		}
		return true;
	}

	/**
	 * Avoid mutating Objects by return a new object with any additional properties
	 *
	 * @param originalObject Object original Object you wish to preserve the values from
	 * @param updatePropertiesObject Object new object with properties you wish to add to the original object
	 * @returns {{}} New Object
	 */
	static updateObject(originalObject, updatePropertiesObject) {
		if ((typeof originalObject !== 'object' || typeof updatePropertiesObject !== 'object') && Cig.isDevEnv()) {
			throw new Error('Both arguments need to be valid javascript objects.');
		}
		return {...originalObject, ...updatePropertiesObject};
	};

	/**
	 *
	 * @param form
	 */
	static serializeObject(form) {
		const o = {};
		const a = Cig.serializeArray(form);
		for (let i = 0, l = a.length; i < l; i++) {
			const item = a[i];
			const name = item.name;
			/** if the value is null or undefined, we set to empty string, else we use the value passed */
			const value = item.value || '';

			/** if the key already exists we convert it to an array */
			if (o[name] != undefined) {
				if (!o[name].push) {
					/** convert to array */
					o[name] = [o[name]];
				}
				o[name].push(value);
			} else {
				o[name] = value ;
			}
		}
		return o;
	}; // end serializeObject function

	/**
	 *
	 * @param form
	 * @returns {Array}
	 */
	static serializeArray(form) {
		let field, l, s = [];

		if (typeof form === 'object' && form.nodeName === 'FORM') {
			const len = form.elements.length;

			for (let i = 0; i < len; i++) {
				field = (form.elements[i]);

				if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {

					if (field.type === 'select-multiple') {

						l = (form.elements[i].options.length);

						for (let j = 0; j < l; j++) {
							if(field.options[j].selected)
								s[s.length] = { name: field.name, value: field.options[j].value };
						}
					} else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
						s[s.length] = { name: field.name, value: field.value };
					}
				}
			}
		}
		return s;
	} // end SerializeArray




	/*********************************************************************************/
	/******************************** MISC ********************************/
	/*********************************************************************************/

	/**
	 * Similar to php's http_build_query method this takes an object with key value pairs and makes a query string
	 *
	 * @param queryObject {object} of keys and their associated values
	 * @returns {string} string of keys and values to be appended to a url
	 */
	static buildQuery (queryObject) {
		return Object.keys(queryObject).map(value => encodeURIComponent(value) + '=' + encodeURIComponent(queryObject[value])).join('&');
	}

	/**
	 * Checks if email address appears to be in a valid format
	 *
	 * @param emailAddress
	 * @returns {boolean}
	 */
	static isValidEmail (emailAddress) {
		const pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(emailAddress);
	};




	/*********************************************************************************/
	/******************************** DOM Manipulation ********************************/
	/*********************************************************************************/

	// @TODO update this to check if it's an element and if it's not try to find the element
	static show(element) {
		Cig.log(element);
		element.style.display = 'block';
	}

	// @TODO update this to check if it's an element and if it's not try to find the element
	static hide(element) {
		element.style.display = 'none';
	}

	static hideAll(elementList) {
		Array.from(elementList).forEach(function(element) {
			Cig.hide(element);
		});
	}

	// @TODO update this to check if it's an element and if it's not try to find the element -- const element = document.querySelector(selector);
	static remove(element) {
		while(element.hasChildNodes()) {
			remove(element.firstChild);
		}
		element.parentNode.removeChild(element);
	}

	static removeInner(selector) {
		const element = document.querySelector(selector);

		while (element.hasChildNodes()) {
			clear(element.firstChild);
		}
	}

	/**
	 * If Element is Visible hide it, otherwise show it
	 * @param element {string} element to toggle
	 */
	static toggleDisplay(element) {
		if (window.getComputedStyle(element).display === 'block') {
			return Cig.hide(element);
		}
		return Cig.show(element);
	}

	static addClass(element, className) {
		if (element.classList)
			element.classList.add(className);
		else
			element.className += ' ' + className;
	}

	static hasClass(element, className) {
		if (element.classList) {
			return element.classList.contains(className);
		} else {
			return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
		}
	}

	static removeClass(element, className) {
		if (element.classList)
			element.classList.remove(className);
		else
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

	static getSiblings(element, filter) {
		const siblings = [];
		element = element.parentNode.firstChild;

		do {
			if (!filter || filter(element)) {
				siblings.push(element);
			}
		} while (element = element.nextSibling);

		return siblings;
	}
}