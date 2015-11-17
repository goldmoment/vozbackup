define([], function() {

	function Controller(view, module) {
		this.view = view;
		this.module = module;
	}

	Controller.prototype.getCmts = function(threadId, title) {
		// console.log(threadId);
		this.view.clear();
		this.view.lastIndex = 0;
		this.view.title = title;
		this.module.threadId = threadId;
		this.module.loadCmts("th1", 0, 50, this.view.render);
	};

	Controller.prototype.loadNext = function() {
		this.module.loadCmts("th1", 0, 50, this.view.render);
	};

	Controller.prototype.loadCmtsWithIndex = function(index) {
		console.log(index);
		// $('.th1').animate({
		// 	scrollTop: $("#post_message_82130120").offset().top
		// }, 2000);
		this.view.clear();
		this.view.lastIndex = index;
		this.module.loadCmts("th1", 0, 50, this.view.render);
	};

	Controller.prototype.loadCmtsWithId = function(threadId) {
		console.log(threadId);
		// $('.th1').animate({
		// 	scrollTop: $("#post_message_82130120").offset().top
		// }, 2000);
		this.view.clear();
		this.view.lastIndex = 0;
		this.module.threadId = threadId;
		this.module.loadTitle();
		this.module.loadCmts("th1", 0, 50, this.view.render);
	};

	return Controller;
});