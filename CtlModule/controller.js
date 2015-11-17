define([], function() {

	function Controller(view, cmtController, threadController) {
		this.view = view;
		this.cmtController = cmtController;
		this.threadController = threadController;
	}

	Controller.prototype.loadTheadByNewThread = function() {
		this.threadController.getTheads(1);
	};

	Controller.prototype.loadTheadByNewComment = function() {
		this.threadController.getTheads(0);
		return true;
	};

	Controller.prototype.loadCmtsWithIndex = function(index) {
		this.cmtController.loadCmtsWithIndex(index);
	}

	Controller.prototype.loadCmtsWithId = function(threadId) {
		this.cmtController.loadCmtsWithId(threadId);
	}

	return Controller;
});