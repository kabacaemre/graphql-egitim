const Query = {
	user: (parent, args) => {
		return {
			name: 'Emre',
			surname: 'Kabaca'
		}
	}
};

module.exports = Query;