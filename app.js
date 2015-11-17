Parse.initialize("jQqq8FB0WmBi258N857Elg7zyBQPibkNlmbDNBj6", "vNJIQZUdFd5aZcmHAtEsuWjiB4kY3tQvmaNJRQoU");

var curThread = 0;
var numThread = 50;

var curCmt = 0;
var numCmt = 50;
var curTID = '';

function loadNext(cur, num) {
	var threads = Parse.Object.extend("threads");
	var query = new Parse.Query(threads);
	// query.equalTo("playerName", "Dan Stemkoski");
	query.limit(num);
	query.skip(cur);
	// query.descending("updatedAt");
	query.descending("createdAt");
	query.find({
	  success: function(results) {
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) {
			var object = results[i];
			console.log(object.get('threadId'));
			$( ".left-panel" ).append('<div class="title" id="'+object.get('threadId')+'"><p>'+object.get('title')+'</p></div>');
		}
	    $('.title').on('click', function() {
			$(".highlight").removeClass("highlight");
			$(this).addClass("highlight");
			$( ".cmt-content" ).remove();
			curCmt = 0;
			curTID = $(this).attr("id");
			loadCmt($(this).attr("id"), "th1", curCmt, numCmt);
			curCmt += numCmt;
		});
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function loadCmt(id, className, cur, num) {
	var threads = Parse.Object.extend("comments");
	var query = new Parse.Query(threads);
	query.equalTo("threadId", id);
	query.limit(num);
	query.skip(cur);
	// query.descending("updatedAt");
	query.ascending("index");

	query.find({
	  success: function(results) {
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) {
			var object = results[i];

			// alert(object.id + ' - ' + object.get('playerName'));
			var content = object.get('content').replace(/src="\//g, 'src="https://vozforums.com/');
			content = content.replace(/src="i/g, 'src="https://vozforums.com/i');
			content = content.replace(/style="border:1px inset"/g, '');
			content = content.replace(/<br><\/br><br><\/br>/g, '<br></br>');

			var info = '<div class="cmt-author"><div class ="cmt-image">' +
				object.get('avater') + '</div><div class ="cmt-info"><p>' +
				object.get('author') + '</p><i>' + 
				convertTimestamp(object.get('time')) + '</i></div><div class ="cmt-index"><span>#' + 
				object.get('index') + '</span></div></div>';

			info = info.replace(/src="cu/g, 'src="https://vozforums.com/cu');

			$( "."+className ).append('<div class="cmt-content shadow">'+info+content+'</div>');
	    }
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function convertTimestamp(time) {
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

	// alert(ret);
	return ret;
}

loadNext(curThread, numThread);
curThread += numThread;

$('.left-panel').on('scroll', function() {
	if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
		loadNext(curThread, numThread);
		curThread += numThread;
		// alert('end reached');
	}
});

$('.content').on('scroll', function() {
	if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
		loadCmt(curTID, "th1", curCmt, numCmt);
		curCmt += numCmt;
		// alert('end reached');
	}
});