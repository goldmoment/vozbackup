define([], function() {

	function Controller(view, module, cmtController) {
		this.view = view;
		this.module = module;
		this.cmtController = cmtController;
	}

	Controller.prototype.getTheads = function(mode) {
		this.view.clear();
		this.module.mode = mode;
		this.module.loadThreads(50, 0, this.view.render);
	};

	Controller.prototype.loadNext = function() {
		this.module.loadThreads(50, 0, this.view.render);
		return true;
	};

	Controller.prototype.loadCmts = function(threadId, title) {
		this.cmtController.getCmts(threadId, title);
		return true;
	};

	return Controller;
});