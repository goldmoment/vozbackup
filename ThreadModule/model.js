define(["parse"], function(Parse) {

	function Model(controller) {
		this.controller = controller;
		this.mode = 0;
	}

	Model.prototype.loadThreads = function(num, cur, renderFunc) {
		var that = this;

		var threads = Parse.Object.extend("threads");
		var query = new Parse.Query(threads);
		// query.equalTo("playerName", "Dan Stemkoski");
		query.limit(num);
		query.skip(cur);

		if (this.mode == 0) {
			query.descending("updatedAt");
			if (this.controller.view.lastUpdatedAt != '') {
				query.lessThan("updatedAt", this.controller.view.lastUpdatedAt);
			};
		}else {
			query.descending("createdAt");
			if (this.controller.view.lastCreatedAt != '') {
				query.lessThan("createdAt", this.controller.view.lastCreatedAt);
			};
		}
		
		query.find({
			success: function(results) {
				// Do something with the returned Parse.Object values
				renderFunc(results);
				that.controller.view.lastCreatedAt = results[results.length - 1].get('createdAt');
				that.controller.view.lastUpdatedAt = results[results.length - 1].get('updatedAt');
				that.controller.view.onEvent();
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		return true;
	}

	return Model;
});