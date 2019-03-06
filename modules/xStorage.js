export default {
	create(item = { key: null, value: null }) {
		if (this.validate(item))
		 localStorage.setItem(item.key, JSON.stringify(item.value));
	},
	read(item = { key: null, value: null }) {
		if (this.validate(item)) {
			if (localStorage.getItem(item.key) !== null) {
				return JSON.parse(localStorage.getItem(item.key));
			}

			return null;
		}
	},
	update(item = { key: null, value: null }) {
		if (this.validate(item))
			localStorage.setItem(item.key, JSON.stringify(item.value));
	},
	delete() {
		localStorage.clear();
	},
	validate(item) {
		if ((item.key !== null || item.key !== undefined) && (item.value !== null || item.value !== undefined)) {
			return true;
		}
		return false;
	},
	init(item) {
		let storage = this.read({ key: item, value: {} });

		if (storage === null) {
			this.create({ key: item, value: {} });
			storage = this.read({ key: item, value: {} });
		}

		return storage;
	},	
};