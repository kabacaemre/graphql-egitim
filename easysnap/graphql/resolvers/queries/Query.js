const Query = {
	user: (parent, args) => {
		return {
			username: 'Emre',
			createdAt: '10/07/2020'
		}
	}
};

module.exports = Query;