define(function() {
	return {
		convertTimestamp: function (time) {
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

			var year = parseInt(time / 31536000) + 1970;

			var tmp = time % 31536000;
			var month = parseInt(tmp / 2678400) + 1;

			tmp = time % 2678400;
			var day = parseInt(tmp / 86400) + 1;

			tmp = time % 86400;
			var hour = parseInt(tmp / 3600);

			tmp = time % 3600;
			var min = ('0' + parseInt(tmp / 60)).slice(-2);

			var now = new Date();

			var ret = '';
			if (now.getFullYear() == year && now.getMonth() == month - 1 && now.getDate() == day)
			{
				ret = 'Today, ' + hour + ':' + min;
			}
			else if (now.getFullYear() == year && now.getMonth() == month - 1 && now.getDate() - 1 == day) {
				ret = 'Yesterday, ' + hour + ':' + min;
			}
			else {
				ret = day + ' ' + months[month - 1] + ' ' + year + ', ' + hour + ':' + min;
			}

			return ret;
		}
	}
});