/* global __context Java Packages */

const JsonArray = Java.type('com.google.gson.JsonArray');
const JsonObject = Java.type('com.google.gson.JsonObject');
const JsonNull = Java.type('com.google.gson.JsonNull');

function toJsonArray(value) {
	const jsonArray = new JsonArray();
	for (let index = 0, length = value.length; index < length; index++) {
		const item = value[index];
		if (typeof item === 'object') {
			jsonArray.add(toJsonElement(item));
		} else {
			jsonArray.add(item);
		}
	}
	return jsonArray;
}

function toJsonObject(value) {
	const jsonObject = new JsonObject();
	for (const key in value) {
		if (!Object.prototype.hasOwnProperty.call(value, key)) {
			continue;
		}
		const item = value[key];
		if (typeof item === 'object') {
			jsonObject.add(key, toJsonElement(item));
		} else {
			jsonObject.addProperty(key, item);
		}
	}
	return jsonObject;
}

function toJsonElement(value) {
	if (value == null) {
		return new JsonNull();
	}
	if (Array.isArray(value)) {
		return toJsonArray(value);
	}
	return toJsonObject(value);
}

function wrap(content, request) {
	const wrapper = {
		content,
		json: JSON.parse(content.toString()),

		get(property) {
			return this.json[property];
		},

		set(property, value) {
			let json;
			if (typeof property === 'string') {
				json = {};
				json[property] = value;
			} else {
				json = property;
			}

			for (const key in json) {
				const item = json[key];

				if (this.json[key] === item) {
					continue;
				}

				if (this.json[key] !== undefined) {
					if (this.content.has(key)) {
						this.content.remove(key);
					}

					if (item === undefined) {
						delete this.json[key];
					}
				}

				if (item !== undefined) {
					this.json[key] = item;
					if (typeof item === 'object') {
						this.content.add(key, toJsonElement(item));
					} else {
						this.content.addProperty(key, item);
					}
				}
			}

			return this;
		},

		unset(key) {
			return this.set(key);
		}
	};

	const now = new Date().toISOString();
	const userId = __context.get(Packages.ca.toronto.api.dataaccess.odata4.DataAccessContext.Constant.USER_ID);
	if (userId) {
		if (request.getMethod() === 'POST') {
			this.set('CreatedBy', userId);
			this.set('CreatedOn', now);
		}
		this.set('ModifiedBy', userId);
	} else {
		this.unset('ModifiedBy');
	}
	this.set('ModifiedOn', now);

	return wrapper;
}

module.exports = {
	toJsonArray,
	toJsonObject,
	toJsonElement,
	wrap
};
