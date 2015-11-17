define(["parse"], function(Parse) {
	function Model(controller) {
		this.controller = controller;
		this.threadId = '';
	}

	Model.prototype.loadCmts = function(className, cur, num, renderFunc) {
		var that = this;

		var threads = Parse.Object.extend("comments");
		var query = new Parse.Query(threads);
		query.equalTo("threadId", this.threadId);
		query.limit(num);
		query.skip(cur);
		// query.descending("updatedAt");
		query.ascending("index");
		// if (this.controller.view.lastIndex != 0) {
			query.greaterThan("index", this.controller.view.lastIndex);
		// };


		query.find({
			success: function(results) {
				// Do something with the returned Parse.Object values
				renderFunc(results, "th1");
				that.controller.view.onEvent();
				if (results.length > 0) {
					that.controller.view.lastIndex = results[results.length - 1].get('index');
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		return true;
	}

	Model.prototype.loadTitle = function () {
		var that = this;

		var threads = Parse.Object.extend("threads");
		var query = new Parse.Query(threads);
		query.equalTo("threadId", this.threadId);
		query.limit(1);

		query.find({
			success: function(results) {
				// Do something with the returned Parse.Object values
				that.controller.view.title = results[0].get('title');
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}

	return Model;
});