'use strict';

var letterpress = require('letterpressjs'),
	privileges_lp = new letterpress({
		idSelector: '#padmin-privileges',
		sourcedata: '/userprivileges/search.json',
		sourcearrayname: 'userprivileges',
		valueLabel: 'name',
		disablenewtags: true,
		createTagFunc: function (id, val, callback) {
			if (id === 'NEWTAG' || id === 'SELECT') {
				window.ribbonNotification.showRibbon('privilege does not exist', 4000, 'error');
			}
			else if (id !== 'SELECT' || id !== 'NEWTAG') {
				callback(id, val);
			}
		}
	});

window.backToUserRolesLanding = function () {
	window.location = '/p-admin/userroles';
};

window.addEventListener('load', function () {
	privileges_lp.init();
	if (typeof window.userroleprivileges === 'object') {
		privileges_lp.setPreloadDataObject(window.userroleprivileges);
	}
	window.ajaxFormEventListers('._pea-ajax-form');
});
